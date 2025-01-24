import Axios from "axios";
import React, { useState } from "react";

function PostForm() {
  const url = "";
  const [data, setData] = useState({
    title: "",
    description: "",
    price: "",
    tags: [""],
  });

  function handle(e) {}
  return (
    <>
      <form>
        <label>상품명</label>
        <input placeholder="상품명을 입력하세요" type="text"></input>
        <label>상품 소개</label>
        <input placeholder="상품 소개를 입력하세요" type="text"></input>
        <label>판매가격</label>
        <input placeholder="판매가격을 입력하세요" type="text"></input>
        <label>태그</label>
        <input placeholder="태그를 입력하세요" type="text"></input>
      </form>
    </>
  );
}

export default PostForm;
