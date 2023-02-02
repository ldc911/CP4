/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Switch } from "@headlessui/react";
import SelectMenuDurationUpdate from "./selects/SelectMenuDurationUpdate";
import SelectMenuUpdate from "./selects/SelectMenuUpdate";

const { VITE_BACKEND_URL } = import.meta.env;

const duration = [
  { id: 1, value: "Après-midi" },
  { id: 2, value: "Soirée" },
  { id: 3, value: "Après-midi et soirée" },
  { id: 4, value: "Week-end" },
];

export default function UpdateFullSession({ data }) {
  const [isCampaignEnabled, setIsCampaignEnabled] = useState(data.isCampaign);
  const [title, setTitle] = useState(data.title);
  const [location, setLocation] = useState(data.localisation);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState("");
  const [sessionInfo, setSessionInfo] = useState({
    duration: data.duration,
    localisation: data.localisation,
    isCampaign: data.isCampaign,
    title: data.title,
    user_meal: data.user_meal,
    details_meals: data.details_meals,
    user_apero: data.user_apero,
    user_alcool: data.user_alcool,
    user_sweets: data.user_sweets,
    user_dessert: data.user_dessert,
    user_soft: data.user_soft,
  });

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

  const [mealDealer, setMealDealer] = useState(data.user_meal);
  const [mealDealerName, setMealDealerName] = useState(
    users &&
      users.map((e) => {
        e.id === data.user_meal;
        return e.nickname;
      })
  );
  const [menu, setMenu] = useState(data.details_meals);
  const [sweetDealer, setSweetDealer] = useState(data.user_sweets);
  const [sweetDealerName, setSweetDealerName] = useState(
    users &&
      users.map((e) => {
        e.id === data.user_sweets;
        return e.nickname;
      })
  );
  const [aperoDealer, setAperoDealer] = useState(data.user_apero);
  const [aperoDealerName, setAperoDealerName] = useState(
    users &&
      users.map((e) => {
        e.id === data.user_apero;
        return e.nickname;
      })
  );
  const [dessertDealer, setDessertDealer] = useState(data.user_dessert);
  const [dessertDealerName, setDessertDealerName] = useState(
    users &&
      users.map((e) => {
        e.id === data.user_dessert;
        return e.nickname;
      })
  );
  const [softDealer, setSoftDealer] = useState(data.user_soft);
  const [softDealerName, setSoftDealerName] = useState(
    users &&
      users.map((e) => {
        e.id === data.user_soft;
        return e.nickname;
      })
  );
  const [alcoolDealer, setAlcoolDealer] = useState(data.user_alcool);
  const [alcoolDealerName, setAlcoolDealerName] = useState(
    users &&
      users.map((e) => {
        e.id === data.user_alcool;
        return e.nickname;
      })
  );
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSessionInfo({ ...sessionInfo, title: event.target.value });
  };
  const handleChangeLocation = (event) => {
    setSessionInfo({ ...sessionInfo, localisation: event.target.value });
  };
  const handleChangeMenu = (event) => {
    setSessionInfo({ ...sessionInfo, details_meals: event.target.value });
  };

  const handleMeal = (event) => {
    setSessionInfo({ ...sessionInfo, user_meal: event });
  };

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
    let isCampaign;
    // eslint-disable-next-line no-undef
    selectedCampaign === true ? (isCampaign = 1) : (isCampaign = 0);
    axios
      .post(
        `${VITE_BACKEND_URL}/sessions`,
        {
          // eslint-disable-next-line no-undef
          duration: selectedDuration,
          localisation: location,
          isCampaign,
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

  // eslint-disable-next-line no-restricted-syntax
  console.log(sessionInfo);
  return isLoading ? (
    <p>loading</p>
  ) : (
    <form onSubmit={handleSubmit}>
      <div className=" w-full h-full bg-white rounded-md py-6 px-2 m-4 shadow text-xs md:text-xl flex flex-col items-center">
        <div className="w-full md:w-1/2 px-4 flex flex-row justify-between items-center">
          <div className="text-center">Combien de temps ?</div>
          <div className="w-1/2 leading-4">
            <SelectMenuDurationUpdate
              duration={duration}
              sessionInfo={sessionInfo}
              selectedDuration={sessionInfo.duration}
              setSessionInfo={setSessionInfo}
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 px-4 flex flex-row justify-between items-center">
          <div className="text-center">Sera-ce une campagne ?</div>
          <div className="py-16">
            <Switch
              checked={isCampaignEnabled}
              onChange={() => {
                if (!isCampaignEnabled) {
                  setIsCampaignEnabled(!isCampaignEnabled);
                } else {
                  setIsCampaignEnabled(false);
                }
              }}
              className={`${isCampaignEnabled ? "bg-green-900" : "bg-red-900"}
      relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={`${
                  isCampaignEnabled ? "translate-x-9" : "translate-x-0"
                }
        pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
          </div>
        </div>
        <div className="w-full md:w-1/2 px-4 flex flex-row justify-between items-center">
          <div className="text-center">Le titre ?</div>
          <div className="shadow-md leading-8">
            <input
              type="text"
              value={sessionInfo.title}
              onChange={handleChange}
              placeholder="Entre le titre de la session"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 px-4 flex flex-row justify-between items-center">
          <div className="text-center">Et c'est où ?</div>
          <div className="shadow-md leading-8">
            <input
              type="text"
              value={sessionInfo.localisation}
              onChange={handleChangeLocation}
              placeholder="Entre le lieu de la session"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 px-4 flex flex-row justify-between items-center">
          <div>Gestion du repas</div>
          <div className="w-1/2 leading-4">
            <SelectMenuUpdate
              sessionInfo={sessionInfo}
              selectedDuration={sessionInfo.duration}
              handleMeal={handleMeal}
              data={users}
              placeHolder={mealDealerName}
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 px-4 flex flex-row justify-between items-center">
          <div className="text-center">Un peu de détails :</div>
          <div className="shadow-md leading-8">
            <input
              type="text"
              value={sessionInfo.details_meals}
              onChange={handleChangeMenu}
              placeholder="On mange quoi ?"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 px-4 flex flex-row justify-between items-center">
          <div>Le dessert :</div>
          <div className="w-1/2 leading-4">
            <SelectMenuUpdate
              data={users}
              setSelectedElement={setDessertDealer}
              placeHolder={dessertDealerName}
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 px-4 flex flex-row justify-between items-center">
          <div>L'apéro :</div>
          <div className="w-1/2 leading-4">
            <SelectMenuUpdate
              data={users}
              setSelectedElement={setAperoDealer}
              placeHolder={aperoDealerName}
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 px-4 flex flex-row justify-between items-center">
          <div>Le sucré :</div>
          <div className="w-1/2 leading-4">
            <SelectMenuUpdate
              data={users}
              setSelectedElement={setSweetDealer}
              placeHolder={sweetDealerName}
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 px-4 flex flex-row justify-between items-center">
          <div>Le sans alcool :</div>
          <div className="w-1/2 leading-4">
            <SelectMenuUpdate
              data={users}
              setSelectedElement={setSoftDealer}
              placeHolder={softDealerName}
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 px-4 flex flex-row justify-between items-center mb-3">
          <div>La bière et le vin :</div>
          <div className="w-1/2 leading-4">
            <SelectMenuUpdate
              data={users}
              setSelectedElement={setAlcoolDealer}
              placeHolder={alcoolDealerName}
            />
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
  );
}
