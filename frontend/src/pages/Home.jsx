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

  return isLoading ? (
    <p>loading</p>
  ) : (
    <div>
      {" "}
      <NavBar />
      <div className="flex-rows p-3 gap-4 md:grid grid-cols-2">
        {session.map((data) => (
          <SessionList session={data} />
        ))}
      </div>
    </div>
  );
}
