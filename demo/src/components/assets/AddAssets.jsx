import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../common/Controls";
import { useForm, Form } from "../useForm";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

const initialFValues = {
  key: "",
  customerName: "",
  dateIn: new Date(),
  amount: 0,
  goldWeight: 0,
  silverWeight: 0,
  rateofInterest: 0,
  silverPercentage: 0,
  goldPercentage: 0,
};

export default function AddAssets(props) {
  const { addOrEdit, recordForEdit } = props;
  const {goldAmount,setGoldAmount} = useState(0);
  const {silverAmount,setSilverAmount} = useState(0);
   let goldAmtShow=0;
   let silverAmtShow=0;
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("amount" in fieldValues)
      temp.amount =
        fieldValues.amount > 0 ? "" : "Amount Should be greater then 0.";
    if ("rateofInterest" in fieldValues)
      temp.rateofInterest =
        fieldValues.rateofInterest > 0 ? "" : "This field is required.";
      
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      props.saveOrUpdateAssetHandler(values, resetForm);
    }
  };

  useEffect(() => {
   
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="customerName"
            label="Customer Name"
            value={values.customerName}
            onChange={handleInputChange}
            error={errors.customerName}
          />

          <Controls.DatePicker
            name="dateIn"
            label="Transaction Date"
            value={values.dateIn}
            onChange={handleInputChange}
          />
          <Controls.Input
            name="amount"
            label="Transaction Amount"
            value={values.amount}
            onChange={handleInputChange}
            error={errors.amount}
          />
          <Controls.Input
            label="Gold Weight"
            name="goldWeight"
            value={values.goldWeight}
            onChange={handleInputChange}
            error={errors.goldWeight}
          />
          <Controls.Input
            label="Gold Percentage"
            name="goldPercentage"
            value={values.goldPercentage}
            onChange={handleInputChange}
            error={errors.goldPercentage}
          />
          <Controls.Input
            label="Silver Weight"
            name="silverWeight"
            value={values.silverWeight}
            onChange={handleInputChange}
            error={errors.silverWeight}
          />

          <Controls.Input
            label="Silver Percentage"
            name="silverPercentage"
            value={values.silverPercentage}
            onChange={handleInputChange}
            error={errors.silverPercentage}
          />
        </Grid>
        <Grid>
          <Controls.Select
            name="rateofInterest"
            label="Rate of Interest"
            value={values.roi}
            onChange={handleInputChange}
            options={props.roi}
            error={errors.roi}
          />
          {recordForEdit && 
          <Controls.Select
            name="rateofInterest"
            label="Return item"
            value={values.roi}
            onChange={handleInputChange}
            options={props.roi}
            error={errors.roi}
          />
}


          <div>
            <Controls.Button
              type="submit"
              text="Submit"
              onClick={props.handleSubmitClick}
            />
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
          </div>
            <Divider />
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
      }}
    >
      <ListItem>
      <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
      <ListItemText primary="Gold Rates" secondary={props.goldRates} />
      </ListItem>
      <Divider component="li" />
      <ListItem>
      <ListItemAvatar>
          <Avatar>
            <WorkIcon />
          </Avatar>
        </ListItemAvatar>
      <ListItemText primary="Silver Rates" secondary={props.silverRates} />
      </ListItem>
      <Divider component="li" />
      <li>
        <Typography
          sx={{ mt: 0.5, ml: 2 }}
          color="text.secondary"
          display="block"
          variant="caption"
        >
          Calculations 
        </Typography>
      </li>
      <ListItem>
        <ListItemText primary="Gold Calculated Amount" secondary={Math.round((Number(values.goldWeight) * (Number(values.goldPercentage)/100) * Number(props.goldRates)) * 100) / 100} />
      </ListItem>
      <Divider component="li" variant="inset" />
      <ListItem>
        <ListItemText primary="Silver Calculated Amount" secondary={Math.round((Number(values.silverWeight) * (Number(values.silverPercentage)/100) * Number(props.silverRates))* 100) / 100} />
      </ListItem>
      <Divider component="li" variant="inset" />
      <li>
        <Typography
          sx={{ mt: 0.5, ml: 9 }}
          color="text.secondary"
          display="block"
          variant="caption"
        >
          Result
        </Typography>
      </li>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <BeachAccessIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Loan eligiblity : " secondary={Math.round((Number(values.silverWeight) * (Number(values.silverPercentage)/100) * Number(props.silverRates) + Number(values.goldWeight) * (Number(values.goldPercentage)/100) * Number(props.goldRates))* 100) / 100} />
      </ListItem>
    </List>


           

        </Grid>


      </Grid>
    </Form>
  );
}
