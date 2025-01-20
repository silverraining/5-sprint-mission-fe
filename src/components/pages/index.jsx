import styled from "styled-components";
import Button from "../feature/Button";
import LandingImg from "../../common/images/homeImage/Img_home_landing.png";
import HotItemImg from "../../common/images/homeImage/Img_home_01.png";
import SearchImg from "../../common/images/homeImage/Img_home_02-1.png";
import RegisterImg from "../../common/images/homeImage/Img_home_03.png";
import HomeImg from "../..//common/images/homeImage/Img_home_04.png";
import { colors } from "../../common/theme";
import { useIsMobile, useIsTablet } from "../hooks/useSizes";

function HomePage() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  return (
    <MainContainer>
      <Landing>
        <LandingContainer>
          <Top>
            <Title>
              {isTablet ? (
                <p>일상의 모든 물건을 거래해 보세요</p>
              ) : (
                <>
                  <p>일상의 모든 물건을</p>
                  <p>거래해 보세요</p>
                </>
              )}{" "}
            </Title>
            <GoButton href="/items">구경하러가기</GoButton>
          </Top>
          <LandingImage src={LandingImg} alt="helloing panda image" />
        </LandingContainer>
      </Landing>

      {/* Hot Item Section */}
      <HomeSection>
        <Card>
          <CardImage
            src={HotItemImg}
            alt="green shirt and hearts"
            style={{ width: "50%" }}
          />
          <CardBox>
            <Badge>Hot item</Badge>
            <CardTitle>
              {isTablet || isMobile ? (
                <p>인기 상품을 확인해 보세요</p>
              ) : (
                <>
                  <p>인기 상품을</p>
                  <p>확인해 보세요</p>
                </>
              )}
            </CardTitle>
            <CardText>
              <p>가장 HOT한 중고거래 물품을</p>
              <p>판다 마켓에서 확인해 보세요</p>
            </CardText>
          </CardBox>
        </Card>
      </HomeSection>

      <HomeSection>
        <Card>
          <CardImage
            src={SearchImg}
            alt="green shirt and hearts"
            style={{ width: "50%" }}
          />
          <CardBox>
            <Badge>Search</Badge>
            <CardTitle>구매를 원하는 상품을 검색하세요</CardTitle>
            <CardText>구매하고 싶은 물품은 검색해서 쉽게 찾아보세요</CardText>
          </CardBox>
        </Card>
      </HomeSection>

      <HomeSection>
        <Card>
          <CardImage
            src={RegisterImg}
            alt="green shirt and hearts"
            style={{ width: "50%" }}
          />
          <CardBox>
            <Badge>Register</Badge>
            <CardTitle>판매를 원하는 상품을 등록하세요</CardTitle>
            <CardText>
              어떤 물건이든 판매하고 싶은 상품을 쉽게 등록하세요
            </CardText>
          </CardBox>
        </Card>
      </HomeSection>

      <HomeSection>
        <Card>
          <CardImage
            src={HomeImg}
            alt="green shirt and hearts"
            style={{ width: "50%" }}
          />
          <CardBox>
            <CardTitle>믿을 수 있는 판다마켓 중고 거래</CardTitle>
          </CardBox>
        </Card>
      </HomeSection>
    </MainContainer>
  );
}

export default HomePage;

const MainContainer = styled.div`
  margin: 0 auto;
  padding: 0 1.5rem;

  /* Desktop */
  @media (min-width: 1200px) {
    width: 70vw;
  }

  /* Tablet */
  @media (min-width: 768px) and (max-width: 1199px) {
    width: 90%;
  }

  /* Mobile */
  @media (max-width: 767px) {
    width: 100%;
    padding: 0 1rem;
  }
`;

const Landing = styled.section`
  background-color: #cfe5ff;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 2rem 0;

  @media (max-width: 767px) {
    padding: 1rem 0;
  }
`;

const LandingContainer = styled.div`
  text-align: center;
  max-width: 1200px;
  width: 100%;
`;

const Top = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${colors.gray7};
  line-height: 14px;
 text-align: left; /* 기본값: 데스크탑에서 왼쪽 정렬 */

  @media (max-width: 1024px) {
    text-align: center; /* 타블렛과 모바일에서는 가운데 정렬 */
  

  @media (max-width: 767px) {
    font-size: 1.8rem;
  }
`;

const GoButton = styled(Button)`
  margin-top: 1rem;
  border-radius: 40px;
  width: 357px;

  @media (max-width: 767px) {
    width: 80%;
  }
`;

const LandingImage = styled.img`
  width: 50%;
  max-width: 100%;
  height: 540px;
  @media (max-width: 1024px) {
  }
  @media (max-width: 767px) {
  }
`;

/* Home Section */
const HomeSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 0;

  @media (max-width: 767px) {
    padding: 2rem 0;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  @media (min-width: 1109px) {
    flex-direction: row;
  }
`;

const CardImage = styled.img`
  width: 50%;
  @media (max-width: 1109px) {
    width: 90%;
  }
`;

const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 767px) {
    text-align: center;
  }
`;

const Badge = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: #3692ff;
`;

const CardTitle = styled.h2`
  font-size: 40px;
  font-weight: bold;
  margin: 0.5rem 0;
  white-space: nowrap;
  line-height: 14px;
  @media (max-width: 1024px) {
    font-size: 32px;
  }
  @media (max-width: 767px) {
    font-size: 24px;
  }
`;

const CardText = styled.p`
  font-size: 24px;
  line-height: 10px;
  color: ${colors.gray7};

  @media (max-width: 1024px) {
    font-size: 18px;
  }
  @media (max-width: 767px) {
    font-size: 16px;
  }
`;
