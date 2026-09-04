import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { makeHttpReq } from "../helper/makeHttpReq";
import type { Pagination } from "./agentSlice";

export interface IKnowledgeBase {
  _id: string;
  fileName: string;
  userId: string;
}

interface KnowledgeBaseState {
  knowledgeBases: IKnowledgeBase[];
  pagination: Pagination | null;
  loading: boolean;
  error: string | null;
}

const initialState: KnowledgeBaseState = {
  knowledgeBases: [],
  pagination: null,
  loading: false,
  error: null,
};

export const getKnowledgeBases = createAsyncThunk(
  "knowledgeBase/getKnowledgeBases",
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
        knowledgeBases: IKnowledgeBase[];
        pagination: Pagination;
      }>(
        "GET",
        `knowledbases?userId=${userId}&page=${page}&limit=${limit}`
      );
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const knowledgeBaseSlice = createSlice({
  name: "knowledgeBase",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getKnowledgeBases.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getKnowledgeBases.fulfilled, (state, action) => {
        state.loading = false;
        state.knowledgeBases = action.payload.knowledgeBases;
        state.pagination = action.payload.pagination;
      })

      .addCase(getKnowledgeBases.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Unknown error";
      });
  },
});

export default knowledgeBaseSlice.reducer;