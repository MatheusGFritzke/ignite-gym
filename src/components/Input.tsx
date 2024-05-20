import { Input as NativeBaseInput, IInputProps, FormControl } from "native-base"

type Props = IInputProps & {
  errorMessage?: string | null
}

export function Input({ errorMessage = null, isInvalid, ...rest }: Props) {
  const invalid = !!errorMessage || isInvalid

  return (
    <FormControl isInvalid={invalid} mb={invalid ? 2 : 10.1}>
      <NativeBaseInput
        bg="gray.700"
        h={14}
        px={4}
        borderWidth={1}
        borderColor="transparent"
        fontSize="md"
        color="white"
        fontFamily="body"
        mb={!invalid ? 4 : -2}
        placeholderTextColor="gray.300"
        _focus={{
          bg: "gray.700",
          borderWidth: 1,
          borderColor: "green.500",
        }}
        isInvalid={invalid}
        _invalid={{
          borderWidth: 1,
          borderColor: "red.500",
        }}
        {...rest}
      />

      {invalid &&
        <FormControl.ErrorMessage>
          {errorMessage}
        </FormControl.ErrorMessage>
      }
    </FormControl>
  )
}