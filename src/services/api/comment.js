import instance from "@/services/api/axios";

export const addComment = async (id, content, type) => {
  try {
    const endpoint =
      type === "PRODUCT"
        ? `/products/${id}/comments`
        : `/articles/${id}/comments`;

    const response = await instance.post(endpoint, {
      content,
    });

    return response.data;
  } catch (err) {
    throw err;
  }
};

export const updateComment = async (commentId, content) => {
  try {
    const response = await instance.patch(`/comments/${commentId}`, {
      content,
    });
    console.log("API 요청 URL:", response.config.url);
    return response.data;
  } catch (err) {
    console.error("댓글 수정 실패:", err);
    throw err;
  }
};

export const deleteComment = async (commentId) => {
  try {
    console.log(`Deleting comment with ID: ${commentId}`);

    const response = await instance.delete(`/comments/${commentId}`);
    console.log("Comment deleted successfully", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting comment", error.response || error);
    throw error;
  }
};
