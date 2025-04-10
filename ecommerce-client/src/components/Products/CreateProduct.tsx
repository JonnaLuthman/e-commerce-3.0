import { FormEvent, useContext, useState } from "react";

import { useProduct } from "../../hooks/useProducts";
import { ActionType } from "../../reducers/CustomerReducer";
import { ProductCreate } from "../../types/Product";
import ProductContext from "../../contexts/ProductContext";

export const CreateProduct = () => {
  const { fetchProductsHandler, createProductHandler } = useProduct();
  const { dispatch } = useContext(ProductContext);
  const [newProduct, setNewProduct] = useState<ProductCreate>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
    image: "",
  });

  const [showCreateProduct, setShowCreateProduct] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await createProductHandler(newProduct);
    const updatedProducts = await fetchProductsHandler();
    console.log(updatedProducts);
    dispatch({
      type: ActionType.LOADED,
      payload: JSON.stringify(updatedProducts),
    });
    // handleClose()
    setShowCreateProduct(false);
  };

  return (
    <>
      {!showCreateProduct ? (
        <button
          onClick={() => {
            setShowCreateProduct(true);
          }}
          className="flex items-center justify-start rounded-full border px-5 py-2.5 m-6 hover:bg-[var(--primary-btn-color)] hover:text-[var(--primary-btn-text)]"
        >
          Create product
        </button>
      ) : (
        <div className="flex flex-wrap bg-white border border-gray-300 p-8 rounded-lg max-w-4xl mx-auto my-6">
          <h2 className="text-2xl font-semibold mb-6">Create Product</h2>
          <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 w-full">
            <input
              className="flex-1 w-full min-w-[250px] p-4 border-b border-gray-300 rounded"
              onChange={handleChange}
              type="text"
              name="name"
              placeholder="Product title"
              required
              defaultValue={newProduct.name}
            />

            <input
              className="flex-1 w-full min-w-[250px] p-4 border-b border-gray-300 rounded"
              onChange={handleChange}
              type="text"
              name="description"
              placeholder="Description"
              required
              defaultValue={newProduct.description}
            />
            <input
              className="flex-1 w-full min-w-[250px] p-4 border-b border-gray-300 rounded"
              onChange={handleChange}
              type="text"
              name="price"
              placeholder="Price"
              required
              defaultValue={newProduct.price === 0 ? "" : newProduct.price}
            />
            <input
              className="flex-1 w-full min-w-[250px] p-4 border-b border-gray-300 rounded"
              onChange={handleChange}
              type="text"
              name="stock"
              placeholder="Stock"
              required
              defaultValue={newProduct.stock === 0 ? "" : newProduct.stock}
            />
            <input
              className="flex-1 w-full min-w-[250px] p-4 border-b border-gray-300 rounded"
              onChange={handleChange}
              type="text"
              name="category"
              placeholder="Category"
              required
              defaultValue={newProduct.category}
            />
            <input
              className="flex-1 w-full min-w-[250px] p-4 border-b border-gray-300 rounded"
              onChange={handleChange}
              type="text"
              name="image"
              placeholder="Image URL"
              required
              defaultValue={newProduct.image}
            />
            <div className="w-full flex justify-between mt-6">
              <button
                type="submit"
                className="flex items-center justify-start rounded-full border px-5 py-2.5 my-6 bg-[var(--primary-btn-color)] text-[var(--primary-btn-text)] hover:cursor-pointer"
                onClick={() => {
                  setShowCreateProduct(false);
                }}
              >
                Close
              </button>
              <button
                type="submit"
                className="flex items-center justify-start rounded-full border px-5 py-2.5 my-6 bg-[var(--primary-btn-color)] text-[var(--primary-btn-text)] hover:cursor-pointer"
              >
                Create product
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

