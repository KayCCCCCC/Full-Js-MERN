import React, { useState } from "react";
import { Badge, Col, Popover, Row } from 'antd';
import { Input } from 'antd';
import { useNavigate } from "react-router";
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import InputSearchComponent from "../ButtonInputSearch/ButtonInputSearch";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from '../../services/UserService'
import { updateUser, resetUser } from '../../redux//slides/userSlides'
import Loading from "../LoadingComponent/Loading";

const { Search } = Input;

const Header = () => {
    const nagigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)

    const user = useSelector((state) => state.user)
    console.log('user: ', user)
    const onSearch = (value) => {
        console.log('Searched value:', value);
    };
    const handleNavigateLogin = () => {
        nagigate('/signin')
    }

    const handleLogout = async () => {
        setLoading(true)
        await UserService.LogoutUser();
        dispatch(resetUser())
        setLoading(false)
    }

    const content = (
        <div className="max-w-fit">
            <p onClick={handleLogout} className="hover:bg-slate-300 hover:text-2xl hover:font-medium p-2 rounded cursor-pointer">Đăng xuất</p>
            <p className="hover:bg-slate-300 hover:text-2xl hover:font-medium p-2 rounded cursor-pointer">Thông tin người dùng</p>
        </div>
    );

    return (
        <React.Fragment>
            <Row>
                <Col className="bg-blue-500 py-3 text-4xl font-bold text-white flex items-center justify-center" span={6}>MERN</Col>
                <Col className="bg-blue-500 py-3" span={12}>
                    <InputSearchComponent
                        size="large"
                        placeholder="Input for search"
                        textButton="Search"
                        onChange={onSearch}
                    />
                </Col>
                <Col className="bg-blue-500 py-3 px-6 text-white" span={6}>
                    <div className="flex gap-x-32 items-center">
                        <Loading isLoading={loading}>
                            <div className="flex gap-x-2">
                                <UserOutlined className="text-4xl" />
                                {user?.name ?
                                    (<React.Fragment>
                                        <Popover content={content} trigger="hover">
                                            <div className="py-5 text-2xl font-medium">{user?.name}</div>
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
                        <div className="flex items-center gap-x-2">
                            <Badge count={4} size="medium">
                                <ShoppingCartOutlined className="text-5xl" />
                            </Badge>
                            <span>Giỏ Hàng</span>
                        </div>
                    </div>
                </Col>
            </Row>
        </React.Fragment >
    );
};

export default Header;