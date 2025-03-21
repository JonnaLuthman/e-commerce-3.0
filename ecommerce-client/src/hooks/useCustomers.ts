import { useState } from "react";
import { Customer, CustomerCreate, CustomerPublic } from "../types/Customer";
import { createCustomer, deleteCustomer, fetchCustomerByEmail, fetchCustomerById, fetchCustomers, updateCustomer } from "../services/customerService";

export const useCustomers = () => {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchCustomersHandler = async () => {
    setIsLoading(true);
    try {
      const data = await fetchCustomers();
      return data;
    } catch (error) {
      setError("Error fetching customers");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCustomerByIdHandler = async (id: number) => {
    setIsLoading(true);
    try {
      const data = await fetchCustomerById(id);
      return data;
    } catch (error) {
      setError("Error fetching customer");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCustomerByEmailHandler = async (email: string) => {
    setIsLoading(true);
    try {
      const data = await fetchCustomerByEmail(email);
      console.log("data", data)
      return data;
    } catch (error) {
      setError("Error fetching customer");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCustomerHandler = async (id: number) => {
    setIsLoading(true);
    try {
      await deleteCustomer(id);
    } catch (error) {
      setError("Error: Could not delete customer");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateCustomerHandler = async (id: number, payload: Customer) => {
    setIsLoading(true);
    try {
      await updateCustomer(id, payload);
    } catch (error) {
      setError("Error: Could not update customer");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };


  const createCustomerHandler = async (payload: CustomerCreate | CustomerPublic) => {
    setIsLoading(true);
    try {
      const data = await createCustomer(payload);
      return data;

    } catch (error) {
      setError("Error: Could not delete customer");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    fetchCustomersHandler,
    deleteCustomerHandler,
    updateCustomerHandler,
    fetchCustomerByIdHandler,
    createCustomerHandler, 
    fetchCustomerByEmailHandler
  };
};
