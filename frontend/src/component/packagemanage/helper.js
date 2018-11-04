import React, { Component } from 'react';
import './packagemanage.css'

export function setMenuDrop(dayimg, daydetail, ready, index, index_ready, e) {
  console.log(dayimg, index);
  const newDayMealState = this.state[dayimg].slice();
  const newDayDetailState = this.state[daydetail].slice();
  newDayMealState[index] = 
  <div className="hovereffect">
      <img className="card-img" src={e.dragData.img_url} />
      <div className="overlay">
        <h2>{e.dragData.menu_name}</h2>
      </div>
    </div>;
  newDayDetailState[index] = e.dragData;
  const newReady = this.state[ready].slice();
  newReady[index_ready] = true;
  this.setState({
    [dayimg]: newDayMealState,
    [daydetail]: newDayDetailState,
    [ready]: newReady,
  });
  console.log(newDayDetailState);
}

