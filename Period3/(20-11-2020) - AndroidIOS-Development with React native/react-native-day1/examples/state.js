import React, { useState, useEffect } from "react";
import { Button, Text, View } from "react-native";

Blink = (props) => {
  const [isShowingText, setIsShowingText] = useState(true);

  useEffect(() => {
    const toggle = setInterval(() => {
      setIsShowingText(!isShowingText);
    }, 1000);

    return () => clearInterval(toggle);
  })

  if (!isShowingText) {
    return null;
  }

  return <Text>{props.text}</Text>;
}

//https://reactnative.dev/docs/state
StateDemo = () => {
  return (
    <View style={{ flex: 1, paddingTop: 22 }}>
      <Blink text='I love to blink' />
      <Blink text='Yes blinking is so great' />
      <Blink text='Why did they ever take this out of HTML' />
      <Blink text='Look at me look at me look at me' />
    </View>
  );
}

//https://reactnative.dev/docs/touchableopacity
export default function StateScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24 }}>State Demo</Text>
      <StateDemo />
    </View>
  );
}

