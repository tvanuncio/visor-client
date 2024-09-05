import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {  ErrorResponseType } from '../utils/types/GlobalTypes';
import { FileSystemItem , FileSystemShip} from '../utils/types/types';

import axios from 'axios';
import { BASE_URL_API } from '@env';

interface CreateDirectoryState {
   fileContainer : FileSystemItem | undefined;
   loading : boolean;
   error : ErrorResponseType | null,
}

const initialState: CreateDirectoryState = {
   fileContainer: undefined,
   loading: false,
   error: null
};


export interface FetchCreateFileSystemItemParams {
  parent : number;
  data : FileSystemItem;
  token : string;
}

  export const createFileSystemItem = createAsyncThunk(
    'createDirectory/create',
    async ({parent, data, token}: FetchCreateFileSystemItemParams, { rejectWithValue }) => {
      try {
        console.log("URL: ",`${BASE_URL_API}/api-directory/api/directory/${parent}`)
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };

        const response = await axios.post(`${BASE_URL_API}/api-directory/api/directory/${parent}`, data, {headers});
        console.log(`${BASE_URL_API}/api-directory/api/directory/${parent}`, response.status)
        if (response.status != 200) {
          const error : ErrorResponseType  = response.data;
          return rejectWithValue(error);
        }

        return response.data;
      } catch (error) {
        console.log("Estoy en el catch de createFileSystemItem")
        if (axios.isAxiosError(error)) { 
            console.log("1. Es un error de axios2 createFileSystemItem")
            console.log(error.code);
            console.log(error.response)
            console.log(error.response?.data)
            if ( error && error.response && error.response.data && 'statusCode' in error.response.data){
              console.log("Entro en el ifff createFileSystemItem")
              const ery : ErrorResponseType = { statusCode : error.response.data.statusCode, description : error.response.data.message}
            
              return rejectWithValue(ery);    
            }
            //const erx : ErrorResponseType  = error.response?.data;
            const erx : ErrorResponseType = { statusCode : 500, description : error.code ? error.code : "Error comunicacion"}
            
            return rejectWithValue(erx);     
          } else {
            console.log("Es un error generico createFileSystemItem")
            const err : ErrorResponseType = { statusCode : 500, description : "An unexpected error occurred"}
            return rejectWithValue(err);
          }

      }
    }
  );


const createDirectorySlice = createSlice({
  name: 'createDirectory',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(createFileSystemItem.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.fileContainer = undefined;
      })
      .addCase(createFileSystemItem.fulfilled, (state, action) => {
        state.loading = false;
        state.fileContainer = action.payload;
      })
      .addCase(createFileSystemItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ErrorResponseType;
      });

  },

});

export const {  } = createDirectorySlice.actions;
export default createDirectorySlice.reducer;
