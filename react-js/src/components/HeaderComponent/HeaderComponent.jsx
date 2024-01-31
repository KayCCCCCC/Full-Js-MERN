import React, { useEffect, useState } from "react";
import { Badge, Col, Popover, Row } from 'antd';
import { Input } from 'antd';
import { useNavigate } from "react-router";
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import InputSearchComponent from "../ButtonInputSearch/ButtonInputSearch";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from '../../services/UserService'
import { updateUser, resetUser } from '../../redux//slides/userSlides'
import Loading from "../LoadingComponent/Loading";
import { searchProduct } from "../../redux/slides/productSlides";


const Header = ({ isHiddenSearch = false, isHiddenCart = false }) => {
    // console.log(isHiddenCart)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userName, setUserName] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const order = useSelector((state) => state.order)
    const user = useSelector((state) => state.user)
    // console.log('user: ', user)
    const onSearch = (e) => {
        console.log('Searched value:', e.target.value);
        setSearch(e.target.value)
        dispatch(searchProduct(e.target.value))
    };
    const handleNavigateLogin = () => {
        navigate('/signin')
    }

    const handleLogout = async () => {
        setLoading(true)
        await UserService.LogoutUser();
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        dispatch(resetUser())
        setLoading(false)
    }

    const content = (
        <div className="max-w-96">
            <p onClick={() => navigate('/profile-user')} className="hover:bg-slate-300  hover:text-cyan-500 p-2 rounded cursor-pointer">Thông tin người dùng</p>
            {user?.isAdmin && (
                <p onClick={() => navigate('/system/admin')} className="hover:bg-slate-300  hover:text-cyan-500 p-2 rounded cursor-pointer">Quản lí hệ thống</p>
            )}
            <p onClick={() => navigate('/my-order', { state: { id: user?.id, token: user?.access_token } })} className="hover:bg-slate-300 hover:text-cyan-500 p-2 rounded cursor-pointer">Đơn hàng của tôi</p>
            <p onClick={handleLogout} className="hover:bg-slate-300 hover:text-cyan-500 p-2 rounded cursor-pointer">Đăng xuất</p>
        </div>
    );

    const handleBackHome = () => {
        navigate('/')
    }

    useEffect(() => {
        setLoading(true)
        setUserName(user?.name)
        setUserAvatar(user?.avatar)
        setLoading(false)
    }, [user?.name, user?.avatar])

    return (
        <React.Fragment>
            <Row style={{ justifyContent: isHiddenSearch && isHiddenCart ? 'space-between' : 'unset' }}>
                <Col className="bg-blue-500 py-3 text-4xl font-bold text-white flex items-center justify-center cursor-pointer" onClick={handleBackHome} span={6}>MERN</Col>
                <Col className="bg-blue-500 py-3" span={12}>
                    {!isHiddenSearch && (
                        <InputSearchComponent
                            size="large"
                            placeholder="Input for search"
                            textButton="Search"
                            onChange={onSearch}
                        />
                    )}
                </Col>
                <Col className="bg-blue-500 py-4 px-5 text-white" span={6}>
                    <div className="flex gap-x-32 items-center">
                        <Loading isLoading={loading}>
                            <div className="flex gap-x-2">
                                {userAvatar ? (
                                    <img src={userAvatar} alt="avatar" style={{
                                        height: '30px',
                                        width: '30px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        marginTop: '10px'
                                    }} />
                                ) : (
                                    <UserOutlined style={{ fontSize: '30px' }} />
                                )}
                                {user?.name ?
                                    (<React.Fragment>
                                        <Popover content={content} trigger="hover">
                                            <div className="py-5 text-2xl font-medium">{user?.name || user?.email}</div>
                                        </Popover>
                                    </React.Fragment>
                                    ) :
                                    <div onClick={handleNavigateLogin} className="flex flex-col cursor-pointer">
                                        <span>Đăng Nhập / Đăng Kí</span>
                                        <div>
                                            <span>Tài khoản</span>
                                            <CaretDownOutlined />
                                        </div>
                                    </div>}
                            </div>
                        </Loading>
                        {!isHiddenCart && (
                            <div onClick={() => navigate('/order')} className="flex items-center gap-x-2 cursor-pointer">
                                <Badge count={order?.orderItems?.length} size="medium">
                                    <ShoppingCartOutlined className="text-5xl" />
                                </Badge>
                                <span>Giỏ Hàng</span>
                            </div>
                        )}

                    </div>
                </Col>
            </Row>
        </React.Fragment >
    );
};

export default Header;