import React from 'react';
import Chart from 'react-apexcharts'
import * as Services from '../Services';

export default class MixedChart extends React.Component {
      
    constructor(props) {
      super(props);
      this.getData = this.getData.bind(this);
      this.interval = null;
      this.state = {
        options: {
          dataLabels: {
            enabled: false
          },

          stroke: {
            width: [1, 1, 4]
          },
          title: {
            text: 'Average Power Consumption By Hours',
            align: 'center',
            offsetX: 0
          },
          xaxis: {
            categories: [],
          },
          yaxis: [
            {
              axisTicks: {
                show: true,
              },
              axisBorder: {
                show: true,
                color: '#008FFB'
              },
              labels: {
                style: {
                  color: '#008FFB',
                }
              },
              title: {
                text: "Active Power W",
                style: {
                  color: '#008FFB',
                }
              },
              tooltip: {
                enabled: true
              }
            },

            {
              seriesName: 'Income',
              opposite: true,
              axisTicks: {
                show: true,
              },
              axisBorder: {
                show: true,
                color: '#00E396'
              },
              labels: {
                style: {
                  color: '#00E396',
                }
              },
              title: {
                text: "Reactive Power VAR",
                style: {
                  color: '#00E396',
                }
              },
            },
            
            {
              seriesName: 'Revenue',
              opposite: true,
              axisTicks: {
                show: true,
              },
              axisBorder: {
                show: true,
                color: '#FEB019'
              },
              labels: {
                style: {
                  color: '#FEB019',
                },
              },
              title: {
                text: "Apparent Power VA",
                style: {
                  color: '#FEB019',
                }
              }
            },
          ],
          tooltip: {
            fixed: {
              enabled: true,
              position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
              offsetY: 30,
              offsetX: 60
            },
          },
          legend: {
            horizontalAlign: 'left',
            offsetX: 40
          }
        },
        series: [],
      }
    }
    componentDidMount() {
        this.getData();
        this.interval = setInterval(this.getData,30000);

    };
    componentWillUnmount() {
      clearInterval(this.interval);
    };
    async getData(){
        let response = await Services.getDashboard()
        if(response && response.data){
          this.props.onChange(response.data);
          let graph = response.data.graph  ;     
          let series = this.state.series;
          series = [{
              name: 'Active E',
              type: 'column',
              data: graph.data.p
            }, {
              name: 'Reactive E',
              type: 'column',
              data: graph.data.q
            }, {
              name: 'Apparent E',
              type: 'column',
              data: graph.data.s
          }] 
          this.setState(
            {
              options: {
              xaxis: {
                  categories: graph.hours
                }
              },
              series:series
            }
          )
        }                
    }
    render() {
      return (       
        <div id="chart">
          <Chart options={this.state.options} series={this.state.series} type="line" height="350" />
        </div>
      );
    }
  }