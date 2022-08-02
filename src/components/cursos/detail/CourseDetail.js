import CourseContentSec from "./CourseContentSec"

const CourseDetailComponent = ({
    sections,
    total_lectures,
    total_length,
    }) => {
    return (
        <>
            <div className="">
                <h2 className='text-xl md:text-2xl text-gray-800 dark:text-dark-txt mb-2 font-regular'>
                    Course Content
                </h2>

                <ul className="flex w-full text-sm md:text-base font-regular dark:text-dark-txt">
                    <li className="mr-1 inline-block ">
                        {sections && sections.length} section(s) 
                    </li>
                    <li className="mr-1  inline-block">• {total_lectures} episode(s)</li>
                    <li className="mr-1  inline-block">• {total_length} total time</li>
                </ul>

                <div className="my-4 dark:text-dark-txt">
                    {
                    // eslint-disable-next-line
                    sections ? sections.map((section,index)=>(
                        <CourseContentSec section={section} key={index} />
                    )):(<></>)
                    }
                </div>
            </div>
        </>
    )
}

export default CourseDetailComponent