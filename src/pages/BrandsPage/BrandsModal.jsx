import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BrandsModal = ({ closeModal,getBrands }) => {
  const [title, setTitle] = useState();
  const [file, setFile] = useState();
  const formData = new FormData();
  formData.append("title", title);
  formData.append("images", file);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://realauto.limsa.uz/api/brands", {
      method: "POST",
      headers: { AUTHORIZATION: `Bearer ${localStorage.getItem("tokenchik")}` },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          toast.success(data?.message);
          getBrands();
          e?.target?.reset();
          closeModal(true);
        } else {
          toast.error(data?.message);
        }
      });
      
    setTitle("");
    setFile(null);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 bg-white rounded-lg lg:w-1/3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Add New Brands</h1>
          <button
            onClick={closeModal}
            className="px-2 py-1 text-lg font-bold text-gray-500 rounded-full"
          >
            x
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mt-5">
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              title
            </label>
            <input
              type="text"
              required
              onChange={(e) => setTitle(e?.target?.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block mt-3 mb-1 text-sm font-medium text-gray-700">
              Uploud Image
            </label>
            <input
              type="file"
              required
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={closeModal}
              type="button"
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

export default BrandsModal;