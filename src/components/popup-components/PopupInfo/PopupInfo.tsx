import { BlocksRenderer } from "@strapi/blocks-react-renderer"

import { SlimPopup } from "~types/eventTypes"

import "./PopupInfo.css"

interface PopupInfoProps {
  popup: SlimPopup
  clickHandler: () => void
}

const PopupInfo: React.FC<PopupInfoProps> = ({
  popup,
  clickHandler
}) => (
  <div className="info--container">
    <button className="info__back-button" onClick={clickHandler}>
      <svg
        width="40"
        height="16"
        viewBox="0 0 24 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24 6.27994H11.11C11.11 3.46994 11.11 0.939941 11.08 0.939941L0.839996 7.29994L11.08 13.6599C11.08 13.6599 11.09 11.1299 11.1 8.31994H23.99V6.26994L24 6.27994Z"
          fill="#0017f8"
        />
      </svg>
    </button>
    <div>
      <h2>{popup.popupInfo.work_title}</h2>
      <div className="info--details">
        {popup.popupInfo.external_link ? (
          <a href={popup.popupInfo.external_link}>
            <span>{popup.popupInfo.artist_name}</span>
          </a>
        ) : (
          <p>By {popup.popupInfo.artist_name}</p>
        )}
        <p>{popup.popupInfo.creation_date}</p>
      </div>
      <p className="creation--date">{popup.popupInfo.medium}</p>
      <div className="info--description">
        <BlocksRenderer content={popup.description} />
      </div>
    </div>
    <div className="info--buttons__container">
      <button className="info__button">ADD TO FAVOURITES</button>
      <button className="info__button">CLOSE ALL POPUPS</button>
    </div>
  </div>
)

export default PopupInfo
