import React from 'react'
import Button from '../../components/Button';
import ButtonArrow from '../../components/ButtonArrow';
import Header from "../../components/Header";
import RectangleButton from '../../components/RectangleButton';

function WelcomePage() {
  return (
<React.Fragment>
    <Header/>
    <ButtonArrow text="text"/>
    <Button text="text"/>
    <RectangleButton text="text"/>
</React.Fragment>
  );
}

export default WelcomePage;