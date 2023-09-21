import React from 'react'
import { Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta';
import Spinner from './Spinner';
import C from '../config'

const FormOrder = ({order, loading, products, customers}) => {

    const navigate = useNavigate();

    const status_options = {
        "RECEIVED":"Recibido", "SENT":"Enviado", "DELIVERED":"Entregado", "CANCELED":"Cancelado"
    };

    const NewOrderSchema = Yup.object().shape({
        customerId: Yup.string().required('Cliente es requerido'),
        productId: Yup.string().required('Producto es requerido'),
        quantity: Yup.number()
                    .positive('Cantidad no válida')
                    .integer('Cantidad no válida')
                    .typeError('Cantidad no válida')
                    .required('Cantidad es requerida'),
        resquestDate: Yup.date().required('Fecha pedido es requerida'),
        address: Yup.string().required('Dirección es requerida'),
        postalCode: Yup.number().typeError('Código postal no válido').typeError('Código postal debe ser númerico')
    });

    const handleSubmit = async (values) => {
        try {
            let response;

            if (order.id) {
                const url = `${C.DIS_API}/orders/${order.id}`
                response = await fetch(url, {
                    method: 'PATCH',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            } else {
                const url = `${C.DIS_API}/orders`
                response = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }
            
            await response.json()
            navigate('/orders')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        loading ? <Spinner /> : (
            <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
                <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>
                    {order?.id ? 'Editar Pedido' : 'Agregar Pedido'}
                </h1>

                <Formik
                    initialValues={{
                        customerId: order?.customerId ?? '',
                        productId: order?.productId ?? '',
                        quantity: order?.quantity ?? '',
                        resquestDate: order?.resquestDate ? new Date(order?.resquestDate).toISOString().slice(0, 10) : '',
                        deliveryDate: order?.deliveryDate ? new Date(order?.deliveryDate).toISOString().slice(0, 10) : '',
                        address: order?.address ?? '',
                        postalCode: order?.postalCode ?? '',
                        status: order?.status ?? ''
                    }}
                    enableReinitialize={true}
                    onSubmit={ async (values, {resetForm}) => {
                        await handleSubmit(values);
                        resetForm();
                    }}
                    validationSchema={NewOrderSchema}
                >
                    {({errors, touched}) => {
                        
                        return (
                        <Form
                            className='mt-10'
                        >
                            <div className='mb-4'>
                                <label 
                                    className='text-gray-800'
                                    htmlFor="customerId"
                                >Cliente:</label>
                                <Field 
                                    as="select"
                                    id="customerId"
                                    name="customerId"
                                    className="mt-2 block w-full p-3 bg-gray-50">
                                    <option value="">Seleccionar cliente</option>
                                    {customers.map(customer => <option value={customer.id} key={customer.id}>{customer.identification} - {customer.name}</option>)}
                                </Field>
                                {errors.customerId && touched.customerId ? (
                                    <Alerta>{errors.customerId}</Alerta>
                                ) : null}
                            </div>
                            <div className='mb-4'>
                                <label 
                                    className='text-gray-800'
                                    htmlFor="productId"
                                >Producto:</label>
                                 <Field 
                                    as="select"
                                    id="productId"
                                    name="productId"
                                    className="mt-2 block w-full p-3 bg-gray-50">
                                    <option value="">Seleccionar producto</option>
                                    {products.map(product => <option value={product.id} key={product.id}>{product.name}</option>)}
                                </Field>
                                {errors.productId && touched.productId ? (
                                    <Alerta>{errors.productId}</Alerta>
                                ) : null}
                            </div>
                            <div className='mb-4'>
                                <label 
                                    className='text-gray-800'
                                    htmlFor="quantity"
                                >Cantidad:</label>
                                <Field 
                                    id="quantity"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50"
                                    placeholder="Cantidad de productos"
                                    name="quantity"
                                />
                                {errors.quantity && touched.quantity ? (
                                    <Alerta>{errors.quantity}</Alerta>
                                ) : null}
                            </div>
                            <div className='mb-4'>
                                <label 
                                    className='text-gray-800'
                                    htmlFor="resquestDate"
                                >Fecha pedido:</label>
                                <Field 
                                    id="resquestDate"
                                    type="date"
                                    className="mt-2 block w-full p-3 bg-gray-50"
                                    placeholder="Nombre del Cliente"
                                    name="resquestDate"
                                />
                                {errors.resquestDate && touched.resquestDate ? (
                                    <Alerta>{errors.resquestDate}</Alerta>
                                ) : null}
                            </div>
                            <div className='mb-4'>
                                <label 
                                    className='text-gray-800'
                                    htmlFor="deliveryDate"
                                >Fecha entrega:</label>
                                <Field 
                                    id="deliveryDate"
                                    type="date"
                                    className="mt-2 block w-full p-3 bg-gray-50"
                                    placeholder="Nombre del Cliente"
                                    name="deliveryDate"
                                />
                                {errors.deliveryDate && touched.deliveryDate ? (
                                    <Alerta>{errors.deliveryDate}</Alerta>
                                ) : null}
                            </div>
                            <div className='mb-4'>
                                <label 
                                    className='text-gray-800'
                                    htmlFor="address"
                                >Dirección de entrega:</label>
                                <Field 
                                    id="address"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50"
                                    placeholder="Nombre del Cliente"
                                    name="address"
                                />
                                {errors.address && touched.address ? (
                                    <Alerta>{errors.address}</Alerta>
                                ) : null}
                            </div>
                            <div className='mb-4'>
                                <label 
                                    className='text-gray-800'
                                    htmlFor="postalCode"
                                >Código postal:</label>
                                <Field 
                                    id="postalCode"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50"
                                    placeholder="Nombre del Cliente"
                                    name="postalCode"
                                />
                                {errors.postalCode && touched.postalCode ? (
                                    <Alerta>{errors.postalCode}</Alerta>
                                ) : null}
                            </div>
                            
                            {order.id ? 
                                <div className='mb-4'>
                                    <label 
                                        className='text-gray-800'
                                        htmlFor="status"
                                    >Estado:</label>
                                    <Field 
                                        as="select"
                                        id="status"
                                        name="status"
                                        className="mt-2 block w-full p-3 bg-gray-50">
                                        <option value="">Estado</option>
                                        <option value="RECEIVED">Recibido</option>
                                        <option value="SENT">Enviado</option>
                                        <option value="DELIVERED">Entregado</option>
                                        <option value="CANCELED">Cancelado</option>
                                    </Field>
                                    {errors.status && touched.status ? (
                                        <Alerta>{errors.status}</Alerta>
                                    ) : null}
                                </div>
                            : null}

                            <input 
                                type="submit"
                                value={order?.id ? 'Editar Pedido' : 'Registrar Pedido'}
                                className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg rounded'
                            />
                        </Form>
                    )}}
                </Formik>
            </div>
        )
    )
}

FormOrder.defaultProps = {
    order: {},
    loading: true
}

export default FormOrder