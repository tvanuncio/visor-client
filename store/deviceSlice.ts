import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {  ErrorResponseType } from '../utils/types/GlobalTypes';
import axios from 'axios';
import { BASE_URL_API } from '@env';
import { DeviceInfoDto } from '../utils/types/types';

interface DeviceState {
   devices : DeviceInfoDto[] | undefined,
   loading : boolean,
   error : ErrorResponseType | null,
}

const initialState: DeviceState = {
   devices : [],
   loading : false,
   error : null
};

export interface FetchDevicesParams {
  request: DeviceInfoDto;
  token: string;
}

export const getAllDevices = createAsyncThunk(
    'device/getAllDevices',
    async ({ request, token }: FetchDevicesParams, { rejectWithValue }) => {
      try {
        console.log("Esta entrando a getAllDevices")
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };

        console.log("--Call = ",`${BASE_URL_API}/api-visor/api/devices/search` )
        console.log("params :" + JSON.stringify(request))
        const response = await axios.put(`${BASE_URL_API}/api-visor/api/devices/search`, request, {headers});
        
        if (response.status != 200) {
          const error : ErrorResponseType  = response.data;
          return rejectWithValue(error);
        }
        return response.data;
      } catch (error) {
        console.log("Estoy en el catch de getAllDevices")
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

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllDevices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDevices.fulfilled, (state, action) => {
        state.loading = false;
        state.devices = action.payload;
      })
      .addCase(getAllDevices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ErrorResponseType;
      });
  },

});

export const {  } = deviceSlice.actions;
export default deviceSlice.reducer;
