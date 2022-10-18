import React from 'react'
import { Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta';
import Spinner from './Spinner';
import C from '../config'

const FormShopper = ({shopper, loading}) => {

    const navigate = useNavigate();

    const NewShopperSchema = Yup.object().shape({
        document: Yup.number()
                        .positive('Número no válido')
                        .integer('Número no válido')
                        .typeError('Número no válido')
                        .required('Nombre es requerido'),
        full_name: Yup.string()
                    .min(3, 'Nombre es muy corto')
                    .max(100, 'Nombre es muy largo')
                    .required('Nombre es requerido'),
        cellphone: Yup.number()
                    .positive('Número no válido')
                    .integer('Número no válido')
                    .typeError('Número no válido')
                    .required('Nombre es requerido'),
        email: Yup.string()
                    .email('Correo no válido')
                    .required('Correo es requerido')
    });

    const handleSubmit = async (values) => {
        try {
            let response;

            if (shopper.id) {
                const url = `${C.JABU_API}/shopper/${shopper.id}`
                response = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            } else {
                const url = `${C.JABU_API}/shopper`
                response = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }
            
            await response.json()
            navigate('/shoppers')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        loading ? <Spinner /> : (
            <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
                <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>
                    {shopper?.id ? 'Editar Comprador' : 'Agregar Comprador'}
                </h1>

                <Formik
                    initialValues={{
                        document: shopper?.document ?? '',
                        full_name: shopper?.full_name ?? '',
                        cellphone: shopper?.cellphone ?? '',
                        email: shopper?.email ?? ''
                    }}
                    enableReinitialize={true}
                    onSubmit={ async (values, {resetForm}) => {
                        await handleSubmit(values);
                        resetForm();
                    }}
                    validationSchema={NewShopperSchema}
                >
                    {({errors, touched}) => {
                        
                        return (
                        <Form
                            className='mt-10'
                        >
                            <div className='mb-4'>
                                <label 
                                    className='text-gray-800'
                                    htmlFor="document"
                                >Documento:</label>
                                <Field 
                                    id="document"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50"
                                    placeholder="Documento del Comprador"
                                    name="document"
                                />
                                {errors.document && touched.document ? (
                                    <Alerta>{errors.document}</Alerta>
                                ) : null}
                            </div>
                            <div className='mb-4'>
                                <label 
                                    className='text-gray-800'
                                    htmlFor="full_name"
                                >Nombre:</label>
                                <Field 
                                    id="full_name"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50"
                                    placeholder="Nombre del Comprador"
                                    name="full_name"
                                />
                                {errors.full_name && touched.full_name ? (
                                    <Alerta>{errors.full_name}</Alerta>
                                ) : null}
                            </div>
                            <div className='mb-4'>
                                <label 
                                    className='text-gray-800'
                                    htmlFor="cellphone"
                                >Celular:</label>
                                <Field 
                                    id="cellphone"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50"
                                    placeholder="Celular del Comptrador"
                                    name="cellphone"
                                />
                                {errors.cellphone && touched.cellphone ? (
                                    <Alerta>{errors.cellphone}</Alerta>
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
                                value={shopper?.id ? 'Editar Comprador' : 'Registrar Comprador'}
                                className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg'
                            />
                        </Form>
                    )}}
                </Formik>
            </div>
        )
    )
}

FormShopper.defaultProps = {
    shopper: {},
    loading: false
}

export default FormShopper