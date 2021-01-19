import React from "react";
import { Text } from 'react-native'
import { createDrawerNavigator } from "@react-navigation/drawer";
import { CategorieStack, TreeStack, SegmentStack, ProductStack, PortStack, DashboardStack, UserStack } from './Stacks'
import { Menutop_Categories } from "./MenuTop"

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Dashboard" component={DashboardStack} />
      <Drawer.Screen name="Categories" component={Menutop_Categories} />
      {/* <Drawer.Screen name="Tree" component={TreeStack} />
      <Drawer.Screen name="Segment" component={SegmentStack} />
      <Drawer.Screen name="Product" component={ProductStack} />
      <Drawer.Screen name="Portforlio" component={PortStack} /> */}
      <Drawer.Screen name="User" component={UserStack} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;