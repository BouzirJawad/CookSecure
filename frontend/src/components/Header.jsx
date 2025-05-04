import React, { useState, useEffect } from "react";
import { Profile } from "../icons/Profile";
import { Link } from "react-router-dom";

function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData) {
        setUser(userData);
        console.log("Parsed user:", userData);
      }
    } catch (err) {
      console.error("Failed to parse user:", err);
    }
  }, []);

  return (
    <div>
      <div className="flex bg-[#3d3d6b] p-5 items-center">
        <div>
          <p className="text-4xl text-white">
            <span className="text-[#00FBFF]">Cook</span>Secure
          </p>
        </div>
        <div className="ml-auto ">
          {user ? (
            <div className="flex gap-5">
              <button className="h-fit text-center place-content-around flex items-center gap-3 font-bold bg-[#00EEFF]">
                <Profile className="text-xl" />
                {user.username}
              </button>
              <button className="h-fit text-center place-content-around flex items-center gap-3 font-bold bg-[#00EEFF]">
                Log out
              </button>
            </div>
          ) : (
            <Link to={`/connect/login`}>
              <button className="h-fit text-center place-content-around flex items-center gap-3 font-bold bg-[#00EEFF]">
                <Profile className="text-xl" />
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
