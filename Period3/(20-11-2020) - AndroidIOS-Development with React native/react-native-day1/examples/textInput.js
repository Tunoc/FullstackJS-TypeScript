import React, { Component, useState } from 'react';
import { Text, TextInput, View } from 'react-native';

PizzaTranslator = () => {
  const [text, setText] = useState('');
  return (
    <View style={{ flex: 1, paddingTop: 22 }}>
      <TextInput
        style={{ height: 40 }}
        placeholder="Type here to translate!"
        onChangeText={text => setText(text)}
        defaultValue={text}
      />
      <Text style={{ fontSize: 18 }}>
        {text.split(' ').map((word) => word && '🍕').join(' ')}
      </Text>
    </View>
  );
}


//https://reactnative.dev/docs/handling-text-input
export default function TextInputScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24 }}>TextInput Demo</Text>
      <PizzaTranslator />
    </View>
  );
}