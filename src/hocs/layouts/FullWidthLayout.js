import Footer from "components/navigation/Footer"
import Navbar from "components/navigation/Navbar"
import { useEffect } from "react"
import { connect } from "react-redux"
import { get_categories } from "redux/actions/categories"


const FullWidthLayout = ({children, categories}) => {

    useEffect(()=>{
        categories ? <></>:get_categories()
    },[])
    return(
        <>
        <Navbar/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
            <div className="max-w-7xl mx-auto">
                {/* Content goes here */}
                {children}
            </div>
        </div>
        <Footer/>
        </>
    )
}

const mapStateToProps = state =>({
    categories: state.categories.categories
})

export default connect(mapStateToProps,{

})(FullWidthLayout)