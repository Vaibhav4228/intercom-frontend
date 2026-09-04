import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { makeHttpReq } from "../helper/makeHttpReq";
import type { Pagination } from "./agentSlice";

export interface ISession {
  _id: string;
  title?: string;
  duration: number;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

interface SessionState {
  sessions: ISession[];
  pagination: Pagination | null;
  loading: boolean;
  error: string | null;
}

const initialState: SessionState = {
  sessions: [],
  pagination: null,
  loading: false,
  error: null,
};


export const getSessions = createAsyncThunk(
  "get/sessions",
  async (
    {
      page = 1,
      limit = 10,
      search = "",
      status = "",
    }: {
      page?: number;
      limit?: number;
      search?: string;
      status?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      return await makeHttpReq<{
        sessions: ISession[];
        pagination: Pagination;
      }>(
        "GET",
        `sessions?page=${page}&limit=${limit}&search=${search}&status=${status}`
      );
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);







const sessionSlice = createSlice({
  name: "session",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Get sessions
      .addCase(getSessions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getSessions.fulfilled, (state, action) => {
        state.loading = false;
        state.sessions = action.payload.sessions;
        state.pagination = action.payload.pagination;
      })

      .addCase(getSessions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })



  },
});


export const {} = sessionSlice.actions;

export default sessionSlice.reducer;