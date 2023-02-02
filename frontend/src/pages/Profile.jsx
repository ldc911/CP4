/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import SessionList from "../components/SessionList";
import RandomSpell from "../components/RandomSpell";

export default function Home() {
  const [session, setSession] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [sessionDelete, setSessionDelete] = useState(true);
  const location = useLocation();
  const queryString = location.search;
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/sessions`)
      .then((response) => {
        setIsLoading(false);
        setSession(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [sessionDelete]);
  const today = new Date();
  const dateTransform = (oneDate) => {
    const date = new Date(oneDate);
    return date;
  };

  return isLoading ? (
    <p>loading</p>
  ) : (
    <div className="h-full flex flex-col">
      <div className=" flex flex-col gap-4 p-3 md:grid md:grid-cols-2">
        <ul>
          {session
            .filter((element) => {
              return dateTransform(element.dateSession) >= today;
            })
            .map((data, index) => (
              <li key={data.id}>
                <SessionList
                  session={data}
                  query={queryString}
                  sessionDelete={sessionDelete}
                  setSessionDelete={setSessionDelete}
                  index={index}
                />
              </li>
            ))}
        </ul>
        <div className="hidden md:block">
          <RandomSpell />
        </div>
      </div>
    </div>
  );
}
