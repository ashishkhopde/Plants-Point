import React, { useState, useEffect } from "react";
import Loader from "../components/Loader.jsx";
import axios from "axios";

import PlantCard from "../components/PlantCard.jsx";

export default function Plants() {
  let [isLoading, setIsLoading] = useState(true);
  let [plantsData, setPlants] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        let res = await axios.get("http://localhost:5500/api/plants/list");
        console.log(res.data);
        setPlants(res.data.plantData);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6">

      <header className="text-center mb-10">

        <h1 className="text-4xl font-extrabold text-green-700 drop-shadow-md">
          🌱 Plants Collection
        </h1>

        <p className="text-gray-600 mt-2">
          Discover and nurture your favorite plants
        </p>

      </header>

      <hr className="border-green-300 mb-8" />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {plantsData.length === 0 ? (
            <h2 className="text-center text-xl text-gray-500">
              No Plants Found
            </h2>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {plantsData.map((plant, index) => (
                <PlantCard index={index} plant={plant}/>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
