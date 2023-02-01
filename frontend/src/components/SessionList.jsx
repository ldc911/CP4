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
    softDealer_,
  } = session;
  return (
    <div className=" w-full bg-white rounded-md p-2 mb-4 shadow">
      <div className="flex justify-between items-end">
        <div className="flex justify-center">
          <span>title</span>
        </div>
        <div className=" w-1/4 pt-4 flex flex-col items-center justify-center shadow">
          <div>{dateSession}</div>
        </div>

        <div>
          <div>{duration}</div>
          <div>{isCampaign ? "CAMPAGNE" : "SIDE QUESTS"}</div>
        </div>
      </div>
      <div className="flex justify-evenly">
        <span>Gestion du repas</span>
        <span> {mealDealer}</span>
      </div>
      <div className="flex justify-evenly">
        <span>Les détails !</span>
        <span>{details_meals}</span>
      </div>
      <div>Le dessert</div>
      <div>L'apéro</div>
      <div>Le sucré</div>
      <div>Le sans alcool</div>
      <div>Les bières et le vin</div>
    </div>
  );
}
