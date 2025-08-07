export interface IOAuthUser {
  user: {
    username: string;
    email: string;
    profile_img: string;
  };
}

export interface IAuthUser {
  user?: {
    id: string; //
  };
}
