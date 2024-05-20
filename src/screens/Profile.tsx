import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Center, ScrollView, VStack, Skeleton, Text, Heading, useToast } from "native-base";
import { useState } from "react";
import { Alert, TouchableOpacity } from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';

import { FileInfo } from "expo-file-system";


const imageSize = 33;

export function Profile() {

  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState('');

  const toast = useToast();

  async function handleUserPhotoSelect() {

    try {
      setPhotoIsLoading(true)

      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
        base64: true,
      });

      if (!photoSelected.canceled) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri) as FileInfo;
        
        if(photoInfo.size && (photoInfo.size / 1024 / 1024) > 5) {
          return toast.show({
            title: "Imagem muito grande!",
            description: "Escolha uma imagem menor que 5MB",
            placement: "top",
            bgColor: "red.500",
          })
        }

        setUserPhoto(photoSelected.assets[0].uri);
      }

    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false)

    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView>
        <Center
          mt={6}
          px={10}
        >
          {
            photoIsLoading ?
              <Skeleton
                w={imageSize}
                h={imageSize}
                rounded="full"
                startColor="gray.600"
                endColor="gray.400"
              />
              :
              <UserPhoto
                source={{ uri: userPhoto }}
                alt="Foto do usuario"
                size={imageSize}
              />
          }
          <TouchableOpacity
            onPress={handleUserPhotoSelect}
          >
            <Text
              color="green.500"
              fontWeight="bold"
              fontSize="md"
              mt={2}
              mb={8}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input
            bg="gray.600"
            placeholder="Nome"
          />

          <Input
            bg="gray.600"
            placeholder="E-mail"
            value="matheusfritzkepaypal@gmail.com"
            isDisabled
          />
        </Center>

        <VStack
          px={10}
          mt={12}
          mb={9}
        >
          <Heading
            color="gray.200"
            fontSize="md"
            mb={2}
          >
            Alterar senha
          </Heading>

          <Input
            bg="gray.600"
            placeholder="Senha antiga"
            secureTextEntry
          />

          <Input
            bg="gray.600"
            placeholder="Nova senha"
            secureTextEntry
          />

          <Input
            bg="gray.600"
            placeholder="Confirme a nova senha"
            secureTextEntry
          />

          <Button
            title="Atualizar"
            mt={4}
          />

        </VStack>
      </ScrollView>
    </VStack>
  );
}