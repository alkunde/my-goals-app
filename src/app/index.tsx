import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import Bottom from "@gorhom/bottom-sheet";

import { BottomSheet } from "@/components/BottomSheet";
import { Goals, GoalsProps } from "@/components/Goals";
import { Header } from "@/components/Header";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

import { mocks } from "@/utils/mocks";

export default function Home() {
  const [goals, setGoals] = useState<GoalsProps[]>([]);

  const bottomSheetRef = useRef<Bottom>(null);
  const handleBottomSheetOpen = () => bottomSheetRef.current?.expand();
  const handleBottomSheetClose = () => bottomSheetRef.current?.snapToIndex(0);

  function handleDetails() {
    console.log('handleDetails')
  }

  function handleCreate() {
    handleBottomSheetClose();
  }

  async function fetchGoals() {
    try {
      const response = mocks.goals;
      setGoals(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <View className="flex-1 p-8">
      <Header
        title="Suas metas"
        subtitle="Poupe hoje para colher os frutos amanhã"
      />

      <Goals
        goals={goals}
        onAdd={handleBottomSheetOpen}
        onPress={handleDetails}
      />

      <BottomSheet
        ref={bottomSheetRef}
        title="Nova meta"
        snapPoints={[0.1, 284]}
        onClose={handleBottomSheetClose}
      >
        <Input
          placeholder="Nome da meta"
        />

        <Input
          placeholder="Valor"
        />

        <Button title="Criar" onPress={handleCreate} />
      </BottomSheet>
    </View>
  );
}