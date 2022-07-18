import axios from "axios";
import React, { useEffect, useState } from "react";

function FavoritesBag(props: any) {
  const email = props.email;

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const getFavorites = async () => {
      const myFavorites = await axios({
        method: "post",
        url: "api/favorites/getAllFavorites",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email: email,
        },
      });
      setFavorites(myFavorites.data.data);
    };
    getFavorites();
  }, []);
  return (
    <div className="flex flex-col">
      <h1 className="mb-4 text-2xl font-bold text-center text-white">
        My Favorites Bag
      </h1>
      <div className="flex flex-col items-center space-y-10 justify-evenly">
        {
          // @ts-ignore
          favorites.map((favorite: any) => (
            <div
              key={favorite._id}
              className="flex flex-col items-center justify-between"
            >
              <div className="flex flex-row items-center justify-center bg-green-800 ">
                <p className="text-xl text-white ">
                  {favorite.baseCurrency}
                  {"  "} to {"   "} {favorite.targetCurrency}
                </p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default FavoritesBag;
