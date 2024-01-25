import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
    color: #000;
    font-size: 14px;
`
export const WrapperButton = styled.div`
    & .ant-btn css-dev-only-do-not-override-1qhpsh8 ant-btn-primary {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: blue;
    }
`

export const WrapperUploadFile = styled(Upload)`
    & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
    & .ant-upload-list-item-info {
        display: none
    }
    & .ant-upload-list-item {
        display: none;
    }
`