import Header from "components/cursos/Header";
import NewestCourses from "components/cursos/NewestCourses";
import FullWidthLayout from "hocs/layouts/FullWidthLayout";
import { useEffect } from "react";
import { connect } from "react-redux";
import { get_courses, get_courses_by_sold } from "redux/actions/courses";

function Courses({
    get_courses,
    courses,
    get_courses_by_sold,
    courses_sold
}){

    useEffect(()=>{
        courses ? <></>:get_courses()
        courses_sold ? <></>:get_courses_by_sold()
    },[])

    return(
        <FullWidthLayout>
            <Header/>
            <div className=" px-4 sm:px-6">
                    <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
                            <div className=" mt-2">
                            <h3 className="text-xl md:text-2xl leading-6 font-semibold text-gray-900 dark:text-dark-txt">Nuevos Cursos</h3>
                            </div>
                        </div>
                </div>
            <NewestCourses courses={courses && courses}/>
            <div className=" px-4 sm:px-6">
                    <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
                            <div className=" mt-2">
                            <h3 className="text-xl md:text-2xl leading-6 font-semibold text-gray-900 dark:text-dark-txt">Los Mas Vendidos</h3>
                            </div>
                        </div>
                </div>
            <NewestCourses courses={courses_sold && courses_sold}/>
        </FullWidthLayout>
    )
}

const mapStateToProps = state=>({
    courses: state.courses.courses,
    courses_sold: state.courses.courses_sold
})

export default connect(mapStateToProps,{
    get_courses,
    get_courses_by_sold
})(Courses)