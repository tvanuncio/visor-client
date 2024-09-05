import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {  ErrorResponseType } from '../utils/types/GlobalTypes';
import { FileSystemItem , FileSystemShip} from '../utils/types/types';

import axios from 'axios';
import { BASE_URL_API } from '@env';

interface DirectoryState {
   directoryData : FileSystemItem[] | [],
   loading : boolean,
   error : ErrorResponseType | null
}

const initialState: DirectoryState = {
   directoryData : [],
   loading : false,
   error : null,
};

export interface FetchDirectoryByIdParams {
  rootId: number;
  token: string;
}


const setParent =  (parent: FileSystemItem, children :  FileSystemShip[] | undefined )  => {
   if (children && children.length > 0) {
     for (var i = 0; i < children.length; i++) {
        children[i].child.parent = parent;
        setParent(children[0].child, children[0].child.children);
     }
   }
}

export const getDirectory = createAsyncThunk(
    'directory/root',
    async ({rootId, token}: FetchDirectoryByIdParams, { rejectWithValue }) => {
      try {
        console.log("URL: ",`${BASE_URL_API}/api-directory/api/directory/${rootId}`)
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };

        const response = await axios.get(`${BASE_URL_API}/api-directory/api/directory/${rootId}`, {headers});
        console.log(`${BASE_URL_API}/api-directory/api/directory/${rootId}`, response.status)
        if (response.status != 200) {
          const error : ErrorResponseType  = response.data;
          return rejectWithValue(error);
        }
        console.log ("Regreso de buscar el directorio __**")
        const root : FileSystemItem[] = [];   
        const raiz : FileSystemItem = response.data;
        //raiz.parent = raiz; //La raiz no tiene padres y aputa asi mismo.
        //setParent(raiz, raiz.children);
        root.push(raiz);
        console.log ("Termino llamado exito getDirectory")
        return root;
      } catch (error) {
        console.log("Estoy en el catch de getDirectory")
        if (axios.isAxiosError(error)) { 
            console.log("1. Es un error de axios2 getDirectory")
            console.log(error.code);
            console.log(error.response)
            console.log(error.response?.data)
            if ( error && error.response && error.response.data && 'statusCode' in error.response.data){
              console.log("Entro en el ifff getDirectory")
              const ery : ErrorResponseType = { statusCode : error.response.data.statusCode, description : error.response.data.message}
            
              return rejectWithValue(ery);    
            }
            //const erx : ErrorResponseType  = error.response?.data;
            const erx : ErrorResponseType = { statusCode : 500, description : error.code ? error.code : "Error comunicacion"}
            
            return rejectWithValue(erx);     
          } else {
            console.log("Es un error generico getDirectory")
            const err : ErrorResponseType = { statusCode : 500, description : "An unexpected error occurred"}
            return rejectWithValue(err);
          }

      }
    }
  );


const directorySlice = createSlice({
  name: 'directory',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getDirectory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDirectory.fulfilled, (state, action) => {
        state.loading = false;
        state.directoryData = action.payload;
      })
      .addCase(getDirectory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ErrorResponseType;
      });

  },

});

export const {  } = directorySlice.actions;
export default directorySlice.reducer;
