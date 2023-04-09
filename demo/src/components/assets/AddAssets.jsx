// import React, { Fragment, useState } from "react";
// import classes from "./AddAssets.module.css";
// import Input from "../UI/Input";
// import useInput from "../hooks/use-input";
// import SelectBox from "../common/SelectBox";

// const AddAssets = (props) => {

//   const isNotEmpty = (value) => value.trim() !== "";
//   const[enteredrateOfInterest, setEnteredrateOfInterest] = useState("");
//   const[enteredrateOfInterestIsValid, setenteredrateOfInterestIsValid] = useState(false);
//   const[enteredrateOfInterestHasError, setEnteredrateOfInterestHasError] = useState(true);

//   //  Validating Customer Name
//   const {
//     value: enteredCustomerName,
//     isValid: enteredCustomerNameIsValid,
//     hasError: enteredCustomerNameHasError,
//     inputBlurHandler: nameBlurHandler,
//     valueChangeHandler: nameChangeHandler,
//     reset: resetNameInput,
//   } = useInput(isNotEmpty);

//   //Validate Amount Entered
//   const {
//     value: enteredAmount,
//     isValid: enteredAmountIsValid,
//     hasError: enteredAmountHasError,
//     inputBlurHandler: enteredAmountBlurHandler,
//     valueChangeHandler: enteredAmountChangeHandler,
//     reset: resetEnteredAmountInput,
//   } = useInput(isNotEmpty);

//   //Validate Gold Weight
//   const {
//     value: enteredgoldWeight,
//     isValid: enteredgoldWeightIsValid,
//     hasError: enteredgoldWeightHasError,
//     inputBlurHandler: enteredgoldWeightBlurHandler,
//     valueChangeHandler: enteredgoldWeightChangeHandler,
//     reset: resetenteredgoldWeightInput,
//   } = useInput(isNotEmpty);

//   //Validate Date Entered
//   const {
//     value: enteredDate,
//     isValid: enteredDateIsValid,
//     hasError: enteredDateHasError,
//     inputBlurHandler: enteredDateBlurHandler,
//     valueChangeHandler: enteredDateChangeHandler,
//     reset: resetEnteredDateInput,
//   } = useInput((value) => value !== "");
  
  
//   //Validate Silver Weight
//   const {
//     value: enteredSilverWeight,
//     isValid: enteredSilverWeightIsValid,
//     hasError: enteredSilverWeightHasError,
//     inputBlurHandler: enteredSilverWeightBlurHandler,
//     valueChangeHandler: enteredSilverWeightChangeHandler,
//     reset: resetenteredSilverWeightInput,
//   } = useInput(isNotEmpty);

  
//   let formIsValid = false;
//     if (
//     enteredCustomerNameIsValid &&
//     enteredAmountIsValid &&
//     enteredrateOfInterestIsValid &&
//     enteredgoldWeightIsValid && enteredSilverWeightIsValid
//   ) {
//     formIsValid = true;
//   }

//   const nameInputClasses = enteredCustomerNameHasError
//     ? "form-control invalid"
//     : "form-control";

//     const resetenteredrateOfInterestInput = ()=>{
//       setEnteredrateOfInterest('');
//       setEnteredrateOfInterestHasError(true);
//       setenteredrateOfInterestIsValid(false);


//     }
//     const  handleCallBack =(selectedValue)=>{
//       resetenteredrateOfInterestInput();
//       setEnteredrateOfInterest(selectedValue.target.value);
//       console.log('Inside AddAssets : '+enteredrateOfInterest);
//       if(enteredrateOfInterest==='Please Select ROI'){
//         setEnteredrateOfInterest('');
//         setEnteredrateOfInterestHasError(true);
//       setenteredrateOfInterestIsValid(false);
//       return;
//       }
//       //setEnteredrateOfInterest(selectedValue.target.value);
//       setEnteredrateOfInterestHasError(false);
//       setenteredrateOfInterestIsValid(true);
      
//     }
    
  
//     const submitHandler = (event) => {
//     event.preventDefault();
//     if (
//       enteredCustomerNameHasError ||
//       enteredAmountHasError ||
//       enteredrateOfInterestHasError || 
//       enteredgoldWeightHasError ||
//       enteredSilverWeightHasError

//     )
//       return;
//    // props.onAddToCart(enteredAmountNumber);
  
