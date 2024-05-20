import { useState } from "react";
import { HomeHeader } from "@components/HomeHeader";
import { HStack, VStack, FlatList, Heading, Text } from "native-base";
import { Group } from "@components/Group";
import { ExerciseCard } from "@components/ExerciseCard";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

export function Home() {
  const [groupSelected, setGroupSelected] = useState("Costa");
  const [groups, setGroups] = useState(["Costa", "Ombro", "Peito", "Braço", "Coxa"])
  const [exercises, setExercises] = useState(["Puxada lateral", "Puxada Frontral", "Puxada alta", "Remada", "Supino enclinado", "Supino reto"])

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleGroupClick(selectedGroup: string) {
    setGroupSelected(selectedGroup);
  }

  function handleOpenExerciseDetails() {
    navigation.navigate('exercise')
  }

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            isActived={groupSelected === item}
            name={item}
            onPress={() => handleGroupClick(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
        minH={10}
      />

      <VStack flex={1} px={8}>
        <HStack
          justifyContent="space-between"
        >
          <Heading
            color="gray.200"
            fontSize="md"
            fontFamily="heading"
          >
            Exercícios
          </Heading>

          <Text
            color="gray.200"
            fontSize="sm"
          >
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <ExerciseCard
              onPress={handleOpenExerciseDetails}
              name={item}
              image="https://www.hipertrofia.org/blog/wp-content/uploads/2023/05/puxada-polia-unilateral.jpg"
              description="Teste"
            />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />

      </VStack>
    </VStack>
  );
}