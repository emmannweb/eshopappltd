import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useEffect } from 'react'
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
import ViewProduct from '../product/ViewProduct'
import PrivateRoute from './PrivateRoute';
import { loadUser } from '../action/userAction'
import store from '../store'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShippingCard from '../cart/ShippingCard'
import Payment from '../cart/PaymentCart'
import OrderSuccess from '../cart/OrderSuccess'
import UserOrderHistory from '../user/UserOrderHistory'
import AdminShowOrders from '../admin/AdminShowOrders'
import AdminDashboardmdb from '../admin/AdminDashboardmdb'
import AdminProduct from '../admin/AdminProduct'
import Layout from '../admin/HOC/Layout'
import Test from '../admin/Test'

//HOC
const testApp = Layout(Test);
const DashboardApp = Layout(AdminDashboard);
const AdminProductApp = Layout(AdminProduct);
const AdminShowCategoryApp = Layout(AdminShowCategory);
const AdminShowOrdersApp = Layout(AdminShowOrders);
const AdminUsersListApp = Layout(AdminUsersList);
const AdminEditUserApp = Layout(AdminEditUser);
const EditProductAdminApp = Layout(EditProductAdmin);
const AdminEditProductCategoryApp = Layout(AdminEditProductCategory);
const CreateProductAdminApp = Layout(CreateProductAdmin);
const AdminCreateCategoryApp = Layout(AdminCreateCategory);

const UserDashboardApp = Layout(UserDashboard);
const UserDashboardEditApp = Layout(UserDashboardEdit);
const UserOrderHistoryApp = Layout(UserOrderHistory);




const Routes = () => {

    useEffect(() => {
        store.dispatch(loadUser());
    }, [])
    return (
        < >
            {/* <Toaster  position="top-right" />  */}
            <ToastContainer />
            <Router>
                <Switch>
                    <Route path='/search/:keyword' component={App} />
                    <Route path='/' exact component={App} />
                    <Route path='/signin' exact component={Signin} />
                    <Route path='/signup' exact component={Signup} />
                    <Route path='/admin/dashboardmdb' exact component={AdminDashboardmdb} />
                    <Route path='/admin/dashlayout' exact component={testApp} />
                    {/* <Route path='/admin/users' exact component={AdminUsersList} /> */}
                    <Route path='/product/:productid' exact component={ViewProduct} />
                    <PrivateAdminRoute path='/admin/product/create' exact component={CreateProductAdminApp} />
                    <PrivateAdminRoute path='/admin/dashboard' exact component={DashboardApp} />
                    <PrivateAdminRoute path='/admin/users' exact component={AdminUsersListApp} />
                    <PrivateAdminRoute path='/admin/products' exact component={AdminProductApp} />
                    <PrivateAdminRoute path='/admin/product/categories' exact component={AdminShowCategoryApp} />
                    <PrivateAdminRoute path='/admin/user/edit/:id' exact component={AdminEditUserApp} />
                    <PrivateAdminRoute path='/admin/product/edit/:id' exact component={EditProductAdminApp} />
                    <PrivateAdminRoute path='/admin/product/category/edit/:id' exact component={AdminEditProductCategoryApp} />
                    <PrivateAdminRoute path='/admin/category/create' exact component={AdminCreateCategoryApp} />
                    <PrivateRoute path='/user/dashboard' exact component={UserDashboardApp} />
                    <PrivateRoute path='/user/dashboard/edit/:id' exact component={UserDashboardEditApp} />
                    <Route path='/cart' component={AddToCart} />
                    <PrivateRoute path='/shipping' exact component={ShippingCard} />
                    <PrivateRoute path='/payment' exact component={Payment} />
                    <PrivateRoute path='/success' exact component={OrderSuccess} />
                    <PrivateRoute path='/user/dashboard/orders' exact component={UserOrderHistoryApp} />
                    <PrivateAdminRoute path='/admin/dashboard/orders' exact component={AdminShowOrdersApp} />


                </Switch>
            </Router>
        </>
    )
}

export default Routes

