import React, { useEffect } from "react";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import instance from "../apis/apiConfig";
import { AuthContext } from "../context/authContext";
import { AuthContextType } from "../types/authContextTypes";
import useErrorHandler from "../hooks/useErrorHandler";
import { toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const errorHandler = useErrorHandler();
  const { auth, loading } = React.useContext(AuthContext) as AuthContextType;

  if (loading) {
    return <>loading</>;
  }

  return (
    <div>
      <div>{auth?.nickname}hello</div>
      <Link to="/auth">로그인</Link>
      <div
        onClick={async () => {
          try {
            const res = await instance.get("/api/test");
            toast.success("test success");
          } catch (error) {
            errorHandler(error);
          }
        }}
      >
        로그인테스트
      </div>
    </div>
  );
};

export default Home;
