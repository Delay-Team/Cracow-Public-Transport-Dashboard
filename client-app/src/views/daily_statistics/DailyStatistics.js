import React, {lazy} from 'react'
import DailyStatisticsProvider from '../common/DailyStatisticsProvider'
const WidgetsDaily = lazy(() => import('../widgets/WidgetsDaily.js'))


class DailyStatistics extends DailyStatisticsProvider {

    render() {
        let len = Object.keys(this.state.statisticsData).length
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
                            <WidgetsDaily dailyStatistics={this.state.statisticsData}/>
                        </>
                }
            </div>
        )
    }
}

export default DailyStatistics