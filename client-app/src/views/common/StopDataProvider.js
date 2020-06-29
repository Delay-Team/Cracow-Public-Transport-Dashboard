import React, {Component} from "react";
import {commonService} from "./CommonService";


class StopDataProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            xData: [],
            yData: {},
            averageForAllDays: {},
            active: 1,
            activeTab: 0
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

    getAllStops = (stops) => {
        let allStops = {}

        stops.map(day => {
            day.delays.map(stop => {
                allStops[stop.stop] = Array(stop.length).fill(0)
                return stop
            })
            return day
        })

        return allStops
    }

    parseStops = (stops) => {
        let yData = this.getAllStops(stops)

        stops.map( (day, index) => {
            day.delays.map(stop => {
                yData[stop.stop][index] = this.toSeconds(stop.avgDelay)
                return stop
            })
            return day
        })

        Object.entries(yData).map( ([key, value]) => {
            return [key, value.reverse()]
        })

        this.setState({yData: yData}, () => {
            this.calculateAverageForAllStops();
        });
    }

    setChart = () => {
        commonService.getAllStops().then(resp => {
            let xData = [];

            resp.map(day => {
                xData.push(day.date);
                return day
            });
            xData.reverse()

            this.setState({xData: xData}, () => {
                this.parseStops(resp);
            });
        })
    }

    calculateAverageForAllStops = () => {
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

export default StopDataProvider