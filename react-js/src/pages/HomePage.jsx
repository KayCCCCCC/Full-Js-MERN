import React from "react"
import TypeProduct from "../components/TypeProduct/TypeProduct"
import SliderComponent from "../components/SliderComponent/SliderComponent"
import CardComponent from "../components/CardComponent/CardComponent"
import ButtonComponent from "../components/ButtonComponent/ButtonComponent"
import slider1 from "../assets/img/slider1.webp"
import slider2 from "../assets/img/slider2.webp"
import slider3 from "../assets/img/slider3.webp"
import { useQuery } from "@tanstack/react-query"
import * as ProductService from "../services/ProductService"
const HomePage = () => {
    const arr = ['TV', 'Tu Lanh', 'Lap Top']

    const fetAllProduct = async () => {
        const query = await ProductService.GetAllProduct();
        return query
    }
    const listPro = useQuery({
        queryKey: ['products'],
        queryFn: fetAllProduct,
        config: {
            refetchQueries: ['getAllProducts'], // Assuming 'getAllProducts' is the key for the query that fetches all products
        },
    });

    console.log('check query: ', listPro);

    return (
        <React.Fragment>
            <div className="flex justify-start gap-x-10 border-b border-sky-500 h-11 text-2xl px-32 mt-4">
                {
                    arr.map((item, index) => {
                        return (
                            <TypeProduct name={item} key={item} />
                        )
                    })
                }
            </div>
            <div className="px-32">
                <div className="w-[100%] bg-[#efefef] px-0 py-0 h-auto">
                    <SliderComponent arrImages={[slider1, slider2, slider3]} />
                    <div className="mt-5 flex flex-wrap gap-4 w-[100%] px-14">
                        {listPro?.data ? (
                            listPro?.data?.data.map((item) => (
                                <CardComponent
                                    key={item._id}
                                    countInStock={item.countInStock}
                                    description={item.description}
                                    image={item.image}
                                    name={item.name}
                                    price={item.price}
                                    rating={item.rating}
                                    type={item.type}
                                    selled={item.selled}
                                    discount={item.discount}
                                    id={item._id}
                                />
                            ))
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                    <div className="flex items-center justify-center m-4">
                        <ButtonComponent className="hover:bg-[rgb(13,92,182)]" children="Xem Thêm" size="large" style={{ border: '1px solid rgb(11,116,229)', color: 'rgb(11,116,229)', width: '240px', height: '38px', borderRadius: '4px', backgroundColor: '#fff' }} />
                    </div>
                </div>

            </div>
        </React.Fragment>
    )
}

export default HomePage