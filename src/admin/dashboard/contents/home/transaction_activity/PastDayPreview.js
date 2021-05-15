import React, { Component } from "react";
import Chart from "react-apexcharts";
import { Box } from "@material-ui/core";
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
            categories: []
          }
        },
        series: [
          {
            name: "series-1",
            data: []
          }
        ]
      };
    }

    componentDidMount(){
     
    

      const dateCategories = this.props.previews.map(track => {
        let date = DateTime.fromISO(track.created_at)

        return `${date.weekdayShort}`
      })

      const dataCategories = this.props.previews.map(data => data.total_sales)

     

      this.setState({
        options: {
          chart: {
            id: "basic-bar"
          },
          xaxis: {
            categories: dateCategories
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
          colors: ['yellow']
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
        <Box p={4} style={{backgroundImage: "linear-gradient(to right, rgba(255, 0, 0, 0), rgb(36 73 127))", height: "100%", color: "white"}} borderRadius={15}>
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