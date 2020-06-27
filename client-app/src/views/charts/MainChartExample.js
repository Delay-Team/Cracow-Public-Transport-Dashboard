import React, {Component} from 'react'
import { CChartLine } from '@coreui/react-chartjs'


class MainChartExample extends Component {

  defaultDatasets = () => {
    let yChartData = [];

    for (const [key, value] of Object.entries(this.props.yData)) {
      let randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
      yChartData.push(
          {
            label: `Line number ${key}`,
            backgroundColor: 'transparent',
            borderColor: randomColor,
            pointHoverBackgroundColor: randomColor,
            borderWidth: 2,
            data: value
          }
      )
    }

    return yChartData
  }

  render() {
    return (
        <CChartLine
            datasets={this.defaultDatasets()}
            options={
              {
                legend: {
                  display: true,
                  position: "right"
                },
                tooltips: {
                  type: 'simple'
                },
                scales: {
                      yAxes: [{
                                ticks: {
                                  beginAtZero: true,
                                  maxTicksLimit: 5,
                                  stepSize: Math.ceil(250 / 5)
                                }
                      }]
                },
                elements: {
                  point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                    hoverBorderWidth: 3
                  }
                }
              }}
            labels={this.props.xData}
        />
    )
  }
}


export default MainChartExample
