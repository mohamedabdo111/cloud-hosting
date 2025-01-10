import { axiosInstans } from "@/axios/axiosInstans";
import { Article } from "@prisma/client";

export async function getArticles(
  page: string | undefined
): Promise<Article[]> {
  const response = await axiosInstans.get(`/api/articles?page=${page}`);

  if (response.status !== 200) throw new Error("Failed to fetch data");

  return response.data.articles;
}

export async function getArticlesCount(): Promise<number> {
  const response = await axiosInstans.get("/api/articles");

  return response.data.count;
}

export async function searchArticles(search: string): Promise<Article[]> {
  const response = await axiosInstans.get(
    `/api/articles/search?search=${search}`
  );

  return response.data;
}

export async function getSingleArticle(id: string): Promise<Article> {
  const response = await axiosInstans.get(`/api/articles/${id}`);

  return response.data;
}

export async function deleteArticleApi(id: number) {
  const response = await axiosInstans.delete(`/api/articles/${id}`);

  return response.data;
}

export async function EditArticleApi(
  id: number,
  data: { title: string; discription: string }
) {
  const response = await axiosInstans.put(`/api/articles/${id}`, data);
  return response.data;
}

export async function AddArticleApi(data: {
  title: string;
  discription: string;
}) {
  const response = await axiosInstans.post("/api/articles", data);
  return response.data;
}
