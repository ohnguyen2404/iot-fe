import { CustomerService } from "../services";
import { LOAD_CUSTOMERS, CREATE_CUSTOMER, UPDATE_CUSTOMER, REMOVE_CUSTOMER } from "./types";

export const loadCustomers = () => async (dispatch) => {
  const data = await CustomerService.getAll();
  if (data) {
    dispatch({
      type: LOAD_CUSTOMERS,
      payload: data,
    });
  }
  return data;
};

export const createCustomer = (newCustomer) => (dispatch) => {
  dispatch({
    type: CREATE_CUSTOMER,
    payload: newCustomer
  })
};

export const updateCustomer = (updatedCustomer) => (dispatch) => {
  dispatch({
    type: UPDATE_CUSTOMER,
    payload: updatedCustomer
  })
}

export const removeCustomer = (customerId) => (dispatch) => {
  dispatch({
    type: REMOVE_CUSTOMER,
    payload: customerId
  })
}
