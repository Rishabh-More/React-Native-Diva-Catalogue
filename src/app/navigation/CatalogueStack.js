import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Catalogue from "./../main/screens/Catalogue";
import ProductDetails from "./../main/screens/ProductDetails";

const ProductsStack = createStackNavigator();

const CatalogueStack = () => (
  <ProductsStack.Navigator headerMode="none">
    <ProductsStack.Screen name="catalogue" component={Catalogue} />
    <ProductsStack.Screen name="details" component={ProductDetails} />
  </ProductsStack.Navigator>
);

export default CatalogueStack;
