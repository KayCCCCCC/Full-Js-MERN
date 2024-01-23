import HomePage from "../pages/HomePage"
import OrderPage from "../pages/Order/OrderPage"
import ProductPage from "../pages/Product/ProductPage"
import TypeProductPage from "../pages/TypeProduct/TypeProductPage"
import ProductDetailPage from "../pages/ProductDetails/ProductDetailPage"
import SignInPage from "../pages/SignIn/SignInPage"
import SignUpPage from "../pages/SignUp/SignUpPage"
import NotFoundPage from "../pages/NotfoundPage"
import ProfilePage from "../pages/Profile/ProfilePage"
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
    {
        path: '/product',
        page: ProductPage,
        isShowHeader: true
    },
    {
        path: '/product-details',
        page: ProductDetailPage,
        isShowHeader: true
    },
    {
        path: '/type',
        page: TypeProductPage,
        isShowHeader: true
    },
    {
        path: '/signin',
        page: SignInPage,
        isShowHeader: false
    },
    {
        path: '/signup',
        page: SignUpPage,
        isShowHeader: false
    },
    {
        path: '/profile-user',
        page: ProfilePage,
        isShowHeader: true
    },
    {
        path: '*',
        page: NotFoundPage
    },
]