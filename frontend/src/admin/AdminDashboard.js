import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import WidgetCard from '../component/WidgetCard'
import { Chart } from "react-google-charts";


const AdminDashboard = () => {
    const [totalSell, setTotalSell] = useState('')
    const [totalOrders, setTotalOrders] = useState('')
    const [totalUsers, setTotalUsers] = useState('')
    const [daylyOrdersStat, setdaylyOrdersStat] = useState([])


    const fetchStat = () => {

        axios.get('/api/orders/summary')
            .then(stat => {
                setTotalSell(stat.data.orders[0].totalSales.toFixed(2));
                setTotalOrders(stat.data.orders[0].nbOrders);
                setTotalUsers(stat.data.users[0].nbUsers);
                setdaylyOrdersStat(stat.data.daylyOrders);
            })
            .catch(error => {
                console.log(error);
                toast.error(error);
            })
    }

    useEffect(() => {
        fetchStat();
    }, [])


    return (
        <>
            <div className="container-fluid">

                <div className="row">
                    <WidgetCard colorClass={'card-header-success'} iconName={'shopping_cart'} name={'Total Orders'} stat={totalOrders ? totalOrders : 0} unit={''} />
                    <WidgetCard colorClass={'card-header-info'} iconName={'attach_money'} name={'Total Sales'} stat={totalSell ? totalSell : 0} unit={'US'} />
                    <WidgetCard colorClass={'card-header-primary'} iconName={'group'} name={'Users'} stat={totalUsers ? totalUsers : 0} unit={''} />
                </div>

                {
                    daylyOrdersStat && daylyOrdersStat.length === 0 ?
                        <>
                            <h6>No order Yet</h6>
                        </> :

                        <Chart
                            chartType="AreaChart"
                            data={[["Date", "Sales"],
                            ...daylyOrdersStat.map(val => [val._id, val.sales]),
                            ]}
                            width="100%"
                            height="400px"
                            loader={<h4>Loading...</h4>}

                        />
                }
            </div>
        </>
    )
}

export default AdminDashboard