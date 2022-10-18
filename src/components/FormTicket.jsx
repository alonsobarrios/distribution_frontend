import React from 'react'
import { Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta';
import Spinner from './Spinner';
import C from '../config'

const FormTicket = ({ticket, loading}) => {

    const navigate = useNavigate();

    const NewTicketSchema = Yup.object().shape({
        code: Yup.string()
                    .min(4, 'Código es muy corto')
                    .max(30, 'Código es muy largo')
                    .required('Código es requerido'),
        description: Yup.string()
                        .min(3, 'Descripción es muy corta')
                        .max(100, 'Descripción es muy larga')
                        .required('Descripción es requerida'),
        cost: Yup.number()
                    .positive('Precio no válido')
                    .integer('Precio no válido')
                    .typeError('Precio no válido')
                    .required('Precio es requerido'),
    });

    const handleSubmit = async (values) => {
        try {
            let response;

            if (ticket.id) {
                const url = `${C.JABU_API}/ticket/${ticket.id}`
                response = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            } else {
                const url = `${C.JABU_API}/ticket`
                response = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }
            
            await response.json()
            navigate('/tickets')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        loading ? <Spinner /> : (
            <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
                <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>
                    {ticket?.id ? 'Editar Boleta' : 'Agregar Boleta'}
                </h1>

                <Formik
                    initialValues={{
                        code: ticket?.code ?? '',
                        description: ticket?.description ?? '',
                        cost: ticket?.cost ?? '',
                    }}
                    enableReinitialize={true}
                    onSubmit={ async (values, {resetForm}) => {
                        await handleSubmit(values);
                        resetForm();
                    }}
                    validationSchema={NewTicketSchema}
                >
                    {({errors, touched}) => {
                        
                        return (
                        <Form
                            className='mt-10'
                        >
                            <div className='mb-4'>
                                <label 
                                    className='text-gray-800'
                                    htmlFor="code"
                                >Código:</label>
                                <Field 
                                    id="code"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50"
                                    placeholder="Código de la Boleta"
                                    name="code"
                                />
                                {errors.code && touched.code ? (
                                    <Alerta>{errors.code}</Alerta>
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
                                    placeholder="Descripción de la Boleta"
                                    name="description"
                                />
                                {errors.description && touched.description ? (
                                    <Alerta>{errors.description}</Alerta>
                                ) : null}
                            </div>
                            <div className='mb-4'>
                                <label 
                                    className='text-gray-800'
                                    htmlFor="cost"
                                >Precio:</label>
                                <Field 
                                    id="cost"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50"
                                    placeholder="Precio de la Boleta"
                                    name="cost"
                                />
                                {errors.cost && touched.cost ? (
                                    <Alerta>{errors.cost}</Alerta>
                                ) : null}
                            </div>

                            <input 
                                type="submit"
                                value={ticket?.id ? 'Editar Boleta' : 'Registrar Boleta'}
                                className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg'
                            />
                        </Form>
                    )}}
                </Formik>
            </div>
        )
    )
}

FormTicket.defaultProps = {
    ticket: {},
    loading: false
}

export default FormTicket