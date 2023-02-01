/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { Popover } from "@headlessui/react";
import { Bars2Icon } from "@heroicons/react/24/outline";

export default function NavBar() {
  return (
    <Popover className="relative">
      <Popover.Button>
        <Bars2Icon className="h-8 h-8 text-red-700" />
      </Popover.Button>

      <Popover.Panel className="absolute z-10">
        <div className="flex flex-col bg-white">
          <a href="/analytics">Créer une session</a>
          <a href="/engagement">Profils</a>
          <a href="/security">Security</a>
          <a href="/integrations">Integrations</a>
        </div>

        <img src="/solutions.jpg" alt="" />
      </Popover.Panel>
    </Popover>
  );
}
