import React, { useState } from "react";
import AssetItemDetails from "./AssetItemDetails";
import { useEffect } from "react";
import Loader from "../UI/Loader";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { onValue, ref } from "firebase/database";
import PeopleOutlineTwoToneIcon from "@mui/icons-material/PeopleOutlineTwoTone";
import { Paper, makeStyles, Toolbar, InputAdornment } from "@material-ui/core";

import { Search } from "@mui/icons-material";
import Input from "../common/Input";
import PageHeader from "../PageHeader";

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
  const [httpError, sethttpError] = useState();
  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (values) => {
        console.log("filter function : " + values);

        if (target.value == "") return values;
        else {
          const updatedAssets = values.filter((x) => {
            x.customerName.toLowerCase().includes(target.value);
          });
          setAssets(updatedAssets);
        }
        return values.filter((x) =>
          x.customerName.toLowerCase().includes(target.value)
        );
      },
    });
  };

  //
  const updateInvestmentDetailsforToday = async () => {
    onValue(ref(db, "customers_new"), (snapShot) => {
      if (snapShot.exists()) {
        snapShot.forEach((asset) => {
          //   console.log("inside for each : key ", asset.key);
          //  console.log("inside for each : value {} ,", asset.val());
        });
        // Object.values(snapShot.val()).map((assetDetails) => {

        // });
      }
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        console.log("uid", uid);
      } else {
        // User is signed out
        // ...
        console.log("user is logged out");
      }
    });

    const roi = [];
    const fetchRateOfInterest = async () => {
      onValue(ref(db, "ROI"), (snapShot) => {
        if (snapShot.exists()) {
          snapShot.forEach((rateOfInertest) => {
            roi.push({
              id: rateOfInertest.val(),
              title: rateOfInertest.val(),
            });
          });
        }
      });
    };
   

    //   const response = await fetch(
    //     "https://dailytransactions-99473-default-rtdb.firebaseio.com/ROI.json"
    //   );
    //   const responseData = await response.json();
    //   //const roi = [];
    //   for (const key in responseData) {
    //     roi.push({
    //       id: responseData[key],
    //       title: responseData[key],
    //     });
    //   }
    //   setROI(roi);
    // };
    fetchRateOfInterest();
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

    const customerDetailsObj = [];
    const customerDetailsCompletedObj = [];
    let totalGoldTemp = 0;
    let totalSilverTemp = 0;
    let totalInvestmentTemp = 0;
    const fetchCustomerDetails = () => {
      updateInvestmentDetailsforToday();
      onValue(ref(db, "customers_new"), (snapShot) => {
        if (snapShot.exists()) {
          snapShot.forEach((assets) => {
            const assetDetails = assets.val();
            const assetKey = assets.key;

            let now = new Date();
            const { yearDiff, monthDiff, dayDiff } =
              splitDateToYearMonthAndDays(new Date(assetDetails.dateIn), now);
            totalGoldTemp =
              Number(totalGoldTemp) + Number(assetDetails.goldWeight);
            totalSilverTemp =
              Number(totalSilverTemp) + Number(assetDetails.silverWeight);
            totalInvestmentTemp =
              Number(totalInvestmentTemp) + Number(assetDetails.amount);
            let totalAmountToRecover =
              (Number(yearDiff * 12) +
                Number(monthDiff) +
                Number(
                  dayDiff /
                    new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
                )) *
              (Number(assetDetails.rateofInterest) / 100) *
              Number(assetDetails.amount);
            if (
              assetDetails.returnItem &&
              assetDetails.returnItem === "return"
            ) {
              customerDetailsCompletedObj.push({
                key: assetKey,
                customerName: assetDetails.customerName,
                amount: assetDetails.amount,
                rateofInterest: assetDetails.rateofInterest,
                goldWeight: assetDetails.goldWeight,
                silverWeight: assetDetails.silverWeight,
                dateIn: assetDetails.dateIn,
                goldPercentage: assetDetails.goldPercentage,
                silverPercentage: assetDetails.silverPercentage,
                interest: totalAmountToRecover,
                status: assetDetails.customerStatus,
              });
            } else {
              customerDetailsObj.push({
                key: assetKey,
                customerName: assetDetails.customerName,
                amount: assetDetails.amount,
                rateofInterest: assetDetails.rateofInterest,
                goldWeight: assetDetails.goldWeight,
                silverWeight: assetDetails.silverWeight,
                dateIn: assetDetails.dateIn,
                goldPercentage: assetDetails.goldPercentage,
                silverPercentage: assetDetails.silverPercentage,
                interest: Math.round(totalAmountToRecover * 100) / 100,
                status: assetDetails.customerStatus,
              });
            }
          });
        }
      });
      customerDetailsCompletedObj.forEach(customerDetails=>console.log(customerDetails))
    };
    setROI(roi);
    fetchCustomerDetails();
    setTotalGold(totalGoldTemp);
    setTotalSilver(totalSilverTemp);
    setTotalInvestment(totalInvestmentTemp);
    setAssets(customerDetailsObj);
    setisLoading(false);
  }, [totalInvestment, isLoading]);
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
  function splitDateToYearMonthAndDays(startingDate, endingDate) {
    let startDate = new Date(
      new Date(startingDate).toISOString().substring(0, 10)
    );
    if (!endingDate) {
      endingDate = new Date().toISOString().substring(0, 10); // need date in YYYY-MM-DD format
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

    return { yearDiff, monthDiff, dayDiff };
  }

  const saveOrUpdateAssetHandler = (newAsset) => {
    if (newAsset && newAsset.key) {
      fetch(
        "https://dailytransactions-99473-default-rtdb.firebaseio.com/customers_new/" +
          newAsset.key +
          ".json",
        {
          method: "PUT",
          body: JSON.stringify({ ...newAsset }),
        }
      );
    } else {
      fetch(
        "https://dailytransactions-99473-default-rtdb.firebaseio.com/customers_new.json",
        {
          method: "POST",
          body: JSON.stringify({ ...newAsset }),
        }
      );
      setAssets((prevState) => [newAsset, ...assets]);
    }
    //new fetchCustomerDetails();
  };
  return (
    <>
      <PageHeader
        totalGold={totalGold}
        totalSilver={totalSilver}
        totalInvestment={totalInvestment}
        title="Assets Details"
        subTitle="Let's Grow together..."
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />
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
