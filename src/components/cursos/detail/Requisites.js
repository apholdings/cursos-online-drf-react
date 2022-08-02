import RequisiteItem from "./RequisiteItem"
const Requisites = ({
    requisites, 
    }) => {
    return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
    {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <div className="max-w-3xl mx-auto dark:text-dark-txt">
            <div>
                {requisites?<h3 className="text-lg md:text-xl lg:text-2xl my-4 font-poppins-regular">
                    Requisites
                </h3>   :<></>}         
                <ul  className="divide-y divide-gray-200">
                {
                // eslint-disable-next-line
                requisites ? requisites.map((requisite,index)=>(
                            
                    <li key={requisite.id} className="py-4">
                        <RequisiteItem data={requisite} msg={requisite.title} />
                    </li>
                        
                )):<>
                    <div className="animate-pulse">
                        <div className="grid grid-cols-3 my-2">
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 mx-2 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded"></div>
                        </div>
                        <div className="flex space-x-4 my-4">
                            <div className="flex-1 space-y-4 py-1">
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>    
                </>}
                </ul>
            </div>
        </div>
    </div>
    )
}

export default Requisites