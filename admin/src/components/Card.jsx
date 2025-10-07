import React from 'react'

export default function Card({handleDelete, handleEdit, plant}) {
    return (
        <div
            key={plant._id}
            className="bg-white rounded-2xl shadow-lg border border-green-100 p-5 hover:shadow-xl transition transform hover:scale-105"
        >
            <img
                src={plant.plantImage}
                alt={plant.plantName}
                className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-green-700">{plant.plantName}</h3>
            <p className="text-gray-600 text-sm my-2">{plant.plantDescription}</p>
            <p className="text-green-600 font-bold mb-3">₹{plant.plantPrice}</p>

            <div className="flex gap-3">
                <button
                    onClick={() => handleEdit(plant)}
                    className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600"
                >
                    Edit
                </button>
                <button
                    onClick={() => handleDelete(plant._id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                >
                    Delete
                </button>
            </div>
        </div>
    )
}
