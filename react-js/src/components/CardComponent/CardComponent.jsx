import React from "react";
import { Card, Image } from 'antd';
import { StarFilled } from '@ant-design/icons'
import logo from '../../assets/img/logo.png'
const { Meta } = Card;
const CardComponent = (props) => {
    const { countInStock, description, image, name, price, rating, type, discount, selled, id } = props
    console.log('props: ', props)
    return (
        <React.Fragment>
            <Card
                hoverable
                headStyle={{ width: '200px', height: '200px', position: 'relative' }}
                style={{
                    width: '240px',
                }}
                bodyStyle={{ padding: '17px' }}
                cover={<img alt="example" src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:80/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1__1.png" />}
            >
                <div className="absolute top-0 left-0 w-[35%]">
                    <img src={logo}></img>
                </div>
                <div className="font-bold text-2xl leading-4 text-[rgb(56,56,61)]">{name}</div>
                <div className="text-2xl flex items-center mt-4 text-[rgb(128,128,137)]">
                    <div className="flex flex-col gap-y-2">
                        <div className="flex flex-row gap-x-2">
                            <span>
                                <span>{rating}</span>
                                <StarFilled style={{ fontSize: '16px', color: 'yellow', marginLeft: '5px' }} />
                            </span>
                            <span> | Da ban 1000+</span>
                        </div>
                        <div className="flex flex-row">
                            <span className="text-red-500 text-2xl font-medium mr-2">{price}</span>
                            <span className="text-red-500 text-2xl font-medium">{discount}%</span>
                        </div>
                    </div>
                </div>
            </Card>
        </React.Fragment>
    )
}
export default CardComponent