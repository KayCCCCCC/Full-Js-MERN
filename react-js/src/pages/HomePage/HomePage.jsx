import React, { useEffect, useRef, useState } from "react"
import TypeProduct from "../../components/TypeProductComponent/TypeProduct"
import SliderComponent from "../../components/SliderComponent/SliderComponent"
import CardComponent from "../../components/CardComponent/CardComponent"
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent"
import slider1 from "../../assets/img/slider1.webp"
import slider2 from "../../assets/img/slider2.webp"
import slider3 from "../../assets/img/slider3.webp"
import { useQuery } from "@tanstack/react-query"
import * as ProductService from "../../services/ProductService"
import { useSelector } from "react-redux"
import { useDebounce } from "../../hooks/useDebounce"
import Loading from "../../components/LoadingComponent/Loading"
import { WrapperButtonMore } from "./style"

const HomePage = () => {
    const searchProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDebounce(searchProduct, 1000)
    const refSearch = useRef()
    const [stateProduct, setStateProduct] = useState([])
    const [loading, setLoading] = useState(false)
    const [limit, setLimit] = useState(5)
    const [typeProducts, setTypeProducts] = useState([])
    const arr = ['TV', 'Tu Lanh', 'Lap Top']

    const fetAllProduct = async (context) => {
        const limit = context?.queryKey && context?.queryKey[1]
        const search = context?.queryKey && context?.queryKey[2]
        const res = await ProductService.GetAllProduct(search, limit)
        return res
    }

    const fetchAllTypeProduct = async () => {
        const res = await ProductService.GetAllTypeProduct()
        if (res?.status === 'OK') {
            setTypeProducts(res?.data)
        }
    }

    // useEffect(() => {
    //     if (refSearch.current) {
    //         setLoading(true)
    //         fetAllProduct(searchDebounce)
    //     }
    //     refSearch.current = true
    //     setLoading(false)
    // }, [searchDebounce])

    useEffect(() => {
        fetchAllTypeProduct()
    }, [])

    // const { isLoading, data: products, isPreviousData } = useQuery({
    //     queryKey: ['products', limit, searchDebounce],
    //     queryFn: fetAllProduct,
    //     retry: 3, // Số lần retry khi gặp lỗi
    //     retryDelay: 1000, // Thời gian chờ giữa các lần retry (miligiây)
    //     keepPreviousData: true,
    //     onError: (error) => {
    //         // Xử lý lỗi và quyết định liệu nên retry hay không
    //         // return true để thực hiện retry, return false để dừng
    //         return true;
    //     },
    // });
    const { isLoading, data: products, isPreviousData } = useQuery({
        queryKey: ['products', limit, searchDebounce],
        queryFn: fetAllProduct,
        retry: 3, // Số lần retry khi gặp lỗi
        retryDelay: 1000, // Thời gian chờ giữa các lần retry (miligiây)
        keepPreviousData: true,
        onError: (error) => {
            // Xử lý lỗi và quyết định liệu nên retry hay không
            // return true để thực hiện retry, return false để dừng
            return true;
        },
    });

    // console.log('products', products)

    // set all product
    // useEffect(() => {
    //     if (products?.data.length > 0) {
    //         setStateProduct(products)
    //     }
    // }, [products])

    return (
        <React.Fragment>
            <Loading isLoading={isLoading || loading}>
                <div className="flex justify-start gap-x-10 border-b border-sky-500 h-11 text-2xl px-32 mt-4">
                    {typeProducts.map((item) => {
                        return (
                            <TypeProduct name={item.toLocaleString()} key={item} />
                        )
                    })}
                </div>
                <div className="px-32">
                    <div className="w-[100%] bg-[#efefef] px-0 py-0 h-auto">
                        <SliderComponent arrImages={[slider1, slider2, slider3]} />
                        <div className="mt-5 flex flex-wrap gap-4 w-[100%] px-14">
                            {
                                products?.data?.map((item) => (
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
                            }
                        </div>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                            <WrapperButtonMore
                                children={isPreviousData ? 'Load more' : "Xem thêm"} type="outline"
                                disabled={products?.total === products?.data?.length || products?.totalPage === 1}
                                styleTextButton={{ fontWeight: 500, color: products?.total === products?.data?.length && '#fff' }}
                                style={{
                                    border: `1px solid ${products?.total === products?.data?.length ? '#f5f5f5' : '#9255FD'}`, color: `${products?.total === products?.data?.length ? '#f5f5f5' : '#9255FD'}`,
                                    width: '240px', height: '38px', borderRadius: '4px'
                                }}
                                onClick={() => setLimit((prev) => prev + 5)}
                            />
                        </div>
                    </div>

                </div>
            </Loading>
        </React.Fragment>
    )
}

export default HomePage