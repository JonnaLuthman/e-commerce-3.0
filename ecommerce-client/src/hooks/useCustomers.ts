import { useState } from "react";
import { Customer, CustomerCreate, CustomerPublic } from "../types/Customer";
import {
  createCustomer,
  deleteCustomer,
  fetchCustomerByEmail,
  fetchCustomerById,
  fetchCustomers,
  updateCustomer,
} from "../services/customerService";
import { ActionType } from "../reducers/CustomerReducer";
import { saveTolocalStorage } from "../utils/localStorageUtils";

export const useCustomers = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchCustomersHandler = async () => {
    try {
      setIsLoading(true);
      return await fetchCustomers();
    } catch (error) {
      setError("Error fetching customers");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCustomerByIdHandler = async (id: number) => {
    try {
      setIsLoading(true);
      return await fetchCustomerById(id);
    } catch (error) {
      setError("Error fetching customer");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCustomerByEmailHandler = async (email: string) => {
    try {
      setIsLoading(true);
      return await fetchCustomerByEmail(email);
    } catch (error) {
      setError("Error fetching customer");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCustomerHandler = async (id: number) => {
    try {
      setIsLoading(true);
      await deleteCustomer(id);
    } catch (error) {
      setError("Error: Could not delete customer");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateCustomerHandler = async (id: number, payload: Customer) => {
    try {
      setIsLoading(true);
      await updateCustomer(id, payload);
    } catch (error) {
      setError("Error: Could not update customer");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const createCustomerHandler = async (payload: CustomerCreate | CustomerPublic) => {
    try {
      setIsLoading(true);
      return await createCustomer(payload);
    } catch (error) {
      setError("Error: Could not create customer");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomer = async (customer: CustomerPublic, dispatch: any) => {
    try {
      const customers = await fetchCustomersHandler();
      const existingCustomer = customers.find((c) => c.email === customer.email);

      if (existingCustomer) {
        return existingCustomer.id;
      }

      const newCustomer = await createCustomerHandler(customer);
      dispatch({
        type: ActionType.LOADED,
        payload: JSON.stringify(await fetchCustomersHandler()),
      });
      saveTolocalStorage("customer", customer);
      return newCustomer.id;
    } catch (error) {
      console.error("Error handling customer:", error);
      throw error;
    }
  };

  return {
    isLoading,
    error,
    fetchCustomersHandler,
    fetchCustomerByIdHandler,
    fetchCustomerByEmailHandler,
    deleteCustomerHandler,
    updateCustomerHandler,
    createCustomerHandler,
    handleCustomer,
  };
};

