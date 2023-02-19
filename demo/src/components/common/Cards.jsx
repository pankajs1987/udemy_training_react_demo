import React, { Fragment } from 'react';
import './Cards.css'

const Cards = (props) => {
  const classes = "cards" + props.className;
  return <Fragment className={classes}>{props.children}</Fragment>;
}

export default Cards;
