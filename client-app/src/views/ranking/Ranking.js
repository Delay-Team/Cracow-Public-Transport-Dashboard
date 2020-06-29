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
    CBadge
} from '@coreui/react'
import LineDataProvider from '../common/LineDataProvider'


class Ranking extends LineDataProvider {

    sortDict = (dict) => {
        var items = Object.keys(dict).map(function(key) {
            return [key, dict[key]];
        });

        items.sort(function(first, second) {
            return second[1] - first[1];
        });

        return items
    }

    generateRow = (key, [line, delay]) => {
        return (<tr key={key}>
                    <td>
                        <div className="text-center"
                             style={{borderRadius: '5px 20px 5px', background: '#BADA55', color: 'white', width: 'max-content', marginLeft: '80px'}}>
                            <div style={{fontSize: '30px', margin: '15px'}}>{parseInt(key)+1}</div>
                        </div>
                    </td>
                    <td>
                        <div>Line {line}</div>
                    </td>
                    <td className="text-center">
                        <CBadge color={'danger'} style={{padding: '7px'}}>
                            <div style={{fontSize: '20px'}}>{delay}</div>
                            <br/>
                            <div>seconds of delay</div>
                        </CBadge>
                    </td>
                </tr>)
    }

    generateChartForDate = (average) => {
        let sortedAverage = this.sortDict(average)
        return (
            <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                <thead className="thead-light">
                <tr>
                    <th></th>
                    <th>Line</th>
                    <th className="text-center">Delay</th>
                </tr>
                </thead>
                <tbody>
                {
                    Object.keys(sortedAverage).map(key => {
                            return this.generateRow(key, sortedAverage[key])
                        }
                    )
                }
                </tbody>
            </table>
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
                                        <h4>Ranking</h4>
                                        <h6>Line with the biggest average delay from all days or one specified day on top</h6>
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
                                                    {this.generateChartForDate(this.state.averageForAllDays)}
                                                </CTabPane>
                                                {
                                                    this.state.xData.map((day, index) => {
                                                        return this.generateTab(index)
                                                    })
                                                }
                                            </CTabContent>
                                        </CTabs>
                                    </CCardBody>
                                </CCard>
                            </CCol>


                        </CRow>
                }
            </div>
        )
    }
}

export default Ranking