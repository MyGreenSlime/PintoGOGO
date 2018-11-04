import React, {Component} from 'react';
// import { Chart } from 'mdbreact';
import '../../nutrition.css';

export default class NutritionA extends Component {
	// constructor(props){
		state = {  }
		// this.pieChart = this.pieChart.bind(this)
	// }

	// pieChart() {
	// 	var ctxP = document.getElementById("pieChart").getContext('2d');
	// 	var myPieChart = new Chart(ctxP, {
	// 		type: 'pie',
	// 		data: {
	// 			labels: ["Red", "Green", "Yellow", "Grey", "Dark Grey"],
	// 			datasets: [
	// 				{
	// 					data: [300, 50, 100, 40, 120],
	// 					backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
	// 					hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
	// 				}
	// 			]
	// 		},
	// 		options: {
	// 			responsive: true
	// 		}
	// 	});
	// 	return myPieChart;
	// }

	render() {
		return (
			<React.Fragment>
			<div className='nutrition-box'>
				{/* <canvas id="pieChart"></canvas> */}
				<div className='description'>
					แพคเกจเหมาะสำหรับบุคคลที่รักษาหุ่น พร้อมด้วยโปรตีนในการสร้างกล้ามเนื้อ เหมาะสำหรับผู้ออกกำลังกาย มี Vitamin A สูงช่วยในการบำรุงสายตา
				</div>
				<div className='row'>
					<div className='col-9'>
						CALORIES
					</div>
					180
				</div>
				<hr></hr>
				<div className='row'>
					<div className='col-9'>
						<p>FAT</p>
					</div>
					<p>10 g</p>
				</div>
				<div className='row'>
					<div className='col-9'>
						<p>CHOLESTEROL</p>
					</div>
					<p>30 g</p>
				</div>
				<div className='row'>
					<div className='col-9'>
						<p>SODIUM</p>
					</div>
					<p>15 g</p>
				</div>
				<div className='row'>
					<div className='col-9'>
						<p>CARBOHYDRATE</p>
					</div>
					<p>23 g</p>
				</div>
				<div className='row'>
					<div className='col-9'>
						<p>PROTEIN</p>
					</div>
					<p>52 g</p>
				</div>
    	</div>
			</React.Fragment>
		);
	}
}

