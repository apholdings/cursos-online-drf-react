import axios from "axios";
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
    GET_COURSES_BY_SOLD_FAIL,
    GET_COURSE_DATA_SUCCESS,
GET_COURSE_DATA_FAIL
} from './types';


export const get_courses = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/courses/get-courses`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_COURSES_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_COURSES_FAIL
            });
        }

    }catch (err) {
        dispatch({
            type: GET_COURSES_FAIL
        });
    }
}

export const get_my_courses = () => async dispatch => {
    if(window.ethereum){

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];

        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({
            account
        });

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/courses/teacher/`, body, config);
            if (res.status === 200) {
                dispatch({
                    type: GET_MY_COURSES_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: GET_MY_COURSES_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: GET_MY_COURSES_FAIL
            });
        }

    }else{
        dispatch({
            type: GET_MY_COURSES_FAIL
        });

    }
}

export const get_my_courses_page = (page) => async dispatch => {

    if(window.ethereum){

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
    
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
    
        const body = JSON.stringify({
            account
        });
    
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/courses/teacher/?p=${page}`, body, config);
    
            if (res.status === 200) {
                dispatch({
                    type: GET_MY_COURSES_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: GET_MY_COURSES_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: GET_MY_COURSES_FAIL
            });
        }
    }else{
        dispatch({
            type: GET_MY_COURSES_FAIL
        });

    }


}

export const get_course_section = (section_uuid) => async dispatch => {

    const config = {
        headers:{
            'Accept': 'application/json',
        }
    }

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/courses/section/${section_uuid}`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_COURSE_SECTION_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_COURSE_SECTION_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_COURSE_SECTION_FAIL
        });
    }
};

export const get_resources_list = () => async dispatch => {

    const config = {
        headers:{
            'Accept': 'application/json',
        }
    }

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/courses/resources/`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_RESOURCES_LIST_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_RESOURCES_LIST_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_RESOURCES_LIST_FAIL
        });
    }
};


export const get_episode = (episode_uuid) => async dispatch => {

    const config = {
        headers:{
            'Accept': 'application/json',
        }
    }

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/courses/episode/${episode_uuid}`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_EPISODE_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_EPISODE_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_EPISODE_FAIL
        });
    }
};


export const get_courses_by_arrival = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/courses/get-courses?sortBy=created&order=desc&limit=9`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_COURSES_BY_ARRIVAL_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_COURSES_BY_ARRIVAL_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_COURSES_BY_ARRIVAL_FAIL
        });
    }
};

export const get_courses_by_sold = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/courses/get-courses?sortBy=sold&order=desc&limit=9`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_COURSES_BY_SOLD_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_COURSES_BY_SOLD_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_COURSES_BY_SOLD_FAIL
        });
    }
};

export const get_related_courses = (course_uuid) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/courses/related/${course_uuid}`, config);

        if (res.status === 200 && !res.data.error) {
            dispatch({
                type: RELATED_COURSES_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: RELATED_COURSES_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: RELATED_COURSES_FAIL
        });
    }
};


export const get_filtered_courses = (category_id, price_range, sort_by, order) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        category_id,
        price_range,
        sort_by,
        order
    });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/courses/by/search`, body, config);

        if (res.status === 200 && !res.data.error) {
            dispatch({
                type: FILTER_COURSES_SUCCESS,
                payload: res.data
            });
            console.log(res.data)
        } else {
            dispatch({
                type: FILTER_COURSES_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: FILTER_COURSES_FAIL
        });
    }
};


export const get_search_courses = (search, category_id) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        search,
        category_id
    });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/courses/search`, body, config);

        if (res.status === 200) {
            dispatch({
                type: SEARCH_COURSES_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: SEARCH_COURSES_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: SEARCH_COURSES_FAIL
        });
    }
};


export const get_course = (course_uuid) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    }

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/courses/data/${course_uuid}/`, config)

        if (res.data) {
            dispatch({
                type: GET_COURSE_SUCCESS,
                payload: res.data
            })
        } else {
            dispatch({
                type: GET_COURSE_FAIL
            })
        }
    } catch (err) {
        dispatch({
            type: GET_COURSE_FAIL
        })
    }
}


export const get_course_data = (course_uuid) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/courses/data/${course_uuid}/`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_COURSE_DATA_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: GET_COURSE_DATA_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: GET_COURSE_DATA_FAIL
        });
    }
};

export const get_course_requisites = (course_uuid) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    }

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/courses/requisites/${course_uuid}/`, config)

        if (res.data.requisites) {
            dispatch({
                type: GET_REQUISITES_SUCCESS,
                payload: res.data
            })
        } else {
            dispatch({
                type: GET_REQUISITES_FAIL
            })
        }
    } catch (err) {
        dispatch({
            type: GET_REQUISITES_FAIL
        })
    }
}


