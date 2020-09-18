import React, { useState, useEffect } from "react";
import useDeviceOrientation from "@rnhooks/device-orientation";
import { isTablet, isPhone } from "react-native-device-detection";
import Modal from "react-native-modal";
import { ActivityIndicator, Card, Title } from "react-native-paper";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text, StyleSheet, Image } from "react-native";
import GroupComponent from "./../GroupComponent";

const phoneImageHeight = "65%";
const tabImageHeight = "70%";

const GroupedItem = ({ item }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => setModalVisible(!isModalVisible);
  const orientation = useDeviceOrientation();

  useEffect(() => {
    return () => {
      setModalVisible(false);
    };
  }, []);

  return (
    <Card
      style={[
        styles.itemContainer,
        isPhone
          ? { aspectRatio: orientation == "portrait" ? 1 : 1 }
          : { aspectRatio: orientation == "portrait" ? 1.3 : 1.5 },
      ]}
      onPress={() => toggleModal()}
    >
      <Image style={styles.image} source={{ uri: item.imageUrl }} />
      <View style={styles.infoContainer}>
        <View style={styles.textInfoContainer}>
          <Title style={{ color: "#1faa00" }}>{item.designNumber}</Title>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Quantity: {item.count}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            icon={
              <Icon
                name="cart-arrow-down"
                size={isPhone ? 30 : 40}
                color={"#1faa00"}
              />
            }
            type="clear"
          />
        </View>
      </View>

      <Modal
        style={
          isPhone && orientation == "landscape"
            ? { margin: "5%" }
            : { margin: "10%" }
        }
        isVisible={isModalVisible}
        supportedOrientations={["portrait", "landscape"]}
        avoidKeyboard={true}
        onBackdropPress={() => toggleModal()}
        useNativeDriver={true}
      >
        <GroupComponent group={item} />
      </Modal>
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
    flexDirection: "row",
    marginStart: 5,
    marginEnd: 5,
  },
  textInfoContainer: {
    flex: 1,
    marginStart: 5,
    margin: 3,
  },
  buttonContainer: {
    justifyContent: "flex-end",
  },
  overlay: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "green",
    borderRadius: 10,
    opacity: 0.5,
  },
  image: {
    margin: 5,
    borderRadius: 10,
    maxWidth: "100%",
    height: isPhone ? phoneImageHeight : tabImageHeight,
    resizeMode: "cover",
    borderWidth: 0.5,
    borderColor: "#1faa00",
  },
});

export default GroupedItem;
