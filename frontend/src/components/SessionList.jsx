/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from "react";

export default function SessionList({ session, index }) {
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

  function getMonthName(date) {
    const birthdayMonth = new Date(date).getMonth();
    const newDate = new Date();
    newDate.setMonth(birthdayMonth);

    return newDate.toLocaleString("fr-FR", { month: "short" });
  }
  const getDay = new Date(dateSession).getDate();

  return (
    <div className=" w-full bg-white rounded-md p-2 mb-4 shadow text-xs md:text-base">
      <div className="grid grid-cols-3 items-center">
        <div>
          {index === 0 && (
            <div className=" text-xl text-center text-red-800 font-semibold">
              Pochaine session !
            </div>
          )}
          <div className="text-center">{title}</div>
        </div>

        <div className="  w-1/2 h-20 overflow-hidden flex flex-col items-center rounded-md shadow">
          <span className="h-1/3 w-full bg-red-800" />
          <div className="h-full flex flex-col items-center justify-evenly pb-2">
            <div className=" text-xl font-semibold">{getDay}</div>
            <div className=" text-xl font-semibold">
              {getMonthName(dateSession)}
            </div>
          </div>
        </div>

        <div>
          <div className="text-center">{duration}</div>
          <div className="text-center">
            {isCampaign ? "CAMPAGNE" : "SIDE QUESTS"}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center w-full px-4">
        <div className="w-full font-semibold text-xl text-center mb-5">
          {localisation}
        </div>
        <div className="w-full flex justify-between md:w-4/6 md:justify-between">
          <span>Gestion du repas</span>
          <span className="text-right font-medium"> {mealDealer}</span>
        </div>
        <div className="w-full flex justify-between md:w-4/6 md:justify-between">
          <span>Les détails !</span>
          <span className="text-right font-medium">{details_meals}</span>
        </div>
        <div className="w-full flex justify-between md:w-4/6 md:justify-between">
          <span>Le dessert</span>
          <span className="font-medium"> {dessertDealer}</span>
        </div>
        <div className="w-full flex justify-between md:w-4/6 md:justify-between">
          <span>L'apéro</span>
          <span className="text-right font-medium"> {aperoDealer}</span>
        </div>
        <div className="w-full flex justify-between md:w-4/6 md:justify-between">
          <span>Le sucré</span>
          <span className="text-right font-medium"> {sweetsDealer}</span>
        </div>
        <div className="w-full flex justify-between md:w-4/6 md:justify-between">
          <span>Le sans alcool</span>
          <span className="text-right font-medium"> {softDealer}</span>
        </div>
        <div className="w-full flex justify-between md:w-4/6 md:justify-between">
          <span>Les bières et le vin</span>
          <span className="text-right font-medium"> {alcoolDealer}</span>
        </div>
      </div>
    </div>
  );
}
