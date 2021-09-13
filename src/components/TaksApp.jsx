import React from 'react'
import { useForm } from '../hook/useForm'

const TaksApp = () => {

    const [formValue, handleInputChange, reset] = useForm({
        url:'',
        name: '',
        description: ''
    })

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
                    <h3 className="text-center">Agregar tareas</h3>
                    <form className="form-group">
                        <input
                            type="text"
                            className="form-control "
                            placeholder="Url"
                            name="url"
                        />

                        <input
                            type="text"
                            className="form-control mt-2"
                            name="nombre"
                            placeholder="Nombre Tarea"
                        />

                        <textarea
                            name="sintomas"
                            className="form-control mt-2"
                            autoComplete="off"
                        >
                        </textarea>

                        <div class="d-grid gap-2 mx-auto mt-2">
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
