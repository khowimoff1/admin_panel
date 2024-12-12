import React, { useEffect, useMemo, useState } from "react";
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

  // paginton
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(catagories.length / itemsPerPage);
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return catagories.slice(startIndex, endIndex);
  }, [catagories, currentPage]);
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteCategory = (id) => {
    const isConfirmed = window.confirm("Ushbu kategoriyani o'chirishni xohlaysizmi?");
    if (!isConfirmed) return; // Agar foydalanuvchi bekor qilsa, hech nima qilinmaydi
  
    fetch(`https://realauto.limsa.uz/api/categories/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("tokenchik")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          toast.success(data?.message);
          getCategories();
        } else {
          toast.error(data?.message || "Kategoriyani o'chirishda xatolik yuz berdi.");
        }
      })
      .catch(() => {
        toast.error("Kategoriyani o'chirish amalga oshmadi.");
      });
  };

  return (
    <div className="bg-white rounded-xl">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                name_en
              </th>
              <th scope="col" className="px-6 py-3">
                name_ru
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="w-[200px] px-6 py-3 text-end">
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
            {currentItems.map((item, index) => (
              <tr
                key={index}
                className="border-b odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-1">{item.name_en}</td>
                <td className="px-6 py-1">{item.name_ru}</td>
                <td className="px-6 py-1">
                  <img
                    src={`https://realauto.limsa.uz/api/uploads/images/${item.image_src}`}
                    alt={item.name_en}
                    className="object-cover w-20 h-20 rounded-full"
                  />
                </td>
                <td className="px-6 py-1 text-end">
                  <button
                    onClick={() => handleDeleteCategory(item.id)}
                    className="px-3 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-center px-4 py-2 bg-white border-t dark:bg-gray-800 dark:border-gray-700">
          <nav className="inline-flex items-center space-x-1">
            <button
              onClick={() => handlePageClick(Math.max(currentPage - 1, 1))}
              className={`px-3 py-1 rounded-md ${
                currentPage === 1
                  ? "text-gray-400"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => handlePageClick(page)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === page
                      ? "bg-gray-700 text-white dark:bg-gray-500"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  {page}
                </button>
              )
            )}
            <button
              onClick={() =>
                handlePageClick(Math.min(currentPage + 1, totalPages))
              }
              className={`px-3 py-1 rounded-md ${
                currentPage === totalPages
                  ? "text-gray-400"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </nav>
        </div>
      </div>
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
