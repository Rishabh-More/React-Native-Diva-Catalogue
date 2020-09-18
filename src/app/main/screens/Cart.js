import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, StyleSheet, FlatList } from "react-native";
import SwitchSelector from "react-native-switch-selector";

export default function Cart() {
  const [gender, setGender] = useState("");
  return (
    <View style={styles.container}>
      <Text>This is Cart Screen</Text>
      <SwitchSelector
        style={{ width: 150 }}
        initial={0}
        onPress={(value) => setGender(value)}
        textColor="#7a44cf" //'#7a44cf'
        selectedColor="#fff"
        buttonColor="#7a44cf"
        borderColor="#7a44cf"
        hasPadding
        options={[
          { label: "Female ", value: "f" }, //images.feminino = require('./path_to/assets/img/feminino.png')
          { label: "Male ", value: "m" }, //images.masculino = require('./path_to/assets/img/masculino.png')
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
