import React, {Component} from "react";
import {commonService} from "./CommonService";


class LineDataProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            xData: [],
            yData: {},
            averageForAllDays: {},
            active: 1
        }

        this.setChart();
    }

    toSeconds = (time) => {
        time = time.split(':');
        let hours = parseInt(time[0])
        let minutes = parseInt(time[1])
        let seconds = parseInt(time[2])

        let ret = seconds + minutes * 60 + hours * 3600
        return ret;
    }

    getAllLines = (lines) => {
        let allLines = {}

        lines.map(day => {
            day.delays.map(line => {
                allLines[line.line] = Array(lines.length).fill(0)
                return line
            })
            return day
        })

        return allLines
    }

    parseLines = (lines) => {
        let yData = this.getAllLines(lines)

        lines.map( (day, index) => {
            day.delays.map(line => {
                yData[line.line][index] = this.toSeconds(line.avgDelay)
                return line
            })
            return day
        })

        Object.entries(yData).map( ([key, value]) => {
            return [key, value.reverse()]
        })

        this.setState({yData: yData}, () => {
            this.calculateAverageForAllLines();
        });
    }

    setChart = () => {
        commonService.getAllLines().then(resp => {
            let xData = [];

            resp.map(day => {
                xData.push(day.date);
                return day
            });
            xData.reverse()

            this.setState({xData: xData}, () => {
                this.parseLines(resp);
            });
        })
    }

    calculateAverageForAllLines = () => {
        let averageForAllDays = {}

        for (let key in this.state.yData) {
            let size = this.state.yData[key].length
            let sum = this.state.yData[key].reduce((a, b) => a + b, 0)
            averageForAllDays[key] = Math.round(sum/size)
        }

        this.setState({averageForAllDays: averageForAllDays})
    }

    render() {
        return (<div />)
    }
}

export default LineDataProvider