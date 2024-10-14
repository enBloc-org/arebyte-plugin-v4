import BackButton from "~components/BackButton/BackButton"

import "./ContactPage.css"

import { useFormik } from "formik"

import Footer from "~components/Footer/Footer"

export default function ContactPage() {
  const { handleSubmit, handleChange } = useFormik({
    initialValues: {
      senderName: "",
      senderAddress: "",
      subjectTitle: "",
      emailBody: ""
    },
    onSubmit: values => {
      console.log(values)
    }
  })

  return (
    <div className="contact-page page background__stripped">
      <BackButton />
      <main>
        <form className="contact-page--form" onSubmit={handleSubmit}>
          <input
            name="senderName"
            type="text"
            placeholder="Name*"
            className="content-box shadow contact-page--form-input"
            onChange={handleChange}
          />
          <input
            name="senderAddress"
            type="email"
            placeholder="Email*"
            className="content-box shadow contact-page--form-input"
            onChange={handleChange}
          />
          <input
            name="subjectTitle"
            type="text"
            placeholder="Message Title*"
            className="content-box shadow contact-page--form-input"
            onChange={handleChange}
          />
          <textarea
            name="emailBody"
            placeholder="Type message here*"
            className="content-box shadow contact-page--form-input contact-page--form-input__long"
            onChange={handleChange}
          />
          <button className="button--primary bold text-md">
            send
          </button>
        </form>
        <Footer />
      </main>
    </div>
  )
}
