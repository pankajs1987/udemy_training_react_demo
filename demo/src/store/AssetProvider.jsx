import { useReducer } from "react";

import AssetContext from "./asset-context";

const defaultAssetState = {
  roi: [],
  itemsDetails: [],
  totalAmount: 0,
};

const assetReducer = (state, action) => {
  if (action.type === "ADD") {
    // const updatedTotalAmount =
    //   state.totalAmount + action.item.price * action.item.amount;

    // const existingCartItemIndex = state.items.findIndex(
    //   (item) => item.id === action.item.id
    // );
    // const existingCartItem = state.items[existingCartItemIndex];
    // let updatedItems;

    // if (existingCartItem) {
    //   const updatedItem = {
    //     ...existingCartItem,
    //     amount: existingCartItem.amount + action.item.amount,
    //   };
    //   updatedItems = [...state.items];
    //   updatedItems[existingCartItemIndex] = updatedItem;
    // } else {
    //   updatedItems = state.items.concat(action.item);
    // }
    const updatedROI = [...state.roi];
    return {
      roi: updatedROI,
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  // if (action.type === 'REMOVE') {
  //   const existingCartItemIndex = state.items.findIndex(
  //     (item) => item.id === action.id
  //   );
  //   const existingItem = state.items[existingCartItemIndex];
  //   const updatedTotalAmount = state.totalAmount - existingItem.price;
  //   let updatedItems;
  //   if (existingItem.amount === 1) {
  //     updatedItems = state.items.filter(item => item.id !== action.id);
  //   } else {
  //     const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
  //     updatedItems = [...state.items];
  //     updatedItems[existingCartItemIndex] = updatedItem;
  //   }

  //   return {
  //     roi: updatedROI,
  //     items: updatedItems,
  //     totalAmount: updatedTotalAmount
  //   };
  // }

  return defaultAssetState;
};

const AssetProvider = (props) => {
  const [assetState, dispatchAssetHandler] = useReducer(
    assetReducer,
    defaultAssetState
  );

  const addItemToAssetHandler = (item) => {
    dispatchAssetHandler({ type: "ADD", item: item });
  };

  const removeItemFromAssetHandler = (id) => {
    dispatchAssetHandler({ type: "REMOVE", id: id });
  };

  const assetContext = {
    items: assetContext.items,
    roi: assetContext.roi,
    totalAmount: assetState.totalAmount,
    addItem: addItemToAssetHandler,
    removeItem: removeItemFromAssetHandler,
  };

  return (
    <AssetContext.Provider value={assetContext}>
      {props.children}
    </AssetContext.Provider>
  );
};

export default AssetProvider;
