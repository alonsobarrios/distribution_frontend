import { useEffect, useState } from 'react'
import FormOrder from '../components/FormOrder'
import C from '../config'

const NewOrder = () => {

    const [products, setProducts] = useState({})
    const [customers, setCustomers] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
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

        getProducts()
    }, [])
    
    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>Nuevo Pedido</h1>
            <p className='mt-3'>Llena los siguentes campos para registrar un pedido</p>
            
            <FormOrder
                products={products}
                customers={customers}
                loading={loading}
            />
        </>
    )
}

export default NewOrder