export const get_course_whatlearnt = (course_uuid) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    }

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/courses/whatlearnt/${course_uuid}/`, config)

        if (res.data.what_learnt) {
            dispatch({
                type: GET_WHATLEARNT_SUCCESS,
                payload: res.data
            })
        } else {
            dispatch({
                type: GET_WHATLEARNT_FAIL
            })
        }
    } catch (err) {
        dispatch({
            type: GET_WHATLEARNT_FAIL
        })
    }
}


export const get_course_sections = (course_uuid) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    }

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/courses/sections/${course_uuid}/`, config)

        if (res.data.sections) {
            dispatch({
                type: GET_SECTIONS_SUCCESS,
                payload: res.data
            })
        } else {
            dispatch({
                type: GET_SECTIONS_FAIL
            })
        }
    } catch (err) {
        dispatch({
            type: GET_SECTIONS_FAIL
        })
    }
}


export const get_course_paid_sections = (course_uuid) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    }

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/courses/sections/paid/${course_uuid}/`, config)

        if (res.data.sections) {
            dispatch({
                type: GET_PAID_SECTIONS_SUCCESS,
                payload: res.data
            })
        } else {
            dispatch({
                type: GET_PAID_SECTIONS_FAIL
            })
        }
    } catch (err) {
        dispatch({
            type: GET_PAID_SECTIONS_FAIL
        })
    }
}



export const get_course_author = (course_uuid) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    }

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/courses/author/${course_uuid}/`, config)

        if (res.data.author) {
            dispatch({
                type: GET_COURSE_AUTHOR_SUCCESS,
                payload: res.data
            })
        } else {
            dispatch({
                type: GET_COURSE_AUTHOR_FAIL
            })
        }
    } catch (err) {
        dispatch({
            type: GET_COURSE_AUTHOR_FAIL
        })
    }
}



export const get_course_details = (course_uuid) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    }

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/courses/details/${course_uuid}/`, config)

        if (res.data.details) {
            dispatch({
                type: GET_COURSE_DETAILS_SUCCESS,
                payload: res.data
            })
        } else {
            dispatch({
                type: GET_COURSE_DETAILS_FAIL
            })
        }
    } catch (err) {
        dispatch({
            type: GET_COURSE_DETAILS_FAIL
        })
    }
}




export const get_course_questions = (course_uuid) => async dispatch => {

    const config = {
        headers:{
            'Accept': 'application/json',
        }
    }

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/courses/questions/${course_uuid}/`, config)

        if (res.data.questions) {
            dispatch({
                type: GET_COURSE_QUESTIONS_SUCCESS,
                payload: res.data
            })
        } else {
            dispatch({
                type: GET_COURSE_QUESTIONS_FAIL
            })
        }
    } catch (err) {
        dispatch({
            type: GET_COURSE_QUESTIONS_FAIL
        })
    }
}


export const get_course_questions_page = (course_uuid, page) => async dispatch => {


    const config = {
        headers:{
            'Accept': 'application/json',
        }
    }

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/courses/questions/${course_uuid}/?p=${page}`, config)

        if (res.data.questions) {
            dispatch({
                type: GET_COURSE_QUESTIONS_SUCCESS,
                payload: res.data
            })
        } else {
            dispatch({
                type: GET_COURSE_QUESTIONS_FAIL
            })
        }
    } catch (err) {
        dispatch({
            type: GET_COURSE_QUESTIONS_FAIL
        })
    }
}


export const get_course_resources = (course_uuid) => async dispatch => {

    const config = {
        headers:{
            'Accept': 'application/json',
        }
    }

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/courses/resources/${course_uuid}`, config)

        if (res.data.resources) {
            dispatch({
                type: GET_RESOURCES_SUCCESS,
                payload: res.data
            })
        } else {
            dispatch({
                type: GET_RESOURCES_FAIL
            })
        }
    } catch (err) {
        dispatch({
            type: GET_RESOURCES_FAIL
        })
    }
}


export const get_user_courses = (user_id) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    }

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/courses/user/${user_id}`, config)

        if (res.status === 200) {
            dispatch({
                type: GET_USER_COURSES_SUCCESS,
                payload: res.data
            })
        } else {
            dispatch({
                type: GET_USER_COURSES_FAIL
            })
        }
    } catch (err) {
        dispatch({
            type: GET_USER_COURSES_FAIL
        })
    }
}

export const get_user_courses_library = () => async dispatch => {

    if(window.ethereum){

        const config = {
            headers: {
                'Accept': 'application/json',
            }
        };
    
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
    
        const formData = new FormData()
        formData.append('account', account)
    
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/courses/courses_library_id`, formData, config);
    
            if (res.status === 200 && !res.data.error) {
                dispatch({
                    type: GET_COURSES_LIBRARY_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: GET_COURSES_LIBRARY_FAIL
                });
            }
        } catch(err) {
            dispatch({
                type: GET_COURSES_LIBRARY_FAIL
            });
        }
    }else{
        dispatch({
            type: GET_COURSES_LIBRARY_FAIL
        });

    }
    
}

