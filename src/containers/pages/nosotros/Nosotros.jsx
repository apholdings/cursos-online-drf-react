import FullWidthLayout from "hocs/layouts/FullWidthLayout"
import { connect } from "react-redux"
import { Fragment, useEffect } from 'react'
import { Tab } from '@headlessui/react'
import { Link } from "react-router-dom"

const tabs = [
  {
    name: 'Uridium Network',
    features: [
      {
        name: 'Network de Uridium hecho por SoloPython',
        description:
          'Uridium is an Ethereum ERC-20 Token developed to make ecommerce with cryptocurrency and blockchain game development more accesible and anonymous.',
        imageSrc: 'https://bafybeidyq5rp55763ts7oel2lsqbsnb55hsoxt5djbs6drm5p4jl4dhj7e.ipfs.dweb.link/uridiumNetwork.PNG',
        imageAlt: '',
        url: 'https://uridium.network',
        tech_stack: [
            {
                name:  'Django Rest Framework',
                imageSrc: 'https://bafybeidozsktzxp6jnzwgs5fg6b5yvx7spszpzuyvu4ixb7lvau7yg4rdq.ipfs.dweb.link/django-logo-png-transparent.png',
            },
            {
                name:  'React',
                imageSrc: 'https://bafybeibsmc2uj65wwifcy6utxn64uohu7jt6sk5wqg7d5zemsl6gvk4264.ipfs.dweb.link/react-logo.png',
            },
            {
                name:  'PostgreSQL',
                imageSrc: 'https://bafybeibsmc2uj65wwifcy6utxn64uohu7jt6sk5wqg7d5zemsl6gvk4264.ipfs.dweb.link/react-logo.png',
            },
            {
                name:  'Render.com',
                imageSrc: 'https://bafybeibsmc2uj65wwifcy6utxn64uohu7jt6sk5wqg7d5zemsl6gvk4264.ipfs.dweb.link/react-logo.png',
            },
        ]
      },
    ],
  },
  {
    name: 'Uridium Finance',
    features: [
      {
        name: 'Empresa Blockchain Fintech',
        description:
          'Uridium Finance is an app developed to provide decentralized financial instruments to you via the Ethereum blockchain and the Uridium cryptocurrency.',
        imageSrc: 'https://bafybeigt44nnjkqdpf65quoyah6zbhuopf5fzdwqutzo5gsxtgraxho7l4.ipfs.dweb.link/uridiumFinance.PNG',
        imageAlt:
          '',
        url: 'https://uridium.finance',
        tech_stack: [
            {
                name:  'Django Rest Framework',
                imageSrc: 'https://bafybeidozsktzxp6jnzwgs5fg6b5yvx7spszpzuyvu4ixb7lvau7yg4rdq.ipfs.dweb.link/django-logo-png-transparent.png',
            },
            {
                name:  'React',
                imageSrc: 'https://bafybeibsmc2uj65wwifcy6utxn64uohu7jt6sk5wqg7d5zemsl6gvk4264.ipfs.dweb.link/react-logo.png',
            },
            {
                name:  'Ethereum',
                imageSrc: 'https://bafybeibsmc2uj65wwifcy6utxn64uohu7jt6sk5wqg7d5zemsl6gvk4264.ipfs.dweb.link/react-logo.png',
            },
            {
                name:  'PostgreSQL',
                imageSrc: 'https://bafybeibsmc2uj65wwifcy6utxn64uohu7jt6sk5wqg7d5zemsl6gvk4264.ipfs.dweb.link/react-logo.png',
            },
            {
                name:  'Render.com',
                imageSrc: 'https://bafybeibsmc2uj65wwifcy6utxn64uohu7jt6sk5wqg7d5zemsl6gvk4264.ipfs.dweb.link/react-logo.png',
            },
        ]
      },
    ],
  },
  {
    name: 'Uridium Marketplace',
    features: [
      {
        name: 'Mercado de Productos y Cursos en Linea',
        description:
          "Thanks to decentralized finance, it's possible to launch a business with a product and start making money the first day. This is not without its problems, however, we believe that this are easily dismissed when the bigger picture helps the majority of users.",
        imageSrc: 'https://bafybeif3lqxefojyq2quzu6t4d7bix2klzez753d56nphjr36vyacmivcm.ipfs.dweb.link/uriidiumMarketplace.PNG',
        imageAlt: '',
        url: 'https://uridium.io',
        tech_stack: [
            {
                name:  'Django Rest Framework',
                imageSrc: 'https://bafybeidozsktzxp6jnzwgs5fg6b5yvx7spszpzuyvu4ixb7lvau7yg4rdq.ipfs.dweb.link/django-logo-png-transparent.png',
            },
            {
                name:  'React',
                imageSrc: 'https://bafybeibsmc2uj65wwifcy6utxn64uohu7jt6sk5wqg7d5zemsl6gvk4264.ipfs.dweb.link/react-logo.png',
            },
            {
                name:  'Ethereum',
                imageSrc: 'https://bafybeibsmc2uj65wwifcy6utxn64uohu7jt6sk5wqg7d5zemsl6gvk4264.ipfs.dweb.link/react-logo.png',
            },
            {
                name:  'PostgreSQL',
                imageSrc: 'https://bafybeibsmc2uj65wwifcy6utxn64uohu7jt6sk5wqg7d5zemsl6gvk4264.ipfs.dweb.link/react-logo.png',
            },
            {
                name:  'Render.com',
                imageSrc: 'https://bafybeibsmc2uj65wwifcy6utxn64uohu7jt6sk5wqg7d5zemsl6gvk4264.ipfs.dweb.link/react-logo.png',
            },
        ]
      },
    ],
  },
]



