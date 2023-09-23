import React, { useEffect } from "react";
import { Link, Navigate, redirect } from "react-router-dom";
import instance from "../apis/apiConfig";
import { AuthContext } from "../context/authContext";
import { AuthContextType } from "../types/authContextTypes";

const Home = () => {
  const { auth } = React.useContext(AuthContext) as AuthContextType;

  console.log(auth);

  return (
    <div>
      <div>{auth?.nickname}hello</div>
      <Link to="/auth">로그인</Link>
      <div
        onClick={async () => {
          try {
            const res = await instance.get("/api/test");
            console.log(res);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        로그인테스트
      </div>
    </div>
  );
};

export default Home;
