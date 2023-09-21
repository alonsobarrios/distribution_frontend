import { Outlet, Link, useLocation } from 'react-router-dom'

const Layout = () => {

    const location = useLocation();
    const urlActual = location.pathname;
    
    return (
        <div className="md:flex md:min-h-screen">
            <div className="md:w-1/5 bg-blue-900 px-5 py-10">
                <h2 className="text-4xl font-black text-center text-white">DISTRIBUCIÓN</h2>

                <nav className='mt-10'>
                    <Link 
                    className={`${urlActual === '/products' ? 'text-blue-300' : 'text-white'} text-2xl block mt-2 hover:text-blue-300`}
                    to="/products">
                        + Productos
                    </Link>
                    <Link 
                    className={`${urlActual === '/customers' ? 'text-blue-300' : 'text-white'} text-2xl block mt-4 hover:text-blue-300`}
                    to="/customers">
                        + Clientes
                    </Link>
                    <Link 
                    className={`${urlActual === '/orders' ? 'text-blue-300' : 'text-white'} text-2xl block mt-4 hover:text-blue-300`}
                    to="/orders">
                        + Pedidos
                    </Link>
                </nav>
            </div>
            <div className="md:w-4/5 p-10 md:h-screen overflow-scroll">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout