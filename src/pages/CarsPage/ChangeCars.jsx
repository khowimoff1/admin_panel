import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ChangeCars = ({ changeModal, changeItems }) => {
  const [selectBrand, setSelectBrand] = useState(changeItems.brand_id || "");
  const [selectModel, setSelectModel] = useState(changeItems.model_id || "");
  const [selectCity, setSelectCity] = useState(changeItems.city_id || "");
  const [selectCategory, setSelectCategory] = useState(
    changeItems.category_id || ""
  );
  const [selectLocation, setSelectLocation] = useState(
    changeItems.location_id || ""
  );
  const [modelImage, setModelImage] = useState(changeItems.images || "");
  const [brandImage, setBrandImage] = useState(changeItems.images || "");
  const [cover, setCover] = useState(changeItems.cover || "");
  const [maxSpeed, setMaxSpeed] = useState(changeItems.max_speed || "");
  const [maxPeople, setMaxPeople] = useState(changeItems.max_people || "");
  const [transmission, setTransmission] = useState(
    changeItems.transmission || ""
  );
  const [motor, setMotor] = useState(changeItems.motor || "");
  const [driveSide, setDriveSide] = useState(changeItems.drive_side || "");
  const [petrol, setPetrol] = useState(changeItems.petrol || "");
  const [limitperday, setLimitperday] = useState(changeItems.limitperday || "");
  const [deposit, setDeposit] = useState(changeItems.deposit || "");
  const [premiumProtection, setpremiumProtection] = useState(
    changeItems.premium_protection || ""
  );
  const [priceAed, setPriceAed] = useState(changeItems.price_in_aed || "");
  const [priceUsd, setPriceUsd] = useState(changeItems.price_in_usd || "");
  const [priceAedSel, setPriceAedSel] = useState(
    changeItems.price_in_aed_sale || ""
  );
  const [priceUsdSel, setPriceUsdSel] = useState(
    changeItems.price_in_usd_sale || ""
  );
  const [inclusive, setInclusive] = useState(changeItems.inclusive || "");
  const [year, setYear] = useState(changeItems.year || "");
  const [color, setColor] = useState(changeItems.color || "");
  const [seconds, setSeconds] = useState(changeItems.seconds || "");

  const handleChange = (e) => {
    e.preventDefault();

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

    fetch(`https://realauto.limsa.uz/api/cars/${changeItems.id}`, {
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
      getModels();
      getCities();
      getCategories();
      getLocations();
    }, []);

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center h-full bg-black bg-opacity-50 ">
      <div className="max-h-screen p-6 overflow-y-auto bg-white rounded-lg lg:w-1/3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Edit Category</h1>
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
              value={color}
              onChange={(e) => setColor(e?.target?.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block mb-1 text-sm font-medium text-gray-700">
              year
            </label>
            <input
              type="number"
              required
              value={year}
              onChange={(e) => setYear(e?.target?.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block mb-1 text-sm font-medium text-gray-700">
              seconds
            </label>
            <input
              type="number"
              required
              value={seconds}
              onChange={(e) => setSeconds(e?.target?.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block mb-1 text-sm font-medium text-gray-700">
              max_speed
            </label>
            <input
              type="number"
              required
              value={maxSpeed}
              onChange={(e) => setMaxSpeed(e?.target?.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block mb-1 text-sm font-medium text-gray-700">
              max_people
            </label>
            <input
              type="number"
              required
              value={maxPeople}
              onChange={(e) => setMaxPeople(e?.target?.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block mb-1 text-sm font-medium text-gray-700">
              transmission
            </label>
            <input
              type="text"
              required
              value={transmission}
              onChange={(e) => setTransmission(e?.target?.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block mb-1 text-sm font-medium text-gray-700">
              motor
            </label>
            <input
              type="text"
              required
              value={motor}
              onChange={(e) => setMotor(e?.target?.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block mb-1 text-sm font-medium text-gray-700">
              drive_side
            </label>
            <input
              type="text"
              required
              value={driveSide}
              onChange={(e) => setDriveSide(e?.target?.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block mb-1 text-sm font-medium text-gray-700">
              petrol
            </label>
            <input
              type="text"
              required
              value={petrol}
              onChange={(e) => setPetrol(e?.target?.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block mb-1 text-sm font-medium text-gray-700">
              limitperday
            </label>
            <input
              type="number"
              required
              value={limitperday}
              onChange={(e) => setLimitperday(e?.target?.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block mb-1 text-sm font-medium text-gray-700">
              deposit
            </label>
            <input
              type="number"
              required
              value={deposit}
              onChange={(e) => setDeposit(e?.target?.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block mb-1 text-sm font-medium text-gray-700">
              premium_protection
            </label>
            <input
              type="number"
              required
              value={premiumProtection}
              onChange={(e) => setpremiumProtection(e?.target?.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Price in AED
            </label>
            <input
              type="number"
              required
              value={priceAed}
              onChange={(e) => setPriceAed(e?.target?.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Price in USD
            </label>
            <input
              type="number"
              required
              value={priceUsd}
              onChange={(e) => setPriceUsd(e?.target?.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Price in AED Sale
            </label>
            <input
              type="number"
              required
              value={priceAedSel}
              onChange={(e) => setPriceAedSel(e?.target?.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Price in USD Sale
            </label>
            <input
              type="number"
              required
              value={priceUsdSel}
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

export default ChangeCars;
