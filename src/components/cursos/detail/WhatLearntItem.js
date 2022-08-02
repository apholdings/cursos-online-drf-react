import { CheckIcon } from '@heroicons/react/outline'
function WhatLearntItem({msg}) {
    return (
        <div className="flex my-2 md:my-0">
            <div className='mr-2 text-sm '>
                <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
            </div>
            <p className='text-sm dark:text-dark-txt'>
                {msg}
            </p>
        </div>
    )
}

export default WhatLearntItem
