import { Outlet, Link, useLocation } from 'react-router-dom'

const Layout = () => {

    const location = useLocation();
    const urlActual = location.pathname;
    
    return (
        <div className="md:flex md:min-h-screen">
            <div className="md:w-1/4 bg-blue-900 px-5 py-10">
                <h2 className="text-4xl font-black text-center text-white">BOLETAS.COM</h2>

                <nav className='mt-10'>
                    <Link 
                    className={`${urlActual === '/tickets' ? 'text-blue-300' : 'text-white'} text-2xl block mt-2 hover:text-blue-300`}
                    to="/tickets">
                        Boletas
                    </Link>
                    <Link 
                    className={`${urlActual === '/shoppers' ? 'text-blue-300' : 'text-white'} text-2xl block mt-2 hover:text-blue-300`}
                    to="/shoppers">
                        Compradores
                    </Link>
                    <Link 
                    className={`${urlActual === '/bookings' ? 'text-blue-300' : 'text-white'} text-2xl block mt-2 hover:text-blue-300`}
                    to="/bookings">
                        Reservas
                    </Link>
                </nav>
            </div>
            <div className="md:w-3/4 p-10 md:h-screen overflow-scroll">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout