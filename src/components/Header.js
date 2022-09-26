import React from 'react'
import '../App.css';
import { HEADING } from '../config/api';

const Header = () => {
  return (
    <div className="header">
      <p>{HEADING}</p>
    </div>
  )
}

export default Header
