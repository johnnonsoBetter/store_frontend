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
        <Box>
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

        </Box>
       
      );
    }
  }
  
  export default PastDayPreview;