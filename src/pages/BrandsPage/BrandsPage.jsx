import React, { useEffect, useMemo, useState } from "react";
import BrandsModal from "./BrandsModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChangeBrands from "./ChangeBrands";

const BrandsPage = () => {
  const [brands, setBrands] = useState([]);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [changeModal,setChangeModal] = useState(false);
  //paginton
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(brands.length / itemsPerPage);
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return brands.slice(startIndex, endIndex);
  }, [brands, currentPage]);
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  //get
  const getBrands = () => {
    fetch("https://realauto.limsa.uz/api/brands", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setBrands(data?.data);
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    getBrands();
  },[]);

  //delete
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const handleDeleteBrands = (id) => {
    setSelectedId(id);
    setShowConfirm(true);
  };
  const confirmDelete = () => {
    fetch(`https://realauto.limsa.uz/api/brands/${selectedId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenchik")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          toast.success(data?.message);
          getBrands();
        } else {
          toast.error(
            data?.message || "Kategoriyani o'chirishda xatolik yuz berdi."
          );
        }
      })
      .catch(() => {
        toast.error("Kategoriyani o'chirish amalga oshmadi.");
      })
      .finally(() => {
        setShowConfirm(false);
        setSelectedId(null);
      });
  };
  const cancelDelete = () => {
    setShowConfirm(false);
    setSelectedId(null);
  };

  //change
  const [changeItem,setChangeItem] = useState([])
    const changeModales = (item) => {
      setChangeItem(item);
      setChangeModal(true);
    }

  return (
    <div>
      <div className="overflow-x-auto bg-white shadow-md sm:rounded-lg">
        {!loading ? (
          <>
            <table className="w-full text-sm text-left text-gray-500 rounded-s-xl rtl:text-right dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    title
                  </th>
                  <th scope="col" className="px-6 py-3 min-w-32">
                    Image
                  </th>
                  <th scope="col" className="w-[200px] px-6 py-3 text-end">
                    <button
                      onClick={() => setModal(true)}
                      className="px-1 py-3 text-xs text-white bg-blue-500 rounded-md min-w-32 md:text-base md:px-4 md:py-2 hover:bg-blue-700"
                    >
                      Add Brans
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
                    <td className="px-6 py-1">{item.title}</td>
                    <td className="px-6 py-1">
                      <img
                        src={`https://realauto.limsa.uz/api/uploads/images/${item.image_src}`}
                        alt={item.name_en}
                        className="object-cover w-20 h-20 rounded-full"
                      />
                    </td>
                    <td className="px-6 py-1 space-x-3 text-end">
                      <button
                        onClick={() => changeModales(item)}
                        className="px-3 py-1 text-sm text-white bg-gray-500 rounded-md hover:bg-gray-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteBrands(item.id)}
                        className="px-3 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-center px-4 py-2 bg-white dark:bg-gray-800 dark:border-gray-700">
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
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
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
                ))}
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
            </div>{" "}
          </>
        ) : (
          <div
            role="status"
            className="p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 md:px-10 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
              <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
              <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
              <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
              <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
              <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
              <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <span className="sr-only">Loading...</span>
          </div>
        )}
        {showConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-6 bg-white rounded shadow-lg">
              <h2 className="mb-4 text-xl font-bold">Tasdiqlash</h2>
              <p>Ushbu kategoriyani o'chirishni xohlaysizmi?</p>
              <div className="flex justify-end mt-6">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 mr-2 text-white bg-gray-500 rounded"
                >
                  Bekor qilish
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 text-white bg-red-500 rounded"
                >
                  O'chirish
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {modal && (
        <BrandsModal closeModal={() => setModal(false)} getBrands={getBrands} />
      )}
      {changeModal && (
        <ChangeBrands
          changeModal={() => setChangeModal(false)}
          changeItems={changeItem}
          getBrands={getBrands}
        />
      )}
    </div>
  );
};

export default BrandsPage;
