import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import { supabase } from "@/lib/supabase";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    setIsSubmitting(true);
    try {
      const { email, password } = form;

      // Ensure all fields are filled
      if (!email || !password) {
        alert("Please fill all fields.");
        return;
      }

      // Supabase Sign-Up
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { username: form.username } },
      });

      if (error) {
        alert(error.message);
      } else {
        alert("Sign-up successful! Please check your email for confirmation.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView edges={["left", "right"]} className="h-full bg-white mx-0">
      <ScrollView>
        <View className="w-full">
          <View className="bg-primary px-4 min-h-[35vh]">
            <Image
              source={images.logo}
              resizeMode="contain"
              className="w-[108px] h-[108px] mt-[120px]"
            />
            <Text className="font-psemibold text-white text-2xl">
              Signup to Healthy Kid
            </Text>
          </View>
          <View className="px-4 w-full">
            <FormField
              title="User Name"
              value={form.username}
              handleChangeText={(e: any) => setForm({ ...form, username: e })}
              otherStyles="mt-[50px]"
              placeholder="Your Name"
            />
            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e: any) => setForm({ ...form, email: e })}
              otherStyles="mt-7"
              keyboardType="email-address"
              placeholder="example@xyz.com"
            />
            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e: any) => setForm({ ...form, password: e })}
              otherStyles="mt-7"
              placeholder="*Minimum 8 characters"
            />

            <CustomButton
              title="Sign Up"
              handlePress={submit}
              containerStyles="mt-7 bg-[#C0E863]"
              isLoading={isSubmitting}
            />

            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-black-100 font-pregular">
                Have an account already?{" "}
                <Link href="/sign-in">
                  <Text className="text-[#8ECB00] font-psemibold">Sign in</Text>
                </Link>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
