import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { nav } from "../paths/nav";

export const RenderRoutes = () => {
  return <Routes></Routes>;
};

export const RenderMenu = () => {
  const MenuItem = ({ r }: any) => {
    return (
      <div className="menuItem">
        <Link to={r.path}>{r.name}</Link>
      </div>
    );
  };
  return (
    <div className="menu">
      {/* {nav.map((r: any, i: any) => {
        if (!r.isPrivate && r.isMenu) {
          return <MenuItem key={i} r={r} />;
        } else if (user.isAuthenticated && r.isMenu) {
          return <MenuItem key={i} r={r} />;
        } else return false;
      })}

      {user.isAuthenticated ? (
        <div className="menuItem">
          <Link to={"#"} onClick={logout}>
            Log out
          </Link>
        </div>
      ) : (
        <div className="menuItem">
          <Link to={"login"}>Log in</Link>
        </div>
      )} */}
    </div>
  );
};
