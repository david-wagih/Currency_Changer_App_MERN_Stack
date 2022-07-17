import Login from "@components/Login";
import { useCookies } from "react-cookie";

export default function Home() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  return (
    <div
      className="h-screen bg-gray-800
      flex justify-center items-center
    "
    >
      {cookies.token ? (
        <div className="text-white text-center text-5xl font-bold m-10">
          You are logged in!
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}
