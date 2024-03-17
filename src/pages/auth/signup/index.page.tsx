import { useRouter } from "next/router"
import Layout from "src/core/layouts/Layout"
import { SignupForm } from "@/pages/auth/signup/components/SignupForm"
import { BlitzPage, Routes } from "@blitzjs/next"

const AuthSignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Layout title="Sign Up">
      <SignupForm onSuccess={() => router.push(Routes.Home())} />
    </Layout>
  )
}

export default AuthSignupPage
