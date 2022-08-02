import CourseContentItem from './CourseContentItem'

function CourseContentList({hidden,data}) {
    return (
        <div>
            <div className={hidden ? "hidden" : ''}>
                {
                    data ? (data.map((episode,index)=>(
                        <CourseContentItem data={episode} key={index} />      
                    ))):(<></>)
                }
            </div>
        </div>
    )
}

export default CourseContentList