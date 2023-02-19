import React, { Fragment, useState } from "react";
import classes from "./AddAssets.module.css";
import Input from "../UI/Input";
import useInput from "../hooks/use-input";

const AddAssets = (props) => {
  const isNotEmpty = (value) => value.trim() !== "";
  //  Validating Customer Name
  const {
    value: enteredCustomerName,
    isValid: enteredCustomerNameIsValid,
    hasError: enteredCustomerNameHasError,
    inputBlurHandler: nameBlurHandler,
    valueChangeHandler: nameChangeHandler,
    reset: resetNameInput,
  } = useInput(isNotEmpty);

  //Validate Amount Entered
  const {
    value: enteredAmount,
    isValid: enteredAmountIsValid,
    hasError: enteredAmountHasError,
    inputBlurHandler: enteredAmountBlurHandler,
    valueChangeHandler: enteredAmountChangeHandler,
    reset: resetEnteredAmountInput,
  } = useInput(isNotEmpty);

  //Validate Rate of Ineterest Entered
  const {
    value: enteredrateOfInterest,
    isValid: enteredrateOfInterestIsValid,
    hasError: enteredrateOfInterestHasError,
    inputBlurHandler: enteredrateOfInterestBlurHandler,
    valueChangeHandler: enteredrateOfInterestChangeHandler,
    reset: resetenteredrateOfInterestInput,
  } = useInput(isNotEmpty);

  //Validate Gold Weight
  const {
    value: enteredgoldWeight,
    isValid: enteredgoldWeightIsValid,
    hasError: enteredgoldWeightHasError,
    inputBlurHandler: enteredgoldWeightBlurHandler,
    valueChangeHandler: enteredgoldWeightChangeHandler,
    reset: resetenteredgoldWeightInput,
  } = useInput(isNotEmpty);

  //Validate Date Entered
  const {
    value: enteredDate,
    isValid: enteredDateIsValid,
    hasError: enteredDateHasError,
    inputBlurHandler: enteredDateBlurHandler,
    valueChangeHandler: enteredDateChangeHandler,
    reset: resetEnteredDateInput,
  } = useInput((value) => value !== "");
  
  
  //Validate Silver Weight
  const {
    value: enteredSilverWeight,
    isValid: enteredSilverWeightIsValid,
    hasError: enteredSilverWeightHasError,
    inputBlurHandler: enteredSilverWeightBlurHandler,
    valueChangeHandler: enteredSilverWeightChangeHandler,
    reset: resetenteredSilverWeightInput,
  } = useInput(isNotEmpty);

  let formIsValid = false;
  if (
    enteredCustomerNameIsValid &&
    enteredAmountIsValid &&
    enteredrateOfInterestIsValid &&
    enteredgoldWeightIsValid && enteredSilverWeightIsValid
  ) {
    formIsValid = true;
  }

  const nameInputClasses = enteredCustomerNameHasError
    ? "form-control invalid"
    : "form-control";

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      enteredCustomerNameHasError ||
      enteredAmountHasError ||
      enteredrateOfInterestHasError || 
      enteredgoldWeightHasError ||
      enteredSilverWeightHasError

    )
      return;

    

   // props.onAddToCart(enteredAmountNumber);
    const assetData = {
      key:Math.random()*100,
      customerName: enteredCustomerName,
      amount: enteredAmount,
      dateIn: new Date(enteredDate),
      rateofInterest: enteredrateOfInterest,
      goldWeight: enteredgoldWeight,
      silverWeight: enteredSilverWeight,
    };
    props.onSaveOrUpdateAsset(assetData);
    resetNameInput();
    resetEnteredAmountInput();
    resetenteredrateOfInterestInput();
    resetEnteredDateInput();
    resetenteredgoldWeightInput();
    resetenteredSilverWeightInput();
  };

  return (
    <Fragment>
      <form className={classes.form} onSubmit={submitHandler}>
        <Input
          label="Customer Name"
          input={{
            id: "enteredCustomerName",
            onChange: nameChangeHandler,
            onBlur: nameBlurHandler,
            type: "text",

            value: enteredCustomerName,
          }}
        />
        {enteredCustomerNameHasError && <p>Customer Name can not be Empty.</p>}
        <Input className={classes.control}
          label="Date In"
          input={{
            type: "date",
            value: enteredDate,
            id: "dateIn",
            // defaultValue:'18-07-1987',
            onChange: enteredDateChangeHandler,
            onBlur: enteredDateBlurHandler,
          }}
        />
        <Input
          label="Amount"
          input={{
            type: "number",
            id: "enteredAmount",
            value: enteredAmount,
            onBlur: enteredAmountBlurHandler,
            onChange: enteredAmountChangeHandler,
          }}
        />
        {enteredAmountHasError && <p>Amount is not Valid.</p>}
        <Input
          label="Rate of Interest"
          input={{
            type: "number",
            id: "rateOfInterest",
            value: enteredrateOfInterest,
            onBlur: enteredrateOfInterestBlurHandler,
            onChange: enteredrateOfInterestChangeHandler,
          }}
        />
        {enteredrateOfInterestHasError && <p>Rate of Interest is not Valid.</p>}
        <Input
          label="Gold Weight"
          input={{
            type: "number",
            id: "enteredgoldWeight",
            value: enteredgoldWeight,
            onBlur: enteredgoldWeightBlurHandler,
            onChange: enteredgoldWeightChangeHandler,
          }}
        />
         {enteredgoldWeightHasError && <p>Gold Weight is not Valid.</p>}
        <Input
          label="Silver Weight"
          input={{
            type: "number",
            id: "enteredSilverWeight",
            value: enteredSilverWeight,
            onBlur: enteredSilverWeightBlurHandler,
            onChange: enteredSilverWeightChangeHandler,

          }}
        />
         {enteredSilverWeightHasError && <p>silver Weight is not Valid.</p>}
        <div className="add-assets__action">
          <button disabled={!formIsValid} type="submit" className="button">
            Add Details
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default AddAssets;
