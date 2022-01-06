import { Button as ChakraButton } from "@chakra-ui/react"
import { rounded, shadow } from "app/core/styles/theme"

export default function Button({ isSecondary = false, isSubmitting = false, children, ...props }) {
  return (
    <ChakraButton
      transition="all 0.2s ease"
      position="relative"
      px="25px"
      py="10px"
      rounded={rounded}
      fontSize="16px"
      fontWeight="semibold"
      borderWidth="2px"
      borderColor="primary"
      bg={isSecondary ? "white" : "primary"}
      color={isSecondary ? "primary" : "white"}
      shadow={shadow}
      _hover={
        !isSubmitting && {
          // transform: "scale(0.95)",
          background: "transparent",
          color: "primary",
        }
      }
      _active={
        !isSubmitting && {
          transform: "scale(.95)",
          boxShadow: "none",
        }
      }
      _focus={
        !isSubmitting && {
          boxShadow: "none",
          outline: "none",
        }
      }
      {...props}
    >
      {children}
    </ChakraButton>
  )
}
