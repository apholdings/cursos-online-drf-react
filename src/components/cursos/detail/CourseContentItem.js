import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

const CourseContentItem = ({data, setSrc, setContent, setResources, setTitle}) => {
    
    const handleClick=()=>{
        if(setSrc){
            setSrc(data && data !== null && data !== undefined && data.file)
        }
        if(setContent){
            setContent(data && data !== null && data !== undefined && data.content)
        }
        if(setResources){
            setResources(data && data !== null && data !== undefined && data.resources)
        }
        if(setTitle){
            setTitle(data && data !== null && data !== undefined && data.title)
        }
    }

    const [open, setOpen] = useState(false)

    return (
        <>
            { data ? (
            <div onClick={handleClick} className=" cursor-pointer flex justify-between items-center px-3 py-2 my-1 dark:hover:bg-dark-second hover:bg-gray-50 rounded-lg">
                <div className="flex ">
                    {/* <div className="mr-1 flex items-center justify-center">
                        <PlayIcon className="w-4 h-4 text-gray-800"></PlayIcon>
                    </div> */}
                    <div>
                        <h3 className="text-sm md:text-md text-gray-700 font-regular dark:text-dark-txt">
                            {data.title}
                        </h3>
                    </div>
                </div>
                
                <div>
                    
                    <p className='inline-flex text-sm md:text-base dark:text-dark-txt'>
                        {data.length}
                    </p>
                </div>
            </div>):(<></>) }
            
        </>
    )
}

export default CourseContentItem