import React from 'react'
import { Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta';
import Spinner from './Spinner';
import C from '../config'

const FormBooking = ({booking, loading, tickets, shoppers}) => {

    const navigate = useNavigate();

    const NewBookingSchema = Yup.object().shape({
        ticket_id: Yup.number()
                        .positive('Boleta no válida')
                        .integer('Boleta no válida')
                        .typeError('Boleta no válida')
                        .required('Boleta es requerido'),
        shopper_id: Yup.number()
                        .positive('Comprador no válido')
                        .integer('Comprador no válido')
                        .typeError('Comprador no válido')
                        .required('Comprador es requerido')
    });

    const handleSubmit = async (values) => {
        try {
            let response;

            if (booking.id) {
                const url = `${C.JABU_API}/booking/${booking.id}`
                response = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            } else {
                const url = `${C.JABU_API}/booking`
                response = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }
            
            await response.json()
            navigate('/bookings')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        loading ? <Spinner /> : (
            <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
                <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>
                    {booking?.id ? 'Editar Reserva' : 'Agregar Reserva'}
                </h1>

                <Formik
                    initialValues={{
                        ticket_id: booking?.ticket_id ?? '',
                        shopper_id: booking?.shopper_id ?? '',
                    }}
                    enableReinitialize={true}
                    onSubmit={ async (values, {resetForm}) => {
                        await handleSubmit(values);
                        resetForm();
                    }}
                    validationSchema={NewBookingSchema}
                >
                    {({errors, touched}) => {
                        
                        return (
                        <Form
                            className='mt-10'
                        >
                            <div className='mb-4'>
                                <label 
                                    className='text-gray-800'
                                    htmlFor="ticket_id"
                                >Boleta:</label>
                                <Field 
                                    as="select"
                                    id="ticket_id"
                                    name="ticket_id"
                                    className="mt-2 block w-full p-3 bg-gray-50">
                                    <option value="">Seleccionar boleta</option>
                                    {tickets.map(ticket => <option value={ticket.id} key={ticket.id}>{ticket.code} - {ticket.description}</option>)}
                                </Field>
                                {errors.ticket_id && touched.ticket_id ? (
                                    <Alerta>{errors.ticket_id}</Alerta>
                                ) : null}
                            </div>
                            <div className='mb-4'>
                                <label 
                                    className='text-gray-800'
                                    htmlFor="shopper_id"
                                >Comprador:</label>
                                 <Field 
                                    as="select"
                                    id="shopper_id"
                                    name="shopper_id"
                                    className="mt-2 block w-full p-3 bg-gray-50">
                                    <option value="">Seleccionar comprador</option>
                                    {shoppers.map(shopper => <option value={shopper.id} key={shopper.id}>{shopper.document} - {shopper.full_name}</option>)}
                                </Field>
                                {errors.shopper_id && touched.shopper_id ? (
                                    <Alerta>{errors.shopper_id}</Alerta>
                                ) : null}
                            </div>

                            <input 
                                type="submit"
                                value={booking?.id ? 'Editar Reserva' : 'Registrar Reserva'}
                                className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg'
                            />
                        </Form>
                    )}}
                </Formik>
            </div>
        )
    )
}

FormBooking.defaultProps = {
    booking: {},
    loading: true
}

export default FormBooking