export const get_user_courses_library_paginated = () => async dispatch => {

    if(window.ethereum){

        const config = {
            headers: {
                'Accept': 'application/json',
            }
        };
    
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
    
        const formData = new FormData()
        formData.append('account', account)
    
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/courses/courses_library`, formData, config);
    
            if (res.status === 200 && !res.data.error) {
                dispatch({
                    type: GET_COURSES_LIBRARY_PAGINATED_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: GET_COURSES_LIBRARY_PAGINATED_FAIL
                });
            }
        } catch(err) {
            dispatch({
                type: GET_COURSES_LIBRARY_PAGINATED_FAIL
            });
        }
    }else{
        dispatch({
            type: GET_COURSES_LIBRARY_PAGINATED_FAIL
        });
        
    }
    
}

export const get_user_paid_courses_library = () => async dispatch => {

    if(window.ethereum){

        const config = {
            headers: {
                'Accept': 'application/json',
            }
        };
    
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
    
        const formData = new FormData()
        formData.append('account', account)
    
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/courses/courses_library_paid`, formData, config);
    
            if (res.status === 200 && !res.data.error) {
                dispatch({
                    type: GET_PAID_COURSES_LIBRARY_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: GET_PAID_COURSES_LIBRARY_FAIL
                });
            }
        } catch(err) {
            dispatch({
                type: GET_PAID_COURSES_LIBRARY_FAIL
            });
        }
    }else{
        dispatch({
            type: GET_PAID_COURSES_LIBRARY_FAIL
        });

    }
    
}

export const get_user_paid_courses_library_paginated_page = (page) => async dispatch => {
    if(window.ethereum){

        const config = {
            headers: {
                'Accept': 'application/json',
            }
        };
    
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
    
        const formData = new FormData()
        formData.append('account', account)
    
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/courses/courses_library_paid_paginated?p=${page}`, formData, config);
    
            if (res.status === 200 && !res.data.error) {
                dispatch({
                    type: GET_PAID_COURSES_LIBRARY_PAGINATED_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: GET_PAID_COURSES_LIBRARY_PAGINATED_FAIL
                });
            }
        } catch(err) {
            dispatch({
                type: GET_PAID_COURSES_LIBRARY_PAGINATED_FAIL
            });
        }
    }else{
        dispatch({
            type: GET_PAID_COURSES_LIBRARY_PAGINATED_FAIL
        });

    }
    
}

export const get_user_paid_courses_library_paginated = () => async dispatch => {

    if(window.ethereum){

        const config = {
            headers: {
                'Accept': 'application/json',
            }
        };
    
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
    
        const formData = new FormData()
        formData.append('account', account)
    
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/courses/courses_library_paid_paginated`, formData, config);
    
            if (res.status === 200 && !res.data.error) {
                dispatch({
                    type: GET_PAID_COURSES_LIBRARY_PAGINATED_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: GET_PAID_COURSES_LIBRARY_PAGINATED_FAIL
                });
            }
        } catch(err) {
            dispatch({
                type: GET_PAID_COURSES_LIBRARY_PAGINATED_FAIL
            });
        }
    }else{
        dispatch({
            type: GET_PAID_COURSES_LIBRARY_PAGINATED_FAIL
        });

    }
    
}


export const get_user_paid_courses_search_paginated = (search_term) => async dispatch => {
    
    if(window.ethereum){
        
        const config = {
            headers: {
                'Accept': 'application/json',
            }
        };
    
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
    
        const formData = new FormData()
        formData.append('account', account)
        formData.append('search_term', search_term)
    
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/courses/by/search/paid`, formData, config);
    
            if (res.status === 200 && !res.data.error) {
                dispatch({
                    type: GET_PAID_COURSES_LIBRARY_PAGINATED_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: GET_PAID_COURSES_LIBRARY_PAGINATED_FAIL
                });
            }
        } catch(err) {
            dispatch({
                type: GET_PAID_COURSES_LIBRARY_PAGINATED_FAIL
            });
        }
    }else{
        dispatch({
            type: GET_PAID_COURSES_LIBRARY_PAGINATED_FAIL
        });

    }
    
}

export const get_user_paid_courses_search_paginated_page = (search_term, page) => async dispatch => {

    if(window.ethereum){

        const config = {
            headers: {
                'Accept': 'application/json',
            }
        };
    
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
    
        const formData = new FormData()
        formData.append('account', account)
        formData.append('search_term', search_term)
    
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/courses/by/search/paid?p=${page}`, formData, config);
    
            if (res.status === 200 && !res.data.error) {
                dispatch({
                    type: GET_PAID_COURSES_LIBRARY_PAGINATED_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: GET_PAID_COURSES_LIBRARY_PAGINATED_FAIL
                });
            }
        } catch(err) {
            dispatch({
                type: GET_PAID_COURSES_LIBRARY_PAGINATED_FAIL
            });
        }
    }else{
        dispatch({
            type: GET_PAID_COURSES_LIBRARY_PAGINATED_FAIL
        });

    }
    
}

export const search_courses = (search_term) => async dispatch => {
    
    const config = {
        headers: {
            'Accept': 'application/json',
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/courses/search/${search_term}`, config);

        if (res.status === 200 && !res.data.error) {
            dispatch({
                type: FILTER_COURSES_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: FILTER_COURSES_FAIL
            });
        }
    } catch(err) {
        dispatch({
            type: FILTER_COURSES_FAIL
        });
    }
}