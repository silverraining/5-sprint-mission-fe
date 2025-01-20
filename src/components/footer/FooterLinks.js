import styled from "styled-components";

const FooterLinks = () => {
  return (
    <LinkGroup>
      <FooterLink href="privacy_policy.html" target="_blank">
        Privacy Policy
      </FooterLink>
      <FooterLink href="FAQ.html" target="_blank">
        FAQ
      </FooterLink>
    </LinkGroup>
  );
};

export default FooterLinks;

const LinkGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  white-space: nowrap;

  @media (min-width: 375px) and( max-width: 743px) {
    order: 0;
  }
`;

const FooterLink = styled.a`
  color: #e5e7eb;
  font-size: 1rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
