import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Catalogue from "./../main/screens/Catalogue";
import Cart from "./../main/screens/Cart";
import CatalogueStack from "./CatalogueStack";
import ActiveLinks from "./../main/screens/ActiveLinks";

const Drawer = createDrawerNavigator();

const NavigationDrawer = () => (
  <Drawer.Navigator
    //drawerContent={(props) => <CustomDrawerUI {...props} />}
    hideStatusBar={true}
  >
    <Drawer.Screen name="Home" component={CatalogueStack} />
    <Drawer.Screen name="Cart" component={Cart} />
    <Drawer.Screen name="Links" component={ActiveLinks} />
  </Drawer.Navigator>
);

export default NavigationDrawer;
