import Login from "@components/Login";
import Cookies from "js-cookie";

export default function Home(props: any) {
  const isLoggedIn = props.isLoggedIn;
  return (
    <div
      className="h-screen bg-gray-800
      flex justify-center items-center
    "
    >
      {isLoggedIn ? (
        <div className="text-white text-center text-5xl font-bold m-10">
          You are logged in!
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const token = Cookies.get("token");
  if (token) {
    return {
      props: {
        isLoggedIn: true,
      },
    };
  }
  return {
    props: {
      isLoggedIn: false,
    },
  };
}
