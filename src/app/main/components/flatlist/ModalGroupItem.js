import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import useDeviceOrientation from "@rnhooks/device-orientation";
import { isTablet, isPhone } from "react-native-device-detection";
import { View, StyleSheet, Text, Image } from "react-native";
import { Card, Title } from "react-native-paper";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ModalGroupItem = ({ product }) => {
  const navigation = useNavigation();
  console.log("navigation", navigation);
  return (
    <Card
      style={styles.container}
      onPress={() => navigation.navigate("details", { product })}
    >
      <View style={styles.infoContainer}>
        <View style={styles.itemHeader}>
          <Title>
            <Text style={{ color: "#fff" }}>{product.skuNumber}</Text>
          </Title>
        </View>
        <View style={styles.itemContent}>
          <View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 3,
                marginBottom: 2,
              }}
            >
              <View style={{ flex: 0.8 }}>
                <Text style={{ marginStart: 3 }}>
                  Net Weight:{" "}
                  <Text style={{ fontWeight: "bold" }}>
                    {product.netWeight}
                  </Text>
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ marginStart: 3 }}>
                  Gross Weight:{" "}
                  <Text style={{ fontWeight: "bold" }}>
                    {product.grossWeight}
                  </Text>
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 2,
                marginBottom: 1,
              }}
            >
              <View style={{ flex: 0.8 }}>
                <Text style={{ marginStart: 3 }}>
                  Metal Type:{" "}
                  <Text style={{ fontWeight: "bold" }}>
                    {product.metalType}
                  </Text>
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ marginStart: 3 }}>
                  Metal Purity:{" "}
                  <Text style={{ fontWeight: "bold" }}>
                    {product.metalPurity}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ marginStart: 3 }}>
                Item Category:{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {product.itemCategory}
                </Text>
              </Text>
              <Text style={{ marginStart: 3 }}>
                Item Type:{" "}
                <Text style={{ fontWeight: "bold" }}>{product.itemType}</Text>
              </Text>
              <Text style={{ marginStart: 3 }}>
                Item Status:{" "}
                <Text style={{ fontWeight: "bold", color: "#1faa00" }}>
                  {product.itemStatus}
                </Text>
              </Text>
            </View>
            <View style={{ justifyContent: "flex-end" }}>
              <Button
                type="outline"
                buttonStyle={{
                  marginStart: 5,
                  marginEnd: 5,
                  margin: 5,
                  borderColor: "#1faa00",
                  borderRadius: 10,
                }}
                icon={
                  <Icon
                    name="cart-arrow-right"
                    size={isPhone ? 30 : 35}
                    color="#1faa00"
                  />
                }
              />
            </View>
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: "100%",
    flexDirection: "row",
    margin: 3,
    marginEnd: 7,
    borderRadius: 10,
    elevation: 4,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
  },
  itemHeader: {
    flex: 1,
    backgroundColor: "#1faa00",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  itemContent: {
    flex: 3,
  },
  image: {
    height: 75,
    width: 75,
    borderRadius: 10,
  },
});

export default ModalGroupItem;
