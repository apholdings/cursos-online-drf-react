import { Link } from "react-router-dom"
import CourseCard from "../CourseCard";
import Carousel from 'react-elastic-carousel';

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 350, itemsToShow: 2 },
    { width: 550, itemsToShow: 3 },
    { width: 720, itemsToShow: 4 },
    { width: 768, itemsToShow: 5 },
    { width: 1200, itemsToShow: 5 },
  ];

function RelatedCourses({
    related_courses
}) {

    return (
        <div className="max-w-xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8 ">
            <div className="flex items-center justify-between space-x-4">
            <h2 className="text-lg font-medium text-gray-900 mb-4 dark:text-dark-txt">Related Courses</h2>
            <Link to="/courses" className="whitespace-nowrap text-sm font-medium text-indigo-600 hover:text-indigo-500">
                Ver mas<span aria-hidden="true"> &rarr;</span>
            </Link>
            </div>
            
        </div>
    )
}

export default RelatedCourses