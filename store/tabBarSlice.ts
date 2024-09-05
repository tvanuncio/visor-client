import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TabSelectorState {
   selectIndex : number,
}

const initialState: TabSelectorState = {
  selectIndex : 0
};

const tabBarSlice = createSlice({
  name: 'tabBar',
  initialState,
  reducers: {
    setTabSelector: (state, action: PayloadAction<number>) => {
      console.log("Change tabbar -> ", action.payload)
			state.selectIndex = action.payload;
		},
  }
});
export const { setTabSelector } = tabBarSlice.actions;
export default tabBarSlice.reducer;
