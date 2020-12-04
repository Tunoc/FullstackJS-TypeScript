import React, { useState, useEffect, useRef } from 'react';
import { Platform, Text, View, StyleSheet, TouchableHighlight, Alert, Button, FlatList } from 'react-native';
import * as Location from 'expo-location';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Constants from 'expo-constants';
import facade from "./components/serverFacade";
import GetLoginData from './components/GetLoginData'
import { StatusBar } from 'expo-status-bar';

const MyButton = ({ txt, onPressButton }) => {
  return (
    <TouchableHighlight style={styles.touchable} onPress={onPressButton}>
      <Text style={styles.touchableTxt}>{txt}</Text>
    </TouchableHighlight>
  );
}

export default function App() {
  //Login
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const loginDataReady = async (loginData) => {
    const uN = loginData.userName
    const psw = loginData.password
    const dist = loginData.distance
    const lat = position.latitude
    const lon = position.longitude
    let otherPlayersFromServer = await facade.nearByPlayers(uN, psw, lon, lat, dist)
    if (otherPlayersFromServer.code == 403) {
      Alert.alert("Wrong username or password");
    } else {
      setOtherPlayers(otherPlayersFromServer)
      setIsLoggedIn(true);
      setShowLoginDialog(false)
    }
  }

  const cancelLoginDataDialog = () => {
    setShowLoginDialog(false)
  }

  //HOOKS
  const [position, setPosition] = useState({ latitude: null, longitude: null })
  const [errorMessage, setErrorMessage] = useState(null);
  const [region, setRegion] = useState(null);
  const [otherPlayers, setOtherPlayers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let mapRef = useRef(null);

  useEffect(() => {
    getLocationAsync();
  }, [])

  // useEffect(() => {
  //   console.log(otherPlayers)
  // }, [otherPlayers])

  let otherMarkers = otherPlayers.map(marker => (
    <MapView.Marker
      key={marker.name}
      title={marker.name}
      pinColor={"blue"}
      coordinate={{
        latitude: marker.location.coordinates[1],
        longitude: marker.location.coordinates[0],
      }}
    />
  ))

  getLocationAsync = async () => {
    //Request permission for users location, get the location and call this method from useEffect
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMessage('Permission to access location was denied');
      return
    }

    let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    setPosition({ latitude: location.coords.latitude, longitude: location.coords.longitude })

    setRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922, //Hardcode for zoom factor
      longitudeDelta: 0.0421 //Hardcode for zoom factor
    });
  };

  const logOut = () => {
    //removes other players positions and "logs us out"
    setOtherPlayers([])
    setIsLoggedIn(false)
  }

  return (
    <View style={{ flex: 1, paddingTop: 20 }}>

      {!region && <Text style={styles.fetching}>
        .. Fetching data</Text>}

      {region && <MapView
        ref={mapRef}
        style={{ flex: 14 }}
        mapType="standard"
        region={region}
      >

        {/*App MapView.Marker to show users current position*/}
        <MapView.Marker
          title={"You!"}
          coordinate={{ longitude: position.longitude, latitude: position.latitude }}
          description={"This is where you are currently located."}
        />

        {/*Add all other markers*/}
        {otherMarkers}

      </MapView>}

      <Text style={{ flex: 1, textAlign: "center", fontWeight: "bold" }}>
        Your position (lat,long): {position.latitude}, {position.longitude}
      </Text>

      <MyButton style={{ flex: 2 }} onPressButton={getLocationAsync} txt="Update Your Position" />

      {isLoggedIn
        ? <MyButton style={{ flex: 2 }} onPressButton={logOut} txt="Log Out" />
        : <MyButton style={{ flex: 2 }} onPressButton={() => setShowLoginDialog(true)} txt="Login" />
      }

      <GetLoginData
        onLoginDataReady={loginDataReady}
        visible={showLoginDialog}
        onCancel={cancelLoginDataDialog} />

    </View>
  );
}

const styles = StyleSheet.create({
  touchable: { backgroundColor: "#4682B4", margin: 2 },
  touchableTxt: { fontSize: 16, textAlign: "center", padding: 5 },
  fetching: {
    fontSize: 35, flex: 14,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: "center",
    paddingTop: Constants.statusBarHeight
  },
});
