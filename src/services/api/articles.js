import instance from "@/services/api/axios";

// 게시글 목록 조회 (검색 기능 추가)
export const fetchArticles = async (
  orderBy,
  page,
  limit = 10,
  keyword = ""
) => {
  try {
    const response = await instance.get(
      `/articles?page=${page}&orderBy=${orderBy}&limit=${limit}&keyword=${encodeURIComponent(
        keyword
      )}`
    );
    return response.data; // Axios already parses the JSON response, so no need for response.json()
  } catch (error) {
    console.error("❌ API 요청 실패:", error);
    return { list: [], totalCount: 0 };
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
    // 요청 본문에 id와 articleData를 함께 보내는 방식
    const response = await instance.patch(`/articles`, {
      id: id, // id를 요청 본문에 포함
      ...articleData, // title, content 등의 데이터를 전송
    });
    return response.data;
  } catch (error) {
    console.error("Error updating article:", error);
    throw error;
  }
};

// 게시글 삭제하기
export const deleteArticle = async (id) => {
  try {
    const response = await instance.delete(`/articles/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting article:", error);
    throw error;
  }
};
