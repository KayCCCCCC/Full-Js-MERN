import React from "react";
import { Button } from 'antd';
const ButtonComponent = (props) => {
    const { size, style, className, icon, disabled, styleTextButton, ...rest } = props
    const textButton = props.children
    return (
        <React.Fragment>
            <Button className={className} size={size} style={{ ...style, background: disabled ? '#ccc' : style?.background }} icon={icon} {...rest}>
                <span style={styleTextButton}>{textButton}</span>
            </Button>
        </React.Fragment >
    )
}
export default ButtonComponent