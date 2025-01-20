import styled from "styled-components";
import facebookIcon from "../../common/images/ic_facebook.png";
import twitterIcon from "../../common/images/ic_twitter.png";
import youtubeIcon from "../../common/images/ic_youtube.png";
import instagramIcon from "../../common/images/ic_instagram.png";

// 소셜 아이콘 데이터를 배열로 분리
const socialLinks = [
  { href: "https://m.facebook.com/", src: facebookIcon, alt: "facebook" },
  { href: "https://twitter.com/?lang=en", src: twitterIcon, alt: "twitter" },
  { href: "https://www.youtube.com", src: youtubeIcon, alt: "youtube" },
  { href: "https://www.instagram.com/", src: instagramIcon, alt: "instagram" },
];

const SocialLinks = () => {
  return (
    <SocialIcons>
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <SocialIcon src={link.src} alt={link.alt} />
        </a>
      ))}
    </SocialIcons>
  );
};

export default SocialLinks;

// Styled Components 정의
const SocialIcons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;

  /* Mobile 스타일 적용 */
  @media (min-width: 375px) and( max-width: 743px) {
    order: 1;
  }
`;

const SocialIcon = styled.img`
  width: 1.25rem;
  height: 1.25rem;
`;
