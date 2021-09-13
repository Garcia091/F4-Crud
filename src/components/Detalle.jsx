import React from 'react'
import { useHistory } from 'react-router-dom';

const Detalle = ({ detTaks }) => {
    const history = useHistory()
    console.log(detTaks);
    return (
        <div className="container row row-cols-1 row-cols-md-5 g-4 py-5 text-center">
            {
                detTaks.map(taks => (

                    <div className="card text-white bg-dark ms-3 py-3" key={taks.id} >
                        <div className="">
                            <img src={taks.url} className="img-fluid rounded-start" alt="..." width="200px" />
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card-body">
                                    <h5 className="card-title"> {taks.name}</h5>
                                    <p className="card-title"> {taks.description}</p>

                                </div>
                            </div>
                        </div>

                        <button
                            className="btn btn-warning btm-sm float-end mx-2"
                            onClick={() => history.push('/')}
                        >
                            Atras
                        </button>
                    </div>
                ))
            }
        </div>
    )
}

export default Detalle
