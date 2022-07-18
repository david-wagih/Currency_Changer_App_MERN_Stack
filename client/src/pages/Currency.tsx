import FavoritesBag from "@components/FavoritesBag";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import jwt from "jsonwebtoken";
import axios from "axios";

const Currency = (props: any) => {
  const options = props.currencyOptions;
  const [to, setTo] = useState("USD");
  const [from, setFrom] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(0);
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [rate, setRate] = useState(0);
  const [email, setEmail] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  useEffect(() => {
    const decodeToken = async () => {
      const token = cookies.token;
      // @ts-ignore
      const email = jwt.decode(token)?.email;
      setEmail(email);
    };
    decodeToken();
    const takeOnlyKeys = () => {
      if (options) {
        const keys = Object.keys(options);
        const newOptions = keys.map((key) => {
          return {
            value: key,
            label: options[key],
          };
        });
        setCurrencyOptions(newOptions);
      }
    };
    takeOnlyKeys();
  }, []);

  const calculateRate = async () => {
    const rate = await fetch(
      `https://api.apilayer.com/fixer/latest?symbols=${to}&base=${from}`,
      {
        headers: {
          apikey: process.env.NEXT_PUBLIC_apikey,
        },
      }
    );
    const rateJson = await rate.json();
    setRate(rateJson.rates[to]);
  };

  const convert = async () => {
    calculateRate();
    const response = await fetch(
      `https://api.apilayer.com/fixer/convert?to=${to}&from=${from}&amount=${amount}`,
      {
        headers: {
          apikey: process.env.NEXT_PUBLIC_apikey,
        },
      }
    );
    const data = await response.json();
    setResult(data.result);
  };

  const handleAddtoFavorites = async () => {
    const response = await axios({
      method: "post",
      url: "api/favorites/addToFavorites",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: email,
        baseCurrency: from,
        targetCurrency: to,
      },
    });
    console.log(response.data);
  };
  return (
    <div className="flex flex-row bg-gray-800 justify-evenly items-centerp-4 ">
      <div className="flex flex-col items-center justify-center ">
        <FavoritesBag email={email} />
      </div>
      <div className="flex flex-col items-center justify-center h-screen p-10 space-x-10 bg-gray-800">
        <div className="flex flex-row items-center justify-center h-screen space-x-5 bg-gray-800 ">
          <label className="text-xl text-white">From</label>
          <select
            className="text-xl text-black bg-white rounded"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            {currencyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-row items-center justify-center h-screen space-x-5 bg-gray-800">
          <label className="text-xl text-white">To</label>
          <select
            className="text-xl text-black bg-white rounded"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          >
            {currencyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-row items-center justify-center h-screen space-x-5 bg-gray-800 ">
          <label className="text-xl text-white">Enter Amount</label>
          <input
            className="px-4 py-2 font-bold text-black bg-white rounded "
            type="text"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>

        <div className="flex flex-row items-center justify-center h-screen space-x-5 bg-gray-800 ">
          <label className="text-xl text-white">Result</label>
          <p className="px-4 py-2 font-bold text-black bg-white rounded ">
            {result}
          </p>
        </div>
        <div className="flex flex-row items-center justify-center h-screen space-x-5 bg-gray-800 ">
          <label className="text-xl text-white">Exchange Rate</label>
          <p className="px-4 py-2 font-bold text-black bg-white rounded ">
            {rate}
          </p>
        </div>
        <div className="flex flex-row items-center justify-center h-screen space-x-5 bg-gray-800 ">
          <button
            className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
            onClick={convert}
          >
            Convert
          </button>
          <button
            className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
            onClick={handleAddtoFavorites}
          >
            Add to favorites
          </button>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const currencyOptions = await fetch(
    "https://api.apilayer.com/fixer/symbols",
    {
      headers: {
        apikey: process.env.NEXT_PUBLIC_apikey,
      },
    }
  );
  const data = await currencyOptions.json();
  return {
    props: {
      currencyOptions: data.symbols,
    },
  };
}

export default Currency;
