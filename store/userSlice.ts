import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponseType, ErrorResponseType, LoginRequestType } from '../utils/types/GlobalTypes';
import axios from 'axios';
import { BASE_URL_API } from '@env';

interface LoginState {
   signInData : AuthResponseType | undefined,
   loading : boolean,
   error : ErrorResponseType | null,
}

const initialState: LoginState = {
   signInData : undefined,
   loading : false,
   error : null
};

export const loginUser = createAsyncThunk(
    'user/login',
    async (request: LoginRequestType, { rejectWithValue }) => {
      try {
        console.log("URL: ",`${BASE_URL_API}/api-users/auth/login`)

        const response = await axios.post(`${BASE_URL_API}/api-users/auth/login`, request);
        console.log(`${BASE_URL_API}/api-users/auth/login `, response.status)
        if (response.status != 200) {
          const error : ErrorResponseType  = response.data;
          return rejectWithValue(error);
        }
        return response.data;
      } catch (error) {
        console.log("Estoy en el catch de loginUser")
        if (axios.isAxiosError(error)) { 
            console.log("1. Es un error de axios2")
            console.log(error.code);
            console.log(error.response)
            console.log(error.response?.data)
            if ( error && error.response && error.response.data && 'statusCode' in error.response.data){
              console.log("Entro en el ifff")
              const ery : ErrorResponseType = { statusCode : error.response.data.statusCode, description : error.response.data.message}
            
              return rejectWithValue(ery);    
            }
            //const erx : ErrorResponseType  = error.response?.data;
            const erx : ErrorResponseType = { statusCode : 500, description : error.code ? error.code : "Error comunicacion"}
            
            return rejectWithValue(erx);     
          } else {
            console.log("Es un error generico")
            const err : ErrorResponseType = { statusCode : 500, description : "An unexpected error occurred"}
            return rejectWithValue(err);
          }

      }
    }
  );

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.signInData = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ErrorResponseType;
      });
  },

});

export const {  } = userSlice.actions;
export default userSlice.reducer;
