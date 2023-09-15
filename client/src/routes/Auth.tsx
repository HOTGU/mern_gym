import axios from "axios";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Input from "../components/inputs/Input";

const Auth = () => {
  const [isSignup, setIsSignup] = React.useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues: {} });

  const onValid: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/user/signup",
        data
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

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
    </div>
  );
};

export default Auth;
