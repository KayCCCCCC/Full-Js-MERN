import React from "react";
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
const ButtonInputComponent = (props) => {
    const { size, placeholder, textButton } = props
    return (
        <React.Fragment>
            <div className="flex items-center mt-2 justify-center" style={{ backgroundColor: "#fff" }}>
                <InputComponent size={size} placeholder={placeholder} variant={'borderless'} {...props} />
                <ButtonComponent className="border-none" size={size} style={{ backgroundColor: "#fff" }} icon={<SearchOutlined />} {...props}>{textButton}</ButtonComponent>
            </div>
        </React.Fragment >
    )
}
export default ButtonInputComponent