import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { makeHttpReq } from "../helper/makeHttpReq";

export interface IAgent {
    _id: string;
    name: string;
    goal: string;
    persona: string;
    userId: string;
    companyContext: string;
    category: string;
    createdAt: string;
    updatedAt: string;
}

export interface Pagination {
    page: number;
    limit: number;
    total: string;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

interface AgentState {
    agents: IAgent[];
    pagination: Pagination | null;
    loading: boolean;
    error: string | null;
}


const initialState: AgentState = {
    agents: [],
    pagination: null,
    loading: false,
    error: null,
};


export const getAgents = createAsyncThunk(
  "agents/getAgents",
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
        agents: IAgent[];
        pagination: Pagination;
      }>(
        "GET",
        `agents?userId=${userId}&page=${page}&limit=${limit}`
      );
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);



const agentSlice = createSlice({
    name: "agents",
    initialState,

    reducers: {

        clearAgents: (state) => {
            state.agents = [];
            state.pagination = null;
        },

    },


    extraReducers: (builder) => {

        builder
        // pending
        .addCase(getAgents.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        // success
        .addCase(getAgents.fulfilled, (state, action) => {
            state.loading = false;
            state.agents = action.payload.agents;
            state.pagination = action.payload.pagination;
        })
        // failed
        .addCase(getAgents.rejected, (state, action) => {
            state.loading = false;
            state.error =
            action.payload as string;

        });

    },
});


export const {
    clearAgents
} = agentSlice.actions;


export default agentSlice.reducer;