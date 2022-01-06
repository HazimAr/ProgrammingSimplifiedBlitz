import { Heading, Stack } from "@chakra-ui/react"
import { rounded } from "app/core/styles/theme"

export default function Card(props) {
  return (
    <Stack w="250px" p="40px" bg="white" rounded={rounded} spacing="40px" {...props}>
      <Heading size="md">{props.title}</Heading>
      {/* @ts-ignore */}
      <Text color={props.textColorB ? props.textColorB : "#c4c4c4"}>{props.text}</Text>
    </Stack>
  )
}
