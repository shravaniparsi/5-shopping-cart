const initialState = {
  addedProductList: []
};

const reducer = (state = initialState, action) => {
  if (action.type === "ADD_PRODUCT") {
    return {
      ...state,
      addedProductList: state.addedProductList.concat(action.payLoad)
    };
  }
  if (action.type === "DELETE_PRODUCT") {
      const index = state.addedProductList.findIndex(item=>item.id === action.payLoad.id);
      console.log(index);
    return {
      ...state,
      addedProductList: state.addedProductList.filter((item) => item.id !== action.payLoad.id)
    };
  }
  return state;
};

export default reducer;
