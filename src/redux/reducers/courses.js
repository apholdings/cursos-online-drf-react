import {
    GET_MY_COURSES_SUCCESS,
    GET_MY_COURSES_FAIL,
    GET_COURSE_SECTION_SUCCESS,
    GET_COURSE_SECTION_FAIL,
    GET_RESOURCES_LIST_SUCCESS,
    GET_RESOURCES_LIST_FAIL,
    GET_EPISODE_SUCCESS,
    GET_EPISODE_FAIL,
    RELATED_COURSES_SUCCESS,
    RELATED_COURSES_FAIL,
    GET_REQUISITES_SUCCESS,
    GET_REQUISITES_FAIL,
    GET_WHATLEARNT_SUCCESS,
    GET_WHATLEARNT_FAIL,
    GET_SECTIONS_SUCCESS,
    GET_SECTIONS_FAIL,
    GET_PAID_SECTIONS_SUCCESS,
    GET_PAID_SECTIONS_FAIL,
    GET_COURSE_AUTHOR_SUCCESS,
    GET_COURSE_AUTHOR_FAIL,
    GET_COURSE_DETAILS_SUCCESS,
    GET_COURSE_DETAILS_FAIL,
    GET_USER_COURSES_SUCCESS,
    GET_USER_COURSES_FAIL,
    GET_COURSES_LIBRARY_SUCCESS,
    GET_COURSES_LIBRARY_FAIL,
    GET_COURSES_LIBRARY_PAGINATED_SUCCESS,
    GET_COURSES_LIBRARY_PAGINATED_FAIL,
    GET_PAID_COURSES_LIBRARY_SUCCESS,
    GET_PAID_COURSES_LIBRARY_FAIL,
    GET_PAID_COURSES_LIBRARY_PAGINATED_SUCCESS,
    GET_PAID_COURSES_LIBRARY_PAGINATED_FAIL,
    GET_COURSES_SUCCESS,
    GET_COURSES_FAIL,
    FILTER_COURSES_SUCCESS,
    FILTER_COURSES_FAIL,
    SEARCH_COURSES_SUCCESS,
    SEARCH_COURSES_FAIL,
    GET_COURSE_SUCCESS,
    GET_COURSE_FAIL,
    GET_COURSE_QUESTIONS_SUCCESS,
    GET_COURSE_QUESTIONS_FAIL,
    GET_RESOURCES_SUCCESS,
    GET_RESOURCES_FAIL,
    GET_COURSES_BY_ARRIVAL_SUCCESS,
GET_COURSES_BY_ARRIVAL_FAIL,
GET_COURSES_BY_SOLD_SUCCESS,
GET_COURSES_BY_SOLD_FAIL,GET_COURSE_DATA_SUCCESS,GET_COURSE_DATA_FAIL
} from '../actions/types';


const initialState = {
    my_courses:null,
    course_section:null,
    resources:null,
    episode:null,
    vendor_account:null,
    retrieve_vendor_account:null,
    courses: null,
    courses_arrival: null,
    courses_sold: null,
    product: null,
    product_study: null,
    search_courses: null,
    related_courses: null,
    filtered_courses: null,
    requisites: null,
    whatlearnt: null,
    sections: null,
    paid_sections: null,
    author:null,
    details:null,
    user_courses:null,
    courses_library: null,
    courses_library_paginated: null,
    paid_courses_library: null,
    course_data:null,
    count: null,
    next: null,
    previous: null,
    paid_courses_library_paginated: null,
    paid_count: null,
    paid_next: null,
    paid_previous: null,
};


