import { PromiseReturnType } from "blitz"
import Link from "next/link"
import { FORM_ERROR } from "@/core/components/Form"
import login from "@/features/auth/mutations/login"
import { useMutation } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import { useForm } from "@mantine/form"
import { Button, PasswordInput, TextInput, Title } from "@mantine/core"
import { Vertical } from "mantine-layout-components"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  })

  let onSubmit = async (values) => {
    try {
      const user = await loginMutation(values)
      props.onSuccess?.(user)
    } catch (error: any) {
      if (error.code === "P2002" && error.meta?.target?.includes("email")) {
        return { email: "This email is already being used" }
      } else {
        return { [FORM_ERROR]: error.toString() }
      }
    }
  }
  return (
    <Vertical>
      <Title>Login</Title>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        ></TextInput>
        <PasswordInput
          withAsterisk
          label="Password"
          placeholder=""
          {...form.getInputProps("password")}
        ></PasswordInput>
        <Button type="submit">Submit</Button>
      </form>
      <Link href={Routes.ForgotPasswordPage()}>Forgot your password?</Link>
      Or <Link href={Routes.AuthSignupPage()}>Sign Up</Link>
    </Vertical>
  )
}

export default LoginForm
