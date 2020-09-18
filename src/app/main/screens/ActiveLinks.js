import React, { useState, useEffect } from "react";
import useDeviceOrientation from "@rnhooks/device-orientation";
import { isTablet, isPhone } from "react-native-device-detection";
import { SafeAreaView, View, Text, StyleSheet, FlatList } from "react-native";

export default function ActiveLinks() {
  const [group, setGroup] = useState([]);

  //groupby function
  const groupByKey = (list, key) =>
    list.reduce(
      (hash, obj) => ({
        ...hash,
        [obj[key]]: (hash[obj[key]] || []).concat(obj),
      }),
      {}
    );

  return (
    <View style={styles.container}>
      <Text>This is Active Links Screen</Text>
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
