import { SearchIcon } from "@heroicons/react/outline"
import FullWidthLayout from "hocs/layouts/FullWidthLayout"
import { connect } from "react-redux"

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import 'tippy.js/animations/scale.css';
import { Disclosure } from "@headlessui/react";
import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/solid";
import { useState } from "react";
import LoadingFullWidth from "components/loaders/LoadingFullWidth";
import LoadingCard from "components/loaders/LoadingCard";
import Header from "components/datasets/Header";



function Datasets({
    categories
}){

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [filtered, setFiltered] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        category_id: '0',
        price_range: 'Any',
        sortBy: 'created',
        order: 'desc'
    })

    const { 
        category_id,
        price_range,
        sortBy,
        order
    } = formData


    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value})

    const onSubmit = e => {
        e.preventDefault()
        // get_filtered_classrooms(category_id, price_range,sortBy , order)
        setFiltered(true)
    }

    return(
        <FullWidthLayout>
            <Header/>
            <div className="pt-8 pb-4">

                <form className=" md:flex items-center w-full transition duration-500 ease-in-out border dark:border-dark-main border-gray-300 dark:bg-dark hover:border-gray-700  rounded-full px-2 py-1 ">
                    <button className="w-1/12 text-xl inline-flex items-center justify-center rounded-full"
                    >
                        <SearchIcon className="h-5 w-5 text-gray-500 hover:text-gray-700" aria-hidden="true" />
                    </button>
                    <input 
                    autoComplete="off" 
                    required 
                    //   value={term} 
                    //   onChange={handleChange} 
                    type="text" 
                    name="search_box" 
                    placeholder="Busca un dataset" 
                    className="font-gilroy-regular text-md w-10/12 py-1 focus:ring-gray-100 dark:focus:ring-dark dark:placeholder:text-dark-txt focus:dark:border-dark focus:border-gray-100 hover:placeholder-gray-400 focus:placeholder-gray-400 focus:text-gray-600 placeholder:text-gray-400 text-gray-100 focus:outline-none focus:border-none border-none outline-none bg-transparent"
                    />
                    <Tippy
                        theme={'light'} 
                        interactive={true} 
                        placement='bottom'
                        offset={[-100,5]}
                        trigger='click'
                        className=""
                        arrow=""
                        content={
                            <div>
                                    <form className="hidden  lg:block  p-2 rounded-lg">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 items-start">
                                        <Disclosure as="div" className="py-6">
                                        {({ open }) => (
                                            <>
                                                <h3 className="-my-3 flow-root">
                                                <Disclosure.Button className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third">
                                                    <span className="font-gilroy-medium dark:text-dark-txt text-gray-900 font-regular">Categorias</span>
                                                    <span className="ml-6 flex items-center">
                                                    {open ? (
                                                        <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                                                    ) : (
                                                        <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                                                    )}
                                                    </span>
                                                </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel className="pt-6">
                                                <div className="space-y-4">
                                                
                                                <Disclosure as="div" className=" dark:border-dark-third border-gray-200 py-6">
                                                {({ open }) => (
                                                <ul className="text-sm dark:text-dark-txt text-gray-900 space-y-4 pb-6 ">
                                                    
                                                    
                                                    {
                                                        categories &&
                                                        categories !== null &&
                                                        categories !== undefined ?
                                                        categories.map(category => {
                                                        if (category.sub_categories.length === 0) {
                                                            return (
                                                            <Disclosure.Button key={category.id} className='flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third'>
                                                                <input
                                                                onChange={e => onChange(e)}
                                                                value={category.id.toString()}
                                                                name='category_id'
                                                                type='radio'
                                                                className='focus:ring-blue-500 h-4 w-4 text-blue-600 dark:border-dark-third border-gray-300 rounded-full'
                                                                />
                                                                <label className="ml-3 text-sm dark:text-dark-txt text-gray-600 font-regular">
                                                                {category.name}
                                                                </label>
                                                                <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <MinusSmIcon className="dark:text-dark-txt text-gray-400 h-5 w-5" aria-hidden="true" />
                                                            ) : (
                                                                <PlusSmIcon className="dark:text-dark-txt text-gray-400 h-5 w-5" aria-hidden="true" />
                                                            )}
                                                            </span>
                                                            </Disclosure.Button>
                                                            
                                                            )
                                                        } else {
                                                            let result = []

                                                            result.push(
                                                            <Disclosure.Button key={category.id} className='flex items-center h-5'>
                                                                <input
                                                                onChange={e => onChange(e)}
                                                                value={category.id.toString()}
                                                                name='category_id'
                                                                type='radio'
                                                                className='focus:ring-blue-500 h-4 w-4 text-blue-600 dark:border-dark-third border-gray-300 rounded-full'
                                                                />
                                                                <label className="ml-3 text-sm dark:text-dark-txt text-gray-600 font-gilroy-medium">
                                                                {category.name}
                                                                </label>
                                                                <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <MinusSmIcon className="dark:text-dark-txt text-gray-400 h-5 w-5" aria-hidden="true" />
                                                            ) : (
                                                                <PlusSmIcon className="dark:text-dark-txt text-gray-400 h-5 w-5" aria-hidden="true" />
                                                            )}
                                                            </span>
                                                            </Disclosure.Button>
                                                            )

                                                            // eslint-disable-next-line
                                                            category.sub_categories.map(sub_category => {
                                                            result.push(
                                                                <Disclosure.Panel key={sub_category.id} className='flex items-center h-5 ml-2'>
                                                                <input
                                                                onChange={e => onChange(e)}
                                                                value={sub_category.id.toString()}
                                                                name='category_id'
                                                                type='radio'
                                                                className='focus:ring-blue-500 h-4 w-4 text-blue-600 dark:border-dark-third border-gray-300 rounded-full'
                                                                />
                                                                <label className="ml-3 text-sm dark:text-dark-txt text-gray-600 font-regular">
                                                                {sub_category.name}
                                                                </label>
                                                            </Disclosure.Panel>
                                                            )
                                                            })

                                                            return result
                                                        }
                                                        }):
                                                        <LoadingCard/>
                                                    }
                                                </ul>
                                                )}
                                                </Disclosure>

                                                </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                        </Disclosure>

                                        {/* Filtros adicionales Filter */}
                                        <Disclosure as="div" className=" py-6">
                                        {({ open }) => (
                                            <>
                                            <h3 className="-my-3 flow-root">
                                                <Disclosure.Button className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third">
                                                <span className="font-gilroy-medium dark:text-dark-txt text-gray-900 font-regular">Filtros Extra</span>
                                                <span className="ml-6 flex items-center">
                                                    {open ? (
                                                    <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                                                    ) : (
                                                    <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                                                    )}
                                                </span>
                                                </Disclosure.Button>
                                            </h3>
                                            <Disclosure.Panel className="pt-6">
                                                <div className="space-y-4">
                                                    <div className='form-group'>
                                                        <label htmlFor='sortBy' className='mr-3 min-w-0 flex-1 dark:text-dark-txt text-gray-500 font-light'
                                                        >Ver por</label>
                                                        <select
                                                            className='inline-flex justify-center w-full rounded-md border dark:border-dark-third border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-gilroy-medium dark:text-dark-txt text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500'
                                                            id='sortBy'
                                                            name='sortBy'
                                                            onChange={e => onChange(e)}
                                                            value={sortBy}
                                                        >
                                                            <option value='created' className='font-inter-light'>Fecha</option>
                                                            {/* <option value='price'>Price</option> */}
                                                            {/* <option value='sold'>Sold</option> */}
                                                            <option value='title' className='font-regular'>Nombre</option>
                                                        </select>
                                                    </div>
                                                    <div className='form-group'>
                                                        <label htmlFor='order' className='mr-3 min-w-0 flex-1 dark:text-dark-txt text-gray-500'
                                                        >Orden</label>
                                                        <select
                                                            className='inline-flex justify-center w-full rounded-md border dark:border-dark-third border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-gilroy-medium dark:text-dark-txt text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500'
                                                            id='order'
                                                            name='order'
                                                            onChange={e => onChange(e)}
                                                            value={order}
                                                        >
                                                        <option value='asc' className="font-regular">A - Z</option>
                                                        <option value='desc' className="font-regular">Z - A</option>
                                                            
                                                        </select>
                                                    </div>
                                                </div>
                                            </Disclosure.Panel>
                                            </>
                                        )}
                                        </Disclosure>

                                        {
                                        loading ?
                                        <button
                                            className="justify-center font-gilroy-medium inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs  text-white bg-dark hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                        >
                                            loading...
                                        </button>:
                                        <button
                                        type="submit"
                                        className=" justify-center inline-flex items-center rounded-full px-2.5 py-1.5 border border-transparent text-xs font-gilroy-medium text-white bg-dark hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                        >
                                        Buscar
                                        </button>
                                        }
                                </div>
                                    </form>
                            </div>
                        }
                    >
                        <div className="cursor-pointer w-1/12 font-gilroy-medium text-sm inline-flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-dark-third p-2">
                            <span className="cursor-pointer bx bx-filter text-2xl mr-1.5 text-gray-500 hover:text-gray-800" aria-hidden="true" />
                            <span className="hidden md:flex font-gilroy-bold dark:text-dark-txt">Filtros</span>
                        </div>
                    </Tippy>
                    
                </form>
            </div>

            <div className="grid md:grid-cols-8 grid-cols-4">
                <button
                    type="button"
                    className="inline-flex justify-center items-center mx-0.5 px-5 py-2 dark:text-dark-txt border-gray-300 hover:border-gray-700 border text-base font-gilroy-medium rounded-full shadow-sm text-black  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                >
                    Categoria
                </button>
            </div>

            <div className="">

            </div>
        </FullWidthLayout>
    )
}

const mapStateToProps = state => ({
    categories: state.categories.categories
})

export default connect(mapStateToProps,{

})(Datasets)