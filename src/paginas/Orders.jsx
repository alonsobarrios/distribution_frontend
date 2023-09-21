import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Order from '../components/Order'
import C from '../config'

const Orders = () => {

    const navigate = useNavigate()
    const [orders, setOrders] = useState([])

    const getOrdersAPI = async () => {
        try {
            const url = `${C.DIS_API}/orders`
            const response = await fetch(url)
            const result = await response.json()

            setOrders(result)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getOrdersAPI()
    }, [])

    const handleCancelOrder = async id => {
        const confirmation = confirm("¿Desea cancelar el pedido?")

        if (confirmation) {
            try {
                const url = `${C.DIS_API}/orders/${id}`
                const response = await fetch(url, {
                    method: 'PATCH',
                    body: JSON.stringify({status: "CANCELED"}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                await response.json()
                getOrdersAPI()
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleDeleteOrder = async id => {
        const confirmation = confirm("¿Desea eliminar el pedido?")

        if (confirmation) {
            try {
                const url = `${C.DIS_API}/orders/${id}`
                const response = await fetch(url, {
                    method: 'DELETE'
                })
                await response.json()

                const arrayOrders = orders.filter( order => order.id !== id)
                setOrders(arrayOrders)
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>
                Pedidos
                <button
                    type='button'
                    className='bg-green-600 hover:bg-green-700 text-white p-2 uppercase font-bold text-xs ml-5 rounded'
                    onClick={() => navigate(`/orders/new`)}
                > Nuevo pedido </button>
            </h1>
            <p className='mt-3'>Gestión de pedidos</p>
            
            <table className="w-full mt-5 table-auto shadow bg-white">
                <thead className='bg-blue-800 text-white'>
                    <tr>
                        <th className='p-2'>Cliente</th>
                        <th className='p-2'>Producto</th>
                        <th className='p-2'>Cantidad</th>
                        <th className='p-2'>Fecha pedido</th>
                        <th className='p-2'>Fecha entrega</th>
                        <th className='p-2'>Dirección</th>
                        <th className='p-2'>Código postal</th>
                        <th className='p-2'>Estado</th>
                        <th className='p-2'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <Order
                            key={order.id}
                            order={order}
                            handleCancelOrder={handleCancelOrder}
                            handleDeleteOrder={handleDeleteOrder}
                        />
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Orders