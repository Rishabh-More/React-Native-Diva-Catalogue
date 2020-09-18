import React, { useState, useEffect } from "react";
import useDeviceOrientation from "@rnhooks/device-orientation";
import { isTablet, isPhone } from "react-native-device-detection";
import Axios from "axios";
import { SafeAreaView, View, Text, StyleSheet, FlatList } from "react-native";
import { Header } from "react-native-elements";
import { Searchbar } from "react-native-paper";
import SwitchSelector from "react-native-switch-selector";
import ProductCatalogueItem from "../components/flatlist/ProductCatalogueItem";
import GroupedItem from "../components/flatlist/GroupedItem";

export default function Catalogue({ navigation }) {
  const url = `http://35.188.220.243:1337/products/115`;
  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjpbeyJjcmVhdGVkQXQiOiIyMDIwLTA0LTA2VDEyOjEyOjQ4LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIwLTA5LTEzVDA2OjM0OjE3LjAwMFoiLCJpZCI6MTQwLCJkZXZpY2VOYW1lIjoiT25lUGx1cyIsImRldmljZUlkIjoiMmRiN2FkODAiLCJicmFuZE5hbWUiOiJPbmVQbHVzIiwibW9kZWxOYW1lIjoiT05FUExVUyBBMzAwMyIsIm90cCI6NjYwMCwib3RwQ3JlYXRlZEF0IjoiMjAyMC0wOS0xM1QwNjozNDoxNy4wMDBaIiwiYXV0aEV4cGlyZUF0IjoiMjAyMC0wOS0xMlQxNzo0MTo0MS4wMDBaIiwib3RwRXhwaXJlQXQiOiIyMDIwLTA5LTEzVDA2OjQ0OjE3LjAwMFoiLCJkZWxldGVkQXQiOm51bGwsInNob3BJZCI6MTE1fV0sImlhdCI6MTU5OTk3ODg3MiwiZXhwIjoxNjAwNjM0MDcyfQ.QnxoHUXqzJDlqQ25V29jTO6WWELlO-Qn_5EbH9OeXTU";
  const [products, setProducts] = useState([]);
  const [catalogue, setCatalogue] = useState([]);
  const [cart, setCart] = useState([]);
  const [groupBy, setGroupBy] = useState("sku");
  const [refresh, updateRefresh] = useState(false);
  const [search, setSearchQuery] = useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  const onChangeGroup = (value) => setGroupBy(value);
  const addToCart = (item) => setCart(...cart, ...item);

  const orientation = useDeviceOrientation();
  const phoneColumns = isPhone && orientation == "portrait" ? 2 : 3;
  const tabletColumns = isTablet && orientation == "portrait" ? 3 : 4;

  useEffect(() => {
    async function getCatalogue() {
      const response = await Axios.get(url, {
        headers: { Authorization: token },
      });
      if (response.data.tokenExpired) {
        alert("Session has expired");
        return;
      }
      setProducts(response.data.data);
      setCatalogue(response.data.data);
    }
    getCatalogue();
  }, []);

  useEffect(() => {
    refresh ? updateRefresh(false) : updateRefresh(true);
  }, [products]);

  useEffect(() => {
    console.log("products from useEffect", groupBy);
    handleGroupBy();
  }, [groupBy]);

  const handleGroupBy = async () => {
    if (groupBy == "sku") {
      await setProducts(catalogue);
    } else if (groupBy == "design") {
      console.log("entered logic");

      var count = products.reduce((p, c) => {
        var designNumber = c.designNumber;
        if (c.imageUrl != "") {
          var imageUrl = c.imageUrl;
        } else {
          imageUrl = require("../res/assets/broken-url.png");
        }
        if (!p.hasOwnProperty(designNumber)) {
          p[designNumber] = [0, imageUrl];
        }
        p[designNumber][0] = p[designNumber][0] + 1;

        return p;
      }, {});
      console.log("item count", count);

      const data = Object.keys(count).map((k) => {
        return { designNumber: k, count: count[k][0], imageUrl: count[k][1] };
      });
      console.log("grouped data", data);
      await setProducts(data);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        placement="left"
        leftComponent={{ icon: "menu", color: "#fff" }}
        centerComponent={{ text: "Catalogue", style: { color: "#fff" } }}
        rightComponent={{
          icon: "filter-none",
          color: "#fff",
        }}
        containerStyle={{
          backgroundColor: "#1faa00",
          justifyContent: "space-evenly",
        }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          backgroundColor: "#fff",
        }}
      >
        <View>
          <SwitchSelector
            style={{ width: 150, margin: 5, borderRadius: 0 }}
            initial={0}
            onPress={(value) => {
              onChangeGroup(value);
            }}
            textColor="#1faa00"
            selectedColor="#fff"
            buttonColor="#1faa00"
            borderColor="#1faa00"
            hasPadding
            options={[
              { label: "Sku ", value: "sku" },
              { label: "Design No ", value: "design" },
            ]}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Searchbar
            onChangeText={onChangeSearch}
            value={search}
            placeholder="Search Products"
            style={{ margin: 5, borderRadius: 25 }}
          />
        </View>
      </View>
      <View
        style={{
          flex: 7,
          alignItems: "center",
          backgroundColor: "#fff",
          borderBottomLeftRadius: cart.length ? 25 : 0,
          borderBottomRightRadius: cart.length ? 25 : 0,
        }}
      >
        <FlatList
          key={[orientation, refresh]}
          numColumns={isPhone ? phoneColumns : tabletColumns}
          initialNumToRender={8}
          style={styles.flatList}
          columnWrapperStyle={styles.flatlistColums}
          data={products}
          extraData={refresh}
          keyExtractor={(item) =>
            groupBy == "sku" ? item.rfidTag : item.designNumber
          }
          renderItem={({ item }) =>
            groupBy == "sku" ? (
              <ProductCatalogueItem item={item} navigation={navigation} />
            ) : (
              <GroupedItem item={item} />
            )
          }
        />
      </View>
      {cart.length ? (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>Catalogue Cart Footer</Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#424242",
  },
  flatList: {
    marginLeft: 2,
    marginTop: 10,
    marginRight: 2,
    marginBottom: 10,
    width: "100%",
    maxHeight: "95%",
  },
  flatlistColums: {
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  textLight: {
    color: "#000",
  },
  textDark: {
    color: "#fff",
  },
  responsiveBox: {
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
