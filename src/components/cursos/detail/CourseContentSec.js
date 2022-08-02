import { useState } from 'react'
import CourseContentList from './CourseContentList'
import {
    ChevronRightIcon,
    ChevronDownIcon
} from '@heroicons/react/outline'

const CourseContentSec = ({section}) => {
    const [hidden,setHidden] =useState(true) 

    const changeHidden=()=>{
        setHidden(!hidden)
    }

    return (
        <div>
            <div onClick={changeHidden} className="flex cursor-pointer justify-between items-center p-2 dark:bg-dark-second dark:border-dark-third bg-white rounded-lg border hover:bg-gray-50 dark:hover:border-dark-second border-gray-200 hover:border-gray-100 mb-1">
                <div className='flex items-center w-8/12 md:w-10/12 overflow-hidden'>
                    <div className="flex justify-center items-center text-xl mr-2">
                        {hidden ? <ChevronRightIcon className="h-4 w-4 text-gray-400 dark:text-dark-txt" aria-hidden="true" />:
                        <ChevronDownIcon className="h-4 w-4 text-gray-400 dark:text-dark-txt" aria-hidden="true" />}
                    </div>
                    <div>
                        <h3 className="md:text-md font-sofiapro-regular dark:text-dark-txt">
                            {section ? section.section_title:(<></>)}
                        </h3>
                    </div>
                </div>
                <div className="w-3/12 md:w-3/12 lg:w-2/12">
                    {section ? (
                    <ul className="md:flex text-xs text-gray-500 md:text-base dark:text-dark-txt">
                        <li className="mr-1 text-xs">{section.episodes.length} lecture{section.episodes.length>1 &&'s'}</li>
                        <li className='text-xs'>• {section.total_duration}</li>
                    </ul>
                    ):(<></>)}
                </div>
            </div>
            {section ? (<CourseContentList  data={section.episodes} hidden={hidden}  />):(<></>)}
            
        </div>
    )
}

export default CourseContentSec