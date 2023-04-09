import { useContext } from "react";

import React, { useState } from "react";
import AssetItemDetails from "./AssetItemDetails";
import { useEffect } from "react";
import Loader from "../UI/Loader";
import AssetContext from "../../store/asset-context";
import {
  Paper,
  makeStyles,
  Toolbar,
  InputAdornment,
  Divider,
} from "@material-ui/core";

import { Search } from "@mui/icons-material";
import Input from "../common/Input";
import Popup from "../Popup";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));
const Assets = (props) => {
  const classes = useStyles();
  const [assets, setAssets] = useState("");
  const [totalGold, setTotalGold] = useState(0);
  const [totalSilver, setTotalSilver] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [roi, setROI] = useState([]);
  const [showAddAssets, setShowAddAssets] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);

  const [httpError, sethttpError] = useState();
  const handleSearch = (e) => {
    console.log(e.target.value);
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.customerName.toLowerCase().includes(target.value)
          );
      },
    });
  };

  useEffect(() => {
    const fetchRateOfInterest = async () => {
      const response = await fetch(
        "https://dailytransactions-99473-default-rtdb.firebaseio.com/ROI.json"
      );
      if (!response.ok) {
        throw new Error("Not able to fetch Rate of Inetrest details");
      }
      const responseData = await response.json();
      const roi = [];
      for (const key in responseData) {
        roi.push({
          id: responseData[key],
          title: responseData[key],
        });
      }
      setROI(roi);
    };
    fetchRateOfInterest().catch((error) => {
      sethttpError("Not able to fetch Intrest details" + error);
    });

    const fetchCustomerDetails = async () => {
      const response = await fetch(
        "https://dailytransactions-99473-default-rtdb.firebaseio.com/customers_new.json"
      );
      if (!response.ok) {
        throw new Error("Not able to fetch customer details");
      }
      const responseData = await response.json();
      const customerDetailsObj = [];
      let totalGoldTemp = 0;
      let totalSilverTemp = 0;
      let totalInvestmentTemp = 0;
      for (const key in responseData) {
        // totalGoldTemp =
        //   Number(totalGoldTemp) + Number(responseData[key].newAsset.goldWeight);
        // totalSilverTemp =
        //   Number(totalSilverTemp) +
        //   Number(responseData[key].newAsset.silverWeight);
        // totalInvestmentTemp =
        //   Number(totalInvestmentTemp) +
        //   Number(responseData[key].newAsset.amount);
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
      // setTotalGold(totalGoldTemp);
      // setTotalSilver(totalSilverTemp);
      // setTotalInvestment(totalInvestmentTemp);

      setAssets(customerDetailsObj);
      setisLoading(false);
    };
    fetchCustomerDetails().catch((error) => {
      setisLoading(false);
      sethttpError("Not able to fetch customer details");
    });
  }, []);

  if (isLoading) {
    if (httpError) {
      return (
        <section className={classes.customerLoadingError}>
          <p>{httpError}</p>
        </section>
      );
    } else {
      return <Loader />;
    }
  }

  const saveOrUpdateAssetHandler = (newAsset) => {
    console.log("Updating Assets Details Using Add Method"+ newAsset)
    setOpenPopup(true);
    fetch(
      "https://dailytransactions-99473-default-rtdb.firebaseio.com/customers_new.json",
      {
        method: "POST",
        body: JSON.stringify({ newAsset }),
      }
    );

    console.log("Updating Assets Details Using Add Method")

    setAssets((prevState) => [newAsset, ...assets]);
    setShowAddAssets(false);
    setOpenPopup(false);
  };

  return (
    <>
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Input
            label="Search Asset Details"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
        </Toolbar>

        {/* <AssetsSummary
        totalGold={totalGold}
        totalSilver={totalSilver}
        totalInvestment={totalInvestment}
      /> */}

        {/* {showAddAssets && (
        <Modal roi={roi} onClose={hideAssetDetailModal}>
          <AddAssets
            roi={roi}
            onSaveOrUpdateAsset={saveOrUpdateAssetHandler}
          ></AddAssets>
        </Modal>
      )} */}


          <AssetItemDetails
            assets={assets}
            roi={roi}
            saveOrUpdateAssetHandler={saveOrUpdateAssetHandler}
            openPopup={openPopup}
          ></AssetItemDetails>
      </Paper>
    </>
  );
};

export default Assets;
