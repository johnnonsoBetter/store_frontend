import React, { Component } from "react";
import Chart from "react-apexcharts";
import { DateTime } from "luxon";
import { Box } from "@material-ui/core";


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

    //   const dataCategories = this.props.previews.map(data => data.amount)
   

    

      this.setState({
        options: {
          chart: {
            id: "basic-bar"
          },
          xaxis: {
            categories: this.props.previews
          }
        },
        dataLabels: {
          style: {
            colors: ['black', '#E91E63', '#9C27B0']
          }
        },
        grid: {
          row: {
            colors: ['#F44336', '#E91E63', '#9C27B0']
          },
          column: {
            colors: ['#F44336', '#E91E63', '#9C27B0']
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 90, 100]
          },
          colors: ['black']
        },
        series: [
          {
            name: "series-1",
            data: this.props.previews
          }
        ]
      }
    )


    }
  
    render() {
      return (
        <Box p={4} style={{backgroundImage: "linear-gradient(to right, rgba(255,0,0,0), rgb(54 74 105))", color: "white"}} borderRadius={15}>
            <div className="app">
            <div className="row">
                <div className="mixed-chart">
                <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type="area"
                    width="100%"
                />
                </div>
            </div>
            </div>

        </Box>
       
      );
    }
  }
  
  export default PastDayPreview;