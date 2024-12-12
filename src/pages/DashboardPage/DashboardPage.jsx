import React, { useEffect, useState } from "react";
import AddModal from "./AddModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashboardPage = () => {
  const [catagories, setCatagories] = useState([]);
  const [modal, setModal] = useState(false);
  const getCategories = () => {
    fetch("https://realauto.limsa.uz/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCatagories(data?.data);
      });
  };
  useEffect(() => {
    getCategories();
  }, []);
  
  // const handleDeleteCategory = (id) => {
  //   fetch(`https://realauto.limsa.uz/api/categories/${id}`, {
  //     method: "DELETE",
  //     headers: {
  //       // "Content-Type": "application/json",
  //       "Authorization": `Bearer ${localStorage.getItem("tokenchik")}`,
  //     },
  //   })
  //    .then((res) => res.json())
  //    .then((data) => {
  //       if (data?.success) {
  //         toast.success(data?.message);
  //         getCategories();
  //       }
  //     });
  // }
  
  return (
    <div className="bg-white rounded-xl">
      <table className="w-full border border-collapse border-gray-300 table-auto">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left border-b">name_en</th>
            <th className="px-4 py-3 text-left border-b border-l">name_ru</th>
            <th className="px-4 py-3 text-left border-b border-l">Image</th>
            <th className="w-[200px] py-3 pl-4 text-left border-b border-l">
              <button
                onClick={() => setModal(true)}
                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700"
              >
                Add category
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {catagories.map((item, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border-b">{item.name_en}</td>
              <td className="px-4 py-2 border-b border-l">{item.name_ru}</td>
              <td className="px-4 py-2 border-b border-l">
                <img
                  src={`https://realauto.limsa.uz/api/uploads/images/${item.image_src}`}
                  alt={item.name_en}
                  className="object-cover w-20 h-20 rounded-full"
                />
              </td>
              <td className="px-4 py-2 text-center border-b border-l">
                <button  className="px-3 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-900">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modal && (
        <AddModal
          closeModal={() => setModal(false)}
          getCategories={getCategories}
        />
      )}
    </div>
  );
};

export default DashboardPage;
