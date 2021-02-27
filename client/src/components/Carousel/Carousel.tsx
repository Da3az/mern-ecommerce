import * as React from 'react';
import {useState} from 'react';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import '@styles/Carousel.css';


const Carousel = () => {
  const [images] = useState([
      'http://bpc.h-cdn.co/assets/17/16/1492525968-best-smartphones-2017.jpg',
      'https://www.unlockplus.com/blog/wp-content/uploads/2019/01/Safely-buy-Smartphones.jpg',
      'https://i.ytimg.com/vi/97cDu5Le0eM/maxresdefault.jpg',
      'http://cdn.mos.cms.futurecdn.net/9jLFvFSzCSZhE33dTLA9RJ-1200-80.jpg'
      
  ])
  const [selected,setSelected] = useState(0)
  const left = () => {
     selected !== 3 ? setSelected(selected+1) : setSelected(0)
  }
 
  const right = () => {
    selected !== 0 ? setSelected(selected-1) : setSelected(3)
 }
 
 const fade = () => {
   var carousel:HTMLElement|null = document.getElementById('carousel')
   carousel!.classList.remove('fade');
   carousel!.classList.add('fade');
 }

 
  
return(

    <div className="carousel">
      <div id='carousel' className="carousel-container ">
      <img src={images[selected]} alt=""/>
      <button className = 'carousel-left' onClick = {() => {left();fade()}} >
        <KeyboardArrowLeft ></KeyboardArrowLeft>
      </button>
      <button className="carousel-right" onClick = {() => {right();fade()}} >
        <KeyboardArrowRight ></KeyboardArrowRight>
      </button> 
      </div>  
    </div>
 
  );

}
export default Carousel;