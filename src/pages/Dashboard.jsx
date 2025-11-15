import { Link, NavLink, Outlet } from "react-router";

const Dashboard = () => {
  return (
    <div className="container relative">
      <div className="grid grid-cols-[1fr_4fr] ">
        <div className="bg-slate-800 px-3 py-6 min-h-screen">
          <Link
            to="/"
            className="flex items-center text-white text-3xl font-bold"
          >
            SPDA
          </Link>
          <div className="mt-4 grid gap-4">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `text-white text-sm font-bold p-3 rounded cursor-pointer hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
              }
              end
            >
              Tasks
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `text-white text-sm font-bold p-3 rounded cursor-pointer hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
              }
              to="chatroom"
            >
              Chatroom
            </NavLink>

            <NavLink
              to="settings"
              className={({ isActive }) =>
                `text-white text-sm font-bold p-3 rounded cursor-pointer hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
              }
            >
              Settings
            </NavLink>
          </div>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
