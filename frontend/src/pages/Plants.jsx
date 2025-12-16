import React, { useState, useEffect } from "react";
import Loader from "../components/Loader.jsx";
import PlantCard from "../components/PlantCard.jsx";
import API from "../api/axios"; // 👈 import your custom Axios instance

export default function Plants() {
  const [isLoading, setIsLoading] = useState(true);
  const [plantsData, setPlants] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      setError("");

      try {
        const res = await API.get("/plants/list");
        setPlants(res.data.plantData || []);
      } catch (err) {
        console.error("Error fetching plants:", err);
        setError("Failed to load plants. Please try again later.");
      } finally {
        setIsLoading(false);
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
      ) : error ? (
        <div className="text-center text-red-500 text-lg">{error}</div>
      ) : plantsData.length === 0 ? (
        <h2 className="text-center text-xl text-gray-500">No Plants Found</h2>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {plantsData.map((plant, index) => (
            <PlantCard key={plant._id || index} plant={plant} />
          ))}
        </div>
      )}
    </div>
  );
}
