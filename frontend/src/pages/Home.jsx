import React, { useEffect, useState } from "react";
import axios from "axios";
import SessionList from "../components/SessionList";
import RandomSpell from "../components/RandomSpell";

export default function Home() {
  const [session, setSession] = useState();
  const [isLoading, setIsLoading] = useState(true);
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
  }, []);
  const today = new Date();
  return isLoading ? (
    <p>loading</p>
  ) : (
    <div>
      <div className=" flex flex-col p-3 md:grid md:grid-cols-2">
        <ul>
          {session
            .filter((element) => {
              const date = new Date(element.dateSession); // filtre pour ne pas montrer les sessions passées
              return date >= today;
            })
            .map((data, index) => (
              <li key={data.id}>
                <SessionList session={data} index={index} />
              </li>
            ))}
        </ul>
        <div>
          <RandomSpell />
        </div>
      </div>
    </div>
  );
}
