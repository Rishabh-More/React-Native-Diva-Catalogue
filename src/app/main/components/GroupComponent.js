import React, { useEffect, useState } from "react";
import useDeviceOrientation from "@rnhooks/device-orientation";
import { isTablet, isPhone } from "react-native-device-detection";
import { View, StyleSheet, FlatList, Text, Image } from "react-native";
import Axios from "axios";
import { Card, Title, Surface } from "react-native-paper";
import ModalGroupItem from "./flatlist/ModalGroupItem";

const GroupComponent = ({ group }) => {
  const url = `http://35.188.220.243:1337/products/115`;
  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjpbeyJjcmVhdGVkQXQiOiIyMDIwLTA0LTA2VDEyOjEyOjQ4LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIwLTA5LTEzVDA2OjM0OjE3LjAwMFoiLCJpZCI6MTQwLCJkZXZpY2VOYW1lIjoiT25lUGx1cyIsImRldmljZUlkIjoiMmRiN2FkODAiLCJicmFuZE5hbWUiOiJPbmVQbHVzIiwibW9kZWxOYW1lIjoiT05FUExVUyBBMzAwMyIsIm90cCI6NjYwMCwib3RwQ3JlYXRlZEF0IjoiMjAyMC0wOS0xM1QwNjozNDoxNy4wMDBaIiwiYXV0aEV4cGlyZUF0IjoiMjAyMC0wOS0xMlQxNzo0MTo0MS4wMDBaIiwib3RwRXhwaXJlQXQiOiIyMDIwLTA5LTEzVDA2OjQ0OjE3LjAwMFoiLCJkZWxldGVkQXQiOm51bGwsInNob3BJZCI6MTE1fV0sImlhdCI6MTU5OTk3ODg3MiwiZXhwIjoxNjAwNjM0MDcyfQ.QnxoHUXqzJDlqQ25V29jTO6WWELlO-Qn_5EbH9OeXTU";
  const [store, setStore] = useState([]);
  const [grouped, setGrouped] = useState([]);
  const orientation = useDeviceOrientation();
  const phoneColumns = isPhone && orientation == "portrait" ? 1 : 2;
  const tabletColumns = isTablet && orientation == "portrait" ? 2 : 3;
  const phoneHeaderImage = isPhone && orientation == "portrait" ? 0.35 : 0.15;
  const tabHeaderImage = isTablet && orientation == "portrait" ? 0.25 : 0.2;

  useEffect(() => {
    async function getCatalogue() {
      const response = await Axios.get(url, {
        headers: { Authorization: token },
      });
      if (response.data.tokenExpired) {
        alert("Session has expired");
        return;
      }
      setStore(response.data.data);
    }
    getCatalogue();
  }, []);

  useEffect(() => {
    sortGroupItems();
  }, [store]);

  const sortGroupItems = async () => {
    const groupList = await store.filter(function (e) {
      let pattern = new RegExp(group.designNumber, "i");
      return e.designNumber.match(pattern);
    });
    console.log("grouped items", groupList);
    setGrouped(groupList);
  };

  return (
    <View style={styles.container}>
      <View style={styles.holder}>
        <View style={styles.header}>
          <Surface
            style={[
              styles.surface,
              isPhone ? { flex: phoneHeaderImage } : { flex: tabHeaderImage },
            ]}
          >
            <Image style={styles.image} source={{ uri: group.imageUrl }} />
          </Surface>
          <Card style={styles.infoCard}>
            <View style={styles.groupInfo}>
              <Text
                style={[
                  styles.groupText,
                  isTablet ? { fontSize: 34 } : { fontSize: 18 },
                ]}
              >
                Design No:{" "}
                <Text style={{ color: "#1faa00", fontWeight: "bold" }}>
                  {group.designNumber}
                </Text>
              </Text>
              <Text
                style={[
                  styles.groupText,
                  isTablet ? { fontSize: 32 } : { fontSize: 16 },
                ]}
              >
                Total:{" "}
                <Text style={{ color: "#1faa00", fontWeight: "bold" }}>
                  {group.count}
                </Text>
              </Text>
            </View>
          </Card>
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            key={[orientation]}
            style={styles.flatlist}
            columnWrapperStyle={
              phoneColumns == 1 ? null : styles.flatlistColums
            }
            numColumns={isPhone ? phoneColumns : tabletColumns}
            data={grouped}
            renderItem={({ item }) => <ModalGroupItem product={item} />}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "75%",
    backgroundColor: "#fff",
    borderRadius: 15,
  },
  holder: {
    flex: 1,
    margin: 5,
  },
  header: {
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
  },
  surface: {
    margin: 5,
    elevation: 6,
    borderRadius: 10,
  },
  image: {
    maxWidth: "100%",
    maxHeight: "100%",
    borderColor: "#1faa00",
    borderWidth: 0.5,
    resizeMode: "cover",
    borderRadius: 10,
    aspectRatio: 1,
  },
  infoCard: {
    flex: 1,
    flexDirection: "column",
    marginStart: 0,
    margin: 5,
    elevation: 6,
    borderRadius: 10,
  },
  groupInfo: {
    flex: 1,
    margin: 10,
    justifyContent: "center",
  },
  groupText: {
    fontWeight: "bold",
  },
  flatlist: {
    marginLeft: 2,
    marginTop: 5,
    marginRight: 2,
    marginBottom: 5,
    width: "100%",
    maxHeight: "95%",
  },
  flatlistColums: {
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});

export default GroupComponent;
