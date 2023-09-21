import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import C from '../config'
import FormOrder from '../components/FormOrder';

const EditOrder = () => {

    const [order, setOrder] = useState({})
    const [products, setProducts] = useState({})
    const [customers, setCustomers] = useState({})
    const [loading, setLoading] = useState(true)

    const { id } = useParams()

    useEffect(() => {
        const getOrder = async () => {
            try {
                const url = `${C.DIS_API}/orders/${id}`
                const response = await fetch(url)
                const result = await response.json()

                setOrder(result)
            } catch (error) {
                console.log(error)
            }
            getProducts()
        }

        const getProducts = async () => {
            try {
                const url = `${C.DIS_API}/products`
                const response = await fetch(url)
                const result = await response.json()

                setProducts(result)
            } catch (error) {
                console.log(error)
            }
            getCustomers()
        }

        const getCustomers = async () => {
            try {
                const url = `${C.DIS_API}/customers`
                const response = await fetch(url)
                const result = await response.json()

                setCustomers(result)
            } catch (error) {
                console.log(error)
            }
            setLoading(!loading)
        }

        
        getOrder()
    }, [])

    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>Editar Pedido</h1>
            <p className='mt-3'>Modifica los siguentes campos para editar el pedido</p>

            {order?.id ? (
                <FormOrder
                    order={order}
                    products={products}
                    customers={customers}
                    loading={loading}
                />
            ): <p>Pedido no encontrado!</p>}
        </>
    )
}

export default EditOrder