import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import jwt from "jsonwebtoken";

function FavoritesBag(props: any) {
  // @ts-ignore
  const Myfavorites = props?.favorites;
  const email = props?.email;
  console.log(email);

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(Myfavorites);
    console.log(favorites);
  }, []);
  return (
    <div className="flex flex-col">
      <h1 className="mb-4 text-2xl font-bold text-center text-white">
        My Favorites Bag
      </h1>
      <ul>
        {favorites?.map((favorite) => (
          <li key={favorite}>{favorite}</li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const token = cookies.token;
  // @ts-ignore
  const email = jwt.decode(token)?.email;
  const myFavorites = await axios({
    method: "post",
    url: "api/favorites/getAllFavorites",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      email,
    },
  });

  return {
    props: {
      favorites: myFavorites.data,
      email: email,
    },
  };
}

export default FavoritesBag;
