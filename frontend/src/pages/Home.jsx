import React, { useEffect, useState } from "react";
import { Leaf, ShoppingCart, Search } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";


export default function Home() {

    const navigate = useNavigate();
    let [plantData, setPlantData] = useState([]);

    useEffect(() => {
        async function getData() {
            let Res = await axios.get(`${import.meta.env.VITE_BASE_URL}/plants/list`);
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
                    <button onClick={() => { navigate('/Plants'); scrollTo(0, 0) }}
                        className="mt-6 px-6 py-3 bg-green-700 text-white rounded-lg shadow-md hover:bg-green-800 cursor-pointer">
                        Shop Now
                    </button>
                </div>
                <img
                    src={plantData.find(plant => plant.isMain === true)?.plantImage}
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
                                    className="rounded-lg mb-4 w-full h-60 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
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

                                <button className="mt-auto w-full flex items-center justify-center gap-2 bg-green-700 text-white py-2.5 rounded-lg font-medium hover:bg-green-800 transition-colors duration-300 cursor-pointer">
                                    Add to Cart
                                    <ShoppingCart className="h-5 w-5" />
                                </button>

                            </div>

                        ) : null
                    )}


                    <div className="col-span-full flex justify-center mt-8">
                        <button
                            onClick={() => {
                                navigate("/plants");
                                scrollTo(0, 0);
                            }}
                            className="px-8 py-3 bg-green-700 text-white text-lg font-medium rounded-full shadow-md 
               hover:bg-green-800 hover:shadow-lg transform hover:-translate-y-1 
               transition-all duration-300 flex items-center gap-2"
                        >
                            View More
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>


                </div>
            </section>


        </div>
    );
}
