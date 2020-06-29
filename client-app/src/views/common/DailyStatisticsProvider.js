import React, {Component} from "react";
import {commonService} from "./CommonService";


class DailyStatisticsProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            statisticsData: []
        }

        this.setData();
    }

    setData = () => {
        commonService.getDaily().then(resp => {
            resp.reverse()
            this.setState({statisticsData: resp})
        })
    }

    render() {
        return (<div />)
    }
}

export default DailyStatisticsProvider