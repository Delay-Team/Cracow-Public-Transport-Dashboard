import React from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CTabs,
    CTabContent,
    CTabPane,
    CNav,
    CNavItem,
    CNavLink,
    CListGroupItem,
    CListGroup
} from '@coreui/react'
import {
    CChartBar,
} from '@coreui/react-chartjs'
import StopDataProvider from '../common/StopDataProvider'


class StopStatistics extends StopDataProvider {

    generateChartForStop = (average) => {
        return (
            <CCardBody>
                <CChartBar
                    type="bar"
                    datasets={[
                        {
                            label: 'seconds of delay',
                            backgroundColor: '#f87979',
                            data: Object.values(average)
                        }
                    ]}
                    labels={Object.keys(average)}
                    options={{
                        tooltips: {
                            enabled: true
                        }
                    }}
                />
            </CCardBody>
        )
    }

    generateChartForDate = (values) => {
        return (
            <CCardBody>
                <CChartBar
                    type="bar"
                    datasets={[
                        {
                            label: 'seconds of delay',
                            backgroundColor: '#f87979',
                            data: values
                        }
                    ]}
                    labels={this.state.xData}
                    options={{
                        tooltips: {
                            enabled: true
                        }
                    }}
                />
            </CCardBody>
        )
    }

    generateTab = (day) => {
        let averageForDay = {}
        Object.entries(this.state.yData).map(([key, value]) => {
            averageForDay[key] = value[day]
            return [key, value]
        })
        return (
            <CTabPane key={day}>
                {this.generateChartForStop(averageForDay)}
            </CTabPane>
        )
    }

    generateStopTab = (stop, key) => {
        let averageForDay = this.state.yData[stop]

        return (
            <CTabPane active={this.state.activeTab === key} key={key}>
                {this.generateChartForDate(averageForDay)}
            </CTabPane>
        )
    }

    render() {
        let len = Object.keys(this.state.yData).length
        return (
            <div>
                {
                    len === 0 ?
                        <div className="text-center">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>:
                        <CRow>
                            <CCol xs="12" md="12" className="mb-4">
                                <CCard>
                                    <CCardHeader>
                                        <h4>Stop statistics</h4>
                                        <h6>Delay in seconds per stop</h6>
                                    </CCardHeader>
                                    <CCardBody>
                                        <CTabs>
                                            <CNav variant="tabs">
                                                <CNavItem>
                                                    <CNavLink>
                                                        All days
                                                    </CNavLink>
                                                </CNavItem>
                                                {
                                                    this.state.xData.map( date =>
                                                        <CNavItem key={date} >
                                                            <CNavLink>
                                                                {date}
                                                            </CNavLink>
                                                        </CNavItem>
                                                    )
                                                }
                                            </CNav>
                                            <CTabContent>
                                                <CTabPane>
                                                <CCard>
                                                    {
                                                        this.generateChartForStop(this.state.averageForAllDays)
                                                    }
                                                </CCard>
                                                </CTabPane>
                                                {
                                                    this.state.xData.map( (date, index) => {
                                                        return this.generateTab(index)
                                                    })
                                                }
                                            </CTabContent>
                                        </CTabs>
                                    </CCardBody>
                                </CCard>
                            </CCol>

                            <CCol xs="12" md="12" className="mb-4">
                            <CCard>
                                <CCardHeader>
                                    <h4>Average delay for specific stop per day</h4>
                                    in seconds
                                </CCardHeader>
                                <CCardBody>
                                    <CRow>
                                        <CCol xs="4">
                                            <CListGroup id="list-tab" role="tablist" style={{height: '500px', overflow: 'auto'}}>
                                                {
                                                    Object.keys(this.state.yData).map((stop, index) => {
                                                        return <CListGroupItem onClick={() => this.setState({activeTab: index})}
                                                                                action
                                                                                key={index}
                                                                                active={this.state.activeTab === index} >
                                                                {stop}
                                                                </CListGroupItem>
                                                    })
                                                }
                                            </CListGroup>
                                        </CCol>
                                        <CCol xs="8">
                                            <CTabContent>
                                                {
                                                    Object.keys(this.state.yData).map( (key, index) => {
                                                        return this.generateStopTab(key, index)
                                                    })
                                                }
                                            </CTabContent>
                                        </CCol>
                                    </CRow>
                                </CCardBody>
                            </CCard>
                            </CCol>


                        </CRow>
                }
            </div>
        )
    }
}

export default StopStatistics