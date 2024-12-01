import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

import { icons } from "../../constants";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center w-52">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6 mb-1"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-sm`}
        style={{ color: color, textAlign: "center" }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#161622",
          borderTopColor: "#232533",
          height: 84,
          borderRadius: 20,
          marginHorizontal: 10,
          marginBottom: 10,
          elevation: 5, // Shadow for Android
          shadowColor: "#000", // Shadow for iOS
          shadowOpacity: 0.2,
          shadowRadius: 5,
          shadowOffset: { width: 0, height: 3 },
          paddingTop: 20,
        },
      }}
    >
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.profile}
              color={color}
              focused={focused}
              name="Profile"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.plus}
              color={color}
              focused={focused}
              name="Create"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="summary"
        options={{
          title: "Summary",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.home}
              color={color}
              focused={focused}
              name="Summary"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="record"
        options={{
          title: "Record",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.bookmark}
              color={color}
              focused={focused}
              name="Record"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