//    const assetData = {
//       key:Math.random()*100,
//       customerName: enteredCustomerName,
//       amount: enteredAmount,
//       dateIn: new Date(enteredDate),
//       rateofInterest: enteredrateOfInterest,
//       goldWeight: enteredgoldWeight,
//       silverWeight: enteredSilverWeight,
//     };
//     props.onSaveOrUpdateAsset(assetData);
//     resetNameInput();
//     resetEnteredAmountInput();
//    resetenteredrateOfInterestInput();
//     resetEnteredDateInput();
//     resetenteredgoldWeightInput();
//     resetenteredSilverWeightInput();
//   };
//   let counter =0;
//   if(typeof props.asset != 'undefined' && counter===0){
//     console.log(props.asset)
//     console.log(props.key)
//     counter++;
//     // enteredAmount=props.asset.amount;
//      //enteredCustomerName=props.asset.customerName;
//     // enteredgoldWeight=props.asset.goldWeight;
//   }
//   return (
//     <Fragment>
//       <form className={classes.form} onSubmit={submitHandler}>
//         <Input
//           label="Customer Name"
//           input={{
//             id: "enteredCustomerName",
//             onChange: nameChangeHandler,
//             onBlur: nameBlurHandler,
//             type: "text",

//             value: props.asset && props.asset.customerName ? props.asset.customerName : enteredCustomerName,
//           }}
//         />
//         {enteredCustomerNameHasError && <p>Customer Name can not be Empty.</p>}
//         <Input className={classes.control}
//           label="Date In"
//           input={{
//             type: "date",
//             value: enteredDate,
//             id: "dateIn",
//             // defaultValue:'18-07-1987',
//             onChange: enteredDateChangeHandler,
//             onBlur: enteredDateBlurHandler,
//           }}
//         />
//         <Input
//           label="Amount"
//           input={{
//             type: "number",
//             id: "enteredAmount",
//             value: enteredAmount,
//             onBlur: enteredAmountBlurHandler,
//             onChange: enteredAmountChangeHandler,
//           }}
//         />
//         {enteredAmountHasError && <p>Amount is not Valid.</p>}
//         <label className={classes.selectbox_label}>Rate of Intrest</label><SelectBox handleCallBack={handleCallBack} />
//         {enteredrateOfInterestHasError && <p>Please select valid Rate of Interest.</p>}
//         <Input
//           label="Gold Weight"
//           input={{
//             type: "number",
//             id: "enteredgoldWeight",
//             value: enteredgoldWeight,
//             onBlur: enteredgoldWeightBlurHandler,
//             onChange: enteredgoldWeightChangeHandler,
//           }}
//         />
//          {enteredgoldWeightHasError && <p>Gold Weight is not Valid.</p>}
//         <Input
//           label="Silver Weight"
//           input={{
//             type: "number",
//             id: "enteredSilverWeight",
//             value: enteredSilverWeight,
//             onBlur: enteredSilverWeightBlurHandler,
//             onChange: enteredSilverWeightChangeHandler,

//           }}
//         />
//          {enteredSilverWeightHasError && <p>silver Weight is not Valid.</p>}
//         <div className="add-assets__action">
//           <button disabled={!formIsValid} type="submit" className="button">
//             Add Details
//           </button>
//         </div>
//       </form>
//     </Fragment>
//   );
// };

//export default AddAssets;


import React, {  useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../common/Controls";
import { useForm, Form } from '../useForm';


const initialFValues = {
    key: '',
    customerName: '',
    dateIn:new Date(),
    amount: 0,
    goldWeight: 0,
    silverWeight: 0,
    rateofInterest: 0,
    
}

export default function AddAssets(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
       
         let temp = { ...errors }
        if ('amount' in fieldValues)
            temp.amount = fieldValues.amount > 0 ? "" : "Amount Should be greater then 0."
        if ('rateofInterest' in fieldValues)
            temp.rateofInterest = fieldValues.rateofInterest > 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            props.saveOrUpdateAssetHandler(values, resetForm);
        }
    }

    useEffect(() => {
        console.log(recordForEdit);
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

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
                        name="goldWeight"
                        label="Gold Weight"
                        value={values.goldWeight}
                        onChange={handleInputChange}
                        error={errors.goldWeight}
                    />
                      <Controls.Input
                        label="Silver Weight"
                        name="silverWeight"
                        value={values.silverWeight}
                        onChange={handleInputChange}
                        error={errors.silverWeight}
                    />

                </Grid>
                    <Controls.Select
                        name="rateofInterest"
                        label="Rate of Interest"
                        value={values.roi}
                        onChange={handleInputChange}
                        options={props.roi}
                        error={errors.roi}
                    />
                

                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            
        </Form>
    )
}

