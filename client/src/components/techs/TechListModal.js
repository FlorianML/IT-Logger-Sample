import React, { useState, useEffect } from 'react'
import axios from 'axios';
import TechItem from './TechItem';

const AddTechListModal = () => {
    const [loading, setLoading] = useState(false);
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        getTechs()
        //eslint-disable-next-line
    }, [setTechs])

    const getTechs = async () => {
        setLoading(true)
        let resTechs = await axios.get('/techs/')

        setTechs(resTechs.data)
        setLoading(false)
    }

    return (
        <div id="tech-list-modal" className="modal">
            <div className="modal-content">
                <h4>Technician List</h4>
                <ul className="collection">
                    {!loading && techs.map(tech =>
                        <TechItem key={tech._id} tech={tech} />
                    )}
                </ul>
            </div>
        </div>
    )
}

export default AddTechListModal
