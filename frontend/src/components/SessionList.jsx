/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from "react";

export default function SessionList({ session }) {
  const {
    title,
    dateSession,
    duration,
    localisation,
    isCampaign,
    mealDealer,
    details_meals,
    aperoDealer,
    alcoolDealer,
    sweetsDealer,
    dessertDealer,
    softDealer,
  } = session;
  return (
    <div className=" w-full bg-white rounded-md p-2 mb-4 shadow">
      <div className="grid grid-cols-3">
        <div className="flex justify-center">
          <span>title</span>
        </div>
        <div className="  w-full h-16 pt-4 flex flex-col items-center  rounded-md shadow">
          <span className="h-1/4 w-full bg-red-800 sticky top-0" />
          <div>{dateSession}</div>
        </div>

        <div>
          <div>{duration}</div>
          <div>{isCampaign ? "CAMPAGNE" : "SIDE QUESTS"}</div>
        </div>
      </div>
      <div className="flex flex-col items-start w-full">
        <div className="w-full text-center">{localisation}</div>

        <div className="flex justify-evenly w-full">
          <span>Gestion du repas</span>
          <span> {mealDealer}</span>
        </div>
        <div className="flex justify-evenly">
          <span>Les détails !</span>
          <span>{details_meals}</span>
        </div>
        <div className="flex justify-evenly">
          <span>Le dessert</span>
          <span> {dessertDealer}</span>
        </div>
        <div className="flex justify-evenly">
          <span>L'apéro</span>
          <span> {aperoDealer}</span>
        </div>
        <div className="flex justify-evenly">
          <span>Le sucré</span>
          <span> {sweetsDealer}</span>
        </div>
        <div className="flex justify-evenly">
          <span>Le sans alcool</span>
          <span> {softDealer}</span>
        </div>
        <div className="flex justify-evenly">
          <span>Les bières et le vin</span>
          <span> {alcoolDealer}</span>
        </div>
      </div>
    </div>
  );
}
