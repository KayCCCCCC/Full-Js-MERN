import React from "react"
import { Row, Col, Image, InputNumber } from "antd"
import {
    StarFilled, PlusOutlined, MinusOutlined
} from '@ant-design/icons';
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import imgSmall from '../../assets/img/imagesmall.webp'
import img from '../../assets/img/test.webp'
const ProductDetail = () => {
    const onChange = (value) => {
        console.log('changed', value);
    };
    return (
        <React.Fragment>
            <Row style={{ padding: '16px', backgroundColor: '#fff' }}>
                <Col span={10}>
                    <Image src={img} alt="image" />
                    <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
                        <Col style={{ display: 'flex', flexBasis: 'unset' }} span={4}>
                            <Image style={{ width: '64px', height: '64px' }} src={imgSmall} alt="image small" />
                        </Col>
                        <Col style={{ display: 'flex', flexBasis: 'unset' }} span={4}>
                            <Image style={{ width: '64px', height: '64px' }} src={imgSmall} alt="image small" />
                        </Col>
                        <Col style={{ display: 'flex', flexBasis: 'unset' }} span={4}>
                            <Image style={{ width: '64px', height: '64px' }} src={imgSmall} alt="image small" />
                        </Col>
                        <Col style={{ display: 'flex', flexBasis: 'unset' }} span={4}>
                            <Image style={{ width: '64px', height: '64px' }} src={imgSmall} alt="image small" />
                        </Col>
                        <Col style={{ display: 'flex', flexBasis: 'unset' }} span={4}>
                            <Image style={{ width: '64px', height: '64px' }} src={imgSmall} alt="image small" />
                        </Col>
                        <Col style={{ display: 'flex', flexBasis: 'unset' }} span={4}>
                            <Image style={{ width: '64px', height: '64px' }} src={imgSmall} alt="image small" />
                        </Col>
                    </Row>
                </Col>
                <Col span={14} style={{ paddingLeft: '10px' }}>
                    <div style={{ color: 'rgb(36,36,36)', fontSize: '24px', fontWeight: '300', lineHeight: '32px', wordBreak: 'break-word' }}> Sách - Thám tử lừng danh Conan - Combo 10 tập từ 81 đến 90</div>
                    <div>
                        <StarFilled style={{ fontSize: '12px', color: 'rgb(253,216,54)' }} />
                        <StarFilled style={{ fontSize: '12px', color: 'rgb(253,216,54)' }} />
                        <StarFilled style={{ fontSize: '12px', color: 'rgb(253,216,54)' }} />
                        <span className="text-2xl leading-6 text-[rgb(120,120,120)]">| Da ban 1000+</span>
                        <div className="bg-[rgb(250,250,250) rounded]">
                            <div className="text-4xl leading-10 mr-2 font-medium p-3 mt-2">200.000</div>
                        </div>
                        <div>
                            <span className="text-2xl leading-6 text-[rgb(120,120,120)]">Giao Đến </span>
                            <span className="underline text-3xl leading-6 font-medium whitespace-nowrap overflow-hidden text-ellipsis">43 Tân Lập</span> -
                            <span className="text-[rgb(11,116,229)] text-2xl leading-6 font-medium"> Đổi địa chỉ</span>
                        </div>
                        <div className="h-fit w-fit mt-4">
                            <div className="text-3xl font-semibold border-t-2 mt-2 border-b-2 p-4">Số Lượng
                                <div className="flex gap-x-2 mt-2 items-center rounded  w-fit">
                                    <ButtonComponent icon={<MinusOutlined style={{ color: '#000' }} size={10} />} />
                                    <InputNumber min={1} max={1000} defaultValue={3} onChange={onChange} style={{ width: '35px' }} />
                                    <ButtonComponent icon={<PlusOutlined style={{ color: '#000' }} size={10} />} />
                                </div>
                            </div>
                            <div className="mt-4 flex gap-x-4">
                                <ButtonComponent
                                    size={40}
                                    style={{
                                        background: 'rgb(255,57,60)',
                                        color: '#fff',
                                        width: '220px',
                                        height: '48px',
                                        border: 'none',
                                        fontWeight: '700',
                                        fontSize: '18px'
                                    }}
                                    children={'Chọn mua'}
                                >
                                </ButtonComponent>
                                <ButtonComponent
                                    size={40}
                                    style={{
                                        background: '#fff',
                                        color: 'rgb(13,92,182)',
                                        width: '220px',
                                        height: '48px',
                                        boder: 'solid 1px #333',
                                        fontWeight: '700',
                                        fontSize: '18px'
                                    }}
                                    children={'Mua trả sau'}
                                >
                                </ButtonComponent>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row >
        </React.Fragment >
    )
}
export default ProductDetail