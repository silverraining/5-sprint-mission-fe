import instance from "@/pages/api/axios";

export const addComment = async (articleId, content) => {
  try {
    console.log("🔵 댓글 등록 요청:", { articleId, content }); // 요청 데이터 확인
    const response = await instance.post(`/articles/${articleId}/comments`, {
      content,
    });
    console.log("🟢 댓글 등록 성공:", response.data); // 응답 데이터 확인
    return response.data;
  } catch (err) {
    console.error(
      "🔴 댓글 등록 실패:",
      err.response ? err.response.data : err.message
    );
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
export { addComment, updateComment, deleteComment };
