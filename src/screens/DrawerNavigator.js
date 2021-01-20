import React, { useState, useEffect } from "react";
import { Text } from 'react-native'
import { createDrawerNavigator } from "@react-navigation/drawer";
import { CategorieStack, TreeStack, SegmentStack, ProductStack, PortStack, DashboardStack, UserStack } from './Stacks'
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../styles'
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { drawerItemsMain } from './drawerItemsMain';
import CustomDrawerContent from './CustomDrawerContent.js';
import CustomHeader from './CustomHeader';
import MenuBottom from './MenuBottom'




const Drawer = createDrawerNavigator();



// const CustomDrawerContent = (props) => {
//   return (
//     <DrawerContentScrollView {...props}>
//       <DrawerItemList {...props} />
//       <DrawerItem
//         label="Tree Follow"
//         onPress={() =>
//           props.navigation.navigate('Categories', {
//             screen: 'Categories',
//             params: {
//               screen: 'Tree Follow',
//             },
//           })
//         }
//       />
//       <DrawerItem
//         label="Type"
//         onPress={() =>
//           props.navigation.navigate('Categories', {
//             screen: 'Categories',
//             params: {
//               screen: 'Type',
//             },
//           })
//         }
//       />
//       <DrawerItem
//         label="Product"
//         onPress={() =>
//           props.navigation.navigate('Categories', {
//             screen: 'Categories',
//             params: {
//               screen: 'Product',
//             },
//           })
//         }
//       />
//       <DrawerItem
//         label="Segment"
//         onPress={() =>
//           props.navigation.navigate('Categories', {
//             screen: 'Categories',
//             params: {
//               screen: 'Segment',
//             },
//           })
//         }
//       />
//     </DrawerContentScrollView>
//   );
// }

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      // drawerContent={(props) => <CustomDrawerContent {...props} />}
      // drawerContent={(props) => (
      //   <CustomDrawerContent drawerItems={drawerItemsMain} {...props} />
      // )}
      drawerType='front'
      drawerPosition='left'
      drawerContentOptions={{
        activeTintColor: colors.danger,
        labelStyle: { fontWeight: 'bold' },
      }}
      screenOptions={
        ({ route }) => ({
          drawerIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Dashboard')
              iconName = 'bar-chart';
            else if (route.name === 'Portfolio')
              iconName = 'list';
            else if (route.name === 'User')
              iconName = 'user';
            else if (route.name === 'Categories')
              iconName = 'folder-open';
            return <FontAwesome name={iconName} size={size} color={color} />;
          },
        })
      }
    >
      <Drawer.Screen name="Dashboard" component={DashboardStack} />
      <Drawer.Screen name="Categories" component={CategorieStack} />
      {/* <Drawer.Screen name="Portfolio" component={PortStack} /> */}
      <Drawer.Screen name="MenuBottom" component={MenuBottom} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;