import { IPost } from "./IPost";
import { IComment } from "./IComment";
import { IReaction } from "./IReaction";

export interface IUser {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAd: string;
  posts?: [
    {
      id: IPost['id'];
      attributes: {
        title: IPost['attributes']['title'];
        content: IPost['attributes']['content'];
        views: IPost['attributes']['views'];
        createdAt: IPost['attributes']['createdAt'];
        updatedAt: IPost['attributes']['updatedAd'];
        publishedAt: IPost['attributes']['publishedAt'];
      }
    }
  ];
  comments?: [
    {
      id: IComment['id'];
      attributes: {
        content: IComment['attributes']['content'];
        createdAt: IComment['attributes']['createdAt'];
        updatedAt: IComment['attributes']['updatedAt'];
        publishedAt: IComment['attributes']['publishedAd'];
      }
    }
  ];
  reactions?: [
    {
      id: IReaction['id'];
      attributes: {
        createdAt: IReaction['attributes']['createdAt'];
        updatedAt: IReaction['attributes']['updatedAt'];
        publishedAt: IReaction['attributes']['publishedAt'];
      }
    }
  ];
}