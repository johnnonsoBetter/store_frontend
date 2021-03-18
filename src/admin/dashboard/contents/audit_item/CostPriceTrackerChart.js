import React, { Component } from "react";
import Chart from "react-apexcharts";


class CostPriceTrackerChart extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        options: {
          chart: {
            id: "basic-bar"
          },
          xaxis: {
            categories: ["Thu", "Fri"]
          }
        },
        series: [
          {
            name: "series-1",
            data: [400, 100]
          }
        ]
      };
    }
  
    render() {
      return (
        <div className="app">
          <div className="row">
            <div className="mixed-chart">
              <Chart
                options={this.state.options}
                series={this.state.series}
                type="bar"
                width="100%"
              />
            </div>
          </div>
        </div>
      );
    }
  }
  
  export default CostPriceTrackerChart;