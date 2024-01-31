import React, { useEffect, useState } from "react"
import InputForm from "../../components/InputFormComponent/InputForm"
import { Image } from "antd"
import { useLocation, useNavigate } from "react-router"
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent"
import logoLogin from "../../assets/img/logo-login.png"
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import * as UserService from '../../services/UserService'
import { useMutation } from '@tanstack/react-query';
import Loading from './../../components/LoadingComponent/Loading';
import * as message from '../../components/MessageComponent/MessageComponent'
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../redux/slides/userSlides'
const SignInPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const location = useLocation();

    const mutation = useMutation({
        mutationFn: data => UserService.LoginUser(data)
    })
    const { data, isPending } = mutation
    console.log('check mutation singin: ', mutation)

    useEffect(() => {
        console.log('check location: ', location)
        if (data?.status === 'OK') {
            if (location?.state) {
                navigate(location?.state)
            } else {
                navigate('/')
            }
            message.success('Login success')
            dispatch(updateUser({ ...data, access_token: data?.access_token, refreshToken: data?.refresh_token }))
            localStorage.setItem('access_token', JSON.stringify(data?.access_token))
            localStorage.setItem('refresh_token', JSON.stringify(data?.refresh_token))
            if (data?.access_token) {
                const decoded = jwtDecode(data?.access_token)
                console.log('>>> decode: ', decoded)
                if (decoded?.id) {
                    handleGetDetailUser(decoded?.id, data?.access_token)
                }
            }

        } else if (data?.status === 'ERR') {
            message.error(data?.message)
        }
    }, [data])

    const handleOnchangeEmail = (value) => {
        setEmail(value.target.value)
    }

    const handleOnchangePassword = (value) => {
        setPassword(value.target.value)
    }

    const handleNavigateSignup = () => {
        navigate('/signup')
    }

    const handleGetDetailUser = async (id, token) => {
        const storage = localStorage.getItem('refresh_token')
        const refreshToken = JSON.parse(storage)
        const res = await UserService.GetDetailsUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token, refreshToken }))
    }

    const handleSignIn = () => {
        console.log('logingloin')
        mutation.mutate({
            email,
            password
        })
    }
    return (
        <React.Fragment>
            <div className="flex items-center justify-center bg-slate-300 h-[100vh]">
                <div className="w-[50%] h-[60%] rounded bg-white flex">
                    <div className="flex-1 pt-10 px-11 pb-6 flex flex-col gap-2">
                        <div className="text-4xl font-semibold">Xin Chào</div>
                        <div className="text-2xl mt-8 mb-6">Đăng Nhập và Tạo Tài Khoản</div>
                        <InputForm
                            placeholder={'abc@gmail.com'}
                            style={{ marginBottom: '10px', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}
                            onChange={handleOnchangeEmail}
                            value={email}
                        />
                        <div style={{ position: 'relative' }}>
                            <span
                                onClick={() => setIsShowPassword(!isShowPassword)}
                                style={{
                                    zIndex: 10,
                                    position: 'absolute',
                                    top: '8px',
                                    right: '8px'
                                }}
                            >{
                                    isShowPassword ? (
                                        <EyeFilled />
                                    ) : (
                                        <EyeInvisibleFilled />
                                    )
                                }
                            </span>
                            <InputForm
                                placeholder="password"
                                type={isShowPassword ? "text" : "password"}
                                style={{ marginBottom: '10px', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}
                                onChange={handleOnchangePassword}
                                value={password}
                            />
                        </div>
                        <Loading isLoading={isPending}>
                            <ButtonComponent
                                disabled={!email.length || !password.length}
                                onClick={!email.length || !password.length ? undefined : handleSignIn}
                                size={40}
                                style={{
                                    background: 'rgb(255,57,60)',
                                    color: '#fff',
                                    width: '100%',
                                    height: '48px',
                                    border: 'solid 1px #ccc',
                                    fontWeight: '700',
                                    fontSize: '18px',
                                    marginTop: '20px',
                                    marginBottom: '10px'
                                }}
                                children={'Đăng nhập'}
                            ></ButtonComponent>
                        </Loading>
                        <p className="text-[rgb(13,92,182)] text-xl cursor-pointer">Quên mật khẩu?</p>
                        <p className="text-xl">Chưa có tài khoản? <span className="text-[rgb(13,92,182)] text-xl cursor-pointer" onClick={handleNavigateSignup}>Tạo tài khoản</span></p>
                    </div>
                    <div className="w-[300px] flex items-center justify-center bg-gradient-to-r from-sky-100 via-sky-200 to-sky-300  flex-col">
                        <Image src={logoLogin} alt="logo" style={{ width: '203px', height: '203px' }} preview={false} />
                        <span className="text-2xl font-semibold mt-4">Mua sắm tại MERN</span>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default SignInPage