import React, { useEffect, useState } from "react"
import InputForm from "../../components/InputFormComponent/InputForm"
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { EditOutlined, UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import * as UserService from '../../services/UserService'
import * as message from "../../components/MessageComponent/MessageComponent";
import { updateUser } from "../../redux/slides/userSlides";
import { getBase64 } from "../../utils/utils"
import Loading from "../../components/LoadingComponent/Loading";
import { Button, Upload } from "antd";
import { WrapperUploadFile } from "./style";
const ProfilePage = () => {
    const user = useSelector((state) => state.user)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [avatar, setAvatar] = useState('')

    const mutation = useMutation({
        mutationFn: async data => {
            const { id, access_token, ...rests } = data
            const res = await UserService.UpdateUser(id, rests, access_token)
            console.log('check: ', data)
        }
    })

    const dispatch = useDispatch()
    const { data, isPending, isSuccess, isError } = mutation
    console.log('data: ', mutation)

    useEffect(() => {
        setEmail(user?.email)
        setName(user?.name)
        setPhone(user?.phone)
        setAddress(user?.address)
        setAvatar(user?.avatar)
    }, [user])

    useEffect(() => {
        if (isSuccess) {
            message.success()
            handleGetDetailsUser(user?.id, user?.access_token)
        } else if (isError) {
            message.error()
        }
    }, [isSuccess, isError])

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.GetDetailsUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token }))
    }

    const handleOnchangeEmail = (event) => {
        setEmail(event.target.value)
    }
    const handleOnchangeName = (event) => {
        setName(event.target.value)
    }
    const handleOnchangePhone = (event) => {
        setPhone(event.target.value)
    }
    const handleOnchangeAddress = (event) => {
        setAddress(event.target.value)
    }
    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0];
        if (file) {
            console.log(file);
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj);
            }
            setAvatar(file.preview);
        }
    };

    const handleUpdate = () => {
        console.log(111111)
        mutation.mutate({ id: user?.id, email, name, phone, address, avatar, access_token: user?.access_token })
    }
    return (
        <React.Fragment>
            <div className="w-[1270px] mx-auto my-0 h-fit">
                <div className="text-black text-2xl mx-4 my0">Thông tin người dùng</div>
                <Loading isLoading={isPending}>
                    <div className="flex flex-col gap-8 border border-gray-400 w-[700px] mx-auto my-0 p-5 rounded">
                        <div className="flex items-center gap-8">
                            <label className="font-semibold text-2xl text-left w-16">name</label>
                            <InputForm placeholder={'Nhập text'} style={{ width: '300px' }} id="name" value={name} onChange={handleOnchangeName} />
                            <ButtonComponent
                                onClick={handleUpdate}
                                size={40}
                                style={{
                                    background: '#fff',
                                    color: 'rgb(13,92,182)',
                                    width: '40px',
                                    height: '32px',
                                    border: 'solid 1px #ccc',
                                    fontWeight: '700',
                                }}
                                icon={<EditOutlined />}
                            ></ButtonComponent>
                        </div>
                        <div className="flex items-center gap-8">
                            <label className="font-semibold text-2xl w-16">email</label>
                            <InputForm placeholder={'Nhập text'} style={{ width: '300px' }} id="email" value={email} onChange={handleOnchangeEmail} />
                            <ButtonComponent
                                onClick={handleUpdate}
                                size={40}
                                style={{
                                    background: '#fff',
                                    color: 'rgb(13,92,182)',
                                    width: '40px',
                                    height: '32px',
                                    border: 'solid 1px #ccc',
                                    fontWeight: '700',
                                }}
                                icon={<EditOutlined />}
                            ></ButtonComponent>
                        </div>
                        <div className="flex items-center gap-8">
                            <label className="font-semibold text-2xl w-16">phone</label>
                            <InputForm placeholder={'Nhập text'} style={{ width: '300px' }} id="phone" value={phone} onChange={handleOnchangePhone} />
                            <ButtonComponent
                                onClick={handleUpdate}
                                size={40}
                                style={{
                                    background: '#fff',
                                    color: 'rgb(13,92,182)',
                                    width: '40px',
                                    height: '32px',
                                    border: 'solid 1px #ccc',
                                    fontWeight: '700',
                                }}
                                icon={<EditOutlined />}
                            ></ButtonComponent>
                        </div>
                        <div className="flex items-center gap-8">
                            <label className="font-semibold text-2xl w-16">address</label>
                            <InputForm placeholder={'Nhập text'} style={{ width: '300px' }} id="phone" value={address} onChange={handleOnchangeAddress} />
                            <ButtonComponent
                                onClick={handleUpdate}
                                size={40}
                                style={{
                                    background: '#fff',
                                    color: 'rgb(13,92,182)',
                                    width: '40px',
                                    height: '32px',
                                    border: 'solid 1px #ccc',
                                    fontWeight: '700',
                                }}
                                icon={<EditOutlined />}
                            ></ButtonComponent>
                        </div>
                        <div className="flex items-center gap-8">
                            <label className="font-semibold text-2xl w-16">avatar</label>
                            <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                                <Button icon={<UploadOutlined />}>Select File</Button>
                            </WrapperUploadFile>
                            {avatar && (
                                <img src={avatar} style={{
                                    height: '60px',
                                    width: '60px',
                                    borderRadius: '50%',
                                    objectFit: 'cover'
                                }} alt="avatar" />
                            )}
                            <ButtonComponent
                                onClick={handleUpdate}
                                size={40}
                                style={{
                                    background: '#fff',
                                    color: 'rgb(13,92,182)',
                                    width: '40px',
                                    height: '32px',
                                    border: 'solid 1px #ccc',
                                    fontWeight: '700',
                                }}
                                icon={<EditOutlined />}
                            ></ButtonComponent>
                        </div>
                    </div>
                </Loading>
            </div>
        </React.Fragment>
    )
}
export default ProfilePage