import React from 'react'
import { Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta';
import Spinner from './Spinner';
import C from '../config'

const FormCustomer = ({customer, loading}) => {

    const navigate = useNavigate();

    const NewCustomerSchema = Yup.object().shape({
        identification: Yup.number()
                        .positive('Número no válido')
                        .integer('Número no válido')
                        .typeError('Número no válido')
                        .required('Documento es requerido'),
        name: Yup.string()
                    .min(3, 'Nombre es muy corto')
                    .max(100, 'Nombre es muy largo')
                    .required('Nombre es requerido'),
        address: Yup.string()
                    .required('Nombre es requerido'),
        phone: Yup.number()
                    .positive('Número no válido')
                    .integer('Número no válido')
                    .typeError('Número no válido')
                    .required('Celular es requerido'),
        email: Yup.string()
                    .email('Correo no válido')
                    .required('Correo es requerido')
    });

    const handleSubmit = async (values) => {
        try {
            let response;

            if (customer.id) {
                const url = `${C.DIS_API}/customers/${customer.id}`
                response = await fetch(url, {
                    method: 'PATCH',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            } else {
                const url = `${C.DIS_API}/customers`
                response = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }
            
            await response.json()
            navigate('/customers')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        loading ? <Spinner /> : (
            <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
                <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>
                    {customer?.id ? 'Editar Cliente' : 'Agregar Cliente'}
                </h1>

                <Formik
                    initialValues={{
                        identification: customer?.identification ?? '',
                        name: customer?.name ?? '',
                        address: customer?.address ?? '',
                        phone: customer?.phone ?? '',
                        email: customer?.email ?? ''
                    }}
                    enableReinitialize={true}
                    onSubmit={ async (values, {resetForm}) => {
                        await handleSubmit(values);
                        resetForm();
                    }}
                    validationSchema={NewCustomerSchema}
                >
                    {({errors, touched}) => {
                        
                        return (
                        <Form
                            className='mt-10'
                        >
                            <div className='mb-4'>
                                <label 
                                    className='text-gray-800'
                                    htmlFor="identification"
                                >Documento:</label>
                                <Field 
                                    id="identification"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50"
                                    placeholder="Documento del Cliente"
                                    name="identification"
                                />
                                {errors.identification && touched.identification ? (
                                    <Alerta>{errors.identification}</Alerta>
                                ) : null}
                            </div>
                            <div className='mb-4'>
                                <label 
                                    className='text-gray-800'
                                    htmlFor="name"
                                >Nombre:</label>
                                <Field 
                                    id="name"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50"
                                    placeholder="Nombre del Cliente"
                                    name="name"
                                />
                                {errors.name && touched.name ? (
                                    <Alerta>{errors.name}</Alerta>
                                ) : null}
                            </div>
                            <div className='mb-4'>
                                <label 
                                    className='text-gray-800'
                                    htmlFor="address"
                                >Dirección:</label>
                                <Field 
                                    id="address"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50"
                                    placeholder="Dirección del Cliente"
                                    name="address"
                                />
                                {errors.address && touched.address ? (
                                    <Alerta>{errors.address}</Alerta>
                                ) : null}
                            </div>
                            <div className='mb-4'>
                                <label 
                                    className='text-gray-800'
                                    htmlFor="phone"
                                >Teléfono :</label>
                                <Field 
                                    id="phone"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50"
                                    placeholder="Teléfono  del Cliente"
                                    name="phone"
                                />
                                {errors.phone && touched.phone ? (
                                    <Alerta>{errors.phone}</Alerta>
                                ) : null}
                            </div>
                            <div className='mb-4'>
                                <label 
                                    className='text-gray-800'
                                    htmlFor="email"
                                >Correo:</label>
                                <Field 
                                    id="email"
                                    type="email"
                                    className="mt-2 block w-full p-3 bg-gray-50"
                                    placeholder="Correo del Cliente"
                                    name="email"
                                />
                                {errors.email && touched.email ? (
                                    <Alerta>{errors.email}</Alerta>
                                ) : null}
                            </div>

                            <input 
                                type="submit"
                                value={customer?.id ? 'Editar Cliente' : 'Registrar Cliente'}
                                className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg rounded'
                            />
                        </Form>
                    )}}
                </Formik>
            </div>
        )
    )
}

FormCustomer.defaultProps = {
    customer: {},
    loading: false
}

export default FormCustomer