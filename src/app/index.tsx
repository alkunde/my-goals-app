import { ScrollView, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { Goal } from "@/components/Goal";
import { Header } from "@/components/Header";

import { colors } from "@/styles/colors";

export default function Home() {
  const goals = ['1'];

  return (
    <View className="flex-1 p-8">
      <Header
        title="Suas metas"
        subtitle="Poupe hoje para colher os frutos amanhã"
      />

      <ScrollView
        horizontal
        contentContainerClassName="gap-4"
        showsHorizontalScrollIndicator={false}
        className="w-full max-h-44"
      >
        <TouchableOpacity
          activeOpacity={0.7}
          className="bg-green-500 w-16 max-h-44 items-center justify-center rounded-lg"
          onPress={() => {}}
        >
          <MaterialIcons
            name="add"
            size={36}
            color={colors.white}
          />
        </TouchableOpacity>

        {goals.map((index) => (
          <Goal key={index} goal={{ name: "Computador", current: 60, total: 110 }} />
        ))}
      </ScrollView>
    </View>
  );
}