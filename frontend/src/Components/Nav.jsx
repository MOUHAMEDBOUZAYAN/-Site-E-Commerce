import React, { useState } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const [menu, setMenu] = useState("shop");

  return (
    <div className="flex justify-around p-4 shadow-md bg-white">
      <ul className="flex items-center gap-12 text-gray-700 text-lg font-medium">
        <li onClick={() => setMenu("shop")} className="cursor-pointer">
          <Link to="/" className="no-underline">
            Shop
          </Link>
          {menu === "shop" && <hr className="border-none w-4/5 h-1 rounded-md bg-red-500" />}
        </li>

        <li onClick={() => setMenu("women")} className="cursor-pointer">
          <Link to="/women" className="no-underline">
            Women
          </Link>
          {menu === "women" && <hr className="border-none w-4/5 h-1 rounded-md bg-red-500" />}
        </li>

        <li onClick={() => setMenu("sport")} className="cursor-pointer">
          <Link to="/sport" className="no-underline">
            Sport
          </Link>
          {menu === "sport" && <hr className="border-none w-4/5 h-1 rounded-md bg-red-500" />}
        </li>

        <li onClick={() => setMenu("home")} className="cursor-pointer">
          <Link to="/home" className="no-underline">
            Home
          </Link>
          {menu === "home" && <hr className="border-none w-4/5 h-1 rounded-md bg-red-500" />}
        </li>

        <li onClick={() => setMenu("electronique")} className="cursor-pointer">
          <Link to="/electronique" className="no-underline">
            Électronique
          </Link>
          {menu === "electronique" && <hr className="border-none w-4/5 h-1 rounded-md bg-red-500" />}
        </li>
      </ul>
    </div>
  );
};

export default Nav;
