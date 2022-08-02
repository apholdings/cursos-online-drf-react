import { connect } from "react-redux"
import FullWidthLayout from "hocs/layouts/FullWidthLayout"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { get_course_data, get_related_courses, get_user_courses_library, get_user_paid_courses_library } from "redux/actions/courses"
import DOMPurify from 'dompurify'
import Stars from "components/Stars"
import { BadgeCheckIcon, CodeIcon, DesktopComputerIcon, DeviceMobileIcon, DocumentIcon, FolderDownloadIcon, GlobeAltIcon, HeartIcon, InformationCircleIcon } from "@heroicons/react/solid"
import moment from "moment"
import WhatLearnt from "components/cursos/detail/WhatLearnt"
import CourseDetailComponent from "components/cursos/detail/CourseDetail"
import Requisites from "components/cursos/detail/Requisites"
import CourseCard from "components/cursos/CourseCard"
import axios from "axios"
import { toast } from "react-toastify"
import { ethers } from "ethers"

function CourseDetail({
    get_course_data,
    requisites,
    whatlearnt,
    sections,
    details,
    related_courses,
    get_related_courses,
    account,
    get_user_paid_courses_library,
    get_user_courses_library,
    courses_library,
    paid_courses_library,
    token
}){

    const [loading, setLoading] = useState(false)

    const params = useParams()
    const course_uuid = params.course_uuid

    useEffect(()=>{
        get_course_data(course_uuid)
        get_related_courses(course_uuid)

        if(localStorage.getItem('account')){
            get_user_paid_courses_library()
            get_user_courses_library()
        }
    },[])

    return(
        <FullWidthLayout>
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8  md:mt-10">
                <div className="max-w-full mx-auto">
                    <div className="grid mt-2 lg:grid-cols-3 gap-2  items-start">
                        {/* Details */}
                        <div className="col-span-2 p-4 rounded-lg bg-gray-100 dark:bg-dark-third lg:mx-4">
                            {
                                details ?
                                <>
                                
                            {/* Title */}
                            <h2 className="text-xl font-gilroy-semibold dark:text-dark-txt text-dark sm:text-2xl sm:tracking-tight lg:text-3xl">
                                {details.title}
                            </h2>
                            {/* Description */}
                            <div className="my-2 text-md dark:text-dark-txt text-gray-700 font-gilroy-regular"
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(details.description.length)  > 300 ? DOMPurify.sanitize(details.description.slice(0,299)) +"..." : details && DOMPurify.sanitize(details.description) }} />
                            
                            <span className="inline-flex mr-2"><Stars rating={details.student_rating}/></span>
                            <span className="text-xs md:text-base text-yellow-500 font-gilroy-regular" >
                                ({details.student_rating_no} ratings)
                            </span>

                                {/* Author */}
                                <div className="flex my-4">
                                    
                                    <div>
                                        
                                        <p className="mt-1 text-sm font-gilroy-regular text-gray-800 dark:text-dark-txt">
                                        Creado por: <span className="text-blue-500 font-gilroy-regular"><a href={`/profile/${details.author.account}`}>{details.author.username}</a>
                                        {details.author.verified ?
                                        <BadgeCheckIcon className="ml-1 h-4 w-4 text-blue-500 inline-flex" aria-hidden="true" />:<></>}
                                        </span>
                                        </p>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="grid grid-cols-3 mt-2">
                                    <div><InformationCircleIcon className="h-5 w-5 dark:text-dark-txt text-gray-500 inline-flex mr-2 "/>
                                    <span className="dark:text-dark-txt sm:text-sm text-xs text-gray-500 font-gilroy-regular">
                                        <span>actualizado: </span>
                                        {
                                        moment(details.updated).fromNow()
                                        }
                                    </span></div>
                                    <div><GlobeAltIcon className="h-5 w-5 dark:text-dark-txt text-gray-500 inline-flex mr-2"/>
                                        <span className="dark:text-dark-txt sm:text-sm text-xs text-gray-500 font-gilroy-regular">
                                        {
                                        details.language
                                        }
                                        </span>
                                    </div>
                                    {
                                    // eslint-disable-next-line
                                        details.best_seller ? (
                                        <span className="inline-flex items-center px-3 justify-center py-0.5 rounded-full text-sm bg-yellow-100 text-yellow-800 font-gilroy-regular">
                                        Best Seller
                                        </span>):(
                                            <></>
                                        )
                                    }
                                </div>
                                </>:<></>
                            }
                        </div>
                        {/* Viideo */}
                        <div className=" rounded-lg w-full lg:col-span-1 col-span-3">
                            {
                                details ?
                                <>
                                <video
                                    onContextMenu={e => e.preventDefault()}
                                    controls 
                                    id="my-video"
                                    poster={details.thumbnail}
                                    controlsList="nodownload"
                                    data-setup="{'playbackRates': [0.5, 1, 1.5, 2], 'fluid': true}"
                                    className='object-contain w-full h-full  dark:border-dark-second border-gray-100 rounded-xl'
                                    src={details.sales_video} >
                                        
                                </video>
                                <span className="block mt-1">
                                    <div className="flex">
                                        <div className="mr-1 flex-shrink-0 self-end">
                                        <img 
                                            className="h-4 w-4 inline-flex mr-1 dark:hidden"
                                            src="https://bafybeid6zqgfga36wxrdohicgp3wluq33r5pagbcdaz6jamd3z7fjl4luq.ipfs.dweb.link/Uridium_new_logo.png"
                                        />
                                        <img 
                                            className="h-4 w-4 mr-1 hidden dark:inline-flex"
                                            src="https://bafybeigwlojghhl5v5iq6cmnl6jqyegakfygugu6c4b3jchytuztdosnxq.ipfs.dweb.link/Uridium_new_logo_white.png"
                                        />
                                        </div>
                                        <div>
                                            <p className="mt-1 dark:text-dark-txt font-gilroy-medium">
                                            {(parseFloat(details.price))}
                                            </p>
                                        </div>
                                    </div>
                                </span>
                                {/* Boton de Compra */}
                                <div className="grid grid-cols-4">
                                    {
                                        loading === false && account && paid_courses_library && paid_courses_library[0].courses.some(u=>u.course_uuid.includes(course_uuid)) || details && details.author.account === account || details && details.payment === "free" ?
                                        <Link
                                            to={`/course/study/${details.course_uuid}`}
                                            className="col-span-3 w-full mt-2 justify-center font-medium inline-flex items-center px-3 py-4 border border-transparent text-sm leading-4 rounded-md shadow-sm text-white bg-black hover:bg-dark-third"
                                        >
                                            View
                                        </Link>
                                        :loading == false && account ?
                                        <button
                                        onClick={async ()=>{
                                            setLoading(true)

                                            const config = {
                                                headers: {
                                                    'Accept': 'application/json',
                                                }
                                            };

                                            const formData = new FormData()
                                            formData.append('account', account)
                                            formData.append('course_uuid', course_uuid)

                                            let totalAmount = ethers.utils.parseEther(details.price)

                                            // Pagar con ETH
                                            await window.ethereum.send("eth_requestAccounts");
                                            const provider = new ethers.providers.Web3Provider(window.ethereum);
                                            const signer = provider.getSigner();
                                            const tx = await signer.sendTransaction({
                                                to: details.author.account,
                                                value: totalAmount
                                              });
                                            
                                            // Pagar con tu Token
                                            // const tx = await token.functions.transfer(details.author.account, totalAmount)

                                            const receipt = await tx.wait().then(function(receipt){
                                                try{
                                                    const res = axios.post(`${process.env.REACT_APP_API_URL}/api/courses/add_paid`, formData, config);
                                                    if (res.status === 200) {
                                                        setTimeout(setLoading(false),1000)
                                                        setTimeout(window.location.reload(),2000)
                                                    } else {
                                                        setTimeout(setLoading(false),1000)
                                                        setTimeout(window.location.reload(),2000)
                                                    }
                                                }catch{
                                                    toast.error('Error with serevr, report transaction hash to support to add your course')
                                                }
                                            })

                                        }} 
                                        className="col-span-3 w-full mt-2 justify-center font-medium inline-flex items-center px-3 py-4 text-sm leading-4 rounded-md transition duration-300 ease-in-out shadow-sm hover:shadow-button text-white bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                            Comprar
                                        </button>
                                        : loading === true ?
                                        <div
                                        className="cursor-default col-span-3 w-full mt-2 justify-center font-medium inline-flex items-center px-3 py-4 text-sm leading-4 rounded-md transition duration-300 ease-in-out shadow-sm hover:text-blue-600 hover:bg-blue-100 text-blue-700 bg-blue-200  ">
                                            Loading
                                        </div>
                                        :
                                        <Link
                                        to="/connect"
                                        className="col-span-3 w-full mt-2 justify-center font-medium inline-flex items-center px-3 py-4 text-sm leading-4 rounded-md transition duration-300 ease-in-out shadow-sm hover:shadow-button text-white bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                            Login
                                        </Link>

                                    }
                                </div>
                                </>
                                :
                                <>loading</>
                            }
                        </div>

                        {/* Whatlearnt */}
                        <div className=" col-span-2 bg-gray-100 dark:bg-dark-third rounded-lg mx-4 mt-4 font-gilroy-semibold">
                            <WhatLearnt what_learnt={whatlearnt&&whatlearnt}/>
                        </div>
                        {/* Sections */}
                        <div className=" col-span-2 rounded-lg mx-4 mt-4 font-gilroy-semibold">
                            <CourseDetailComponent
                                sections={sections&&sections} 
                                total_length={details&&details.total_duration} 
                                total_lectures={details&&details.total_lectures}
                            />
                        </div>

                        {/* Requisites */}
                        <div className=" col-span-2 bg-gray-100 dark:bg-dark-third rounded-lg mx-4 mt-4 font-gilroy-semibold">
                            <Requisites requisites={requisites&&requisites}/>
                        </div>

                        {/* Reviews */}
                        <div className=" col-span-2 bg-gray-100 dark:bg-dark-third rounded-lg mx-4 mt-4 font-gilroy-semibold">
                            reviews
                        </div>

                        {/* RRelated */}
                        <div className=" col-span-2  rounded-lg mx-4 mt-4 font-gilroy-semibold">
                        
                            {
                                related_courses ?
                                <div className=" px-4 sm:px-6">
                                    <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
                                        <div className=" mt-2">
                                        <h3 className="text-xl md:text-2xl leading-6 font-semibold text-gray-900 dark:text-dark-txt">Cursos Relacionados</h3>
                                        </div>
                                    </div>
                                </div>
                                :
                                <></>
                            }
                            <div className="box-content py-2 relative h-80 overflow-x-auto xl:overflow-visible">
                                    <div className="absolute  flex ">
                                    {
                                            related_courses ? 
                                            related_courses.map((course) => (
                                                <CourseCard key={course.course_uuid} data={course}/>
                                            ))
                                            :
                                            <></>
                                        }
                                        
                                    </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </FullWidthLayout>
    )
}
const mapStateToProps=state=>({
    requisites: state.courses.requisites,
    whatlearnt: state.courses.whatlearnt,
    sections: state.courses.sections,
    details: state.courses.details,
    related_courses: state.courses.related_courses,
    account: state.web3.account,
    courses_library: state.courses.courses_library,
    paid_courses_library: state.courses.paid_courses_library,
    token: state.web3.token
})

export default connect(mapStateToProps,{
    get_course_data,
    get_related_courses,
    get_user_paid_courses_library,
    get_user_courses_library
}) (CourseDetail)