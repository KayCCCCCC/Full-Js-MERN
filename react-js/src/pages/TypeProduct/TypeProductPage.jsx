import React from "react"
import Navbar from "../../components/NavbarComponent/NavbarComponent"
import CardComponent from "../../components/CardComponent/CardComponent"
import { Pagination } from 'antd';
import { Row, Col } from "antd"
const TypeProduct = () => {
    const onChange = (pageNumber) => {
        console.log('Page: ', pageNumber);
    };
    return (
        <div style={{ padding: '0 120px', backgroundColor: '#efefef', }}>
            <Row style={{ flexWrap: 'nowrap', paddingTop: '10px' }}>
                <Col span={5} style={{ backgroundColor: '#fff', marginRight: '10px', padding: '10px', borderRadius: '6px', display: 'flex', flexDirection: 'column' }}>
                    <Navbar />
                </Col>

                <Col span={19}>
                    <div className="flex items-center justify-center flex-wrap gap-4 w-[100%] h-auto">
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                    </div>
                    <div className="float-end m-4 p-2"><Pagination defaultCurrent={2} total={500} onChange={onChange} /></div>
                </Col>
            </Row>
        </div>
    )
}
export default TypeProduct