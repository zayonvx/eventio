import Layout from "src/core/layouts/Layout"
import form, { FORM_ERROR } from "src/core/components/Form"
import forgotPassword from "@/features/auth/mutations/forgotPassword"
import { useMutation } from "@blitzjs/rpc"
import { BlitzPage } from "@blitzjs/next"
import { Button, TextInput, Title } from "@mantine/core"
import { useForm } from "@mantine/form"
import React from "react"

const ForgotPasswordPage: BlitzPage = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)

  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  })

  let onSubmit = async (values) => {
    try {
      await forgotPasswordMutation(values)
    } catch (error: any) {
      return { [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again." }
    }
  }

  return (
    <Layout title="Forgot Your Password?">
      <Title>Forgot your password?</Title>

      {isSuccess ? (
        <div>
          <h2>Request Submitted</h2>
          <p>
            If your email is in our system, you will receive instructions to reset your password
            shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
          ></TextInput>
          <Button type="submit">Submit</Button>
        </form>
      )}
    </Layout>
  )
}

export default ForgotPasswordPage
