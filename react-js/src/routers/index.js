import HomePage from "../pages/HomePage/HomePage"
import OrderPage from "../pages/Order/OrderPage"
import ProductPage from "../pages/Product/ProductPage"
import TypeProductPage from "../pages/TypeProduct/TypeProductPage"
import ProductDetailPage from "../pages/ProductDetails/ProductDetailPage"
import SignInPage from "../pages/SignIn/SignInPage"
import SignUpPage from "../pages/SignUp/SignUpPage"
import NotFoundPage from "../pages/NotfoundPage"
import ProfilePage from "../pages/Profile/ProfilePage"
import AdminPage from './../pages/Admin/AdminPage';
export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true
    },
    // {
    //     path: '/my-order',
    //     page: MyOrderPage,
    //     isShowHeader: true
    // },
    // {
    //     path: '/details-order/:id',
    //     page: DetailsOrderPage,
    //     isShowHeader: true
    // },
    // {
    //     path: '/payment',
    //     page: PaymentPage,
    //     isShowHeader: true
    // },
    // {
    //     path: '/orderSuccess',
    //     page: OrderSucess,
    //     isShowHeader: true
    // },
    {
        path: '/products',
        page: ProductPage,
        isShowHeader: true
    },
    {
        path: '/product/:type',
        page: TypeProductPage,
        isShowHeader: true
    },
    {
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: false
    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: false
    },
    {
        path: '/product-details/:id',
        page: ProductDetailPage,
        isShowHeader: true
    },
    {
        path: '/profile-user',
        page: ProfilePage,
        isShowHeader: true
    },
    {
        path: '/system/admin',
        page: AdminPage,
        isShowHeader: false,
        isPrivated: true
    },
    {
        path: '*',
        page: NotFoundPage
    }
]