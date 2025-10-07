import React from 'react'
import { ShoppingCart } from "lucide-react";

export default function PlantCard({index, plant}) {
    return (
        <div
            key={index}
            className="bg-white rounded-2xl border border-green-100 shadow-sm hover:shadow-xl transition-all duration-300 p-5 flex flex-col"
        >
            <img
                className="w-full h-60 object-cover rounded-xl mb-4 hover:scale-105 transition-transform duration-300"
                src={plant.plantImage}
                alt={plant.plantName}
            />
            <div className="flex-grow flex flex-col">
                <h2 className="text-xl font-semibold text-green-800">
                    {plant.plantName}
                </h2>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {plant.plantDescription}
                </p>

                {/* Price */}
                <div className="mt-3 flex items-baseline gap-2">
                    {plant.plantOldPrice && (
                        <span className="text-gray-400 line-through text-sm">
                            ₹{plant.plantOldPrice}
                        </span>
                    )}
                    <span className="text-2xl font-bold text-green-700">
                        ₹{plant.plantPrice}
                    </span>
                </div>

                {/* Actions */}
                <div className="mt-5 flex gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-2.5 rounded-xl font-medium hover:bg-green-700 transition duration-200">
                        <ShoppingCart size={18} />
                        Add to Cart
                    </button>
                    <button className="flex-1 border border-green-600 text-green-700 py-2.5 rounded-xl font-medium hover:bg-green-100 transition duration-200">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    )
}
