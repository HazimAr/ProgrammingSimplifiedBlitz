import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import {
  Box,
  Center,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react"
import Button from "@components/button"
import NextChakraLink from "@components/nextChakraLink"
import { rounded } from "@styles/theme"
import { Routes, useMutation } from "blitz"
import { Field, Form, Formik } from "formik"
import router from "next/router"
import { useState } from "react"
import { FaUserCircle } from "react-icons/fa"
import * as Yup from "yup"
import register from "app/auth/mutations/register"

function Register() {
  const toast = useToast()
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  const [registerMutation] = useMutation(register)
  return (
    <Center minH="100vh">
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={async (values) => {
          try {
            await registerMutation(values)
            // router.push(Routes.Dashboard())
          } catch (error: any) {
            // if (error.code === "P2002" && error.meta?.target?.includes("email")) {
            //   // This error comes from Prisma
            //   return { email: "This email is already being used" }
            // } else {
            return toast({
              title: "Error",
              description: error.toString(),
              status: "error",
              duration: 5000,
              isClosable: true,
            })

            // }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form style={{ width: "100%" }}>
            <VStack align="center" justify="center">
              <Card>
                <Heading textAlign="center">Register</Heading>
                <Stack>
                  <Box>
                    <Text>First Name: </Text>
                    <Field name="firstName">
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.firstName && form.touched.firstName}>
                          <InputGroup>
                            <InputLeftElement pointerEvents="none">
                              <FaUserCircle />
                            </InputLeftElement>
                            <Input {...field} type="firstName" id="firstName" placeholder="Hazim" />
                          </InputGroup>
                          <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <Box>
                    <Text>Last Name: </Text>
                    <Field name="lastName">
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.lastName && form.touched.lastName}>
                          <InputGroup>
                            <InputLeftElement pointerEvents="none">
                              <FaUserCircle />
                            </InputLeftElement>
                            <Input {...field} type="lastName" id="lastName" placeholder="Arafa" />
                          </InputGroup>
                          <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <Box>
                    <Text>Email: </Text>
                    <Field name="email">
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.email && form.touched.email}>
                          <InputGroup>
                            <InputLeftElement pointerEvents="none">
                              <EmailIcon />
                            </InputLeftElement>

                            <Input
                              {...field}
                              type="email"
                              id="email"
                              placeholder="email@domain.com"
                            />
                          </InputGroup>
                          <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <Box>
                    <Text>Password: </Text>
                    <Field name="password">
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.password && form.touched.password}>
                          <InputGroup>
                            <InputLeftElement pointerEvents="none">
                              <LockIcon />
                            </InputLeftElement>

                            <Input
                              {...field}
                              pr="50px"
                              id="password"
                              type={show ? "text" : "password"}
                              placeholder="********"
                            />
                            <InputRightElement>
                              <Center
                                aria-label="toggle password"
                                _hover={{
                                  cursor: "pointer",
                                }}
                                onClick={handleClick}
                              >
                                {show ? <ViewOffIcon /> : <ViewIcon />}
                              </Center>
                            </InputRightElement>
                          </InputGroup>
                          <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                </Stack>
                <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting} w="100%">
                  Register
                </Button>

                <Text textAlign="center">
                  Already have an account?{" "}
                  <NextChakraLink href="/login" color="primary">
                    Login
                  </NextChakraLink>
                </Text>
              </Card>
            </VStack>
          </Form>
        )}
      </Formik>
    </Center>
  )
}

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
}

const LoginSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Email is not valid").required("Email Required"),
  password: Yup.string()
    .required("Password Required")
    .min(8, "Must be at least 8 characters in length")
    .matches(/.*[A-Z].*/, "One uppercase character")
    .matches(/.*[a-z].*/, "One lowercase character")
    .matches(/.*\d.*/, "One number")
    .matches(/.*[`~<>?,./!@#$%^&*()\-_+=\"'|{}\[\];:\\].*/, "One special character"),
})

export function Card({ children }) {
  return (
    <Stack
      spacing="40px"
      maxW="400px"
      w="100%"
      boxSizing="border-box"
      p="25px"
      bg="dashboard.input"
      rounded={rounded}
      boxShadow="xl"
      transition="all ease-in-out 0.2s"
    >
      {children}
    </Stack>
  )
}

Register.redirectAuthenticatedTo = "/"
export default Register
