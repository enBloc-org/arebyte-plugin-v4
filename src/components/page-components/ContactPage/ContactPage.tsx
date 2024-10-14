import BackButton from "~components/BackButton/BackButton"

import "./ContactPage.css"

export default function ContactPage() {
  return (
    <div className="contact-page page background__stripped">
      <BackButton />
      <main>
        <form className="contact-page--form">
          <input
            type="text"
            placeholder="Name*"
            className="content-box shadow"
          />
          <input
            type="email"
            placeholder="Email*"
            className="content-box shadow"
          />
          <input
            type="text"
            placeholder="Message Title*"
            className="content-box shadow"
          />
          <input
            type="text"
            placeholder="Type message here*"
            className="content-box shadow"
          />
        </form>
      </main>
    </div>
  )
}
