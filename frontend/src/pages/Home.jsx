import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import SessionList from "../components/SessionList";

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
      {" "}
      <NavBar />
      <ul className="flex-rows p-3 gap-4 md:grid grid-cols-2">
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
    </div>
  );
}
