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

// 프론트엔드 deleteComment 함수
export const deleteComment = async (resourceType, resourceId, commentId) => {
  try {
    // 로그 확인을 위해 articleId를 로그에 추가
    console.log(
      `Deleting comment with ID: ${commentId} from ${resourceType} with ID: ${resourceId}`
    );

    // resourceType, resourceId, commentId를 경로에 포함
    const response = await instance.delete(
      `/${resourceType.toLowerCase()}s/${resourceId}/comments/${commentId}`
    );
    console.log("Comment deleted successfully", response.data); // 성공 시 로그 출력
    return response.data;
  } catch (error) {
    console.error("Error deleting comment", error.response || error);
    throw error;
  }
};
