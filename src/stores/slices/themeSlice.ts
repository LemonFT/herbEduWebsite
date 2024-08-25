
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  name: 'light' | 'dark';
};
const themeCache = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const theme = localStorage.getItem('theme');
    return (theme === 'light' || theme === 'dark') ? theme : 'light';
  } else {
    return 'light';
  }
}
const initialState: ThemeState = {
  name: themeCache(),
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
      changeTheme(state, action: PayloadAction<ThemeState>) {
        state.name = action.payload.name;
        if(action.payload.name === 'light'){
          if(document.querySelector('.darkTheme')){
            document.body.classList.remove('darkTheme')
          }
          document.body.classList.add('lightTheme')
        }else{
          if(document.querySelector('.lightTheme')){
            document.body.classList.remove('lightTheme')
          }
          document.body.classList.add('darkTheme')
        }        
        localStorage.setItem('theme', action.payload.name)
      },
    }
});

export const { changeTheme } = themeSlice.actions;

export const themeSelected = (state: any) => state.theme;

const themeReducer = themeSlice.reducer;
export default themeReducer;