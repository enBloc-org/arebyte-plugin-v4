import type { ContentCreator } from "~types/userTypes"

import FacebookIcon from "../social-media-icons/FacebookIcon"
import InstagramIcon from "../social-media-icons/InstagramIcon"
import LinkedIcon from "../social-media-icons/LinkedIcon"
import MastodonIcon from "../social-media-icons/MastodonIcon"
import TiktokIcon from "../social-media-icons/TiktokIcon"
import XIcon from "../social-media-icons/XIcon"
import YoutubeIcon from "../social-media-icons/YoutubeIcon"

import "./SocialLinks.css"

interface SocialLinksProps {
  socialMediaLinks: ContentCreator["social_media_links"]
}

const SocialLinks: React.FC<SocialLinksProps> = ({
  socialMediaLinks
}) => {
  const renderIcon = (platform: string) => {
    switch (platform) {
      case "Facebook":
        return <FacebookIcon />
      case "Instagram":
        return <InstagramIcon />
      case "LinkedIn":
        return <LinkedIcon />
      case "X":
        return <XIcon />
      case "Mastodon":
        return <MastodonIcon />
      case "Youtube":
        return <YoutubeIcon />
      case "Tiktok":
        return <TiktokIcon />
      default:
        return null
    }
  }

  return (
    <div className="social-links">
      {socialMediaLinks.map(link => (
        <a key={link.id} href={link.link_url} target="_blank">
          {renderIcon(link.platform)}
        </a>
      ))}
    </div>
  )
}

export default SocialLinks
