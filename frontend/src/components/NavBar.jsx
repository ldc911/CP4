/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { Popover } from "@headlessui/react";
import { Bars2Icon } from "@heroicons/react/24/outline";

export default function NavBar() {
  return (
    <Popover className="relative m-4">
      <Popover.Button>
        <Bars2Icon className="h-8 h-8 text-red-700" />
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
  );
}
