
import WhatLearntItem from "./WhatLearntItem"

const WhatLearnt = ({
    what_learnt
}) => {

    return (
    <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8 mb-8">
    {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <div className="max-w-3xl mx-auto">
            <div>
                {what_learnt?<h2 className="dark:text-dark-txt text-lg md:text-xl lg:text-2xl my-4 font-semibold">
                    What you'll learn
                </h2> :<></>}           
                <ul  className=" grid md:grid-cols-2">
                {
                // eslint-disable-next-line
                what_learnt ? what_learnt.map((whatlearnt,index)=>(
                            
                    <li key={whatlearnt.id} className="py-2">
                        <WhatLearntItem data={whatlearnt} msg={whatlearnt.title} />
                    </li>
                        
                )):<>
                </>}
                </ul>
            </div>
        </div>
    </div>
    )
}

export default WhatLearnt