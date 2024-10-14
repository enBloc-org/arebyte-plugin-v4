import BackButton from "~components/BackButton/BackButton"

import "./ContactPage.css"

import Footer from "~components/Footer/Footer"

export default function ContactPage() {
  return (
    <div className="contact-page page background__stripped">
      <BackButton />
      <main>
        <form className="contact-page--form">
          <input
            type="text"
            placeholder="Name*"
            className="content-box shadow contact-page--form-input"
          />
          <input
            type="email"
            placeholder="Email*"
            className="content-box shadow contact-page--form-input"
          />
          <input
            type="text"
            placeholder="Message Title*"
            className="content-box shadow contact-page--form-input"
          />
          <textarea
            placeholder="Type message here*"
            className="content-box shadow contact-page--form-input contact-page--form-input__long"
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
