import React from 'react';
import '@pages/options/Options.css';

export default function Options() {
  return (
    <div className="container">
      <div>
        Article Selector: <input type='text' placeholder='CSS Selector' />
      </div>
      <div>
        Read All: <input type='checkbox' />
      </div>
    </div>
  )
}
