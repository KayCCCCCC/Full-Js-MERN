import React from "react"
import TypeProduct from "../components/TypeProduct/TypeProduct"
import SliderComponent from "../components/SliderComponent/SliderComponent"
import CardComponent from "../components/CardComponent/CardComponent"
import ButtonComponent from "../components/ButtonComponent/ButtonComponent"
import slider1 from "../assets/img/slider1.webp"
import slider2 from "../assets/img/slider2.webp"
import slider3 from "../assets/img/slider3.webp"
const HomePage = () => {
    const arr = ['TV', 'Tu Lanh', 'Lap Top']
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
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                    </div>
                    <div className="flex items-center justify-center m-4">
                        <ButtonComponent className="hover:bg-[rgb(13,92,182)]" children="Xem Thêm" size="large" style={{ border: '1px solid rgb(11,116,229)', color: 'rgb(11,116,229)', width: '240px', height: '38px', borderRadius: '4px', backgroundColor: '#fff' }} />
                    </div>
                    {/* <Navbar /> */}
                </div>

            </div>
        </React.Fragment>
    )
}

export default HomePage