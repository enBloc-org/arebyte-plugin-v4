import * as Yup from "yup"

import BackButton from "~components/BackButton/BackButton"
import Footer from "~components/Footer/Footer"
import EyeIcon from "~components/Icons/EyeIcon"
import SlashedEyeIcon from "~components/Icons/SlashedEyeIcon"

import "./SignUpPage.css"

import { ErrorMessage, Field, Form, Formik } from "formik"
import { useState } from "react"

// import { sendToBackground } from "@plasmohq/messaging"

// import useStore from "~store/store"

const SignUpPage = () => {
  // const navigateTo = useStore.use.navigateTo()
  const [showPassword, setShowPassword] = useState(false)
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
              .required("Required")
          })}
          onSubmit={() => {}}
        >
          <Form className="login--form">
            <Field
              name="username"
              type="text"
              placeholder="Username*"
              className="content-box shadow login--input"
            />
            <ErrorMessage name="username" />
            <Field
              name="email"
              type="text"
              placeholder="Email*"
              className="content-box shadow login--input"
            />
            <ErrorMessage name="email" />
            <div className="password-input-container">
              <Field
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password*"
                className="content-box shadow login--input"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <SlashedEyeIcon width="16px" height="16px" />
                ) : (
                  <EyeIcon width="16px" height="16px" />
                )}
              </button>
            </div>

            <ErrorMessage name="email" />
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
