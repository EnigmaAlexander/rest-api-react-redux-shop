import { createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: any = {
    cart: [],
    cart_item: {},
    loading: false,
    key: null,
    qty: null
  };

  const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      getCart: (state: any) => {
        state.loading = false;
      },
      setCart: (state: any, action: PayloadAction<[]>) => {
        state.loading = true;
        state.cart = action.payload;
      },
      addToCart: (state: any, action: PayloadAction<Record<string, unknown>>) => {
        state.loading = true;
        state.cart = action.payload;
      },
      removeFromCart: (state: any, action: PayloadAction<Record<string, unknown>>) => {
        state.loading = false;
        state.key = action.payload;
      },
      addQty: (state: any,  action: PayloadAction<Record<string, unknown>>) => {
        state.loading = false;
        state.cart_item = action.payload;
        
      },
      subtractQty: (state: any,  action: PayloadAction<Record<string, unknown>>) => {
        state.loading = false;
        state.cart_item = action.payload;
      }
    }
    });

export const {
    getCart,
    setCart,
    addToCart,  
    removeFromCart,   
    addQty,
    subtractQty, 
    } = CartSlice.actions;
export default CartSlice.reducer;