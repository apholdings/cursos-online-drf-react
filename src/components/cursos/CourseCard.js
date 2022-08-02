import { BadgeCheckIcon } from "@heroicons/react/solid"
import { connect } from "react-redux"
import Stars from "./Stars"
import { useState } from "react"
import { Link } from "react-router-dom";
import { get_user_courses_library } from "redux/actions/courses"
import LoadingCard from "components/loaders/LoadingCard"

const CourseCard = ({
    data,
}) => {

    const [effectCard, setEffectCard] = useState(false);

    return (

            <>
            {
                data ?

                <Link to={`/curso/detalle/${data.course_uuid}`}
                onMouseEnter={() => setEffectCard(true)}
                onMouseLeave={() => setEffectCard(false)}
                className={`${  effectCard && "animate-card "} w-64 h-auto rounded-md dark:bg-dark-third dark:hover:bg-dark-main shadow-sm dark:border-none border hover:shadow-md bg-white transition duration-300 ease-in-out cursor-pointer m-2  font-regular p-1 inline-block`}>
                <div className="w-full h-36 mr-4 rounded transition duration-200 ease-in-out overflow-hidden md:h-40">
                    
                    <video
                      loop
                      muted
                      className='object-cover w-full h-full '
                      src={data.sales_video}
                      poster={data.thumbnail}
                      onMouseOver={event => event.target.play()}
                      onMouseOut={event => event.target.load()}
                    >
                    </video>
                </div>
                <div className="mt-1 ml-2">
                        <div className="flex">
                            <div className="mr-4 flex-shrink-0">
                            <img
                                className="h-8 w-8 border border-gray-300 bg-white text-gray-300"
                                src={data.author.get_picture}
                                alt=""
                            />
                            </div>
                            <div>
                                <h4 className="text-sm font-gilroy-bold dark:text-dark-txt">{data.title.length > 27 ? data.title.slice(0,26) +"..." : data.title}</h4>
                                <p className="mt-1 font-gilroy-regular dark:text-dark-txt">
                                <span className="truncate text-sm">{data.author.username.length > 27 ? data.author.username.slice(0,26) +"..." : data.author.username}</span>
                                {data.author && data.author.verified ?
                                <BadgeCheckIcon className="ml-1 h-4 w-4 text-blue-500 inline-flex" aria-hidden="true" />:<></>}
                                </p>
                            </div>
                        </div>

                        <h3 className="text-sm text-yellow-600 my-1">
                            <span className="text-yellow-600 font-gilroy-semibold inline-flex mr-1">{data.student_rating}</span>
                            <span className="inline-flex mr-2"><Stars rating={data.student_rating}/></span>
                            <span className="dark:text-dark-txt text-gray-400 text-xs inline-flex">({data.student_rating_no})</span>
                        </h3>
                        <div className="flex">
                        <div className="mr-4 flex-shrink-0 self-end">
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
                            {(parseFloat(data.price))}
                            </p>
                        </div>
                        </div>

                        <h3 className="text-xs text-yellow-500 float-right font-gilroy-semibold">
                                {/* <span className="font-regular mr-3">rating: {product.rating}</span> ({product.student_no}) */}
                                
                            {
                                data.best_seller ? (
                                    <><span className=" inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-regular bg-yellow-100 text-yellow-800">
                                    Best Seller
                                    </span></>
                                ):(
                                    <></>
                                )
                            }
                        </h3>

                </div>
            </Link>
            :<LoadingCard/>
            }
            </>
    )   
}
const mapStateToProps =state=>({
    courses_library: state.courses.courses_library,
    paid_courses_library: state.courses.paid_courses_library,
    account: state.web3.account
})

export default connect(mapStateToProps, {
    get_user_courses_library
}) (CourseCard)