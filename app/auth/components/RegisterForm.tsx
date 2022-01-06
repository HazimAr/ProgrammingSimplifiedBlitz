import { useMutation } from "blitz"

import register from "app/auth/mutations/register"


type RegisterFormProps = {
  onSuccess?: () => void
}

export const RegisterForm = (props: RegisterFormProps) => {
  const [registerMutation] = useMutation(register)

  return (
    <div>
      <h1>Create an Account</h1>


    </div>
  )
}

export default RegisterForm
