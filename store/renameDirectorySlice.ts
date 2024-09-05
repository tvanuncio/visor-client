import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {  ErrorResponseType } from '../utils/types/GlobalTypes';
import { FileSystemItem , FileSystemShip} from '../utils/types/types';

import axios from 'axios';
import { BASE_URL_API } from '@env';

interface RenameDirectoryState {
   fileContainer : FileSystemItem | undefined;
   loading : boolean;
   error : ErrorResponseType | null,
}

const initialState: RenameDirectoryState = {
   fileContainer: undefined,
   loading: false,
   error: null
};


export interface FetchRenameFileSystemItemParams {
  nodeId : number;
  newName : string;
  token : string;
}

  export const renameFileSystemItem = createAsyncThunk(
    'renameDirectory/rename',
    async ({nodeId, newName, token}: FetchRenameFileSystemItemParams, { rejectWithValue }) => {
      try {
        console.log("URL: ",`${BASE_URL_API}/api-directory/api/directory/change/${nodeId}/name?newname=${newName}`)
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };

        const response = await axios.patch(`${BASE_URL_API}/api-directory/api/directory/change/${nodeId}/name`, null, 
                            {
                                params: {
                                  newname: newName
                                }, 
                                headers : {...headers}
                            });
        console.log(`${BASE_URL_API}/api-directory/api/directory/change/${nodeId}/name?newname=${newName}`, response.status)
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


const renameDirectorySlice = createSlice({
  name: 'renameDirectory',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(renameFileSystemItem.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.fileContainer = undefined;
      })
      .addCase(renameFileSystemItem.fulfilled, (state, action) => {
        state.loading = false;
        state.fileContainer = action.payload;
      })
      .addCase(renameFileSystemItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ErrorResponseType;
      });

  },

});

export const {  } = renameDirectorySlice.actions;
export default renameDirectorySlice.reducer;
