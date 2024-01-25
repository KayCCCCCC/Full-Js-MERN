import React, { useState } from "react"
import { useSelector } from "react-redux";
import { getItem } from "../../utils/utils";
import { UserOutlined, AppstoreOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Menu } from "antd";
import Header from "../../components/HeaderComponent/HeaderComponent";
import AdminUser from "../../components/AdminUser/AdminUser";
import AdminProduct from "../../components/AdminProduct/AdminProduct";
const AdminPage = () => {
    const user = useSelector((state) => state?.user)
    const [keySelected, setKeySelected] = useState('');
    const items = [
        getItem('Người dùng', 'users', <UserOutlined />),
        getItem('Sản phẩm', 'products', <AppstoreOutlined />),
        getItem('Đơn hàng', 'orders', <ShoppingCartOutlined />),
    ];
    const handleOnCLick = ({ key }) => {
        setKeySelected(key)
        console.log(key)
    }
    const renderPage = (key) => {
        switch (key) {
            case 'users':
                return (
                    <AdminUser />
                )
            case 'products':
                return (
                    <AdminProduct />
                )
            case 'orders':
                return (
                    //   <OrderAdmin />
                    <div></div>
                )
            default:
                return <></>
        }
    }
    return (
        <React.Fragment>
            <Header isHiddenSearch isHiddenCart />
            {/* <div className="text-3xl font-bold">Admin Page</div> */}
            <div style={{ display: 'flex', overflowX: 'hidden' }}>
                <Menu
                    mode="inline"
                    style={{
                        width: 256,
                        boxShadow: '1px 1px 2px #ccc',
                        height: '100vh'
                    }}
                    items={items}
                    onClick={handleOnCLick}
                />
                <div style={{ flex: 1, padding: '15px 0 15px 15px' }}>
                    {/* <Loading isLoading={memoCount && Object.keys(memoCount) && Object.keys(memoCount).length !== 3}>
                        {!keySelected && (
                            <CustomizedContent data={memoCount} colors={COLORS} setKeySelected={setKeySelected} />
                        )}
                    </Loading> */}
                    {renderPage(keySelected)}
                </div>
            </div>
        </React.Fragment>
    )
}
export default AdminPage