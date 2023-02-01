/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { Popover } from "@headlessui/react";
import { Bars2Icon } from "@heroicons/react/24/outline";

export default function NavBar() {
  return (
    <div className="w-full h-10 md:bg-red-800 ">
      <div className="hidden md:h-full md:text-white md:flex flex-row items-center justify-center gap-12">
        <div className="hover:font-semibold">Profils</div>
        <div className="hover:font-semibold">Créer une session</div>
      </div>
      <Popover className="relative p-3 md:hidden">
        <Popover.Button>
          <Bars2Icon className="w-14 h-10 text-red-700" />
        </Popover.Button>

        <Popover.Panel className="absolute z-10">
          <div className="flex flex-col bg-white rounded-md shadow-md px-1">
            <a href="/analytics" className=" hover:font-semibold">
              Créer une session
            </a>
            <a href="/engagement" className=" hover:font-semibold">
              Profils
            </a>
          </div>
        </Popover.Panel>
      </Popover>
    </div>
  );
}
