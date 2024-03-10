import { useEffect, useRef, useState } from "react";
import { Alert, Keyboard, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Bottom from "@gorhom/bottom-sheet";

import { TransactionProps } from "@/components/Transaction";
import { Header } from "@/components/Header";
import { Progress } from "@/components/Progress";
import { BackButton } from "@/components/BackButton";
import { Transactions } from "@/components/Transactions";
import { Button } from "@/components/Button";
import { BottomSheet } from "@/components/BottomSheet";

import { mocks } from "@/utils/mocks";
import { currencyFormat } from "@/utils/currencyFormat";
import { Input } from "@/components/Input";
import { TransactionTypeSelect } from "@/components/TransactionTypeSelect";

type Details = {
  name: string;
  total: string;
  current: string;
  percentage: number;
  transactions: TransactionProps[];
}

export default function Details() {
  const [isLoading, setIsLoading] = useState(true);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"up" | "down">("up");
  const [goal, setGoal] = useState<Details>({} as Details);

  const routeParams = useLocalSearchParams();
  const goalId = Number(routeParams.id);

  const bottomSheetRef = useRef<Bottom>(null);
  const handleBottomSheetOpen = () => bottomSheetRef.current?.expand();
  const handleBottomSheetClose = () => {
    Keyboard.dismiss();
    bottomSheetRef.current?.snapToIndex(0);
  };

  function fetchDetails() {
    try {
      if (goalId) {
        const goal = mocks.goal;
        const transactions = mocks.transactions;

        if (!goal || !transactions) {
          return router.back();
        }

        setGoal({
          name: goal.name,
          current: currencyFormat(goal.current),
          total: currencyFormat(goal.total),
          percentage: (goal.current / goal.total) * 100,
          transactions: transactions.map((item) => ({
            ...item,
            date: item.created_at,
          })),
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleNewTransaction() {
    try {
      let amountAsNumber = Number(amount.replace(",", "."));

      if (isNaN(amountAsNumber)) {
        return Alert.alert("Erro", "Valor inválido");
      }

      if (type === "down") {
        amountAsNumber = amountAsNumber * -1;
      }

      Alert.alert("Sucesso", "Transação registrada");

      handleBottomSheetClose();

      setAmount("");
      setType("up");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchDetails();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <View className="flex-1 p-8 pt-12">
      <BackButton />

      <Header title={goal.name} subtitle={`${goal.current} de ${goal.total}`} />

      <Progress percentage={goal.percentage} />

      <Transactions transactions={goal.transactions} />

      <Button title="Nova transação" onPress={handleBottomSheetOpen} />

      <BottomSheet
        ref={bottomSheetRef}
        title="Nova transação"
        snapPoints={[0.01, 284]}
        onClose={handleBottomSheetClose}
      >
        <TransactionTypeSelect onChange={setType} selected={type} />

        <Input
          placeholder="Valor"
          keyboardType="numeric"
          onChangeText={setAmount}
          value={amount}
        />

        <Button title="Confirmar" onPress={handleNewTransaction} />
      </BottomSheet>
    </View>
  );
}