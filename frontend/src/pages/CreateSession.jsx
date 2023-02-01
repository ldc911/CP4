/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";

export default function CreateSession() {
  return (
    <div className=" w-full bg-white rounded-md p-2 mb-4 shadow text-xs md:text-base md:w-1/2">
      <div className="grid grid-cols-3 items-center">
        <div className="text-center">title</div>

        <div className="  w-1/2 h-20 overflow-hidden flex flex-col items-center rounded-md shadow">
          <span className="h-1/3 w-full bg-red-800" />
          <div className="h-full flex flex-col items-center justify-evenly pb-2">
            <div className=" text-xl font-semibold">date</div>
          </div>
        </div>

        <div>
          <div className="text-center">durée</div>
          <div className="text-center">toggle campagne</div>
        </div>
      </div>

      <div className="flex flex-col items-center w-full px-4">
        <div className="w-full font-semibold text-xl text-center mb-5">
          lieux
        </div>
        <div className="w-full flex justify-between md:w-4/6 md:justify-between mb-2">
          <span>Gestion du repas</span>
          <span className="text-right font-medium"> menu déroulant</span>
        </div>
        <div className="w-full flex justify-between md:w-4/6 md:justify-between mb-2">
          <span>Le menu</span>
          <span className="text-right font-medium">input texte</span>
        </div>
        <div className="w-full flex justify-between md:w-4/6 md:justify-between mb-2">
          <span>Le dessert</span>
          <span className="font-medium"> menu déroulant</span>
        </div>
        <div className="w-full flex justify-between md:w-4/6 md:justify-between mb-2">
          <span>L'apéro</span>
          <span className="text-right font-medium">menu déroulant</span>
        </div>
        <div className="w-full flex justify-between md:w-4/6 md:justify-between mb-2">
          <span>Le sucré</span>
          <span className="text-right font-medium"> menu déroulant</span>
        </div>
        <div className="w-full flex justify-between md:w-4/6 md:justify-between mb-2">
          <span>Le sans alcool</span>
          <span className="text-right font-medium"> menu déroulant</span>
        </div>
        <div className="w-full flex justify-between md:w-4/6 md:justify-between mb-2">
          <span>Les bières et le vin</span>
          <span className="text-right font-medium"> menu déroulant</span>
        </div>
      </div>
    </div>
  );
}
