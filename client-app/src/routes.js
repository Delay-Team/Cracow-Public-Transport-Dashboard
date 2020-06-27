import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const AboutUs = React.lazy(() => import('./views/aboutus/AboutUs'));
const LineStatistics = React.lazy(() => import('./views/line_statistics/LineStatistics'));
const StopStatistics = React.lazy(() => import('./views/stop_statistics/StopStatistics'));
const Ranking = React.lazy(() => import('./views/ranking/Ranking'));

const routes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/aboutus', exact: true,  name: 'About Us', component: AboutUs },
    { path: '/line_statistics', exact: true,  name: 'Line Statistics', component: LineStatistics },
    { path: '/stop_statistics', exact: true,  name: 'Stop Statistics', component: StopStatistics },
    { path: '/ranking', exact: true,  name: 'Ranking', component: Ranking }
];

export default routes;