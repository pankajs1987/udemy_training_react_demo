import "../common/DateComponent.css";
import DateComponent from "../common/DateComponent";
import React, { useState } from "react";
import { EditOutlined, Close } from "@mui/icons-material";
import useTable from "../useTable";
import ActionButton from "../common/ActionButton";
import { TableBody, TableRow, TableCell } from "@material-ui/core";
import Popup from "../Popup";
import AddAssets from "./AddAssets";
import Controls from "../common/Controls";
import Add from "@mui/icons-material/Add";
import { makeStyles } from "@material-ui/core";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import BalanceIcon from "@mui/icons-material/Balance";
import CheckIcon from "@mui/icons-material/Check";
import CalculateIcon from "@mui/icons-material/Calculate";
import FunctionsIcon from "@mui/icons-material/Functions";
import PercentIcon from "@mui/icons-material/Percent";
const headCells = [
  { id: "dateIn", label: "Transaction Date" },
  { id: "customerName", label: "Customer Name" },
  { id: "amount", label: "Investment" },
  { id: "rateofInterest", label: "Rate of Interest" },
  { id: "goldWeight", label: "Gold Details" },
  { id: "silverWeight", label: "Silver Details" },
  { id: "totalAmount", label: "Today's Cost" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const useStyles = makeStyles((theme) => ({
  newButton: {
    position: "absolute",
    top: "277px",
    right: "68px",
  },
}));

const AssetItems = (props) => {
  const classes = useStyles();
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [recordForDelete, setRecordForDelete] = useState(null);
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(props.assets, headCells, filterFn);
  const openInPopup = (item, processType) => {
    if (processType === "EDIT") {
      setRecordForEdit(item);
      setRecordForDelete(null);
    } else if (processType === "DELETE") {
      setRecordForDelete(item);
      setRecordForEdit(null);
    } else if (processType === "ADD") {
      setRecordForDelete(null);
      setRecordForEdit(null);
    }

    setOpenPopup(true);
  };

  const handleSubmitClick = () => {
    setOpenPopup(false);
  };

  return (
    <>
      <Controls.Button
        text="Add Assets Details"
        variant="outlined"
        className={classes.newButton}
        startIcon={<Add />}
        type="button"
        onClick={() => {
          openInPopup(null, "ADD");
        }}
      />
      <TblContainer>
        <TblHead />
        <TableBody>
          {recordsAfterPagingAndSorting().map((item) => (
            <TableRow key={item.key}>
              <TableCell>
                <DateComponent date={new Date(item.dateIn)}></DateComponent>
              </TableCell>
              <TableCell>{item.customerName}</TableCell>
              <TableCell>
                <ul>
                  <li>
                    {" "}
                    <CurrencyRupeeIcon fontSize="small" /> {item.amount}
                  </li>
                  <li>
                    <CalculateIcon fontSize="small" /> {item.interest}
                  </li>
                  <li>
                    <FunctionsIcon fontSize="small" />
                    {Math.round(
                      (Number(item.interest) + Number(item.amount)) / 100
                    ) * 100}
                  </li>
                </ul>
              </TableCell>
              <TableCell>
                {item.rateofInterest}
                <PercentIcon fontSize="small" />
              </TableCell>
              <TableCell>
                <ul>
                  <li>
                    <BalanceIcon fontSize="small" /> {item.goldWeight} gm
                  </li>
                  <li>
                    <CurrencyRupeeIcon fontSize="small" />
                    {Math.round(
                      item.goldWeight *
                        (item.goldPercentage = item.goldPercentage
                          ? item.goldPercentage
                          : 1) *
                        props.goldRates
                    ) / 100}
                  </li>
                  {item.goldPercentage && (
                    <li>
                      <CheckIcon fontSize="small" /> {item.goldPercentage} %
                    </li>
                  )}
                </ul>
              </TableCell>

              <TableCell>
                <ul>
                  <li>
                    <BalanceIcon fontSize="small" /> {item.silverWeight} gm
                  </li>
                  <li>
                    <CurrencyRupeeIcon fontSize="small" />{" "}
                    {Math.round(
                      item.silverWeight *
                        (item.silverPercentage = item.silverPercentage
                          ? item.silverPercentage
                          : 1) *
                        props.silverRates
                    ) / 100}
                  </li>
                  {item.silverPercentage && (
                    <li>
                      <CheckIcon fontSize="small" /> {item.silverPercentage} %
                    </li>
                  )}
                </ul>
              </TableCell>
              <TableCell>
                <CurrencyRupeeIcon fontSize="small" />{" "}
                {Math.round(
                  ((item.silverWeight *
                    (item.silverPercentage / 100) *
                    props.silverRates +
                    item.goldWeight *
                      (item.goldPercentage / 100) *
                      props.goldRates) /
                    100) *
                    100
                )}
              </TableCell>
              <TableCell>
                <ActionButton
                  color="primary"
                  onClick={() => {
                    openInPopup(item, "EDIT");
                  }}
                >
                  <EditOutlined fontSize="small" />
                </ActionButton>
                <ActionButton
                  color="secondary"
                  onClick={() => {
                    openInPopup(item, "DELETE");
                  }}
                >
                  <Close fontSize="small" />
                </ActionButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TblContainer>
      <TblPagination />
      {!recordForDelete && (
        <Popup
          title={recordForEdit ? "Edit Asset Details" : "Add Asset Details"}
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <AddAssets
            goldRates={props.goldRates}
            silverRates={props.silverRates}
            roi={props.roi}
            handleSubmitClick={handleSubmitClick}
            saveOrUpdateAssetHandler={props.saveOrUpdateAssetHandler}
            recordForEdit={recordForEdit}
          />
        </Popup>
      )}
      {recordForDelete && (
        <Popup
          title={"Are you Sure to Delete this Entry"}
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        ></Popup>
      )}
    </>
  );
};

export default AssetItems;
