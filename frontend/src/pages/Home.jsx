import React, { useEffect, useState } from "react";
import { Leaf, ShoppingCart, Search } from "lucide-react";
import axios from "axios";

export default function Home() {

    let [plantData, setPlantData] = useState([]);

    useEffect(() => {
        async function getData() {
            let Res = await axios.get("http://localhost:5500/api/plants/list");
            setPlantData(Res.data.plantData);
        }

        getData();
    }, [])

    return (

        <div className="min-h-screen bg-green-50">

            <section className="flex flex-col md:flex-row items-center justify-between px-10 py-20">
                <div className="max-w-xl">
                    <h2 className="text-4xl md:text-6xl font-bold text-green-800 leading-tight">
                        Bring Nature <br /> To Your Home 🌿
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Explore a wide variety of plants to brighten your home, purify the air,
                        and create a calm, natural space.
                    </p>
                    <button className="mt-6 px-6 py-3 bg-green-700 text-white rounded-lg shadow-md hover:bg-green-800">
                        Shop Now
                    </button>
                </div>
                <img
                    src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80"
                    alt="Plants"
                    className="rounded-2xl shadow-lg mt-10 md:mt-0 md:ml-10"
                    width={450}
                />
            </section>

            {/* Featured Plants */}
            <section id="shop" className="px-6 md:px-10 py-16 bg-gradient-to-b from-green-50 to-white">
                <h3 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-3">
                    🌱 Our Bestsellers
                </h3>
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    Handpicked plants loved by our customers — perfect to bring freshness and greenery into your home.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plantData.map((plant, index) =>
                        index < 3 ? (
                            <div
                                key={index}
                                className="bg-white border border-green-100 p-6 rounded-2xl shadow-sm hover:shadow-xl transition transform hover:-translate-y-2"
                            >
                                <img
                                    src={plant.plantImage}
                                    alt={plant.plantName}
                                    className="rounded-lg mb-4 w-full h-60 object-cover hover:scale-105 transition-transform duration-300"
                                />
                                <h4 className="text-xl font-semibold text-green-900 mb-2">
                                    {plant.plantName}
                                </h4>

                                {/* Price Section */}
                                <div className="flex items-baseline gap-2 mb-4">
                                    {plant.plantOldPrice && (
                                        <span className="text-gray-400 line-through text-sm">
                                            ₹{plant.plantOldPrice}
                                        </span>
                                    )}
                                    <span className="text-2xl font-bold text-green-700">
                                        ₹{plant.plantPrice}
                                    </span>
                                </div>

                                <button className="mt-auto w-full flex items-center justify-center gap-2 bg-green-700 text-white py-2.5 rounded-lg font-medium hover:bg-green-800 transition-colors duration-300">
                                    Add to Cart
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6h12.4L17 13H7z"
                                        />
                                    </svg>
                                </button>
                            </div>

                        ) : null
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="text-center py-6 bg-green-700 text-white mt-10">
                © {new Date().getFullYear()} GreenLeaf Nursery. All rights reserved.
            </footer>
        </div>
    );
}
