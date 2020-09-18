import React, { useState, useEffect } from "react";
import useDeviceOrientation from "@rnhooks/device-orientation";
import { isTablet, isPhone } from "react-native-device-detection";
import { SafeAreaView, View, Text, StyleSheet, FlatList } from "react-native";
import { Header } from "react-native-elements";
import { Button } from "react-native-elements";

export default function ProductDetails({ navigation, route }) {
  console.log("received props", route.params.item);
  return (
    <SafeAreaView style={styles.container}>
      <Text>This is Product Details Screen</Text>
      <Header
        placement="left"
        leftComponent={{ icon: "menu", color: "#fff" }}
        centerComponent={{ text: "Catalogue", style: { color: "#fff" } }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
