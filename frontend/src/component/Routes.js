import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {useEffect} from  'react'
import App from '../App'
import Signin from '../user/Signin'
import Signup from '../user/Signup'
import createProduct from '../product/createProduct'
import AdminDashboard from '../admin/AdminDashboard'
import AdminUsersList from '../admin/AdminUsersList'
import AdminEditUser from '../admin/AdminEditUser'
import CreateProductAdmin from '../admin/CreateProductAdmin'
import AdminCreateCategory from '../admin/AdminCreateCategory'
import AdminShowCategory from '../admin/AdminShowCategory'
import AdminEditProductCategory from '../admin/AdminEditProductCategory'
import EditProductAdmin from '../admin/EditProductAdmin'
import AddToCart from '../cart/AddToCart'
import UserDashboard from '../user/UserDashboard';
import UserDashboardEdit from '../user/UserDashboardEdit'
import PrivateAdminRoute from '../component/PrivateAdminRoute';
import ViewProduct  from '../product/ViewProduct'
import PrivateRoute from './PrivateRoute';
import {loadUser} from '../action/userAction'
import store from '../store'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  ShippingCard  from '../cart/ShippingCard'
import Payment from '../cart/PaymentCart'
import OrderSuccess from '../cart/OrderSuccess'
import UserOrderHistory from '../user/UserOrderHistory'
import AdminShowOrders from '../admin/AdminShowOrders'




const Routes = () => {

    useEffect(()=>{
        store.dispatch(loadUser());
    }, [])
    return (
        < >
          {/* <Toaster  position="top-right" />  */}
          <ToastContainer/>
            <Router>
                <Switch> 
                   <Route path='/search/:keyword'   component={App} />
                    <Route path='/' exact component={App} />
                    <Route path='/signin' exact component={Signin} />
                    <Route path='/signup' exact component={Signup} />
                    {/* <Route path='/admin/users' exact component={AdminUsersList} /> */}
                    <Route path='/product/:productid' exact component={ViewProduct} />
                    <PrivateAdminRoute path='/admin/product/create' exact component={CreateProductAdmin} />
                    <PrivateAdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
                    <PrivateAdminRoute path='/admin/users' exact component={AdminUsersList} />
                    <PrivateAdminRoute path='/admin/product/categories' exact component={AdminShowCategory} />
                    <PrivateAdminRoute path='/admin/user/edit/:id' exact component={AdminEditUser} />
                    <PrivateAdminRoute path='/admin/product/edit/:id' exact component={EditProductAdmin} />
                    <PrivateAdminRoute path='/admin/product/category/edit/:id' exact component={AdminEditProductCategory} />
                    <PrivateAdminRoute path='/admin/category/create' exact component={AdminCreateCategory} />
                    <PrivateRoute path='/user/dashboard' exact component={UserDashboard} />
                    <PrivateRoute path='/user/dashboard/edit/:id' exact component={UserDashboardEdit} />
                    <Route path='/cart'  component={AddToCart} />
                    <PrivateRoute path='/shipping' exact component={ShippingCard} />
                    <PrivateRoute path='/payment' exact component={Payment} />
                    <PrivateRoute path='/success' exact component={OrderSuccess} />
                    <PrivateRoute path='/user/dashboard/orders' exact component={UserOrderHistory} />
                    <PrivateAdminRoute path='/admin/dashboard/orders' exact component={AdminShowOrders} />
                    
                 
                </Switch> 
            </Router>
        </>
    )
}

export default Routes

