import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';

FlatListBasics = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          { key: 'Devin1' },
          { key: 'Dan1' },
          { key: 'Dominic1' },
          { key: 'Jackson1' },
          { key: 'James1' },
          { key: 'Joel1' },
          { key: 'John1' },
          { key: 'Jillian1' },
          { key: 'Jimmy1' },
          { key: 'Julie1' },
          { key: 'Devin2' },
          { key: 'Dan2' },
          { key: 'Dominic2' },
          { key: 'Jackson2' },
          { key: 'James2' },
          { key: 'Joel2' },
          { key: 'John2' },
          { key: 'Jillian2' },
          { key: 'Jimmy2' },
          { key: 'Julie2' },
        ]}
        renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
      />
    </View>
  );
}

//https://reactnative.dev/docs/using-a-listview
export default function FlatlistScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24 }}>Flatlist Basics</Text>
      <FlatListBasics />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
