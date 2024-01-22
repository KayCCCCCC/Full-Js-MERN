import React from "react"
import ProductDetails from "../../components/ProductDetailsComponent/ProductDetails"
const ProductDetailPage = () => {
    return (
        <React.Fragment>
            <div className="py-0 px-28 text-xl h-fit bg-[#efefef]">
                <div>Product Detail Page</div>
                <ProductDetails />
            </div>
        </React.Fragment>
    )
}
export default ProductDetailPage