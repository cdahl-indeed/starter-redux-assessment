import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

/* Task 15: Complete the `createAsyncThunk()` function to load a suggestion from this URL: http://localhost:3004/api/suggestion */

export const fetchSuggestion = createAsyncThunk(
    'suggestions/fetch',
    async () => {
        const response = await fetch('http://localhost:3004/api/suggestion');
        const data = await response.json();
        console.log('something');
        console.log(JSON.stringify(data));

        return data;
    }
);


const initialState = {
    suggestion: '',
    loading: false,
    error: true,
};

const options = {
    name: 'suggestion',
    initialState,
    reducers: {},
    /* Task 16: Inside `extraReducers`, add reducers to handle all three promise lifecycle states - pending, fulfilled, and rejected - for the `fetchSuggestion()` call */

    extraReducers: (builder) => {
        builder
            .addCase(fetchSuggestion.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchSuggestion.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.suggestion = action.payload;
                console.log('paypay: ',action.payload);
            })
            .addCase(fetchSuggestion.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.suggestion = '';
            });
    },
};

const suggestionSlice = createSlice(options);

export default suggestionSlice.reducer;

// Task 17: Create a selector, called `selectSuggestion`, for the `suggestion` state variable and export it from the file
export const selectSuggestion = (state) => state.suggestion;
export const selectLoading = (state) => state.suggestion.loading;
export const selectError = (state) => state.suggestion.error;
