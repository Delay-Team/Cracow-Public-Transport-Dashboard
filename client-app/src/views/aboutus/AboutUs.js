import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import CIcon from "@coreui/icons-react";


const AboutUs = () => {
    const history = useHistory()
    const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
    const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
    const [page, setPage] = useState(currentPage)

    const pageChange = newPage => {
        currentPage !== newPage && history.push(`/aboutus?page=${newPage}`)
    }

    useEffect(() => {
        currentPage !== page && setPage(currentPage)
    }, [currentPage, page])

    return (<div>
                <div>
                    <CIcon
                        className="c-sidebar-brand-full"
                        name="logo"
                        height={235}
                    />
                    <strong style={{fontSize: '70px'}}>PTDashboard</strong>
                </div>
                <div style={{fontSize: '20px', padding: '30px', borderRadius: '0.25rem'}}>
                CPTDashboard website was created to display delays of public transport in user friendly form. Thanks to
                our statistics you can easily find out interesting informations about communication. It also allow to
                compare lines to each other and find out which one has the lowest and highest delay.
                </div>
            </div>)
}

export default AboutUs
