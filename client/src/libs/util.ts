export const cls = (...classnames: string[]) => {
  return classnames.join(" ");
};

export const getGoogleUrl = (from: string) => {
  const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;

  const options = {
    redirect_uri: process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT_URL as string,
    client_id: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID as string,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
    state: from,
  };

  const qs = new URLSearchParams(options);

  return `${rootUrl}?${qs.toString()}`;
};

export const getKakaoUrl = (from: string) => {
  const rootUrl = "https://kauth.kakao.com/oauth/authorize";

  const options = {
    redirect_uri: process.env.REACT_APP_KAKAO_OAUTH_REDIRECT_URL as string,
    client_id: process.env.REACT_APP_KAKAO_OAUTH_CLIENT_ID as string,
    response_type: "code",
    state: from,
  };

  const qs = new URLSearchParams(options);

  return `${rootUrl}?${qs.toString()}`;
};

export const getOptions = () => {
  const postCategoryOptions = [
    { value: "FREE", label: "자유" },
    { value: "ASK", label: "궁금해요" },
    { value: "FLEX", label: "자랑하기" },
    { value: "REVIEW", label: "리뷰" },
    { value: "SHARING", label: "공유" },
  ];

  return {
    postCategoryOptions,
  };
};
