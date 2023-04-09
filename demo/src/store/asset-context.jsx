import React from "react";

const AssetContext = React.createContext({
  roi: [],
  totalInvestment: 0,
  totalInterest: 0.0,
  totalGold: 0,
  totlSilver: 0,
  itemsDetails: [],
  totalAmount: 0,
  editAsset: (asset)=>{},
  addItem: (item) => {},
  removeItem: (id) => {},
});

export default AssetContext;
