import React, { FormEvent, useContext, useEffect, useState } from "react";
import { useProduct } from "../../hooks/useProducts";
import { ActionType } from "../../reducers/CustomerReducer";
import { Product } from "../../types/Product";
import ProductContext from "../../contexts/ProductContext";


interface IUpdateProductProps {
  productId: number;
  setEditingProductId: (id: number | null) => void;
}

export const UpdateProduct = (props: IUpdateProductProps) => {
  const { updateProductHandler, fetchProductByIdHandler } = useProduct();
  const { dispatch } = useContext(ProductContext);
  const [product, setProduct] = useState<Product>({
    id: 0,
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
    image: "",
    created_at: "",
  });

  useEffect(() => {
    if (!props.productId) return;

    const fetchData = async () => {
      const data = await fetchProductByIdHandler(props.productId);
      if (data) {
        setProduct(data);
      }
    };

    fetchData();
  }, []);

  const handleBackClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.setEditingProductId(null);
  };

  const handleChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => {
      if (!prevProduct) return prevProduct;
      return { ...prevProduct, [name]: value };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!product) return;
    await updateProductHandler(product.id, product);
    dispatch({
      type: ActionType.UPDATED,
      payload: JSON.stringify(product),
    });
    props.setEditingProductId(null)
  };

  return (
    <div className="bg-white p-8 rounded-lg max-w-4xl mx-auto w-full">
      <h2 className="text-xl font-semibold mb-6">Update product</h2>
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 w-full">
            <input
              className="flex-1 w-full min-w-[50%] p-4 border-b border-gray-300 rounded"
              onChange={handleChange}
              type="text"
              name="name"
              placeholder="Product title"
              required
              defaultValue={product.name}
            />

            <input
              className="flex-1 w-full min-w-[50%] p-4 border-b border-gray-300 rounded"
              onChange={handleChange}
              type="text"
              name="description"
              placeholder="Description"
              required
              defaultValue={product.description}
            />
            <input
              className="flex-1 w-full min-w-[50%] p-4 border-b border-gray-300 rounded"
              onChange={handleChange}
              type="text"
              name="price"
              placeholder="Price"
              required
              defaultValue={product.price === 0 ? "" : product.price}
            />
            <input
              className="flex-1 w-full min-w-[50%] p-4 border-b border-gray-300 rounded"
              onChange={handleChange}
              type="text"
              name="stock"
              placeholder="Stock"
              required
              defaultValue={product.stock === 0 ? "" : product.stock}
            />
            <input
              className="flex-1 w-full min-w-[50%] p-4 border-b border-gray-300 rounded"
              onChange={handleChange}
              type="text"
              name="category"
              placeholder="Category"
              required
              defaultValue={product.category}
            />
            <input
              className="flex-1 w-full min-w-[50%] p-4 border-b border-gray-300 rounded"
              onChange={handleChange}
              type="text"
              name="image"
              placeholder="Image URL"
              required
              defaultValue={product.image}
            />

        <div className="w-full flex justify-between mt-6">
          <button
            type="button"
            onClick={handleBackClick}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Update product
          </button>
        </div>
      </form>
    </div>
  );
};

