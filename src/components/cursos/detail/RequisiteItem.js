import { ExclamationCircleIcon } from '@heroicons/react/outline'
function RequisiteItem({msg}) {
    return (
        <div className="flex my-2 md:my-0">
            <div className='mr-2 text-xl'>
                <ExclamationCircleIcon className="h-6 w-6 text-blue-500" aria-hidden="true" />
            </div>
            <p>
                {msg}
            </p>
        </div>
    )
}

export default RequisiteItem
