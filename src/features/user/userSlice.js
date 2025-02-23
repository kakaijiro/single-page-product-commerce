import { createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";
import { createAsyncThunk } from "@reduxjs/toolkit";

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// the names getXXX are reserved for selectors
export const fetchAddress = createAsyncThunk("user/fetchAddress", async () => {
  // 1) We get the user's geolocation position
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude
  };

  // 2) And, then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  // 3) Finally, we return an object with the data that we are interested in.
  // Payload of the state "fullfilled"
  return { position, address };
});

const initialState = {
  username: "",
  status: "idle",
  position: {},
  address: "",
  error: ""
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload; // it means NOT "payload.username"
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "idle";
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "error";
        // state.error = action.error.message;
        state.error =
          "There was a problem getting your address. Please fill in this field.";
      })
});

export const { updateName } = userSlice.actions;
export default userSlice.reducer;
