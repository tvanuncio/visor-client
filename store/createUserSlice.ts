import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {  CreateUserResponseType, ErrorResponseType } from '../utils/types/GlobalTypes';
import axios from 'axios';
import { BASE_URL_API } from '@env';
import { CreateUserDto } from '../utils/types/types';

interface CreateUserState {
   createUserResponse : CreateUserResponseType | undefined,
   loading : boolean,
   error : ErrorResponseType | null,
}

const initialState: CreateUserState = {
   createUserResponse : undefined,
   loading : false,
   error : null
};

export interface FetchCreateUserParams {
  request: CreateUserDto;
}

export const createUser = createAsyncThunk(
    'user/createUser',
    async ({ request }: FetchCreateUserParams, { rejectWithValue }) => {
      try {
        console.log("Esta entrando a createUser")
        const headers = {
          'Content-Type': 'application/json'
        };

        console.log("--Call = ",`${BASE_URL_API}/api-users/auth/create-user` )
        console.log("params :" + JSON.stringify(request))
        const response = await axios.post(`${BASE_URL_API}/api-users/auth/create-user`, request, {headers});
        
        if (response.status != 200) {
          const error : ErrorResponseType  = response.data;
          return rejectWithValue(error);
        }

        const result : CreateUserResponseType = response.data;
        return result;
      } catch (error) {
        console.log("Estoy en el catch de createUser")
        if (axios.isAxiosError(error)) { 
            console.log("1. Es un error de axios2")
            console.log(error.code);
            console.log(error.response)
            console.log(error.response?.data)
            if ( error && error.response && error.response.data && 'statusCode' in error.response.data){
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

const createUserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.createUserResponse = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ErrorResponseType;
      });
  },

});

export const {  } = createUserSlice.actions;
export default createUserSlice.reducer;
