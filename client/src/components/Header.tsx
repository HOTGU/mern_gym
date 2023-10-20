import React, { useContext } from "react";
import Container from "./Container";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { AuthContextType } from "../types/authContextTypes";

const Header = () => {
  const { auth } = useContext(AuthContext) as AuthContextType;

  return (
    <div className="bg-red-100 h-14">
      <Container>
        <div className="h-full flex items-center justify-between">
          <Link to="/">logo</Link>
          {auth?.loggedIn ? (
            <div className="flex gap-4 items-center">
              <div>프로등록</div>
              <div>갤러리</div>
              <Link to="/community">
                <div>커뮤니티</div>
              </Link>
              <div className="w-8 h-8 rounded-full bg-blue-200"></div>
            </div>
          ) : (
            <>로그인</>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Header;