export default function courses(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_COURSE_DATA_SUCCESS:
            return {
                ...state,
                requisites: payload.requisites,
                whatlearnt: payload.whatlearnt,
                sections: payload.sections,
                details: payload.details,
            }
        case GET_COURSE_DATA_FAIL:
            return {
                ...state,
                course_data: null
            }
        case GET_MY_COURSES_SUCCESS:
            return {
                ...state,
                my_courses: payload.results.courses,
                count: payload.count,
                next: payload.next,
                previous: payload.previous,
            }
        case GET_COURSE_SECTION_SUCCESS:
            return {
                ...state,
                course_section: payload
            }
        case GET_RESOURCES_LIST_SUCCESS:
            return {
                ...state,
                resources: payload.resources
            }
        case GET_EPISODE_SUCCESS:
            return {
                ...state,
                episode: payload
            }

        case GET_MY_COURSES_FAIL:
            return {
                ...state,
                my_courses: null
            }
        case GET_COURSE_SECTION_FAIL:
            return {
                ...state,
                course_section: null
            }
        case GET_RESOURCES_LIST_FAIL:
            return {
                ...state,
                resources:null
            }
        case GET_EPISODE_FAIL:
            return {
                ...state,
                episode:null
            }
        case GET_COURSES_SUCCESS:
            return {
                ...state,
                courses: payload.courses
            }
        case GET_COURSES_FAIL:
            return {
                ...state,
                courses: null
            }
        case GET_COURSES_LIBRARY_SUCCESS:
            return {
                ...state,
                courses_library: payload.courses
            }
        case GET_COURSES_LIBRARY_FAIL:
            return {
                ...state,
                courses_library: null
            }
        case GET_COURSES_LIBRARY_PAGINATED_SUCCESS:
            return {
                ...state,
                courses_library_paginated: payload.results.courses,
                count: payload.count,
                next: payload.next,
                previous: payload.previous,
            }
        case GET_COURSES_LIBRARY_PAGINATED_FAIL:
            return {
                ...state,
                courses_library: null
            }
        case GET_PAID_COURSES_LIBRARY_SUCCESS:
            return {
                ...state,
                paid_courses_library: payload.courses
            }
        case GET_PAID_COURSES_LIBRARY_FAIL:
            return {
                ...state,
                paid_courses_library: null
            }
        case GET_PAID_COURSES_LIBRARY_PAGINATED_SUCCESS:
            return {
                ...state,
                paid_courses_library_paginated: payload.results.courses,
                paid_count: payload.count,
                paid_next: payload.next,
                paid_previous: payload.previous,
            }
        case GET_PAID_COURSES_LIBRARY_PAGINATED_FAIL:
            return {
                ...state,
                paid_courses_library: null
            }
        case GET_RESOURCES_SUCCESS:
            return {
                ...state,
                resources: payload.resources
            }
        case GET_RESOURCES_FAIL:
            return {
                ...state,
                resources: null
            }
        case GET_COURSE_QUESTIONS_SUCCESS:
            return {
                ...state,
                questions: payload,
                count: payload.count,
                next: payload.next,
                previous: payload.previous,
            }
        case GET_COURSE_QUESTIONS_FAIL:
            return {
                ...state,
                questions: null,
                count: null,
                next: null,
                previous: null,
            }
        case GET_REQUISITES_SUCCESS:
            return {
                ...state,
                requisites: payload.requisites
            }
        case GET_REQUISITES_FAIL:
            return {
                ...state,
                requisites: null
            }
        case GET_WHATLEARNT_SUCCESS:
            return {
                ...state,
                whatlearnt: payload.what_learnt
            }
        case GET_WHATLEARNT_FAIL:
            return {
                ...state,
                whatlearnt: null
            }
        case GET_SECTIONS_SUCCESS:
            return {
                ...state,
                sections: payload.sections
            }
        case GET_SECTIONS_FAIL:
            return {
                ...state,
                sections: null
            }
        case GET_PAID_SECTIONS_SUCCESS:
            return {
                ...state,
                paid_sections: payload.sections
            }
        case GET_PAID_SECTIONS_FAIL:
            return {
                ...state,
                paid_sections: null
            }
        case GET_COURSE_AUTHOR_SUCCESS:
            return {
                ...state,
                author: payload.author
            }
        case GET_COURSE_AUTHOR_FAIL:
            return {
                ...state,
                author: null
            }
        case GET_COURSE_DETAILS_SUCCESS:
            return {
                ...state,
                details: payload.details
            }
        case GET_COURSE_DETAILS_FAIL:
            return {
                ...state,
                details: null
            }
        case GET_COURSES_BY_ARRIVAL_SUCCESS:
            return {
                ...state,
                courses_arrival: payload.courses
            }
        case GET_COURSES_BY_ARRIVAL_FAIL:
            return {
                ...state,
                courses_arrival: null
            }
        case GET_USER_COURSES_SUCCESS:
            return {
                ...state,
                user_courses: payload.courses,
            }
        case GET_USER_COURSES_FAIL:
            return {
                ...state,
                user_courses: null
            }
        case GET_COURSES_BY_SOLD_SUCCESS:
            return {
                ...state,
                courses_sold: payload.courses
            }
        case GET_COURSES_BY_SOLD_FAIL:
            return {
                ...state,
                courses_sold: null
            }
        case GET_COURSE_SUCCESS:
            return {
                ...state,
                product: payload
            }
        case GET_COURSE_FAIL:
            return {
                ...state,
                product: null
            }
       
        case RELATED_COURSES_SUCCESS:
            return {
                ...state,
                related_courses: payload.related_products
            }
        case RELATED_COURSES_FAIL:
            return {
                ...state,
                related_courses: null
            }
        case FILTER_COURSES_SUCCESS:
            return {
                ...state,
                filtered_courses: payload.filtered_courses
            }
        case FILTER_COURSES_FAIL:
            return {
                ...state,
                filtered_courses: null
            }
        case SEARCH_COURSES_SUCCESS:
            return {
                ...state,
                search_courses: payload.search_courses
            }
        case SEARCH_COURSES_FAIL:
            return {
                ...state,
                search_courses: null
            }
        default:
            return state
    }
}