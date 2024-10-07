import type { ContentCreator } from "~types/userTypes"

import FacebookIcon from "./FacebookIcon"
import InstagramIcon from "./InstagramIcon"
import LinkedIcon from "./LinkedIcon"
import MastodonIcon from "./MastodonIcon"
import TiktokIcon from "./TiktokIcon"
import XIcon from "./XIcon"
import YoutubeIcon from "./YoutubeIcon"

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
        <a
          key={link.id}
          href={link.link_url}
          target="_blank"
        >
          {renderIcon(link.platform)}
        </a>
      ))}
    </div>
  )
}

export default SocialLinks
