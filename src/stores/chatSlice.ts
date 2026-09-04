
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchChatHistory } from "../api/chat";
import type {  ChatHistoryReturnType, ChatMessage, FetchChatHistoryProps } from "../types/chat-types";



export const getChatHistory = createAsyncThunk<
    ChatHistoryReturnType,
    FetchChatHistoryProps,
    { rejectValue: string }
>("chat/getHistory", async ({ userId,threadId,agentId }, { rejectWithValue }) => {
    try {
        const res = await fetchChatHistory({ userId,threadId,agentId });
        return res;
    } catch (error) {
        return rejectWithValue("Failed to load chat history");
    }
});



type ChatState = {
    messages: ChatMessage[];
    loading: boolean;
    error: string | null;
};

const initialState: ChatState = {
    messages: [],
    loading: false,
    error: null,
};


const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        clearChat(state) {
            state.messages = [];
        },

         addUserPlaceholder(
            state,
            action: PayloadAction<ChatMessage>
        ) {
            state.messages.push(
                {
                    role: "user",
                    content: action.payload.content,
                    userId: action.payload.userId,
                    threadId: action.payload.threadId,
                    thinking: "",
                    loading: action.payload.loading,
                    hitl: { status: false }
                }
            );
        },


        // humanTakeOver
          addAIPlaceholder(
            state,
            action: PayloadAction<ChatMessage>
        ) {
            state.messages.push(
                {
                    role: "ai",
                    content: action.payload.content,
                    userId: action.payload.userId,
                    threadId: action.payload.threadId,
                    thinking: "",
                    humanTakeOver:true,
                    loading: action.payload.loading,
                    hitl: { status: false }
                }
            );
        },


        addUserAndAiPlaceholder(
            state,
            action: PayloadAction<ChatMessage>
        ) {
            state.messages.push(
                {
                    role: "user",
                    content: action.payload.content,
                    userId: action.payload.userId,
                    threadId: action.payload.threadId,
                    thinking: "",
                    loading: action.payload.loading,
                    hitl: { status: false }
                },
                {
                    role: "ai",
                    content: "",
                    thinking: "",
                    threadId: action.payload.threadId,
                    userId: action.payload.userId,
                    hitl: { status: false }

                }
            );
        },


        appendToLastAiMessage(state, action: PayloadAction<string>) {
            const last = state.messages[state.messages.length - 1];
            if (last?.role?.toLowerCase() === "ai") {
                last.content += action.payload;
            }
        },



    },
    extraReducers: (builder) => {
        builder
            .addCase(getChatHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getChatHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.messages = action.payload.messages
            })
            .addCase(getChatHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Unknown error";
            });
    },
});

export const { appendToLastAiMessage, addUserAndAiPlaceholder,addUserPlaceholder,addAIPlaceholder } = chatSlice.actions;
export default chatSlice.reducer;
