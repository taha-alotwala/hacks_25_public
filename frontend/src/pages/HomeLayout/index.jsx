import { Outlet } from "react-router-dom";

export const HomeLayout = () => {
  return (
    <>
      <div className="">Navbar</div>
      <Outlet />
    </>
  );
};
