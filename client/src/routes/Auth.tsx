import axios from "axios";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

import instance from "../apis/apiConfig";
import Button from "../components/Button";
import Input from "../components/inputs/Input";
import { AuthContext } from "../context/authContext";
import { AuthContextType } from "../types/authContextTypes";
import { getGoogleUrl, getKakaoUrl } from "../libs/util";
import useErrorHandler from "../hooks/useErrorHandler";

const Auth = () => {
  const errorHandler = useErrorHandler();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = React.useState(false);
  const { auth, onSignin } = React.useContext(AuthContext) as AuthContextType;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues: {} });

  let from = ((location.state as any)?.from?.pathname as string) || "/";

  const onValid: SubmitHandler<FieldValues> = async (data) => {
    try {
      if (isSignup) {
        await instance.post("/api/user/signup", data);
        setIsSignup(false);
        toast.success("회원가입 성공");
      } else {
        const res = await instance.post("/api/user/signin", data);
        if (res.status === 200) {
          const {
            data: { accessToken, userEmail, userNickname },
          } = res;
          onSignin(accessToken, userEmail, userNickname);
          toast.success("로그인 성공");
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
      errorHandler(error);
    }
  };

  if (auth?.loggedIn) {
    return <Navigate to={from} />;
  }

  return (
    <div className="flex flex-col gap-4 mx-auto max-w-sm my-20">
      <Input
        name="email"
        type="email"
        label="이메일"
        control={control}
        errors={errors}
        required
      />
      {isSignup && (
        <Input
          name="nickname"
          label="닉네임"
          control={control}
          errors={errors}
          required
        />
      )}
      <Input
        name="password"
        type="password"
        label="비밀번호"
        control={control}
        errors={errors}
        required
      />
      {isSignup && (
        <Input
          name="verifyPassword"
          type="password"
          label="비밀번호 확인"
          control={control}
          errors={errors}
          required
        />
      )}
      <Button
        onAction={handleSubmit(onValid)}
        label={isSignup ? "회원가입" : "로그인"}
      />
      <Button
        onAction={() => setIsSignup(!isSignup)}
        label={isSignup ? "계정이 있으신가요?" : "아직 회원이 아니신가요?"}
        theme="secondary"
      />
      <Link to={getGoogleUrl(from)}>
        <Button
          onAction={() => {}}
          label="구글로 로그인하기"
          theme="tertiary"
        />
      </Link>
      <Link to={getKakaoUrl(from)}>
        <Button
          onAction={() => {}}
          label="카카오로 로그인하기"
          theme="tertiary"
        />
      </Link>
    </div>
  );
};

export default Auth;
