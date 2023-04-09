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
const headCells = [
  { id: "dateIn", label: "Transaction Date" },
  { id: "customerName", label: "Customer Name" },
  { id: "amount", label: "Amount Invested" },
  { id: "rateofInterest", label: "Rate of Interest" },
  { id: "goldWeight", label: "Gold Weight" },
  { id: "silverWeight", label: "Silver Weight" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const useStyles = makeStyles((theme) => ({
  newButton: {
    position: "absolute",
    top: '277px',
    right: "68px",
  },
}));

const AssetItems = (props) => {
  const classes = useStyles();
  const [showAddAssets, setShowAddAssets] = useState(false);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [records, setRecords] = useState(props.assets);
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);
  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
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
          setOpenPopup(true);
          setRecordForEdit(null);
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
              <TableCell>{item.amount}</TableCell>
              <TableCell>{item.rateofInterest}</TableCell>
              <TableCell>{item.goldWeight}</TableCell>
              <TableCell>{item.silverWeight}</TableCell>
              <TableCell>
                <ActionButton
                  color="primary"
                  onClick={() => {
                    openInPopup(item);
                  }}
                >
                  <EditOutlined fontSize="small" />
                </ActionButton>
                <ActionButton color="secondary">
                  <Close fontSize="small" />
                </ActionButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TblContainer>
      <TblPagination />
      <Popup
        title= {recordForEdit ?'Edit Asset Details':'Add Asset Details'}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <AddAssets roi={props.roi} saveOrUpdateAssetHandler={props.saveOrUpdateAssetHandler} recordForEdit={recordForEdit} />
      </Popup>
    </>
  );
};

export default AssetItems;
