import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Modal, Text } from "react-native";

export default function GetLoginData(props) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [distance, setDistance] = useState("0");
    const { onLoginDataReady, visible, onCancel } = props;

    const submit = () => {
        const loginData = { userName, password, distance }
        onLoginDataReady(loginData);
        setUserName("")
        setPassword("")
        setDistance("0")
    }

    return (
        <Modal visible={visible} animationType="slide">
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Username"
                    style={styles.input}
                    onChangeText={(txt) => setUserName(txt)}
                    value={userName}
                />
                <TextInput
                    placeholder="Password"
                    style={styles.input}
                    onChangeText={(txt) => setPassword(txt)}
                    value={password}
                />
                <TextInput
                    placeholder="Distance in meters"
                    style={styles.input}
                    onChangeText={(txt) => setDistance(txt)}
                    value={distance}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title="CANCEL" color="red" onPress={onCancel} />
                    </View>
                    <View style={styles.button}>
                        <Button title="LOGIN" onPress={submit} />
                    </View>
                </View>
                <Text>Made by Tobias - cph-tb193</Text>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        width: "80%",
        borderColor: "black",
        borderWidth: 1,
        padding: 10,
        marginBottom: 10
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "60%"
    },
    button: {
        width: "40%"
    }
});