import axios from 'axios'
import { isEmpty } from 'lodash'
import React, {useState } from 'react'
import { Link } from 'react-router-dom'
import shortid from 'shortid'
import { useForm } from '../hook/useForm'

const TaksApp = ({stateTaks,guardarRecargarProductos}) => {
    const urlData = 'http://localhost:4000/tareas'

    const [errorForm, setErrorForm] = useState(false)

    const [formValue, handleInputChange, reset] = useForm({
        url: '',
        name: '',
        description: ''
    })
    
    const { url, name, description } = formValue

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newTask = {
            id: shortid.generate(),
            url,
            name,
            description,
        }

        if (isEmpty(url) || isEmpty(name) || isEmpty(description)) {
            setErrorForm(true);
            return
        }

        setErrorForm(false);
       

        try {
            const resultado = await axios.post(urlData, newTask)
            guardarRecargarProductos(true)
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (tarea) => {
        console.log(tarea)
        const url = `http://localhost:4000/tareas/${tarea.id}`;
        guardarRecargarProductos(true)
        await axios.delete(url);
    }

    const handleEdit = async (tarea) => {
      
        setForm({
            url: tarea.url,
            name: tarea.name,
            description: tarea.description
        })

    }
    

    return (
        <div className="container mt-5">
            <h1>Tareas</h1>
            <hr />

            <div className="row">
                <div className="col-8">
                    <h3 className="text-center">Lista de tareas</h3>
                    <ul className="list-group">
                        {
                            stateTaks.map(tarea => (
                                <li className="list-group-item" key={tarea.id}>
                                    <span className="lead">{tarea.name}</span>
                                    <button
                                        className="btn btn-danger btm-sm float-end "
                                        onClick={() => handleDelete(tarea)}
                                    >
                                      borrar
                                    </button>
                                    <button
                                        className="btn btn-warning btm-sm float-end mx-2"
                                        onClick={() => handleEdit(tarea)}
                                    >
                                        Editar
                                    </button>
                                    <Link
                                        className="btn btn-success btm-sm float-end mx-2"
                                       to={ `/detalle/${tarea.id}`}
                                    >
                                        Detalle
                                    </Link>
                                </li>
                            ))
                        }
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
