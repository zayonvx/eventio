import { LabeledTextField } from "@/core/components/LabeledTextField"
import form, { Form, FORM_ERROR } from "@/core/components/Form"
import signup from "@/features/auth/mutations/signup"
import { Signup } from "@/features/auth/schemas"
import { useMutation } from "@blitzjs/rpc"
import { Button, PasswordInput, TextInput, Title } from "@mantine/core"
import { useForm } from "@mantine/form"
import React from "react"
import { Vertical } from "mantine-layout-components"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  let onSubmit = async (values) => {
    try {
      await signupMutation(values)
      props.onSuccess?.()
    } catch (error: any) {
      if (error.code === "P2002" && error.meta?.target?.includes("email")) {
        return { email: "This email is already being used" }
      } else {
        return { [FORM_ERROR]: error.toString() }
      }
    }
  }

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  })

  return (
    <Vertical>
      <Title>Create an Account</Title>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        ></TextInput>
        <TextInput
          withAsterisk
          label="Name"
          placeholder="Your name here..."
          {...form.getInputProps("name")}
        ></TextInput>
        <PasswordInput
          withAsterisk
          label="Password"
          placeholder=""
          {...form.getInputProps("password")}
        ></PasswordInput>
        <Button type="submit">Submit</Button>
      </form>
    </Vertical>
  )
}

export default SignupForm
