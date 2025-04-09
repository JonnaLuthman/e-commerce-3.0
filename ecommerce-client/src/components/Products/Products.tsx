import { useProduct } from "../../hooks/useProducts";
import { ActionType } from "../../reducers/CustomerReducer";
import { CreateProduct } from "./CreateProduct";
import ProductContext from "../../contexts/ProductContext";
import { useContext, useState } from "react";
import { Pagination } from "../../utils/Pagination";

export const Products = () => {
  const { deleteProductHandler } = useProduct();
  const { products, dispatch } = useContext(ProductContext);
  // const [updateProductId, setUpdateProductId] = useState<number | null>(null);
  const [openCreate, setOpenCreate] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(10);

  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = [...products]
    .reverse()
    .slice(indexOfFirstProduct, indexOfLastProduct);

  const handleOpen = () => setOpenCreate(true);

  const handleUpdate = () => {
    // setUpdateProductId(id);
    handleOpen();
  };

  const handleDelete = async (id: number) => {
    await deleteProductHandler(id);
    dispatch({
      type: ActionType.DELETED,
      payload: JSON.stringify(id),
    });
  };

  const handleCreate = () => {
    handleOpen();
  };

  return (
    <div>
      {openCreate ? (
        <CreateProduct handleClose={() => setOpenCreate(false)} />
      ) : (
        <div className="flex justify-center">
        <button
          onClick={handleCreate}
          className="flex items-center justify-center rounded-full border m-6 px-5 py-2.5 hover:bg-[var(--primary-btn-color)] hover:text-[var(--primary-btn-text)]"
        >
          Create new product
        </button>
        </div>
      )}

        <div className="relative overflow-x-auto shadow-md">
        <table className="w-auto text-sm text-left rtl:text-right mx-[5rem] border border-gray-300">
        <caption className="p-5 text-lg font-semibold text-left rtl:text-right bg-white border-l border-t border-r border-gray-300">
              Products
            </caption>
            <thead className="text-xs uppercase bg-gray-100 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            {currentProducts.map((product) => (
              <tbody key={product.id}>
            <tr className="bg-white border-t border-gray-300">
                  <th
                    scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {product.id}
                  </th>
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">{product.price}:-</td>
                  <td className="px-6 py-4">{product.description}</td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4">{product.stock}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleUpdate()}
                      className="block font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="block font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
          <Pagination
            itemsPerPage={productPerPage}
            totalItems={products.length}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
    </div>
  );
};
