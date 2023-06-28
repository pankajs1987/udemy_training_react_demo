import React, { useState } from "react";
import AssetItemDetails from "./AssetItemDetails";
import { useEffect } from "react";
import Loader from "../UI/Loader";

import { Paper, makeStyles, Toolbar, InputAdornment } from "@material-ui/core";

import { Search } from "@mui/icons-material";
import Input from "../common/Input";

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
  const [goldRates, setGoldRates] = useState(0);
  const [silverRates, setSilverRates] = useState(0);
  const [totalGold, setTotalGold] = useState(0);
  const [totalSilver, setTotalSilver] = useState(0);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [roi, setROI] = useState([]);
  const [rates, setRates] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [filterFn, setFilterFn] = useState({
    fn: (values) => {
      return values;
    },
  });

  const [recordForEdit, setRecordForEdit] = useState(null);

  const [httpError, sethttpError] = useState();
  const handleSearch = (e) => {
    console.log(e.target.value);
    let target = e.target;
    setFilterFn({
      fn: (values) => {
        if (target.value == "") return values;
        else {
          const updatedAssets = assets.filter((x) =>
            x.customerName.toLowerCase().includes(target.value)
          );
          setAssets(updatedAssets);
        }
        return assets.filter((x) =>
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
      setisLoading(false);
      sethttpError("Not able to fetch customer details");
    });
    const fetchGoldAndSilverRates = async () => {
      const response = await fetch(
        "https://dailytransactions-99473-default-rtdb.firebaseio.com/rates.json"
      );
      if (!response.ok) {
        throw new Error("Not able to fetch Rate of Inetrest details");
      }
      const responseData = await response.json();
      setSilverRates(responseData["silverRates"]);
      setGoldRates(responseData["goldRates"]);

      console.log("fetching gold rate : " + goldRates);
    };
    fetchGoldAndSilverRates().catch((error) => {
      sethttpError("Not able to fetch Intrest details" + error);
    });

    const fetchCustomerDetails = async () => {
      const response = await fetch(
        'https://dailytransactions-99473-default-rtdb.firebaseio.com/customers_new.json'
      );
      if (!response.ok) {
        throw new Error("Not able to fetch customer details");
      }
      const responseData = await response.json();
      const customerDetailsObj = [];
      const customerDetailsCompletedObj = [];
      let totalGoldTemp = 0;
      let totalSilverTemp = 0;
      let totalInvestmentTemp = 0;
      for (const key in responseData) {
        let now = new Date();
        const {yearDiff,monthDiff,dayDiff} = splitDateToYearMonthAndDays(new Date(responseData[key].newAsset.dateIn),now);
        totalGoldTemp =
          Number(totalGoldTemp) + Number(responseData[key].newAsset.goldWeight);
        totalSilverTemp =
          Number(totalSilverTemp) +
          Number(responseData[key].newAsset.silverWeight);
        totalInvestmentTemp =
          Number(totalInvestmentTemp) +
          Number(responseData[key].newAsset.amount);
         let totalAmountToRecover = ((Number((yearDiff*12))+Number(monthDiff)+Number((dayDiff/(new Date(now.getFullYear(), now.getMonth()+1, 0).getDate()))))*(Number(responseData[key].newAsset.rateofInterest)/100)*(Number(responseData[key].newAsset.amount)));
          if(responseData[key].newAsset.customerStatus && responseData[key].newAsset.customerStatus ==='done'){
            customerDetailsCompletedObj.push({
              key: key,
              customerName: responseData[key].newAsset.customerName,
              amount: responseData[key].newAsset.amount,
              rateofInterest: responseData[key].newAsset.rateofInterest,
              goldWeight: responseData[key].newAsset.goldWeight,
              silverWeight: responseData[key].newAsset.silverWeight,
              dateIn: responseData[key].newAsset.dateIn,
              goldPercentage: responseData[key].newAsset.goldPercentage,
              silverPercentage: responseData[key].newAsset.silverPercentage,
              interest: totalAmountToRecover,
              status: responseData[key].newAsset.customerStatus,
              
            });
          }else{
        customerDetailsObj.push({
          key: key,
          customerName: responseData[key].newAsset.customerName,
          amount: responseData[key].newAsset.amount,
          rateofInterest: responseData[key].newAsset.rateofInterest,
          goldWeight: responseData[key].newAsset.goldWeight,
          silverWeight: responseData[key].newAsset.silverWeight,
          dateIn: responseData[key].newAsset.dateIn,
          goldPercentage: responseData[key].newAsset.goldPercentage,
          silverPercentage: responseData[key].newAsset.silverPercentage,
          interest: Math.round((totalAmountToRecover) * 100) / 100,
          status: responseData[key].newAsset.customerStatus
        });
      }
      }
      setTotalGold(totalGoldTemp);
      setTotalSilver(totalSilverTemp);
      setTotalInvestment(totalInvestmentTemp);

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
  function splitDateToYearMonthAndDays (startingDate, endingDate) {
    let startDate = new Date(
      new Date(startingDate).toISOString().substr(0, 10)
    );
    if (!endingDate) {
      endingDate = new Date().toISOString().substr(0, 10); // need date in YYYY-MM-DD format
    }
    let endDate = new Date(endingDate);
    if (startDate > endDate) {
      const swap = startDate;
      startDate = endDate;
      endDate = swap;
    }
    const startYear = startDate.getFullYear();
    const february =
      (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0
        ? 29
        : 28;
    const daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let yearDiff = endDate.getFullYear() - startYear;
    let monthDiff = endDate.getMonth() - startDate.getMonth();
    if (monthDiff < 0) {
      yearDiff--;
      monthDiff += 12;
    }
    let dayDiff = endDate.getDate() - startDate.getDate();
    if (dayDiff < 0) {
      if (monthDiff > 0) {
        monthDiff--;
      } else {
        yearDiff--;
        monthDiff = 11;
      }
      dayDiff += daysInMonth[startDate.getMonth()];
    }

    return {yearDiff , monthDiff , dayDiff };
  };



  const saveOrUpdateAssetHandler = (newAsset) => {

    if (newAsset && newAsset.key) {
      fetch(
        "https://dailytransactions-99473-default-rtdb.firebaseio.com/customers_new/" +
          newAsset.key +
          ".json",
        {
          method: "PUT",
          body: JSON.stringify({ newAsset }),
        }
      );
    } else {
      fetch(
        "https://dailytransactions-99473-default-rtdb.firebaseio.com/customers_new.json",
        {
          method: "POST",
          body: JSON.stringify({ newAsset }),
        }
      );
      setAssets((prevState) => [newAsset, ...assets]);
    }
    //new fetchCustomerDetails();
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
          goldRates={goldRates}
          silverRates={silverRates}
          saveOrUpdateAssetHandler={saveOrUpdateAssetHandler}
        ></AssetItemDetails>
      </Paper>
    </>
  );
};

export default Assets;
