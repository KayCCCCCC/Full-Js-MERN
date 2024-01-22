import React, { useState } from 'react';
import { Input } from 'antd';
const InputForm = ({ placeholder, style, ...rest }) => {
    return (
        < Input placeholder={placeholder} style={style} {...rest} />
    )
}

export default InputForm