import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModelsModal = ({ closeModal, getModels }) => {
  const [name, setName] = useState();
  const [selectBrand, setSelectBrand] = useState(null);
  const formData = new FormData();
  formData.append("name", name);
  formData.append("brand_id", selectBrand);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://realauto.limsa.uz/api/models", {
      method: "POST",
      headers: { AUTHORIZATION: `Bearer ${localStorage.getItem("tokenchik")}` },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          toast.success(data?.message);
          getModels();
          e?.target?.reset();
          closeModal(true);
        } else {
          toast.error(data?.message);
        }
      });

    setName("");
    setSelectBrand("");
    closeModal();
  };

  //   brand
  const [brands, setBrands] = useState([]);
  const getBrands = () => {
    fetch("https://realauto.limsa.uz/api/brands", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setBrands(data?.data);
      });
  };
  useEffect(() => {
    getBrands();
    getModels();
  }, []);

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 bg-white rounded-lg lg:w-1/3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Add New Modals</h1>
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
              Select Brands
            </label>
            <select
              name="brand"
              id="branda"
              onChange={(e) => setSelectBrand(e.target.value)}
              className="w-full mb-5 text-sm font-medium text-gray-700"
              defaultValue=""
            >
              <option value="" disabled>
                Select Brands
              </option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.title}
                </option>
              ))}
            </select>

            <label className="block mb-1 text-sm font-medium text-gray-700">
              name
            </label>
            <input
              type="text"
              required
              onChange={(e) => setName(e?.target?.value)}
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

export default ModelsModal;
