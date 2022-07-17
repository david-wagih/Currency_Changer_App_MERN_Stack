import Login from "@components/Login";
import { useCookies } from "react-cookie";

export default function Home() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-800 ">
      {cookies.token ? (
        <div className="text-5xl text-white ">You are logged in!</div>
      ) : (
        <Login />
      )}
    </div>
  );
}
