import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { HStack, Heading, Image, Text, VStack, Icon } from "native-base";
import { Entypo } from "@expo/vector-icons";

type Props = TouchableOpacityProps & {
  name: string;
  description?: string;
  image?: string;
}

export function ExerciseCard({ name, description, image, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack 
        mt={4}
        bg="gray.500"
        alignItems="center"
        p={2}
        pr={4}
        rounded="md"
      >
        <Image
          mr={4}
          source={{ uri: image }}
          alt="Imagem do exercício"
          w={16}
          h={16}
          rounded="md"
          resizeMode="cover"
        />
        <VStack flex={1}>
          <Heading 
            fontSize="lg"
            color="white"
            fontFamily="heading"
          >
            {name}
          </Heading>

          <Text 
            fontSize="sm"
            color="gray.200"
            mt={1}
            numberOfLines={2}
          >
            {description}
          </Text>
        </VStack>

        <Icon 
          as={Entypo}
          name="chevron-thin-right"
          color="gray.300"
        />

      </HStack>
    </TouchableOpacity>
  )
}