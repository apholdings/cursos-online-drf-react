/* This example requires Tailwind CSS v2.0+ */
const incentives = [
    {
      name: '12 - 24 Semanas',
      imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-shipping-simple.svg',
      description: "Es el tiempo necesario para convertirte en una leyenda de la programacion.",
    },
    {
      name: '10-años educando',
      imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-warranty-simple.svg',
      description: "Millones de vistas y cientos de miles de estudiantes satisfechos.",
    },
    {
      name: '250,000+ Estudiantes',
      imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-exchange-simple.svg',
      description:
        "He vendido muchos cursos en linea y ayudado a varias personas, tu seras la siguiente!",
    },
  ]
  
  export default function Incentives() {
    return (
      <div className="">
        <div className="max-w-7xl mx-auto sm:px-2 py-12 lg:px-4">
          <div className="max-w-2xl mx-auto px-4 lg:max-w-none">
            <div className="max-w-3xl">
              <h2 className="text-4xl font-gilroy-bold tracking-tight text-gray-600 dark:text-dark-txt">
                Aprendizaje de calidad
              </h2>
              <p className="mt-4 text-gray-500">
                Llevo mas de 10 años educando en linea, siempre a travez de mis propias plataformas o videos en youtube y otros sitios de cursos. Estoy seguro que puedo brindarte una enseñanza de calidad que te traera muchos resultados positivos en menos de 12 semanas!
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-y-10 gap-x-8 lg:grid-cols-3">
              {incentives.map((incentive) => (
                <div key={incentive.name} className="sm:flex lg:block">
                  <div className="sm:flex-shrink-0">
                    <img className="w-16 h-16" src={incentive.imageSrc} alt="" />
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0">
                    <h3 className="text-sm font-gilroy-medium text-gray-900 dark:text-white">{incentive.name}</h3>
                    <p className="mt-2 text-sm text-gray-500">{incentive.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  