import React from 'react'
import { Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta';
import Spinner from './Spinner';
import C from '../config'

const FormProduct = ({product, loading}) => {

    const navigate = useNavigate();

    const NewProductSchema = Yup.object().shape({
        name: Yup.string()
                    .min(3, 'Nombre es muy corto')
                    .max(30, 'Nombre es muy largo')
                    .required('Nombre es requerido'),
        description: Yup.string()
                        .min(3, 'Descripción es muy corta')
                        .max(150, 'Descripción es muy larga')
                        .required('Descripción es requerida'),
        quantity: Yup.number()
                    .positive('Cantidad debe ser un valor positivo')
                    .integer('Cantidad debe ser un número entero')
                    .typeError('Cantidad no válido')
                    .required('Cantidad es requerida'),
    });

    const handleSubmit = async (values) => {
        try {
            let response;

            if (product.id) {
                const url = `${C.DIS_API}/products/${product.id}`
                response = await fetch(url, {
                    method: 'PATCH',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            } else {
                const url = `${C.DIS_API}/products`
                response = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }
            
            await response.json()
            navigate('/products')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        loading ? <Spinner /> : (
            <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
                <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>
                    {product?.id ? 'Editar Producto' : 'Agregar Producto'}
                </h1>

                <Formik
                    initialValues={{
                        name: product?.name ?? '',
                        description: product?.description ?? '',
                        quantity: product?.quantity ?? '',
                    }}
                    enableReinitialize={true}
                    onSubmit={ async (values, {resetForm}) => {
                        await handleSubmit(values);
                        resetForm();
                    }}
                    validationSchema={NewProductSchema}
                >
                    {({errors, touched}) => {
                        
                        return (
                        <Form
                            className='mt-10'
                        >
                            <div className='mb-4'>
                                <label 
                                    className='text-gray-800'
                                    htmlFor="name"
                                >Nombre:</label>
                                <Field 
                                    id="name"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50"
                                    placeholder="Nombre del producto"
                                    name="name"
                                />
                                {errors.name && touched.name ? (
                                    <Alerta>{errors.name}</Alerta>
                                ) : null}
                            </div>
                            <div className='mb-4'>
                                <label 
                                    className='text-gray-800'
                                    htmlFor="description"
                                >Descripción:</label>
                                <Field 
                                    id="description"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50"
                                    placeholder="Descripción del producto"
                                    name="description"
                                />
                                {errors.description && touched.description ? (
                                    <Alerta>{errors.description}</Alerta>
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
                                    placeholder="Cantidad del producto"
                                    name="quantity"
                                />
                                {errors.quantity && touched.quantity ? (
                                    <Alerta>{errors.quantity}</Alerta>
                                ) : null}
                            </div>

                            <input 
                                type="submit"
                                value={product?.id ? 'Editar Producto' : 'Registrar Producto'}
                                className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg rounded'
                            />
                        </Form>
                    )}}
                </Formik>
            </div>
        )
    )
}

FormProduct.defaultProps = {
    product: {},
    loading: false
}

export default FormProduct