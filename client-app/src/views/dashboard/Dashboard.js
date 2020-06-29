import React, {lazy} from 'react'
import {
    CCard,
    CCardBody,
    CCol,
    CRow
} from '@coreui/react'
import LineDataProvider from '../common/LineDataProvider'

import MainChartExample from '../charts/MainChartExample.js'
const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

class Dashboard extends LineDataProvider {

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
                            <CCard>
                                <CCardBody>
                                    <CRow>
                                        <CCol sm="5">
                                            <h4 id="traffic" className="card-title mb-0">Delays for all vehicles</h4>
                                            <div>Average delay for all lines per specific day</div>
                                            <br />
                                            <div className="small text-muted">[seconds]</div>
                                        </CCol>
                                    </CRow>
                                    {
                                        this.state.xData && this.state.yData ?
                                            <MainChartExample xData={this.state.xData} yData={this.state.yData}/> : null
                                    }
                                </CCardBody>
                            </CCard>

                            <WidgetsBrand averageForAllDays={this.state.averageForAllDays}/>
                        </>
                }
            </div>
        )
    }
}

export default Dashboard
