import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';

const initialState: any = {
    products: [],
    loading: false,
    product_type: {},
    product_category: {},
    search_tag: {},
    product: {},
  };

  const ProductsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
      getProducts: (state: any) => {
        state.loading = false;
      },
      setProducts: (state: any, action: PayloadAction<[]>) => {
        state.loading = true;
        state.products = action.payload;
      },
      getProductsFilter: (state: any, action: PayloadAction<string>) => {
        state.loading = true;
        state.product_type = action.payload;
      },
      getProductsCategoryFilter: (state: any, action: PayloadAction<string>) => {
        state.loading = true;
        state.product_category = action.payload;
      },
      searchBar: (state: any, action: PayloadAction<string>) => {
        state.loading = true;
        state.search_tag = action.payload;
      }, 
      productTitle: (state: any, action: PayloadAction<string>) => {
        state.loading = true;
        state.product = action.payload;
      }, 
    }
    });
export const {
    getProducts,
    setProducts,   
    getProductsFilter, 
    getProductsCategoryFilter,
    searchBar, 
    productTitle,
    } = ProductsSlice.actions;
export default ProductsSlice.reducer;