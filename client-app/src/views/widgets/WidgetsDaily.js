import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { CWidgetBrand, CRow, CCol } from '@coreui/react';
import ChartLineSimple from '../charts/ChartLineSimple';

class WidgetsDaily extends Component {

    constructor(props) {
        super(props);
        this.counter = 0;
    }

    generateWidget = (key, values, date) => {
        if( Object.entries(values).length === 0 ) {
            return <CCol sm="6" lg="3" key={key} />
        }

        let dataPoints = [65, 59, 84, 84, 51, 55, 40]
        let color = "facebook"

        if (this.counter === 0) {
            dataPoints = [65, 59, 84, 84, 51, 55, 40]
            color = "facebook"
            this.counter++;
        }
        else if (this.counter === 1) {
            dataPoints = [1, 13, 9, 17, 34, 41, 38]
            color = "twitter"
            this.counter++;
        }
        else if (this.counter === 2) {
            dataPoints = [78, 81, 80, 45, 34, 12, 40]
            color = "linkedin"
            this.counter++;
        }
        else if (this.counter === 3) {
            dataPoints = [35, 23, 56, 22, 97, 23, 64]
            color = "gradient-warning"
            this.counter=0;
        }

        return (
                <CCol sm="6" lg="3" key={key}>
                    <CWidgetBrand
                        color={color}
                        rightFooter={Object.entries(values)[0][0].split('_').join(' ')}
                        rightHeader={Object.entries(values)[0][1].toString()}
                        leftFooter={Object.entries(values)[1][0].split('_').join(' ')}
                        leftHeader={Object.entries(values)[1][1].toString()}
                    >
                        <p style={{fontSize: '20px'}}>{key.split('_').join(' ')}</p>
                        <ChartLineSimple
                            className="position-absolute w-100 h-100"
                            backgroundColor="rgba(255,255,255,.1)"
                            dataPoints={dataPoints}
                            label="Friends"
                            labels="months"
                        />
                    </CWidgetBrand>
                </CCol>)
    }

    generatePerDay = (data, index) => {
        let date = data['date']
        delete data['date']

        let check = Object.values(data).filter(val => Object.keys(val).length !== 0)
        if(check.length === 0) return <div key={index}/>

        return <div key={index}>
                    <h6>{date}</h6>
                    <CRow>
                            {
                                Object.keys(data).map((key, index) => {
                                    return this.generateWidget(key, data[key], date)
                                })
                            }
                     </CRow>
                </div>
    }


    render() {
        return (
            <div>
                <h4>Daily Statistics</h4>
                <h6>Display statistics for stops and lines for every day such as maximum delay or trip
                    from all stops or lines</h6>
                <br />
                    {
                        this.props.dailyStatistics.map( (day, index) => {
                            return this.generatePerDay(day, index)
                        })
                    }
            </div>)
    }
}

WidgetsDaily.propTypes = {
    withCharts: PropTypes.bool
}

export default WidgetsDaily