import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base"

import LogoSvg from "@assets/logo.svg"
import BackgroundImg from "@assets/background.png"
import { Input } from "@components/Input"
import { Button } from "@components/Button"
import { useNavigation } from "@react-navigation/native"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm, Controller } from "react-hook-form"
import { api } from "@services/api"
import { AppError } from "@utils/AppError"
import { Toast } from "native-base"
import { useState } from "react"
import { useAuth } from "@hooks/useAuth"


type FormDataProps = {
  name: string
  email: string
  password: string
  password_confirm: string
}

const signUpSchema = yup.object().shape({
  name: yup
    .string()
    .required("Informe o nome."),
  email: yup.
    string()
    .email("E-mail o inválido.")
    .required("Informe o e-mail."),
  password: yup
    .string()
    .required("Informe a senha.")
    .min(8, "Minimo de 8 caracteres."),
  password_confirm: yup
    .string()
    .required("Informe a senha.")
    .oneOf([yup.ref('password')], "A confirmação da senha não confere.")
})

export function SignUp() {

  const [loading, setLoading] = useState(false)

  const { signIn } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormDataProps>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirm: ""
    },
    resolver: yupResolver(signUpSchema)
  });

  const navigation = useNavigation()

  function handleBackToSignIn() {
    navigation.goBack()
  }

  async function handleSignUp({
    email,
    password,
    name
  }: FormDataProps) {
    try {
      setLoading(true)

      await api.post("/users", { name, email, password })
      await signIn(email, password);

    } catch (error) {
      setLoading(false)
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : "Erro ao cadastrar";
      return Toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
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
            Crie sua conta
          </Heading>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirme a senha"
                secureTextEntry
                onSubmitEditing={handleSubmit(handleSignUp)}
                value={value}
                returnKeyType="send"
                onChangeText={onChange}
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />

          <Button title="Criar e acessar"
            onPress={handleSubmit(handleSignUp)}
            isLoading={loading}
          />
        </Center>

        <Center
          px={10}
          flex={1}
          justifyContent="flex-end"
          mb={6}
          mt={4}
        >
          <Button
            title="Voltar para o login"
            variant="outline"
            onPress={handleBackToSignIn}
          />
        </Center>
      </VStack>
    </ScrollView>
  )
}