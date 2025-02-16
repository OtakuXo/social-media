export type TPost = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  likes: number;
  dislike: number;
  authorId: string;
};

export type TUser = {
  name: string;
  id: string;
};

export type TLikeDislike = {
  postId: string;
  userId: string;
  number: number;
  // disLike?: number;
};

export type TPostId = {
  postId: string;
};

export type TUserId = {
  userId: string;
};

export type TpostUserId = {
  postId: string;
  userId: string;
};

export type TAvatar = {
  userId: string;
  width: string;
  height: string;
};

export interface TButton {
  active?: boolean;
  btnText: string;
  fn: () => void;
}

export type TRequrstHandlerBtn = {
  id: string;
  btnText: string;
  url: string;
};

export type TUserCardBtn = {
  text: string;
  url: string;
};
export interface TUserCard extends TUser {
  btns: TUserCardBtn[];
}
export type TUserFriend = {
  userInCardId: string;
  userId: string;
  userName: string;
  userInCardName: string;
};
