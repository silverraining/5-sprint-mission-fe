import instance from "@/pages/api/axios";

export const addComment = async (articleId, content) => {
  try {
    const response = await instance.post(`/articles/${articleId}/comments`, {
      content,
    });

    return response.data;
  } catch (err) {
    throw err;
  }
};

export const updateComment = async (
  resourceType,
  resourceId,
  commentId,
  content
) => {
  try {
    const response = await instance.patch(
      `/${resourceType.toLowerCase()}s/${resourceId}/comments/${commentId}`, // 리소스 타입에 맞는 경로
      { content }
    );
    console.log("API 요청 URL:", response.config.url); // 요청 URL 확인용
    return response.data;
  } catch (err) {
    console.error("댓글 수정 실패:", err);
    throw err;
  }
};

export const deleteComment = async (articleId, commentId) => {
  try {
    console.log(
      `Deleting comment with ID: ${commentId} from article ${articleId}`
    ); // API 호출 전에 로그 출력
    const response = await instance.delete(
      `/articles/${articleId}/comments/${commentId}`
    );
    console.log("Comment deleted successfully", response);
    return response;
  } catch (error) {
    console.error("Error deleting comment", error);
    throw error;
  }
};
