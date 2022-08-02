import { ChevronRightIcon } from "@heroicons/react/solid"
import Header from "components/pages/connect/Header"
import FullWidthLayout from "hocs/layouts/FullWidthLayout"
import { connect } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"
import { loadWeb3, loginWeb3 } from "redux/actions/web3"

function Connect({loginWeb3, account}){

    const navigate = useNavigate()

    if(account){
        return <Navigate to="/"/>
    }
    
    return(
        <FullWidthLayout>
            <Header/>
            <div className="bg-white dark:bg-dark-main hover:dark:bg-dark-second hover:bg-gray-50 shadow overflow-hidden sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
                    <li onClick={()=>loginWeb3()}>
                        <div className="block  transition duration-300 ease-in-out cursor-pointer">
                            <div className="flex items-center px-4 py-4 sm:px-6">
                                <div className="min-w-0 flex-1 flex items-center">
                                    <div className="flex-shrink-0">
                                        <img className="h-12 w-12 rounded-full" src="https://bafybeig2busro4zb47v54tvsfrm65k7342e5pojww26ys2bi2msxhf6ei4.ipfs.dweb.link/metamask-2728406-2261817.webp" alt="" />
                                    </div>
                                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                        <p className="text-sm font-medium dark:text-dark-txt text-gray-800 truncate">Metamask</p>
                                        <div className="hidden md:block">
                                            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                                Popular
                                            </span>

                                        </div>
                                    </div>
                                    <div>
                                    <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <br/>
        </FullWidthLayout>
    )
}

const mapStateToProps = state => ({
    account: state.web3.account
})

export default connect(mapStateToProps,{
    loginWeb3
})(Connect)