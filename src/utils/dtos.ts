import { Article, Comment } from "@prisma/client";
export interface CreateUser {
  username: string;
  email: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface IUserData {
  id: number;
  username: string;
  email: string;
  isAdmin: boolean;
}

export interface IUserInComment {
  username: string;
  id: number;
}
export interface ICommens {
  id: number;
  comment: string;
  createdAt: Date;
  user: IUserInComment;
}

export interface Articles {
  articles: Article[];
}

export interface Icount {
  count: number;
}

export interface ISingeleArticle {
  id: number;
  title: string;
  discription: string;
  createdAt: Date;
  updatedAt: Date;
  comment?: ICommens[];
}

export interface AllComments {
  comments: Comment[];
}
