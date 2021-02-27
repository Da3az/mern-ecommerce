import * as React from 'react';
import FiltersList from '../FiltersList';
import Products from '../Products';
import Carousel from '../Carousel/Carousel';

import '@styles/Homepage.css';

const Homepage = () => (
  <div className="homepage">
    <Carousel></Carousel>
    <div className="homepage-container">
      <div className="filtersList-desktop">
        <FiltersList />
      </div>
      <Products />
    </div>
  </div>
  
);

export default Homepage;
