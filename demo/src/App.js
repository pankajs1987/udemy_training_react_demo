import Assets from "./components/assets/Assets";
import { useState } from 'react';

import Header from './components/Layout/Header';
import Cart from './components/Cart/Cart';



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBh-qmM2lxyMLKh4JRn7ohPi9GwggCCvN4",
  authDomain: "esoteric-might-684.firebaseapp.com",
  databaseURL: "https://esoteric-might-684.firebaseio.com",
  projectId: "esoteric-might-684",
  storageBucket: "esoteric-might-684.appspot.com",
  messagingSenderId: "469595731903",
  appId: "1:469595731903:web:3f62d25613ddead4fcd30a"
};



function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  initializeApp(firebaseConfig);
  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  return (
    <div className="App">
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <Assets></Assets>
    </div>
  );
}

export default App;
