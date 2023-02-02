/* eslint-disable no-unused-vars */
import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useNavigate } from "react-router-dom";
import { Listbox, Transition, Switch } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import NavBar from "../components/NavBar";

const { VITE_BACKEND_URL } = import.meta.env;

const duration = [
  { id: 1, value: "Après-midi" },
  { id: 2, value: "Soirée" },
  { id: 3, value: "Après-midi et soirée" },
  { id: 4, value: "Week-end" },
];

export default function CreateSession() {
  const [selectedDate, setSelectedDate] = useState();
  const [selectedDuration, setSelectedDuration] = useState(duration[0]);
  const [selectedCampaign, setSelectedCampaign] = useState(false);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState("");
  const [mealDealer, setMealDealer] = useState(null);
  const [mealDealerName, setMealDealerName] = useState("Qui régale ?");
  const [menu, setMenu] = useState("");
  const [sweetDealer, setSweetDealer] = useState(null);
  const [sweetDealerName, setSweetDealerName] = useState("Qui régale ?");
  const [aperoDealer, setAperoDealer] = useState(null);
  const [aperoDealerName, setAperoDealerName] = useState("Qui régale ?");
  const [dessertDealer, setDessertDealer] = useState(null);
  const [dessertDealerName, setDessertDealerName] = useState("Qui régale ?");
  const [softDealer, setSoftDealer] = useState(null);
  const [softDealerName, setSoftDealerName] = useState("Qui régale ?");
  const [alcoolDealer, setAlcoolDealer] = useState(null);
  const [alcoolDealerName, setAlcoolDealerName] = useState("Qui régale ?");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users`)
      .then((response) => {
        setIsLoading(false);
        setUsers(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleChangeLocation = (event) => {
    setLocation(event.target.value);
  };
  const handleChangeMenu = (event) => {
    setMenu(event.target.value);
  };

  let footer = <p>Sélectionne une date.</p>;
  if (selectedDate) {
    footer = <p>Date sélectionnée : {format(selectedDate, "PP")}</p>;
  }

  useEffect(() => {
    if (mealDealer) {
      const userMeal = users.filter((user) => user.id === mealDealer);
      setMealDealerName(userMeal[0].nickname);
    }
  }, [mealDealer]);

  useEffect(() => {
    if (sweetDealer) {
      const userSweet = users.filter((user) => user.id === sweetDealer);
      setSweetDealerName(userSweet[0].nickname);
    }
  }, [sweetDealer]);

  useEffect(() => {
    if (aperoDealer) {
      const userApero = users.filter((user) => user.id === aperoDealer);
      setAperoDealerName(userApero[0].nickname);
    }
  }, [aperoDealer]);

  useEffect(() => {
    if (dessertDealer) {
      const userDessert = users.filter((user) => user.id === dessertDealer);
      setDessertDealerName(userDessert[0].nickname);
    }
  }, [dessertDealer]);

  useEffect(() => {
    if (softDealer) {
      const userSoft = users.filter((user) => user.id === softDealer);
      setSoftDealerName(userSoft[0].nickname);
    }
  }, [softDealer]);

  useEffect(() => {
    if (alcoolDealer) {
      const userAlcool = users.filter((user) => user.id === alcoolDealer);
      setAlcoolDealerName(userAlcool[0].nickname);
    }
  }, [alcoolDealer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${VITE_BACKEND_URL}/sessions`,
        {
          dateSession: selectedDate,
          duration: selectedDuration,
          localisation: location,
          isCampaign: selectedCampaign,
          title,
          user_meal: mealDealer,
          details_meals: menu,
          user_apero: aperoDealer,
          user_alcool: alcoolDealer,
          user_sweets: sweetDealer,
          user_dessert: dessertDealer,
          user_soft: softDealer,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function handleResponse() {
        navigate("/");
      });
  };

  return isLoading ? (
    <p>loading</p>
  ) : (
    <>
      <NavBar />
      <form onSubmit={handleSubmit}>
        <div className=" w-full h-screen bg-white rounded-md p-2 m-4 shadow text-xs md:text-xl flex flex-col items-center">
          <div className=" rounded-md shadow pb4 mb-4 h-fit w-fit">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              footer={footer}
              locale={fr}
            />
          </div>
          <div className="w-full md:w-1/2 px-4 flex flex-row justify-between items-center">
            <div className="text-center">Combien de temps ?</div>
            <div className="w-50">
              <Listbox value={selectedDuration} onChange={setSelectedDuration}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">
                      {selectedDuration.value}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="`absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {duration.map((element) => (
                        <Listbox.Option
                          key={element.id}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-red-100 text-red-900"
                                : "text-gray-900"
                            }`
                          }
                          value={element}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {element.value}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-600">
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4 flex flex-row justify-between items-center">
            <div className="text-center">Sera-ce une campagne ?</div>
            <div className="py-16">
              <Switch
                checked={selectedCampaign}
                onChange={setSelectedCampaign}
                className={`${selectedCampaign ? "bg-green-900" : "bg-red-900"}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`${
                    selectedCampaign ? "translate-x-9" : "translate-x-0"
                  }
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4 flex flex-row justify-between items-center">
            <div className="text-center">Le titre ?</div>
            <form className="shadow-md leading-8">
              <input
                type="text"
                value={title}
                onChange={handleChange}
                placeholder="Entre le titre de la session"
              />
            </form>
          </div>
          <div className="w-full md:w-1/2 px-4 flex flex-row justify-between items-center">
            <div className="text-center">Et c'est où ?</div>
            <form className="shadow-md leading-8">
              <input
                type="text"
                value={location}
                onChange={handleChangeLocation}
                placeholder="Entre le lieu de la session"
              />
            </form>
          </div>
          <div className="w-full md:w-1/2 px-4 flex flex-row justify-between items-center">
            <div>Gestion du repas</div>
            <div className="w-50">
              <Listbox value={users.nickname} onChange={setMealDealer}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">{mealDealerName}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="`absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {users.map((element) => (
                        <Listbox.Option
                          key={element.id}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-red-100 text-red-900"
                                : "text-gray-900"
                            }`
                          }
                          value={element.id}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {element.nickname}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-600">
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4 flex flex-row justify-between items-center">
            <div className="text-center">Un peu de détails :</div>
            <form className="shadow-md leading-8">
              <input
                type="text"
                value={menu}
                onChange={handleChangeMenu}
                placeholder="On mange quoi ?"
              />
            </form>
          </div>
          <div className="w-full md:w-1/2 px-4 flex flex-row justify-between items-center">
            <div>Le dessert :</div>
            <div className="w-50">
              <Listbox value={users.nickname} onChange={setDessertDealer}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">{dessertDealerName}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="`absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {users.map((element) => (
                        <Listbox.Option
                          key={element.id}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-red-100 text-red-900"
                                : "text-gray-900"
                            }`
                          }
                          value={element.id}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {element.nickname}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-600">
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4 flex flex-row justify-between items-center">
            <div>L'apéro :</div>
            <div className="w-50">
              <Listbox value={users.nickname} onChange={setAperoDealer}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">{aperoDealerName}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="`absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {users.map((element) => (
                        <Listbox.Option
                          key={element.id}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-red-100 text-red-900"
                                : "text-gray-900"
                            }`
                          }
                          value={element.id}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {element.nickname}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-600">
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4 flex flex-row justify-between items-center">
            <div>Le sucré :</div>
            <div className="w-50">
              <Listbox value={users.nickname} onChange={setSweetDealer}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">{sweetDealerName}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="`absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {users.map((element) => (
                        <Listbox.Option
                          key={element.id}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-red-100 text-red-900"
                                : "text-gray-900"
                            }`
                          }
                          value={element.id}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {element.nickname}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-600">
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4 flex flex-row justify-between items-center">
            <div>Le sans alcool :</div>
            <div className="w-50">
              <Listbox value={users.nickname} onChange={setSoftDealer}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">{softDealerName}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="`absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {users.map((element) => (
                        <Listbox.Option
                          key={element.id}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-red-100 text-red-900"
                                : "text-gray-900"
                            }`
                          }
                          value={element.id}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {element.nickname}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-600">
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4 flex flex-row justify-between items-center">
            <div>Le sans alcool :</div>
            <div className="w-50">
              <Listbox value={users.nickname} onChange={setAlcoolDealer}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">{alcoolDealerName}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="`absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {users.map((element) => (
                        <Listbox.Option
                          key={element.id}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-red-100 text-red-900"
                                : "text-gray-900"
                            }`
                          }
                          value={element.id}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {element.nickname}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-600">
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          </div>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Valider !
          </button>
        </div>
      </form>
    </>
  );
}
