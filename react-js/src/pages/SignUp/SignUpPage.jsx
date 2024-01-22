import React, { useEffect, useState } from "react"
import InputForm from "../../components/InputFormComponent/InputForm"
import { Image } from "antd"
import { useNavigate } from "react-router"
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent"
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import logoLogin from "../../assets/img/logo-login.png"

import * as UserService from '../../services/UserService'
import { useMutation } from "@tanstack/react-query"
import Loading from "../../components/LoadingComponent/Loading"
import * as message from '../../components/MessageComponent/MessageComponent'

const SignUpPage = () => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: data => UserService.SignupUser(data)
    })

    const { data, isPending } = mutation

    console.log('>>> check data: ', data?.status)

    useEffect(() => {

        if (data?.status === 'OK') {
            message.success('Create account success')
            handleNavigateSingIn()
        } else if (data?.status === 'ERR') {
            message.error(data?.message)
        }
    }, [data])

    const handleNavigateSingIn = () => {
        navigate('/signin')
    }
    const handleOnchangeEmail = (value) => {
        setEmail(value.target.value)
    }

    const handleOnchangePassword = (value) => {
        setPassword(value.target.value)
    }

    const handleOnchangeConfirmPassword = (value) => {
        setConfirmPassword(value.target.value)
    }

    const handleSignUp = () => {
        mutation.mutate({ email, password, confirmpassword })
    }
    return (
        <React.Fragment>
            <div className="flex items-center justify-center bg-slate-300 h-[100vh]">
                <div className="w-[50%] h-[60%] rounded bg-white flex">
                    <div className="flex-1 pt-10 px-11 pb-6 flex flex-col gap-2">
                        <div className="text-4xl font-semibold">Xin Chào</div>
                        <div className="text-2xl mt-8 mb-6">Đăng Kí Tài Khoản</div>
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
                        <div style={{ position: 'relative' }}>
                            <span
                                onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                                style={{
                                    zIndex: 10,
                                    position: 'absolute',
                                    top: '8px',
                                    right: '8px'
                                }}
                            >{
                                    isShowConfirmPassword ? (
                                        <EyeFilled />
                                    ) : (
                                        <EyeInvisibleFilled />
                                    )
                                }
                            </span>
                            <InputForm
                                placeholder="confirm password"
                                type={isShowConfirmPassword ? "text" : "password"}
                                style={{ marginBottom: '10px', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}
                                onChange={handleOnchangeConfirmPassword}
                                value={confirmpassword}
                            />
                        </div>
                        <Loading isLoading={isPending}>
                            <ButtonComponent
                                disabled={!email.length || !password.length || !confirmpassword.length}
                                onClick={!email.length || !password.length ? undefined : handleSignUp}
                                size={40}
                                style={{
                                    background: 'rgb(255,57,60)',
                                    color: '#fff',
                                    width: '100%',
                                    height: '48px',
                                    boder: 'solid 1px #333',
                                    fontWeight: '700',
                                    fontSize: '18px',
                                    marginTop: '20px',
                                    marginBottom: '10px'
                                }}
                                children={'Đăng Kí'}
                            ></ButtonComponent>
                        </Loading>
                        <p className="text-xl">Bạn đã có tài khoản? <span className="text-[rgb(13,92,182)] text-xl cursor-pointer" onClick={handleNavigateSingIn}>Đăng nhập</span></p>
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
export default SignUpPage