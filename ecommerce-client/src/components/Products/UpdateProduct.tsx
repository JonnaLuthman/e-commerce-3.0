import React, { FormEvent, useContext, useEffect, useState } from "react";
import { useProduct } from "../../hooks/useProducts";
import { ActionType } from "../../reducers/CustomerReducer";
import { Product } from "../../types/Product";
import ProductContext from "../../contexts/ProductContext";


interface IUpdateProductProps {
  productId: number;
  setUpdateProductId: (id: number | null) => void;
}

export const UpdateProduct = (props: IUpdateProductProps) => {
  const [updatedProduct, setUpdatedProduct] = useState<Product>({
    id: 0,
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
    image: "",
    created_at: "",
  });
  const { dispatch } = useContext(ProductContext);
  const { updateProductHandler, fetchProductByIdHandler } = useProduct();

  useEffect(() => {
    if (!props.productId) return;

    const fetchData = async () => {
      const data = await fetchProductByIdHandler(props.productId);
      if (data) {
        setUpdatedProduct(data);
      }
    };

    fetchData();
  }, []);

  const handleBackClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.setUpdateProductId(null);
  };

  const handleChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevProduct) => {
      if (!prevProduct) return prevProduct;
      return { ...prevProduct, [name]: value };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!updatedProduct) return;
    await updateProductHandler(updatedProduct.id, updatedProduct);
    dispatch({
      type: ActionType.UPDATED,
      payload: JSON.stringify(updatedProduct),
    });
    props.setUpdateProductId(null)
  };

  return (
    <div
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        padding: "20px",
        borderRadius: "8px",
        maxWidth: "500px",
        margin: "auto",
      }}
    >
      <h2
        style={{ textAlign: "center", marginBottom: "15px", fontSize: "1.8em" }}
      >
        Update Product
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={updatedProduct?.name}
          required
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={updatedProduct?.description}
          onChange={handleChange}
          required
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            height: "80px",
          }}
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={updatedProduct?.price}
          onChange={handleChange}
          required
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="text"
          name="stock"
          placeholder="Stock"
          value={updatedProduct?.stock}
          onChange={handleChange}
          required
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={updatedProduct?.category}
          onChange={handleChange}
          required
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={updatedProduct?.image}
          onChange={handleChange}
          required
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={(e) => {
            handleBackClick(e);
          }}
        >
          Back
        </button>
        <button
          type="submit"
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            marginTop: "10px",
          }}
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

