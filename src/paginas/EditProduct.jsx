import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormProduct from '../components/FormProduct';
import C from '../config'

const EditProduct = () => {

    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(true)

    const { id } = useParams()

    useEffect(() => {
        const getProduct = async () => {
            try {
                const url = `${C.DIS_API}/products/${id}`
                const response = await fetch(url)
                const result = await response.json()

                setProduct(result)
            } catch (error) {
                console.log(error)
            }
            setLoading(!loading)
        }

        getProduct()
    }, [])

    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>Editar Producto</h1>
            <p className='mt-3'>Modifica los siguentes campos para editar el producto</p>

            {product?.id ? (
                <FormProduct
                    product={product}
                    loading={loading}
                />
            ): <p>Producto no encontrado!</p>}
        </>
    )
}

export default EditProduct