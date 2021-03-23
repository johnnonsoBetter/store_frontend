import React, { Component } from "react";
import Chart from "react-apexcharts";
import { DateTime } from "luxon";


class PastDayPreview extends Component {
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

    componentDidMount(){
     
    

    //   const dateCategories = this.props.previews.map(track => {
    //     let date = DateTime.fromISO(track.created_at)

    //     return `${date.monthShort} ${date.day}`
    //   })

      const dataCategories = this.props.previews.map(data => data.amount)
   

      console.log(dateCategories)
      console.log(dataCategories)

      this.setState({
        options: {
          chart: {
            id: "basic-bar"
          },
          xaxis: {
            categories: dateCategories
          }
        },
        series: [
          {
            name: "series-1",
            data: dataCategories
          }
        ]
      }
    )


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
  
  export default PastDayPreview;