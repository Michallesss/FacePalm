import { IPost } from "./IPost";
import { IUser } from "./IUser";

export interface IReaction {
  id: number;
  attributes: {
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    author: {
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
        };
      };
    };
    post: {
      data: {
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
    };
  };
};