import axios from 'axios'
import { isEmpty } from 'lodash'
import React, { useState } from 'react'
import shortid from 'shortid'
import { useForm } from '../hook/useForm'

const TaksApp = () => {
    const urlData = 'http://localhost:4000/tareas'
    const [errorForm, setErrorForm] = useState(false)

    const [formValue, handleInputChange, reset] = useForm({
        url: '',
        name: '',
        description: ''
    })

    const { url, name, description } = formValue

    const newTask = {
        id: shortid.generate(),
        url,
        name,
        description,
    }

    const formValidation = (params) => {
        if (isEmpty(url) || isEmpty(name) || isEmpty(description)) {
            setErrorForm(true);
            return;
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        formValidation()

        try {
            const resultado = await axios.post(urlData, newTask)
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="container mt-5">
            <h1>Tareas</h1>
            <hr />

            <div className="row">
                <div className="col-8">
                    <h3 className="text-center">Lista de tareas</h3>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <span className="lead">Nombre de la tarea</span>
                            <button className="btn btn-danger btm-am float-end ">Eliminar</button>
                            <button className="btn btn-warning btm-am float-end mx-2">Editar</button>
                        </li>
                    </ul>
                </div>

                <div className="col-4">
                    <h3 className="text-center"> Agregar tareas </h3>
                    {
                        errorForm &&
                        <div className="alert alert-danger" role="alert">
                            Falta información para el envío 
                        </div>

                    }
                    <form className="form-group" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="form-control "
                            placeholder="Url"
                            name="url"
                            value={url}
                            onChange={handleInputChange}
                        />

                        <input
                            type="text"
                            className="form-control mt-2"
                            name="name"
                            autoComplete="off"
                            placeholder="Nombre Tarea"
                            value={name}
                            onChange={handleInputChange}
                        />

                        <textarea
                            name="Description"
                            className="form-control mt-2"
                            autoComplete="off"
                            name="description"
                            value={description}
                            onChange={handleInputChange}
                        >
                        </textarea>

                        <div className="d-grid gap-2 mx-auto mt-2">
                            <button
                                type="submit"
                                className="btn btn-dark">
                                Guardar
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default TaksApp
