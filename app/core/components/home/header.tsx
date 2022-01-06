import { HStack, Image } from "@chakra-ui/react"
import Container from "app/core/components/container"
import ContainerInside from "app/core/components/containerInside"
import Button from "app/core/components/home/button"
import NextChakraLink from "app/core/components/nextChakraLink"

import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Suspense } from "react"

export default function Header() {
  return (
    <Container shadow="md" position="sticky" top="0" py="16px" zIndex="10" bg="white">
      <ContainerInside>
        <HStack spacing="0" justify="space-between">
          <Image boxSize="50px" src="/logo_secondary.png" alt="dark logo" rounded="full" />
          <HStack spacing={{ base: "10px", md: "25px" }}>
            <NextChakraLink href="/discord" isExternal>
              Discord
            </NextChakraLink>
            <NextChakraLink href="/dashboard/courses">Courses</NextChakraLink>
            <Suspense fallback="Loading...">
              <UserInfo />
            </Suspense>
          </HStack>
        </HStack>
      </ContainerInside>
    </Container>
  )
}

function UserInfo() {
  const currentUser = useCurrentUser()

  return (
    <>
      {currentUser ? (
        <NextChakraLink href="/dashboard">

          Dashboard
        </NextChakraLink>
      ) : (
        <>
          <NextChakraLink href="/login">Login</NextChakraLink>
          <NextChakraLink href="/register">
            <Button _hover={{ cursor: "pointer" }}>Register</Button>
          </NextChakraLink>
        </>
      )}
    </>
  )
}
