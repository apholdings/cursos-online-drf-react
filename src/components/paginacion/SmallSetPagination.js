import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from '@heroicons/react/solid'
import { useState } from 'react';

function SmallSetPagination({get_blog_list_page, blog_list, count}){

    const [active, setActive] = useState(1);
    const [listingsPerPage, setListingsPerPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);

    const visitPage = (page) => {
        // window.scrollTo(0, 0);
        setCurrentPage(page);
        setActive(page);
        get_blog_list_page(page)
    }

    const previous_number = () => {
      // window.scrollTo(0, 0);
        if (currentPage !== 1) {
            setCurrentPage(currentPage-1);
            setActive(currentPage-1);
            get_blog_list_page(currentPage-1)
        }
    };

    const next_number = () => {
      // window.scrollTo(0, 0);
      if (currentPage !== Math.ceil(blog_list.length/3)) {
          setCurrentPage(currentPage+1);
          setActive(currentPage+1);
          get_blog_list_page(currentPage+1)
      }
    };

    let numbers = [];

    const getNumbers = () => {
      let itemsPerPage = listingsPerPage;
      let pageNumber = 1;

      for (let i = 0; i < count; i += itemsPerPage) {
        const page = pageNumber;
        let content = null;

        if (active === page) {
          content = (
              <div key={i} className={`hidden md:-mt-px md:flex`}>
                  <div className="border-indigo-500 text-indigo-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
                  {pageNumber}
                  </div>
              </div>
          );
        }
        else {
          content = (
              <div key={i} onClick={() => {
                visitPage(page)
                }} className={`hidden md:-mt-px md:flex`}>
                <div className="cursor-pointer border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
                  {pageNumber}
                </div>
              </div>
          );
        }

        numbers.push(
          content
        );
        pageNumber++;
      }

      return numbers;
    }

    return(
        <nav className="border-t border-gray-200 dark:border-dark-second px-4 flex items-center justify-between sm:px-0">
          
            {
                currentPage !== 1 ?
                <div className="-mt-px w-0 flex-1 flex">
                  <div
                    onClick={()=>{previous_number()}}
                    className="cursor-pointer border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  >
                    <ArrowNarrowLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                    Previous
                  </div>
                </div>
                :
                <div className="-mt-px w-0 flex-1 flex">
                  <div
                    
                    className="cursor-pointer border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  >
                    
                  </div>
                </div>
              }

          {getNumbers()}

                { 
                  currentPage === numbers.length ?
                  <div className="-mt-px w-0 flex-1 flex justify-end">
                    
                  </div>
                  :
                  <div className="-mt-px w-0 flex-1 flex justify-end">
                    <button
                      onClick={()=>{next_number()}}
                      className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    >
                      Next
                      <ArrowNarrowRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </button>
                  </div>
                  
                }

        </nav>
    )
}

export default SmallSetPagination