import React from "react";
import { Button } from 'antd';
const ButtonComponent = (props) => {
    const { size, style, className, icon, disabled, ...rest } = props
    const textButton = props.children
    return (
        <React.Fragment>
            <Button className={className} size={size} style={{ ...style, background: disabled ? '#ccc' : style?.background }} icon={icon} {...rest}>{textButton}</Button>
        </React.Fragment >
    )
}
export default ButtonComponent