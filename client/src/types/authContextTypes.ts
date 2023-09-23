export type AuthType = {
  loggedIn: boolean;
  email: string;
  nickname: string;
};

export type AuthContextType = {
  auth: AuthType | null;
  onSignin: (
    accessToken: string,
    userEmail: string,
    userNickName: string
  ) => void;
  onSignout: () => void;
  loading: boolean;
};
