import React from 'react';
import './packagemanage.css'

export function setMenuDrop(dayimg, daydetail, ready, index, index_ready, e) {
  console.log(dayimg, index);
  const newDayMealState = this.state[dayimg].slice();
  const newDayDetailState = this.state[daydetail].slice();
  newDayMealState[index] = 
  <div className="hovereffect">
      <img className="card-img" src={e.dragData.img_url} alt={e.dragData.menu_name}/>
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

// export function checkReady(show_nutrition) {
//   let all_ready = true;
//   const button_nut = <button className="btn btn-shownutrition" onClick={this.onSendMenuDetail}>CLICK TO SHOW NUTRITION</button>

//   this.state.isReadyToShow.map((ready, index) => {
//     if (!ready) {
//       all_ready = false;
//     }
//   });

//   console.log(all_ready);
//   if (all_ready) {
//     this.setState({
//       [show_nutrition]: button_nut
//     })
//   }
// }