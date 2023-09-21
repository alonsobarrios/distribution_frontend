import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Product from '../components/Product'
import C from '../config';

const Products = () => {

    const navigate = useNavigate()
    const [products, setProducts] = useState([])

    const getProductsAPI = async () => {
        try {
            const url = `${C.DIS_API}/products`;
            const response = await fetch(url)
            const result = await response.json()

            setProducts(result)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProductsAPI()
    }, [])

    const handleDeleteProduct = async id => {
        const confirmation = confirm("¿Desea eliminar este producto?")

        if (confirmation) {
            try {
                const url = `${C.DIS_API}/products/${id}`
                const response = await fetch(url, {
                    method: 'DELETE'
                })
                await response.json()

                const arrayProducts = products.filter( product => product.id !== id)
                setProducts(arrayProducts)
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>
                Productos
                <button
                    type='button'
                    className='bg-green-600 hover:bg-green-700 text-white p-2 uppercase font-bold text-xs ml-5 rounded'
                    onClick={() => navigate(`/products/new`)}
                > Registrar producto </button>
            </h1>
            <p className='mt-3'>Administra tus productos</p>
            
            <table className="w-full mt-5 table-auto shadow bg-white">
                <thead className='bg-blue-800 text-white'>
                    <tr>
                        <th className='p-2'>Nombre</th>
                        <th className='p-2'>Descripción</th>
                        <th className='p-2'>Cantidad</th>
                        <th className='p-2'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <Product
                            key={product.id}
                            product={product}
                            handleDeleteProduct={handleDeleteProduct}
                        />
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Products