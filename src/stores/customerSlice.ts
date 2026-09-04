import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { makeHttpReq } from "../helper/makeHttpReq";
import type { Pagination } from "./agentSlice";

export interface ICustomer {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}



interface CustomerState {
    customers: ICustomer[];
    pagination: Pagination | null;
    loading: boolean;
    error: string | null;
}


const initialState: CustomerState = {
    customers: [],
    pagination: null,
    loading: false,
    error: null,
};


export const getCustomers = createAsyncThunk(
  "get/customers",
  async (
    {
      userId,
      page = 1,
      limit = 10,
    }: {
      userId: string;
      page?: number;
      limit?: number;
    },
    { rejectWithValue }
  ) => {
    try {
      return await makeHttpReq<{
        customers: ICustomer[];
        pagination: Pagination;
      }>(
        "GET",
        `customers?userId=${userId}&page=${page}&limit=${limit}`
      );
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);



const customerSlice = createSlice({
    name: "customer",
    initialState,

    reducers: {


    },


    extraReducers: (builder) => {

        builder
        // pending
        .addCase(getCustomers.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        // success
        .addCase(getCustomers.fulfilled, (state, action) => {
            state.loading = false;
            state.customers = action.payload.customers;
            state.pagination = action.payload.pagination;
        })
        // failed
        .addCase(getCustomers.rejected, (state, action) => {
            state.loading = false;
           state.error = action.payload ?? "Unknown error";

        });

    },
});


export const {
    
} = customerSlice.actions;


export default customerSlice.reducer;