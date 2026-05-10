import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    // Each order shape:
    // {
    //   paymentId: "pay_PAvBtULMOHHhZX",
    //   orderedAt: "2024-05-10T14:32:00.000Z",
    //   items: [{ post: {...}, quantity: 2 }],
    //   total: 450.00
    // }
  },
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    clearOrders: (state) => {
      state.orders = [];
    },
  },
});

export const { addOrder, clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;