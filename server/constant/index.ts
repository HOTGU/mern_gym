export default {
  STATUS: {
    "200": 200,
    "401": 401,
    "403": 403,
    "500": 500,
  },
  ERROR_MESSAGE: {
    REFRESH_TOKEN: "토큰인증기간이 만료되었습니다",
    ACCESS_TOKEN: "인증되지 않은 토큰입니다",
    NO_EXISTS_ACCESS_TOKEN: "토큰이 존재하지 않습니다",
    NO_EXISTS_USER: "유저가 존재하지 않습니다",
    EXISTS_EMAIL: "이미 가입된 이메일입니다",
    UNMATCH_VERIFY_PASSWORD: "비밀번호와 비밀번호 확인이 다릅니다",
    REQUIRED_INPUT: "필수항목을 모두 입력하세요",
    SIGNIN_ERROR: "이메일과 비밀번호를 확인하세요",
    SERVER: "서버 오류 발생",
  },
};
