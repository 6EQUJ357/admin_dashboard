import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    admin: {
        adminName: "",
        adminEmail: "",
        adminImg: "",
    },
  };



  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
     
        SET_ADMIN(state, action) {
            // console.log("action",action.payload);
        const profile = action.payload;
        state.admin.adminName = profile.adminName;
        state.admin.adminEmail = profile.adminEmail;
        state.admin.adminImg = profile.adminImg;
      },
    },
  });
  
  export const {SET_ADMIN } = authSlice.actions;
  
  export const selectAdmin = (state) => console.log("auth", state);
  
  export default authSlice.reducer;
  
  