import Login from "@components/Login";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-800 ">
      {cookies.token ? (
        <div className="flex flex-col items-center justify-center h-screen space-y-10 bg-gray-800 ">
          <div className="text-5xl text-white ">You are logged in!</div>
          <button
            className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
            onClick={() => removeCookie("token")}
          >
            Logout
          </button>
          <button
            className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700"
            onClick={() => router.push("/Currency")}
          >
            Change Currency
          </button>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}
