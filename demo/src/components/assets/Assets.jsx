import Cards from "../common/Cards";
import Button from "../common/Button";
import AddAssets from "./AddAssets";
import classes from "./Assets.module.css";
import React, { useState } from "react";
import AssetItemDetails from "./AssetItemDetails";
import { useEffect } from "react";
import AssetsSummary from "./AssetsSummary";
import AssetItems from "./AssetItems";

const Assets = (props) => {
  const [assets, setAssets] = useState("");
  const [showAddAssets, setShowAddAssets] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [httpError, sethttpError] = useState();

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      const response = await fetch(
        "https://dailytransactions-99473-default-rtdb.firebaseio.com/customers_new.json"
      );
      if (!response.ok) {
        throw new Error("Not able to fetch customer details");
      }
      const responseData = await response.json();
      const customerDetailsObj = [];
      for (const key in responseData) {
        customerDetailsObj.push({
          key: key,
          customerName: responseData[key].newAsset.customerName,
          amount: responseData[key].newAsset.amount,
          rateofInterest: responseData[key].newAsset.rateofInterest,
          goldWeight: responseData[key].newAsset.goldWeight,
          silverWeight: responseData[key].newAsset.silverWeight,
          dateIn: responseData[key].newAsset.dateIn,
        });
      }
      setAssets(customerDetailsObj);
      setisLoading(false);
    };
    fetchCustomerDetails().catch((error) => {
      setisLoading(false);
      sethttpError("Not able to fetch customer details");
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.customerLoading}>
        <p>Loading.....</p>
      </section>
    );
  }
  if (httpError) {
    return (
      <section className={classes.customerLoadingError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const saveOrUpdateAssetHandler = (newAsset) => {
    fetch(
      "https://dailytransactions-99473-default-rtdb.firebaseio.com/customers_new.json",
      {
        method: "POST",
        body: JSON.stringify({ newAsset }),
      }
    );

    setAssets((prevState) => [newAsset, ...assets]);
  };

  const addAssetViewHandler = () => {
    if (!showAddAssets) setShowAddAssets(true);
    else setShowAddAssets(false);
  };
  return (
    
        <AssetItems></AssetItems>
 
  );
};

export default Assets;
