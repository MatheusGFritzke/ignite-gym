import { HomeHeader } from "@components/HomeHeader";
import { VStack } from "native-base";
import { Group } from "./Group";

export function Home() {
  return (
    <VStack flex={1}>
      <HomeHeader />

      <Group 
        name="Costas"
      />
    </VStack>
  );
}