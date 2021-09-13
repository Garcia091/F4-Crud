import React, { useEffect, useState } from 'react'
import {
    HashRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Detalle from '../components/Detalle';
import TaksApp from '../components/TaksApp';


const AppRouter = () => {
    const urlData = 'http://localhost:4000/tareas'
    const [stateTaks, setStateTaks] = useState([])
    const [recargarProductos, guardarRecargarProductos] = useState(true);

    useEffect(() => {
        apiTaks()
            .then(dataTaks => setStateTaks(dataTaks))
            guardarRecargarProductos(false);
    }, [recargarProductos])

    const apiTaks = async () => {
        const resp = await fetch(urlData)
        const data = await resp.json()

        const dataTaks = data.map(tak => {
            return {
                id: tak.id,
                url: tak.url,
                name: tak.name,
                description: tak.description
            }
        })
        return dataTaks
    }
    return (
        <Router>
            <Switch>
                <Route
                    exact
                    path="/detalle/:id"
                    render={props => {
                        // tomar el ID del producto
                        const idProducto = props.match.params.id;
                     
                        // el producto que se pasa al state
                        const detTaks = stateTaks.filter(producto => producto.id === idProducto);
                       
                        return (
                            <Detalle
                                detTaks={detTaks}
                            />
                        )
                    }} />


                <Route exact path="/"
                    render={() => (
                        <TaksApp
                            stateTaks={stateTaks}
                            guardarRecargarProductos={guardarRecargarProductos}
                        />
                    )}
                />
            </Switch>
        </Router>
    )
}

export default AppRouter
