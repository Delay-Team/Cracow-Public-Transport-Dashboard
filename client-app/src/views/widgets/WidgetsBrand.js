import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { CWidgetBrand, CRow, CCol } from '@coreui/react';
import ChartLineSimple from '../charts/ChartLineSimple';

class WidgetsBrand extends Component {

    constructor(props) {
        super(props);
        this.counter = 0;
    }


    generateWidget = (data) => {

        if (this.counter === 0) {
            this.counter++;
            return (
                <CCol sm="6" lg="3" key={data.line}>
                    <CWidgetBrand
                        color="facebook"
                        rightHeader="average"
                        rightFooter="delay"
                        leftHeader={data.delay.toString()}
                        leftFooter="seconds"
                    >
                        <p style={{fontSize: '30px'}}>line {data.line}</p>
                        <ChartLineSimple
                            className="position-absolute w-100 h-100"
                            backgroundColor="rgba(255,255,255,.1)"
                            dataPoints={[65, 59, 84, 84, 51, 55, 40]}
                            label="Friends"
                            labels="months"
                        />
                    </CWidgetBrand>
                </CCol>
            )
        }
        else if (this.counter === 1) {
            this.counter++;
            return (
                <CCol sm="6" lg="3" key={data.line}>
                    <CWidgetBrand
                        color="twitter"
                        rightHeader="average"
                        rightFooter="delay"
                        leftHeader={data.delay.toString()}
                        leftFooter="seconds"
                    >
                        <p style={{fontSize: '30px'}}>line {data.line}</p>
                        <ChartLineSimple
                            className="position-absolute w-100 h-100"
                            backgroundColor="rgba(255,255,255,.1)"
                            dataPoints={[1, 13, 9, 17, 34, 41, 38]}
                            label="Followers"
                            labels="months"
                        />
                    </CWidgetBrand>
                </CCol>
            )
        }
        else if (this.counter === 2) {
            this.counter++;
            return (
                <CCol sm="6" lg="3" key={data.line}>
                    <CWidgetBrand
                        color="linkedin"
                        rightHeader="average"
                        rightFooter="delay"
                        leftHeader={data.delay.toString()}
                        leftFooter="seconds"
                    >
                        <p style={{fontSize: '30px'}}>line {data.line}</p>
                        <ChartLineSimple
                            className="position-absolute w-100 h-100"
                            backgroundColor="rgba(255,255,255,.1)"
                            dataPoints={[78, 81, 80, 45, 34, 12, 40]}
                            label="Contracts"
                            labels="months"
                        />
                    </CWidgetBrand>
                </CCol>
            )
        }
        else if (this.counter === 3) {
            this.counter=0;
            return(
                <CCol sm="6" lg="3" key={data.line}>
                    <CWidgetBrand
                        rightHeader="average"
                        rightFooter="delay"
                        leftHeader={data.delay.toString()}
                        leftFooter="seconds"
                        color="gradient-warning"
                    >
                        <p style={{fontSize: '30px'}}>line {data.line}</p>
                        <ChartLineSimple
                            className="position-absolute w-100 h-100"
                            backgroundColor="rgba(255,255,255,.1)"
                            dataPoints={[35, 23, 56, 22, 97, 23, 64]}
                            label="Followers"
                            labels="months"
                        />
                    </CWidgetBrand>
                </CCol>
            )
        }

    }


  render() {
    return (
        <div>
            <h4>Average from all days per line</h4>
            <CRow>
                {
                    Object.keys(this.props.averageForAllDays).map(key => {
                        let delay = this.props.averageForAllDays[key];
                        return this.generateWidget({delay: delay, line: key})
                    })
                }
            </CRow>
        </div>)
  }
}

WidgetsBrand.propTypes = {
  withCharts: PropTypes.bool
}

export default WidgetsBrand
