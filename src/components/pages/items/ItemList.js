import React from "react";
import ItemCard from "./ItemCard";
import styled from "styled-components";

const ItemListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  width: 100%;
  margin-top: 1.5rem;
  margin-bottom: 2.6875rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const ItemList = ({ data }) => {
  if (!data || data.length === 0) return <p>No items available</p>;

  return (
    <ItemListWrapper>
      {data.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </ItemListWrapper>
  );
};

export default ItemList;
