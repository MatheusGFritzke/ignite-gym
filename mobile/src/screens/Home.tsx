import { useCallback, useEffect, useState } from "react";
import { HomeHeader } from "@components/HomeHeader";
import { HStack, VStack, FlatList, Heading, Text, Toast } from "native-base";
import { Group } from "@components/Group";
import { ExerciseCard } from "@components/ExerciseCard";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { ExercisesDTO } from "@dtos/ExercisesDTO";
import { Loading } from "@components/Loading";

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([])
  const [groupSelected, setGroupSelected] = useState("costas");
  const [exercises, setExercises] = useState<ExercisesDTO[]>([])

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  async function fetchGroups() {
    try {

      const response = await api.get('/groups');

      setGroups(response.data);

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar os grupos musculares';

      Toast.show({
        title,
        bgColor: 'red.500',
        placement: 'top',
      });
    }
  }

  async function fetchExercisesByGroup() {
    try {
      setIsLoading(true);

      const response = await api.get(`/exercises/bygroup/${groupSelected}`);

      setExercises(response.data);

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar os exercícios';

      Toast.show({
        title,
        bgColor: 'red.500',
        placement: 'top',
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handleGroupClick(selectedGroup: string) {
    setGroupSelected(selectedGroup);
  }
  function handleOpenExerciseDetails(exerciseId: string) {
    navigation.navigate('exercise', { exerciseId });
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchExercisesByGroup();
    }, [groupSelected])
  );

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
      {
        isLoading ? <Loading /> :
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
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ExerciseCard
                  onPress={() => handleOpenExerciseDetails(item.id)}
                  data={item}
                />
              )}
              showsVerticalScrollIndicator={false}
              _contentContainerStyle={{ paddingBottom: 20 }}
            />

          </VStack>
      }
    </VStack >
  );
}