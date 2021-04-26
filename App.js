import { StatusBar } from 'expo-status-bar';
import React,  { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, FlatList, TouchableOpacity, Button, Dimensions } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';

const Stack = createStackNavigator();

const BlockRGB = (props) => {
  return (
    <View style={{
      backgroundColor: 'rgb(' + props.red + ', ' + props.green + ', ' + props.blue + ')',
      padding: 30,
      width: props.size,
      height: props.size,
    }}>
    </View>
  );
}

function DetailsScreen({ route }) {
  const { red, green, blue } = route.params;
  var grayscale = (0.299 * red)  + (0.587 * green) + (0.114 * blue);

  return (
    <View
    style={[styles.container, { backgroundColor: `rgb(${red}, ${green}, ${blue})` },]}
  >
    <View style={{ padding: 30 }}>
      <Text style={[styles.detailText, {color: grayscale > 128 ? "black" : "white"}, ]}>Red: {red}</Text>
      <Text style={[styles.detailText, {color: grayscale > 128 ? "black" : "white"}, ]}>Green: {green}</Text>
      <Text style={[styles.detailText, {color: grayscale > 128 ? "black" : "white"}, ]}>Blue: {blue}</Text>
    </View>
  </View>

   );
}

function ColoursScreen({ navigation }) {
  const [colorArray, setColorArray] = useState([]);

  const screenWidth = Dimensions.get("window").width;
  const numColumns = 4;
  const tileSize = screenWidth / numColumns;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={buttonAddColour} title="Add Colour" />
    })
  })

  function renderItem({ item }) {

    return (
      <TouchableOpacity onPress={() => {navigation.navigate("Details List", {...item})}}>
        <BlockRGB red={item.red} green={item.green} blue={item.blue} size={tileSize} />
      </TouchableOpacity>
    );
  }

  function buttonAddColour() {
    setColorArray(colorArray => [...colorArray, {red: Math.floor(Math.random() * 256), green: Math.floor(Math.random() * 256), blue: Math.floor(Math.random() * 256), id: colorArray.length.toString()}])
  }

  function buttonResetColour() {
    setColorArray([])
  }
 
   return (
    <View style={styles.container}>
      <FlatList style={styles.list} data={colorArray} renderItem={renderItem} numColumns={numColumns} />

      <TouchableOpacity onPress={buttonResetColour} style={styles.button}>
        <Text style={styles.buttonText}>
          Reset Colour
        </Text>
      </TouchableOpacity>
    </View>
   );
 }

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Colour List" component={ColoursScreen} />
        <Stack.Screen name="Details List" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    width: "100%",
    height: "90%",
  }, 
  button: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  detailText: {
    fontSize: 24,
    marginBottom: 20,
  },
});