const people = [
    {
      name: 'Eric Alexander',
      role: 'Founder / CEO',
      imageUrl:
        'https://bafybeigvqdpt6a3kka5tuxpsb7siddysuz23oovswknhciaga2ha5qqy3q.ipfs.dweb.link/eric-profile.png',
      bio: 'Me llamo Eric Alexander, soy programador con mas de 12 años de experiencia. Vengo programando desde que estoy en el colegio, me gusta crear video juegos y aplicaciones web con Django Rest Framework, React y Ethereum.',
      twitterUrl: 'https://twitter.com/bigacm',
      linkedinUrl: 'https://www.linkedin.com/in/eric-alexander-2820211b9/',
      youtubeUrl: 'https://youtube.com/solopython',
    },
    // More people...
  ]


function classNames(...classes) {
return classes.filter(Boolean).join(' ')
}

function Nosotros(){

    useEffect(()=>{
        window.scrollTo(0,0)
    },[])

    return(
        <FullWidthLayout>
            <div className="mx-auto pt-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:pt-24">
                <div className="space-y-12 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
                <div className="space-y-5 sm:space-y-4">
                    <h2 className="text-3xl font-gilroy-black tracking-tight sm:text-4xl dark:text-white">Sobre Nosotros</h2>
                    <p className="text-xl text-gray-500">
                    SoloPython es una empresa de programacion dedicada al area de Educacion y Servicios. Nuestros cursos han ayudado a mas de 4.5 Millones de personas en todo el mundo.
                    </p>
                </div>
                <div className="lg:col-span-2">
                    <ul
                    role="list"
                    className="space-y-12 sm:divide-y sm:divide-gray-200 sm:space-y-0 sm:-mt-8 lg:gap-x-8 lg:space-y-0"
                    >
                    {people.map((person) => (
                        <li key={person.name} className="sm:py-8">
                        <div className="space-y-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-6 sm:space-y-0">
                            <div className="aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4">
                            <img className="object-cover shadow-lg rounded-lg" src={person.imageUrl} alt="" />
                            </div>
                            <div className="sm:col-span-2">
                            <div className="space-y-4">
                                <div className="text-lg leading-6 font-gilroy-medium space-y-1">
                                <h3 className="dark:text-dark-txt">{person.name}</h3>
                                <p className="text-blue-600">{person.role}</p>
                                </div>
                                <div className="text-lg">
                                <p className="text-gray-500">{person.bio}</p>
                                </div>
                                <ul role="list" className="flex space-x-5">
                                <li>
                                    <a href={person.twitterUrl} className="text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">Twitter</span>
                                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                                    </svg>
                                    </a>
                                </li>
                                <li>
                                    <a href={person.linkedinUrl} className="text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">LinkedIn</span>
                                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                        fillRule="evenodd"
                                        d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                                        clipRule="evenodd"
                                        />
                                    </svg>
                                    </a>
                                </li>
                                </ul>
                            </div>
                            </div>
                        </div>
                        </li>
                    ))}
                    </ul>
                </div>
                </div>
            </div>

            <section aria-labelledby="features-heading" className="max-w-7xl mx-auto py-16 sm:px-2 lg:px-8">
                <div className="max-w-2xl mx-auto px-4 lg:px-0 lg:max-w-none">
                <div className="max-w-3xl">
                    <h2 id="features-heading" className="text-3xl font-gilroy-black tracking-tight text-gray-900 sm:text-4xl">
                    Portafolio
                    </h2>
                    <p className="mt-4 text-gray-500 font-gilroy-medium">
                    Nuestro portafolio de proyectos creados y desplegados al internet.
                    </p>
                </div>

                <Tab.Group as="div" className="">
                    <div className="-mx-4 flex overflow-x-auto sm:mx-0">
                    <div className="flex-auto px-4 border-b border-gray-200 sm:px-0">
                        <Tab.List className="-mb-px flex space-x-10">
                        {tabs.map((tab) => (
                            <Tab
                            key={tab.name}
                            className={({ selected }) =>
                                classNames(
                                selected
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                'whitespace-nowrap py-6 border-b-2 font-gilroy-medium text-sm'
                                )
                            }
                            >
                            {tab.name}
                            </Tab>
                        ))}
                        </Tab.List>
                    </div>
                    </div>

                    <Tab.Panels as={Fragment}>
                    {tabs.map((tab) => (
                        <Tab.Panel key={tab.name} className="space-y-16 pt-10 lg:pt-16">
                        {tab.features.map((feature) => (
                            <div key={feature.name} className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:gap-x-8">
                            <div className="mt-6 lg:mt-0 lg:col-span-5">
                                <h3 className="text-lg font-gilroy-medium text-gray-900">{feature.name}</h3>
                                <p className="mt-2 text-sm text-gray-500">{feature.description}</p>
                                <a
                                    href={feature.url} target="_blank"
                                    className="mt-4 inline-flex justify-center items-center px-5 py-2 dark:text-dark-txt border-gray-300 hover:border-gray-700 border text-base font-gilroy-medium rounded-full shadow-sm text-black  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                                >
                                    Ver Sitio
                                </a>
                                <ul role="list" className="mt-6 prose prose-blue prose-lg text-gray-500 mx-auto">
                                    <span className="text-gray-700 font-gilroy-semibold">Tech Stack</span>
                                    {feature && feature.tech_stack && feature.tech_stack.map(stack=>(
                                        <><li>• {stack.name}</li></>
                                    ))}
                                </ul>
                            </div>
                            <div className="lg:col-span-7">
                                <div className="aspect-w-2 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden sm:aspect-w-5 sm:aspect-h-2">
                                <img src={feature.imageSrc} alt={feature.imageAlt} className="object-center object-cover" />
                                </div>
                            </div>
                            </div>
                        ))}
                        </Tab.Panel>
                    ))}
                    </Tab.Panels>
                </Tab.Group>
                </div>
            </section>

            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
                <div>
                    <h2 className="text-3xl font-gilroy-black text-gray-900 sm:text-4xl">
                    Servicios de Software
                    </h2>
                    <p className="mt-3 max-w-3xl text-lg text-gray-500 font-gilroy-regular">
                    Ofrecemos servicios de creacion de paginas web y plataformas de ecommerce.
                    </p>
                    <div className="mt-8 sm:flex">
                    <div className="">
                        <Link
                        to="/servicios"
                        className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700"
                        >
                        Servicios
                        </Link>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                        <Link
                        to="/contacto"
                        className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-full text-blue-700 bg-blue-100 hover:bg-blue-200"
                        >
                        Contactanos
                        </Link>
                    </div>
                    </div>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-0 lg:grid-cols-2">
                    <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                    <img
                        className="max-h-12"
                        src="https://tailwindui.com/img/logos/transistor-logo-gray-400.svg"
                        alt="Workcation"
                    />
                    </div>
                    <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                    <img className="max-h-12" src="https://tailwindui.com/img/logos/mirage-logo-gray-400.svg" alt="Mirage" />
                    </div>
                    <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                    <img className="max-h-12" src="https://tailwindui.com/img/logos/tuple-logo-gray-400.svg" alt="Tuple" />
                    </div>
                    <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                    <img
                        className="max-h-12"
                        src="https://tailwindui.com/img/logos/laravel-logo-gray-400.svg"
                        alt="Laravel"
                    />
                    </div>
                    <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                    <img
                        className="max-h-12"
                        src="https://tailwindui.com/img/logos/statickit-logo-gray-400.svg"
                        alt="StaticKit"
                    />
                    </div>
                    <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                    <img
                        className="max-h-12"
                        src="https://tailwindui.com/img/logos/statamic-logo-gray-400.svg"
                        alt="Statamic"
                    />
                    </div>
                </div>
                </div>
            </div>
        </FullWidthLayout>
    )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps,{

})(Nosotros)