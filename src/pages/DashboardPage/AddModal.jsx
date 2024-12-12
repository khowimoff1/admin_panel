import React, { useState } from "react";
import { toast } from "react-toastify";

const AddModal = ({ closeModal, getCategories }) => {
  const [nameEn, setNameEn] = useState();
  const [nameRu, setNameRu] = useState();
  const [file, setFile] = useState();
  const token = localStorage.getItem("tokenchik")
  const formdata = new FormData();
  formdata.append("name_en", nameEn);
  formdata.append("name_ru", nameRu);
  formdata.append("images", file);
  
  const createCatagories = (e) => {
    e.preventDefault();
    fetch("https://realauto.limsa.uz/api/categories", {
      method: "POST",
      headers: {
        // "Content-Type": "multipart/form-data",
        "AUTHORIZATION": `Bearer ${token}`
      },
      body: formdata,
    })
      .then((res) => res.json())
      .then((data) => {
        if(data?.success){
          toast.success(data?.message)
          getCategories()
          e?.target?.reset()
          closeModal(true)
        }else{
          toast.error(data?.message)
        }
      });
  };
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-1/3 p-6 bg-white rounded-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Add New Category</h1>
          <button
            onClick={closeModal}
            className="px-2 py-1 text-lg font-bold text-gray-500 rounded-full"
          >
            x
          </button>
        </div>
        <form onSubmit={createCatagories} className="mt-5">
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              name_en
            </label>
            <input
              type="text"
              required
              onChange={(e) => setNameEn(e?.target?.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block mt-3 mb-1 text-sm font-medium text-gray-700">
              name_ru
            </label>
            <input
              type="text"
              required
              onChange={(e) => setNameRu(e?.target?.value)}
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
              type="button"
              onClick={closeModal}
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

export default AddModal;
