import { axiosInstans } from "@/axios/axiosInstans";

interface IComment {
  comment: string;
  articleId: number;
  userId: number;
}

export const AddCommentApi = async (data: IComment) => {
  const resposne = await axiosInstans.post("/api/comments", data);
  return resposne;
};

export const DeleteCommentApi = async (id: number) => {
  const resposne = await axiosInstans.delete(`/api/comments/${id}`);
  return resposne;
};

export const EditCommentApi = async (id: number, text: string) => {
  const response = await axiosInstans.put(`/api/comments/${id}`, {
    comment: text,
  });

  return response.data;
};

export async function getComments(token: string) {
  const response = await axiosInstans.get("/api/comments", {
    headers: {
      cookie: `authToken=${token}`,
    },
  });
  return response.data;
}
