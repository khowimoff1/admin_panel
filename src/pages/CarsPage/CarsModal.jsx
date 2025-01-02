import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CarsModal = ({ closeModal, getCars }) => {
  const [selectBrand, setSelectBrand] = useState(null);
  const [selectModel, setSelectModel] = useState(null);
  const [selectCity, setSelectCity] = useState(null);
  const [selectCategory, setSelectCategory] = useState(null);
  const [selectLocation, setSelectLocation] = useState(null);
  const [modelImage, setModelImage] = useState(null);
  const [brandImage, setBrandImage] = useState(null);
  const [cover, setCover] = useState(null);
  const [maxSpeed, setMaxSpeed] = useState(null);
  const [maxPeople, setMaxPeople] = useState(null);
  const [transmission, setTransmission] = useState();
  const [motor, setMotor] = useState(null);
  const [driveSide, setDriveSide] = useState();
  const [petrol, setPetrol] = useState();
  const [limitperday, setLimitperday] = useState();
  const [deposit, setDeposit] = useState();
  const [premiumProtection, setpremiumProtection] = useState();
  const [priceAed, setPriceAed] = useState();
  const [priceUsd, setPriceUsd] = useState();
  const [priceAedSel, setPriceAedSel] = useState();
  const [priceUsdSel, setPriceUsdSel] = useState();
  const [inclusive, setInclusive] = useState();
  const [year, setYear] = useState();
  const [color, setColor] = useState();
  const [seconds, setSeconds] = useState();
  const formData = new FormData();
  formData.append("brand_id", selectBrand);
  formData.append("model_id", selectModel);
  formData.append("city_id", selectCity);
  formData.append("category_id", selectCategory);
  formData.append("location_id", selectLocation);
  formData.append("year", year);
  formData.append("color", color);
  formData.append("seconds", seconds);
  formData.append("max_speed", maxSpeed);
  formData.append("max_people", maxPeople);
  formData.append("transmission", transmission);
  formData.append("motor", motor);
  formData.append("drive_side", driveSide);
  formData.append("petrol", petrol);
  formData.append("limitperday", limitperday);
  formData.append("deposit", deposit);
  formData.append("premium_protection", premiumProtection);
  formData.append("price_in_aed", priceAed);
  formData.append("price_in_usd", priceUsd);
  formData.append("price_in_aed_sale", priceAedSel);
  formData.append("price_in_usd_sale", priceUsdSel);
  formData.append("inclusive", inclusive);
  formData.append("cover", cover);
  formData.append("images", modelImage);
  formData.append("images", brandImage);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://realauto.limsa.uz/api/cars", {
      method: "POST",
      headers: { AUTHORIZATION: `Bearer ${localStorage.getItem("tokenchik")}` },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          toast.success(data?.message);
          getCars();
          e?.target?.reset();
          closeModal(true);
        } else {
          toast.error(data?.message);
        }
      });
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
  //   model
  const [models, setModels] = useState([]);
  const getModels = () => {
    fetch("https://realauto.limsa.uz/api/models", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setModels(data?.data);
      });
  };

  //   city
  const [cities, setCities] = useState([]);
  const getCities = () => {
    fetch("https://realauto.limsa.uz/api/cities", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setCities(data?.data);
      });
  };

  //   category
  const [categories, setCategories] = useState([]);
  const getCategories = () => {
    fetch("https://realauto.limsa.uz/api/categories", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setCategories(data?.data);
      });
  };

  //   location
  const [locations, setLocations] = useState([]);
  const getLocations = () => {
    fetch("https://realauto.limsa.uz/api/locations", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setLocations(data?.data);
      });
  };

  useEffect(() => {
    getBrands();
    getCars();
    getModels();
    getCities();
    getCategories();
    getLocations();
  }, []);

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center h-full bg-black bg-opacity-50 ">
      <div className="max-h-screen p-6 overflow-y-auto bg-white rounded-lg lg:w-1/3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Add New Cars</h1>
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
              Select Models
            </label>
            <select
              name="Model"
              id="Models"
              onChange={(e) => setSelectModel(e.target.value)}
              className="w-full mb-5 text-sm font-medium text-gray-700"
              defaultValue=""
            >
              <option value="" disabled>
                Select Models
              </option>
              {models.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Select Cities
            </label>
            <select
              name="Cities"
              id="Cities"
              onChange={(e) => setSelectCity(e.target.value)}
              className="w-full mb-5 text-sm font-medium text-gray-700"
              defaultValue=""
            >
              <option value="" disabled>
                Select Cities
              </option>
              {cities.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Select Categories
            </label>
            <select
              name="Category"
              id="Category"
              onChange={(e) => setSelectCategory(e.target.value)}
              className="w-full mb-5 text-sm font-medium text-gray-700"
              defaultValue=""
            >
              <option value="" disabled>
                Select Categories
              </option>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name_en}
                </option>
              ))}
            </select>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Select Locations
            </label>
            <select
              name="location"
              id="Location"
              onChange={(e) => setSelectLocation(e.target.value)}
              className="w-full mb-5 text-sm font-medium text-gray-700"
              defaultValue=""
            >
              <option value="" disabled>
                Select Location
              </option>
              {locations.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              color
            </label>
            <input
              type="text"
              required
              onChange={(e) => setColor(e?.target?.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block mb-1 text-sm font-medium text-gray-700">
              year
            </label>
            <input
              type="number"
              required
              onChange={(e) => setYear(e?.target?.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block mb-1 text-sm font-medium text-gray-700">
              seconds
            </label>
            <input
              type="number"
              required
              onChange={(e) => setSeconds(e?.target?.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block mb-1 text-sm font-medium text-gray-700">
              max_speed
            </label>
            <input
              type="number"
              required
              onChange={(e) => setMaxSpeed(e?.target?.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block mb-1 text-sm font-medium text-gray-700">
              max_people
            </label>
            <input
              type="number"
              required
              onChange={(e) => setMaxPeople(e?.target?.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block mb-1 text-sm font-medium text-gray-700">
              transmission
            </label>
            <input
              type="text"
              required
              onChange={(e) => setTransmission(e?.target?.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block mb-1 text-sm font-medium text-gray-700">
              motor
            </label>
            <input
              type="text"
              required
              onChange={(e) => setMotor(e?.target?.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block mb-1 text-sm font-medium text-gray-700">
              drive_side
            </label>
            <input
              type="text"
              required
              onChange={(e) => setDriveSide(e?.target?.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block mb-1 text-sm font-medium text-gray-700">
              petrol
            </label>
            <input
              type="text"
              required
              onChange={(e) => setPetrol(e?.target?.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block mb-1 text-sm font-medium text-gray-700">
              limitperday
            </label>
            <input
              type="number"
              required
              onChange={(e) => setLimitperday(e?.target?.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block mb-1 text-sm font-medium text-gray-700">
              deposit
            </label>
            <input
              type="number"
              required
              onChange={(e) => setDeposit(e?.target?.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block mb-1 text-sm font-medium text-gray-700">
              premium_protection
            </label>
            <input
              type="number"
              required
              onChange={(e) => setpremiumProtection(e?.target?.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Price in AED
            </label>
            <input
              type="number"
              required
              onChange={(e) => setPriceAed(e?.target?.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Price in USD
            </label>
            <input
              type="number"
              required
              onChange={(e) => setPriceUsd(e?.target?.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Price in AED Sale
            </label>
            <input
              type="number"
              required
              onChange={(e) => setPriceAedSel(e?.target?.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Price in USD Sale
            </label>
            <input
              type="number"
              required
              onChange={(e) => setPriceUsdSel(e?.target?.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block mb-1 text-sm font-medium text-gray-700">
              inclusive
            </label>
            <select
              name="insluve"
              id="insluve"
              onChange={(e) => setInclusive(e.target.value)}
              className="w-full mb-5 text-sm font-medium text-gray-700"
              defaultValue=""
            >
              <option value="" disabled>
                Select Insluve
              </option>
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              cover
            </label>
            <input
              type="file"
              required
              accept="image/*"
              onChange={(e) => setCover(e.target.files[0])}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Image
            </label>
            <input
              type="file"
              required
              accept="image/*"
              onChange={(e) => setBrandImage(e.target.files[0])}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Image
            </label>
            <input
              type="file"
              required
              accept="image/*"
              onChange={(e) => setModelImage(e.target.files[0])}
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

export default CarsModal;
