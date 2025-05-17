import React from "react";
import { Profile } from "../icons/Profile";
import { Link } from "react-router-dom";
import { useAuth } from "../server/AuthContext"; // 👈 Use AuthContext

function Header() {
  const { user, logout } = useAuth(); // 👈 Get user & logout from context

  return (
    <div>
      <div className="flex bg-[#3d3d6b] p-5 items-center">
        <div>
          <p className="text-4xl text-white">
            <span className="text-[#00FBFF]">Cook</span>Secure
          </p>
        </div>
        <div className="ml-auto">
          {user ? (
            <div className="flex gap-5">
              <button className="h-fit text-center place-content-around flex items-center gap-3 font-bold bg-[#00EEFF] px-3 py-1 rounded">
                <Profile className="text-xl" />
                {user.username}
              </button>
              <button
                onClick={logout}
                className="h-fit text-center place-content-around flex items-center gap-3 font-bold bg-[#00EEFF] px-3 py-1 rounded"
              >
                Log out
              </button>
            </div>
          ) : (
            <Link to={`/connect/login`}>
              <button className="h-fit text-center place-content-around flex items-center gap-3 font-bold bg-[#00EEFF] px-3 py-1 rounded">
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
