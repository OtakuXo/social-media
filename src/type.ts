// post
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

export type TLikeDislike = {
  postId: string;
  userId: string;
  number: number;
  // disLike?: number;
};

export type TPostId = {
  postId: string;
};

export type TComment = {
   id: string;
   authorId: string;
   comment: string;
   postId: string;
}
// post end
  
// user
export type TUser = {
  name: string;
  id: string;
};

export type TFriend = {
   friendId: string;
   friendName: string;
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
// user end

// components
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

export type TOption = {
   src: string;
   text: string;
}
