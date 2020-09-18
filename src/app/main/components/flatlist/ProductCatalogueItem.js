import React from "react";
import useDeviceOrientation from "@rnhooks/device-orientation";
import { isTablet, isPhone } from "react-native-device-detection";
import { Card, Title } from "react-native-paper";
import { Button } from "react-native-elements";
import { View, Text, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const tabImageHeight = "60%";
const phoneImageHeight = "40%";

const ProductCatalogueItem = ({ item, navigation }) => {
  //console.log("catalogue", item);
  const orientation = useDeviceOrientation();

  return (
    <Card
      style={[
        styles.itemContainer,
        isPhone
          ? { aspectRatio: orientation == "portrait" ? 0.9 : 1 }
          : { aspectRatio: orientation == "portrait" ? 0.9 : 0.95 },
      ]}
      onPress={() => navigation.navigate("details", { item })}
    >
      <Image
        style={styles.image}
        source={
          item.imageUrl == "" //If url is blank
            ? require("../../res/assets/broken-url.png") //Show default broken image
            : { uri: item.imageUrl } //otherwise image from url
        }
      />
      <Title style={styles.title}>{item.rfidTag}</Title>
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.text}>
            <Text style={{ fontWeight: "bold" }}>Design No: </Text>
            {item.designNumber}
          </Text>
          <Text style={styles.text}>
            <Text style={{ fontWeight: "bold" }}>Item Category: </Text>
            {item.itemCategory}
          </Text>
        </View>
        <View style={styles.infoHolder}>
          <View style={{ flex: 1 }}>
            <Text style={styles.text}>
              <Text style={{ fontWeight: "bold" }}>Item Type: </Text>
              {item.itemType}
            </Text>
            <Text style={styles.text}>
              <Text style={{ fontWeight: "bold" }}>Gross Wt: </Text>
              {item.grossWeight}
            </Text>
            <Text style={styles.text}>
              <Text style={{ fontWeight: "bold" }}>Net Wt: </Text>
              {item.netWeight}
            </Text>
            <Text style={{ marginLeft: 5, fontWeight: "bold" }}>
              Item Status:{" "}
              <Text
                style={{
                  color: item.itemStatus == "INSTOCK" ? "#1faa00" : "grey",
                }}
              >
                {item.itemStatus}
              </Text>
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              type="outline"
              icon={<Icon name="plus" size={20} color="#1faa00" />}
              buttonStyle={{ borderColor: "#1faa00" }}
              containerStyle={{ margin: 5, marginBottom: 5, width: 50 }}
              //onPress={someProp("item 1")}
            />
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    height: "100%",
    margin: 5,
    borderRadius: 10,
    elevation: 3,
  },
  infoContainer: {
    flex: 1,
    margin: 5,
  },
  infoHolder: {
    flex: 1,
    flexDirection: "row",
  },
  buttonContainer: {
    flexDirection: "column-reverse",
    alignItems: "flex-end",
    backgroundColor: "#fff",
  },
  title: {
    marginStart: 10,
    marginEnd: 10,
    color: "#1faa00",
  },
  text: {
    marginLeft: 5,
  },
  image: {
    margin: 3,
    borderRadius: 10,
    maxWidth: "100%",
    height: isPhone ? phoneImageHeight : tabImageHeight,
    resizeMode: "cover",
  },
});
export default ProductCatalogueItem;
