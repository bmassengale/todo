import React from "react";
import './Home.css';
import checklist from './../../Component_Images/checklist.jpg';

const Home = () => {

  return (
    <div className='Home'>
      <img src={checklist} alt="Notebook" />
    </div>
  );
};

export default Home;