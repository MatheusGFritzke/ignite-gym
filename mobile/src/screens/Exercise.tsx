import { HStack, Heading, Icon, Text, VStack, Image, Box, ScrollView } from "native-base";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

import BodySvg from "@assets/body.svg";
import SeriesSvg from "@assets/series.svg";
import RepetitionsSvg from "@assets/repetitions.svg"
import { Button } from "@components/Button";

type RouteParamsProps = {
  exerciseId: string;
}

export function Exercise() {
  const navigation = useNavigation();

  const route = useRoute();

  const { exerciseId } = route.params as RouteParamsProps;

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <VStack flex={1}>
        <VStack
          px={8}
          bg="gray.600"
          pt={12}
        >
          <TouchableOpacity
            onPress={handleGoBack}
          >
            <Icon
              as={Feather}
              name="arrow-left"
              size={6}
              color="green.500"
            />

          </TouchableOpacity>

          <HStack
            justifyContent="space-between"
            mt={4}
            mb={8}
            alignItems="center"
          >
            <Heading
              color="gray.100"
              fontSize="lg"
              flexShrink={1}
              fontFamily="heading"
            >
              Puxada frontal
            </Heading>
            <HStack
              alignItems="center"
            >
              <BodySvg />
              <Text
                color="gray.200"
                ml={1}
                textTransform="capitalize"
              >
                Costas
              </Text>
            </HStack>
          </HStack>
        </VStack>
        <ScrollView>

        <VStack
          p={8}
        >
          <Image
            w="full"
            h={80}
            source={{ uri: "https://www.hipertrofia.org/blog/wp-content/uploads/2023/05/puxada-polia-unilateral.jpg" }}
            alt="Nome do exercicio"
            mb={3}
            resizeMode="cover"
            rounded="lg"
          />

          <Box
            bg="gray.600"
            rounded="md"
            pb={4}
            px={4}
          >
            <HStack
              alignItems="center"
              justifyContent="space-around"
              mb={6}
              mt={5}
            >
              <HStack>
                <SeriesSvg />
                <Text
                  color="gray.200"
                  ml={2}
                  textTransform="capitalize"
                >
                  3 series
                </Text>
              </HStack>
              <HStack>
                <RepetitionsSvg />
                <Text
                  color="gray.200"
                  ml={2}
                  textTransform="capitalize"
                >
                  12 repeticoes
                </Text>
              </HStack>
            </HStack>

            <Button
              title="Marcar como realizado"
            />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  );
}