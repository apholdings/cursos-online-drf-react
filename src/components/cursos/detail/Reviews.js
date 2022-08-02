import { connect } from "react-redux"
import {
    get_reviews,
    get_review,
    create_review,
    update_review,
    delete_review,
    filter_reviews
} from 'redux/actions/reviews'
import Stars from "./Stars"

import { Fragment,useEffect } from 'react'
import {  Menu, Transition } from '@headlessui/react'
import {  } from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useParams } from "react-router-dom"

const Reviews = ({
    reviews,
    get_reviews,
    get_review,
    filter_reviews
}) => {
    const params = useParams()
    const course_uuid = params.course_uuid

    useEffect(() => {
        
        // eslint-disable-next-line
    }, [])

    const filterReviews = numStars => {
        filter_reviews(course_uuid, numStars)
    }

    const getReviews = () => {
        get_reviews(course_uuid)
    }

    return (
        <div className="">
          <div className="max-w-3xl mx-auto px-4 text-center sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="py-8">
              <h1 className="text-4xl font-regular tracking-tight text-gray-900 dark:text-dark-txt">Reviews</h1>
              <p className="mt-4 max-w-3xl mx-auto text-base text-gray-500 font-light dark:text-dark-txt">
                What do students think about this course?
              </p>
            </div>

            <section aria-labelledby="filter-heading" className="border-t dark:border-dark-second border-gray-200 py-6">

              <div className="flex items-center justify-between">
                <Menu as="div" className="relative z-10 inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flexjustify-center text-sm font-medium dark:text-dark-txt text-gray-700 hover:text-gray-900">
                      Filter
                      <ChevronDownIcon
                        className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 dark:text-dark-txt group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-left absolute left-0 z-10 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                          <Menu.Item >
                          <button
                                className='btn btn-primary btn-sm mb-3 ml-6 mt-2 font-light'
                                onClick={getReviews}
                            >
                                Mostrar todas
                            </button>
                    
                          </Menu.Item>
                          <Menu.Item>
                          <div
                                className='mb-1'
                                style={{ cursor: 'pointer' }}
                                onClick={() => filterReviews(5)}
                            >
                                <Stars rating={5.0} />
                            </div>
                            
                          </Menu.Item>
                          <Menu.Item>
                          <div
                                className='mb-1'
                                style={{ cursor: 'pointer' }}
                                onClick={() => filterReviews(4.0)}
                            >
                                <Stars rating={4.0} />
                            </div>
                            
                          </Menu.Item>
                          <Menu.Item>
                          <div
                                className='mb-1'
                                style={{ cursor: 'pointer' }}
                                onClick={() => filterReviews(3.0)}
                            >
                                <Stars rating={3.0} />
                            </div>
                            
                          </Menu.Item>
                          <Menu.Item>
                          <div
                                className='mb-1'
                                style={{ cursor: 'pointer' }}
                                onClick={() => filterReviews(2.0)}
                            >
                                <Stars rating={2.0} />
                            </div>
                            
                          </Menu.Item>
                          <Menu.Item>
                          <div
                                className='mb-1'
                                style={{ cursor: 'pointer' }}
                                onClick={() => filterReviews(1.0)}
                            >
                                <Stars rating={1.0} />
                            </div>
                            
                          </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-4 mt-8 space-x-8">
                {reviews && reviews.map(review => (
                    <div className="sm:flex">
                      
                        <div>
                            
                            <h4 className="text-sm font-bold dark:text-dark-txt">{review.user}</h4>
                            <Stars rating={review.rating}/>
                            <p className="mt-1 text-sm dark:text-dark-txt">
                            
                            {review.comment.length > 150 ? review.comment.slice(0,149) +"..." : review.comment}
                            </p>
                        </div>
                    </div>
                ))}
              </div>
                
            </section>
          </div>
        </div>
    )
}

const mapStateToProps = state => ({
    review: state.reviews.review,
})

export default connect(mapStateToProps, {
    get_reviews,
    get_review,
    create_review,
    update_review,
    delete_review,
    filter_reviews
}) (Reviews)