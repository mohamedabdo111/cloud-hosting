export type article = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type User = {
  email: string;
  isAdmin: boolean;
  id: number;
  username: string;
};

export type Comment = {
  id?: number;
  userId: number;
  articleId: number;
  comment: string;
};
