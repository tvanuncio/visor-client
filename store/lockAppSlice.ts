import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {  ErrorResponseType } from '../utils/types/GlobalTypes';
import { ScheduledTaskDto } from '../utils/types/types';

import axios from 'axios';
import { BASE_URL_API } from '@env';

interface LockAppState {
   lockAppData : ScheduledTaskDto | undefined,
   loading : boolean,
   error : ErrorResponseType | null,
}

const initialState: LockAppState = {
   lockAppData : undefined,
   loading : false,
   error : null
};

export const lockApp = createAsyncThunk(
    'app/lock',
    async (_, { rejectWithValue }) => {
      try {
        console.log("URL: ",`${BASE_URL_API}/api-visor/api/scheduled/findByKey/LOCK_APP_VISOR_CLIENT`)

        const response = await axios.get (`${BASE_URL_API}/api-visor/api/scheduled/findByKey/LOCK_APP_VISOR_CLIENT`);
        console.log(`${BASE_URL_API}api-visor/api/scheduled/findByKey/LOCK_APP_VISOR_CLIENT `, response.status)
        if (response.status != 200) {
          const error : ErrorResponseType  = response.data;
          return rejectWithValue(error);
        }
        return response.data;
      } catch (error) {
        console.log("Estoy en el catch de lockApp")
        if (axios.isAxiosError(error)) { 
            console.log("1. Es un error de axios2")
            console.log(error.code);
            console.log(error.response)
            console.log(error.response?.data)
            if (error.code === 'ERR_BAD_REQUEST'){
              const err : ErrorResponseType = { statusCode : 500, description : "An unexpected error occurred"}
              return rejectWithValue(err);
            }else if ( error && error.response && error.response.data && 'statusCode' in error.response.data){
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

const lockAppSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(lockApp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(lockApp.fulfilled, (state, action) => {
        state.loading = false;
        state.lockAppData = action.payload;
      })
      .addCase(lockApp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ErrorResponseType;
      });
  },

});

export const {  } = lockAppSlice.actions;
export default lockAppSlice.reducer;
