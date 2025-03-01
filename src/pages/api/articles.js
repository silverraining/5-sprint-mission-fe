import instance from "@/lib/api/axios";

// 게시글 목록 조회
export const fetchArticles = async (order = "createdAt") => {
  const query = `orderBy=${order}`;
  console.log("✅ fetchArticles 함수 실행됨");

  try {
    const response = await instance.get(`/articles?${query}`);
    console.log("📌 fetchArticles response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching articles:", error);
    throw error;
  }
};

// 특정 게시글 조회
export const fetchArticleById = async (id) => {
  try {
    const response = await instance.get(`/articles/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error;
  }
};
//특정 게시글의 댓글목록 조회
export const fetchArticleComments = async (articleId) => {
  const response = await instance.get(
    `${API_URL}/articles/${articleId}/comments`
  );
  return response.data;
};

//게시글 생성
export const createArticle = async ({ title, content, username, image }) => {
  const response = await instance.post("/articles", {
    title,
    content,
    username,
    image,
  });
  return response.data;
};

// 게시글 업데이트하기
export const updateArticle = async (id, articleData) => {
  try {
    const response = await instance.put(`/articles/${id}`, articleData);
    return response.data;
  } catch (error) {
    console.error("Error updating article:", error);
    throw error;
  }
};

// // 게시글 삭제하기
// export const deleteArticle = async (id) => {
//   try {
//     const response = await instance.delete(`/articles/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error deleting article:', error);
//     throw error;
//   }
// };
