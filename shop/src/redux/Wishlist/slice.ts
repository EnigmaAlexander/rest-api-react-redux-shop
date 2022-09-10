import { createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: any = {
    wishlist: [],
  };

  const WishlistSlice = createSlice({
    name: 'Wishlist',
    initialState,
    reducers: {
      getWishlist: (state: any) => {
        state.loading = false;
      },
      setWishlist: (state: any, action: PayloadAction<[]>) => {
        state.loading = true;
        state.wishlist = action.payload;
      },
      addToWishlist: (state: any, action: PayloadAction<Record<string, unknown>>) => {
        state.loading = true;
        state.wishlist = action.payload;
      },
      removeFromWishlist: (state: any, action: PayloadAction<Record<string, unknown>>) => {
        state.loading = false;
        state.key = action.payload;
      }
    }
    });
    export const {
        getWishlist,
        setWishlist,
        addToWishlist,  
        removeFromWishlist,   
    } = WishlistSlice.actions;
    export default WishlistSlice.reducer;