import { StatusBar } from "expo-status-bar";
import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import CustomButton from "@/components/CustomButton";

const Welcome = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full items-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[108px] h-[108px] mt-[36px]"
          />

          <Text className="font-pbold text-white text-3xl">Healthy Kid</Text>
          <Text className="font-pregular text-white text-sm mt-[10px]">
            A brand of Trawello Healthcare
          </Text>

          <Image
            source={images.kids}
            className="w-[235px] h-[235px] mt-[84px]"
          />
          <Text className="text-2xl text-white font-pbold text-center mt-3 px-8">
            Track your Health Journey with{" "}
            <Text className="text-secondary-200">ease</Text>
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-12"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;
