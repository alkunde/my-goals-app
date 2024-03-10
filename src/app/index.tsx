import { useEffect, useRef, useState } from "react";
import { Alert, Keyboard, View } from "react-native";
import Bottom from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import dayjs from "dayjs";

import { BottomSheet } from "@/components/BottomSheet";
import { Goals, GoalsProps } from "@/components/Goals";
import { Header } from "@/components/Header";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Transactions, TransactionsProps } from "@/components/Transactions";

import { mocks } from "@/utils/mocks";

export default function Home() {
  const [goals, setGoals] = useState<GoalsProps[]>([]);
  const [transactions, setTransactions] = useState<TransactionsProps>([]);
  const [name, setName] = useState("");
  const [total, setTotal] = useState("");
  const [loading, setLoading] = useState(true);

  const bottomSheetRef = useRef<Bottom>(null);
  const handleBottomSheetOpen = () => bottomSheetRef.current?.expand();
  const handleBottomSheetClose = () => {
    Keyboard.dismiss();
    bottomSheetRef.current?.snapToIndex(0);
  };

  function handleDetails(id: string) {
    router.navigate("/details/" + id);
  }

  async function handleCreate() {
    try {
      const totalAsNumber = Number(total.toString().replace(",", "."));

      if (isNaN(totalAsNumber)) {
        return Alert.alert("Erro", "Valor inválido");
      }

      handleBottomSheetClose();
      Alert.alert("Sucesso", "Meta cadastrada");

      setName("");
      setTotal("");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível cadastrar");
      console.log(error);
    }
  }

  async function fetchGoals() {
    try {
      setLoading(true);
      const response = mocks.goals;
      setGoals(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchTransactions() {
    try {
      const response = mocks.transactions;

      setTransactions(
        response.map((item) => ({
          ...item,
          date: item.created_at,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchGoals();
    fetchTransactions();
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

      <Transactions transactions={transactions} />

      <BottomSheet
        ref={bottomSheetRef}
        title="Nova meta"
        snapPoints={[0.1, 284]}
        onClose={handleBottomSheetClose}
      >
        <Input
          placeholder="Nome da meta"
          onChangeText={setName}
          value={name}
        />

        <Input
          placeholder="Valor"
          keyboardType="numeric"
          onChangeText={setTotal}
          value={total}
        />

        <Button title="Criar" onPress={handleCreate} />
      </BottomSheet>
    </View>
  );
}