
 import React from 'react'
import List from './List';
 import Categories from './Categories'
 import MainSlider from './MainSlider'
 import {Helmet} from "react-helmet";
 export default function Home() {
   return (
    <>
    
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Helmet application" />
    </Helmet>
    <MainSlider></MainSlider>
    <Categories></Categories>
   <List></List>
    </>
   )
 }
 
