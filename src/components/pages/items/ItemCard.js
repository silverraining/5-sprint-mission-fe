import React from "react";
import styled from "styled-components";
import defaultImg from "../../../common/images/img_default.png";
import likeHeart from "../../../common/images/like.png";

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  object-fit: cover;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: #4b5563; // gray-800
`;

const ItemName = styled.p`
  font-size: 0.875rem; // text-sm
  font-weight: 500; // medium
`;

const Price = styled.h3`
  font-size: 1rem; // text-base
  font-weight: 700; // bold
`;

const LikeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const LikeIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const LikeCount = styled.p`
  font-size: 0.75rem; // text-xs
  font-weight: 500; // medium
  color: #6b7280; // gray-600
`;

const ItemCard = ({ item }) => {
  if (!item) {
    return null;
  }

  const { images, name, price, favoriteCount } = item;
  console.log("Images:", images); // 이 부분을 추가하여 images 배열 확인

  const handleError = (e) => {
    e.target.src = defaultImg;
  };

  return (
    <CardWrapper>
      <Image
        src={images && images.length > 0 ? item.images[0] : defaultImg}
        alt={name || "No Image"}
        onError={handleError}
      />
      <InfoWrapper>
        <ItemName>{name}</ItemName>
        <Price>{price.toLocaleString("ko-KR")}원</Price>
        <LikeWrapper>
          <LikeIcon src={likeHeart} alt="Like Count" />
          <LikeCount>{favoriteCount}</LikeCount>
        </LikeWrapper>
      </InfoWrapper>
    </CardWrapper>
  );
};

export default ItemCard;
