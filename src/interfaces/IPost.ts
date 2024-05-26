import { IUser } from "./IUser";
import { IComment } from "./IComment";
import { IReaction } from "./IReaction";

export interface IPost {
  id: number;
  attributes: {
    title: string;
    content: string;
    views: string;
    createdAt: string;
    updatedAd: string;
    publishedAt: string;
    author?: {
      data: {
        id: IUser['id'];
        attributes: {
          username: IUser['username'];
          email: IUser['email'];
          provider: IUser['provider'];
          confirmed: IUser['confirmed'];
          blocked: IUser['blocked'];
          createdAt: IUser['createdAt'];
          updatedAt: IUser['updatedAd'];
        }
      }
    };
    comments?: {
      data: [
        {
          id: IComment['id'];
          attributes: {
            content: IComment['attributes']['content'];
            createdAt: IComment['attributes']['createdAt'];
            updatedAt: IComment['attributes']['updatedAt'];
            publishedAt: IComment['attributes']['publishedAd'];
          }
        }
      ]
    };
    reactions?: {
      data: [
        {
          id: IReaction['id'];
          attributes: {
            createdAt: IReaction['attributes']['createdAt'];
            updatedAt: IReaction['attributes']['updatedAt'];
            publishedAt: IReaction['attributes']['publishedAt'];
          }
        }
      ]
    }
  }
};