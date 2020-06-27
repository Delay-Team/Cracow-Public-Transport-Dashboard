import React from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CProgress,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import LineDataProvider from '../common/LineDataProvider'


class LineStatistics extends LineDataProvider {

    getWholePercent(percentFor,percentOf)
    {
        return Math.floor(percentFor/percentOf*100).toString();
    }

    generateChartForLine = (number, values, dates) => {
        let maxValue = Math.max(...values)
        return (
            <CCard key={number}>
                <CCardHeader>
                    Line {number}
                </CCardHeader>
                <CCardBody>
                    <CRow>
                        <CCol xs="12" md="12" xl="12">
                            {
                                values.map ( (value, index) => {
                                    return (<div className="progress-group" key={index} >
                                                <div className="progress-group-header">
                                                    <CIcon className="progress-group-icon" name="cil-calendar"/>
                                                    <span className="title">{dates[index]}</span>
                                                    <span className="ml-auto font-weight-bold">{value} <span
                                                        className="text-muted small">(seconds of delay)</span></span>
                                                </div>
                                                <div className="progress-group-bars">
                                                    <CProgress className="progress-xs"
                                                               color="gradient-danger"
                                                               value={this.getWholePercent(value, maxValue)}/>
                                                </div>
                                            </div>)
                                })
                            }
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
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
                        <>
                        <CRow>
                        <CCol>
                        <CCard>
                        <CCardBody>
                        <CRow>
                        <CCol xs="12" md="12" xl="12">
                        {
                            Object.keys(this.state.yData).map((key, index) => {
                                return this.generateChartForLine(key, this.state.yData[key], this.state.xData);
                            })
                        }
                        </CCol>
                        </CRow>
                        </CCardBody>
                        </CCard>
                        </CCol>
                        </CRow>
                        </>
                }
            </div>
        )
    }
}

export default LineStatistics
