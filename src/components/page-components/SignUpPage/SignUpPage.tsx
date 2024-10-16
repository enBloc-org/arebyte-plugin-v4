import * as Yup from "yup"

import BackButton from "~components/BackButton/BackButton"
import Footer from "~components/Footer/Footer"

import "./SignUpPage.css"

import { Form, Formik } from "formik"

import PasswordInput from "~components/Forms/PasswordInput/PasswordInput"
import TextInput from "~components/Forms/PasswordInput/TextInput"

// import { sendToBackground } from "@plasmohq/messaging"

// import useStore from "~store/store"

const SignUpPage = () => {
  // const navigateTo = useStore.use.navigateTo()
  const initialValues = {
    username: "",
    identifier: "",
    password: "",
    passwordCheck: "",
    location: "",
    dateOfBirth: new Date()
  }

  return (
    <div className="sign-up-page page background__stripped">
      <BackButton />
      <main>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            username: Yup.string()
              .max(15, "Must be 15 characters or less")
              .required("Required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string()
              .min(8, "Password must be at least 8 characters")
              .matches(
                /[a-z]/,
                "Password must contain at least one lowercase letter"
              )
              .matches(
                /[A-Z]/,
                "Password must contain at least one uppercase letter"
              )
              .matches(
                /[0-9]/,
                "Password must contain at least one number"
              )
              .matches(
                /[^a-zA-Z0-9]/,
                "Password must contain at least one special character"
              )
              .required("Password is required"),
            passwordCheck: Yup.string()
              .oneOf([Yup.ref("password")], "Passwords must match")
              .required("Please confirm your password")
          })}
          onSubmit={() => {}}
        >
          <Form className="form--container stack">
            <TextInput
              name="username"
              placeholder="Username*"
              type="text"
            />
            <TextInput
              name="email"
              placeholder="Email*"
              type="email"
            />

            <PasswordInput name="password" placeholder="Password*" />
            <PasswordInput
              name="passwordCheck"
              placeholder="Password Check*"
            />
            <button type="submit" className="button--primary text-md">
              Submit
            </button>
          </Form>
        </Formik>
      </main>
      <Footer />
    </div>
  )
}

export default SignUpPage
