import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {  ErrorResponseType } from '../utils/types/GlobalTypes';
import { BannerDto } from '../utils/types/types';

import axios from 'axios';
import { BASE_URL_API } from '@env';

interface BannerState {
   banners : BannerDto[] | [],
   loading : boolean,
   error : ErrorResponseType | null,
}

const initialState: BannerState = {
   banners : [],
   loading : false,
   error : null
};

export interface FetchFindBySegmentParams {
  token: string;
  segment : string
}
export const findBannerBySegment = createAsyncThunk(
    'banners/findBannerBySegment',
    async ( {segment, token} : FetchFindBySegmentParams, { rejectWithValue }) => {
      try {
        console.log("URL: ",`${BASE_URL_API}/api-visor/api/banner/findBySegment/${segment}`)
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };

        const response = await axios.get (`${BASE_URL_API}/api-visor/api/banner/findBySegment/${segment}`,{headers});
        console.log(`${BASE_URL_API}/api-visor/api/banner/findBySegment/${segment}`, response.status)
        if (response.status != 200) {
          const error : ErrorResponseType  = response.data;
          return rejectWithValue(error);
        }
        return response.data;
      } catch (error) {
        console.log("Estoy en el catch de findBannerBySegment")
        if (axios.isAxiosError(error)) { 
            console.log("1. Es un error de axios findBannerBySegment")
            console.log(error.code);
            console.log(error.response)
            console.log(error.response?.data)
            if (error.code === 'ERR_BAD_REQUEST'){
              const err : ErrorResponseType = { statusCode : 500, description : "An unexpected error occurred- proxy - network"}
              return rejectWithValue(err);
            }else if ( error && error.response && error.response.data && 'statusCode' in error.response.data){
              console.log("Entro en el ifff findByBannerSegment")
              const ery : ErrorResponseType = { statusCode : error.response.data.statusCode, description : error.response.data.message}
            
              return rejectWithValue(ery);    
            }
              //const erx : ErrorResponseType  = error.response?.data;
              const erx : ErrorResponseType = { statusCode : 500, description : error.code ? error.code : "Error comunicacion"}
              
              return rejectWithValue(erx);     
            } else {
              console.log("Es un error generico findBannerBySegment")
              const err : ErrorResponseType = { statusCode : 500, description : "An unexpected error occurred"}
              return rejectWithValue(err);
            }

      }
    }
  );

const bannerSlice = createSlice({
  name: 'banners',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(findBannerBySegment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(findBannerBySegment.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload;
      })
      .addCase(findBannerBySegment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ErrorResponseType;
      });
  },

});

export const {  } = bannerSlice.actions;
export default bannerSlice.reducer;
