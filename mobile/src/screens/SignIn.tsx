import { VStack, Image, Text, Center, Heading, ScrollView, Toast } from "native-base"
import { useNavigation } from "@react-navigation/native"

import { AuthNavigatorRoutesProps } from "@routes/auth.routes"

import LogoSvg from "@assets/logo.svg"
import BackgroundImg from "@assets/background.png"
import { Input } from "@components/Input"
import { Button } from "@components/Button"
import { Controller, useForm } from "react-hook-form"

import { useAuth } from "@hooks/useAuth"
import { AppError } from "@utils/AppError"
import { useState } from "react"

type FormData = {
  email: string
  password: string
}

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useAuth()
  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>()

  function handleNewAccount() {
    navigation.navigate("signUp")
  }

  async function handleSignIn({ email, password }: FormData) {
    try {
      setIsLoading(true)
      await signIn(email, password)

    } catch (error) {
      const isAppError = error instanceof AppError

      const title = isAppError ? error.message : "Erro ao fazer login, tente novamente mais tarde."

      Toast.show({
        title: title,
        bgColor: "red.500",
        placement: "top",
      })

      return setIsLoading(false)
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack
        flex={1}
      >
        <Image
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
          source={BackgroundImg}
          position="absolute"
        />
        <Center my={24}>

          <LogoSvg />

          <Text color="gray.100" fontSize="sm">
            Treine sua mente e o seu corpo
          </Text>
        </Center>
        <Center px={10}>
          <Heading
            color="gray.100"
            fontSize="xl"
            mb={6}
            fontFamily="heading"
          >
            Acesse sua conta
          </Heading>
          <Controller
            control={control}
            name="email"
            rules={{
              required: "Informe o e-mail",
            }}
            render={({ field: { onChange } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                onChangeText={onChange}
                errorMessage={errors.email?.message}
                autoCapitalize="none"
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={{
              required: "Informe a senha",
            }}
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Button title="Acessar" onPress={handleSubmit(handleSignIn)} isLoading={isLoading} />
        </Center>

        <Center px={10} flex={1} justifyContent="flex-end" mb={6}>
          <Text
            color="gray.100"
            fontSize="sm"
            mb={3}
            fontFamily="body"
          >
            Ainda não tem acesso?
          </Text>
          <Button
            title="Criar conta"
            variant="outline"
            onPress={handleNewAccount}
          />
        </Center>
      </VStack>
    </ScrollView>
  )
}