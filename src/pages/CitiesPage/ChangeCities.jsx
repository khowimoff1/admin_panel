import React, { useState } from "react";
import { toast } from "react-toastify";

const ChangeCities = ({ changeModal, changeItems, getCities }) => {
    const [name, setName] = useState(changeItems.name || "");
    const [text, setText] = useState(changeItems.text || "");
    const [file, setFile] = useState(null);
  
    const handleChange = (e) => {
      e.preventDefault();
  
      if (!name || !text || !file) {
        toast.error("Barcha maydonlarni to‘ldiring!");
        return;
      }
  
      const formData = new FormData();
      formData.append("name", name);
      formData.append("text", text);
      formData.append("images", file);
  
      fetch(`https://realauto.limsa.uz/api/cities/${changeItems.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenchik")}`,
        },
        body: formData,
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Error: ${res.status} - ${res.statusText}`);
          }
          return res.json();
        })
        .then((data) => {
          if (data?.success) {
            toast.success(data?.message);
            getCities();
            changeModal();
          } else {
            toast.error(
              data?.message || "Kategoriyani yangilashda xatolik yuz berdi."
            );
          }
        })
        .catch((err) => {
          toast.error("Kategoriyani yangilash amalga oshmadi.");
          console.error(err);
        });
    };
  
    return (
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
        <div className="p-6 bg-white rounded-lg lg:w-1/3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Edit Cities</h1>
            <button
              onClick={changeModal}
              className="px-2 py-1 text-lg font-bold text-gray-500 rounded-full"
            >
              x
            </button>
          </div>
          <form onSubmit={handleChange} className="mt-5">
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Name (English)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="block mt-3 mb-1 text-sm font-medium text-gray-700">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Name (English)
              </label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={changeModal}
                className="px-4 py-2 mr-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

export default ChangeCities;
