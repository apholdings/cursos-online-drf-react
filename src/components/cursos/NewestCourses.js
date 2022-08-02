import { Fragment } from "react"
import CourseCard from "./CourseCard"


function NewestCourses({
    courses
}){
    return(
    <Fragment>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            

            {/* Desktop Carousel */}
            <div className="hidden sm:block">
                {
                    courses ?
                    <div className="box-content py-2 relative h-80 overflow-x-auto xl:overflow-visible">
                        <div className="absolute  flex ">
                            {
                                courses ? courses.map(course=>(
                                    <CourseCard data={course}/>
                                )):<></>
                            }
                        </div>
                    </div>
                    :
                    <></>
                }
            </div>
            {/* Mobile Box Content */}
            <div className="my-4 flow-root sm:hidden">
                <div className="-my-2">
                    {
                        courses ? 
                        
                        <div className="box-content py-2 relative h-80 overflow-x-auto xl:overflow-visible">
                            <div className="absolute  flex ">
                                {courses.map(course=>(
                                    <CourseCard data={course}/>
                                ))}
                            </div>
                        </div>
                        :<></>
                    }
                </div>
            </div>
        </div>

    </Fragment>
    )
}

export default NewestCourses