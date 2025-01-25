import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user") || '{}')
  const userName = user?.name.split(" ").reduce((acc: string, cur: string) => acc + cur[0], "");
  const signOut = () => {
    sessionStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/sign-in", { replace: true });
  };
  return (
    <nav className="bg-white dark:bg-black py-1 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="text-white text-2xl font-bold cursor-pointer"
            >
              EchoSphere
            </Link>
          </div>
          <div className="flex items-center gap-2 lg:space-x-2">
            <p className="text-black bg-white w-10 h-10 rounded-full flex justify-center items-center text-sm font-extralight capitalize  ">{userName}</p>
            <div
              onClick={signOut}
              className="block  py-2 px-5 text-sm bg-white rounded-sm font-semibold hover:bg-gray-100 cursor-pointer active:scale-95"
            >
              Sign out
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
