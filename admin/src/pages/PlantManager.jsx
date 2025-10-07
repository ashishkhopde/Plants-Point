import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";
import Loader from "../components/Loader";

export default function PlantManager() {
    let [isLoading, setIsLoading] = useState(true);
    let [isAdding, setIsAdding] = useState(false);
    let [plantsData, setPlants] = useState([]);
    let [editId, setEditId] = useState(null);

    let [formData, setFormData] = useState({
        plantName: "",
        plantImage: "",
        plantDescription: "",
        plantPrice: ""
    });

    useEffect(() => {
        async function getData() {
            try {
                let res = await axios.get("http://localhost:5500/api/plants/list");
                setPlants(res.data.plantData);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        getData();
    }, [isAdding]);

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (
            !formData.plantName.trim() ||
            !formData.plantImage.trim() ||
            !formData.plantDescription.trim() ||
            !formData.plantPrice
        ) {
            alert("⚠️ Please fill out all fields before submitting!");
            return;
        }

        try {
            if (editId) {
                let Res = await axios.put(
                    `http://localhost:5500/api/plants/edit/${editId}`,
                    formData
                );
                if (Res.data.status === "success") {
                    alert("🌿 Plant updated successfully!");
                    setIsAdding(!isAdding);
                    setEditId(null);
                    setFormData({
                        plantName: "",
                        plantImage: "",
                        plantDescription: "",
                        plantPrice: ""
                    });
                }
            } else {
                let Res = await axios.post(
                    "http://localhost:5500/api/plants/add",
                    formData
                );
                if (Res.data.status === "success") {
                    alert("✅ " + Res.data.message);
                    setIsAdding(!isAdding);
                    setFormData({
                        plantName: "",
                        plantImage: "",
                        plantDescription: "",
                        plantPrice: ""
                    });
                }
            }
        } catch (err) {
            console.log(err);
            alert("⚠️ Something went wrong!");
        }
    }

    async function handleDelete(id) {
        let confirmation = window.confirm("Are you sure you want to delete this plant?");
        if (confirmation) {
            let Res = await axios.delete(`http://localhost:5500/api/plants/delete/${id}`);
            setIsAdding(!isAdding);
            if (Res.data.status === "success") {
                alert("🗑️ " + Res.data.message);
            }
        }
    }

    function handleEdit(plant) {
        setEditId(plant._id);
        setFormData({
            plantName: plant.plantName,
            plantImage: plant.plantImage,
            plantDescription: plant.plantDescription,
            plantPrice: plant.plantPrice
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function handleReset() {
        setFormData({
            plantName: "",
            plantImage: "",
            plantDescription: "",
            plantPrice: ""
        });
        setEditId(null);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex flex-col items-center">
            {/* Header */}
            <header className="p-6 w-full bg-white shadow-md sticky top-0 z-10 border-b border-green-200">
                <h2 className="text-4xl font-extrabold text-green-700 text-center tracking-wide">
                    🌱 Plant Manager
                </h2>
            </header>

            <main className="container mx-auto px-4 mt-10 flex flex-col items-center">
                {/* Form */}
                <section className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 border border-green-100">

                    <h3 className="text-2xl font-bold text-green-700 mb-6 text-center">
                        {editId ? "✏️ Edit Plant" : "➕ Add a New Plant"}
                    </h3>


                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-gray-600 mb-1 font-medium">Plant Name</label>
                            <input
                                type="text"
                                name="plantName"
                                placeholder="e.g. Aloe Vera"
                                value={formData.plantName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-400 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 mb-1 font-medium">Image URL</label>
                            <input
                                type="text"
                                name="plantImage"
                                placeholder="https://example.com/plant.jpg"
                                value={formData.plantImage}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-400 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 mb-1 font-medium">Description</label>
                            <textarea
                                name="plantDescription"
                                placeholder="Enter short description..."
                                value={formData.plantDescription}
                                onChange={handleChange}
                                rows="3"
                                className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-400 outline-none resize-none"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-600 mb-1 font-medium">Price (₹)</label>
                            <input
                                type="number"
                                name="plantPrice"
                                placeholder="e.g. 250"
                                value={formData.plantPrice}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-400 outline-none"
                            />
                        </div>


                        <div className="flex gap-3">
                            <button
                                type="submit"
                                className={`flex-1 text-white font-semibold py-2.5 rounded-lg shadow-md transition-all transform hover:scale-105 ${editId ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-600 hover:bg-green-700"
                                    }`}
                            >
                                {editId ? "Update Plant" : "Add Plant"}
                            </button>

                            <button
                                type="button"
                                onClick={handleReset}
                                className="flex-1 bg-gray-300 text-gray-800 font-semibold py-2.5 rounded-lg shadow-md hover:bg-gray-400 transition-all"
                            >
                                {editId ? "Cancel Edit" : "Reset"}
                            </button>
                        </div>
                    </form>
                </section>


                <section className="my-12 w-full max-w-6xl">
                    <h2 className="text-3xl font-bold text-green-700 text-center mb-8">
                        🌿 Plants Collection
                    </h2>

                    {isLoading ? (
                        <Loader />
                    ) : plantsData.length === 0 ? (
                        <p className="text-center text-gray-500 py-10">No plants available. Add one! 🌱</p>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {plantsData.map((plant) => (
                                <Card handleDelete={handleDelete} handleEdit={handleEdit} plant={plant} />
                            ))}
                        </div>
                    )}

                </section>
            </main>
        </div>
    );
}
