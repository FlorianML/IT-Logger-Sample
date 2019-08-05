import React, { useState, useEffect } from 'react'
import axios from 'axios';
import LogItem from './LogItem';
import Preloader from '../layout/Preloader';

const Logs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        getData()
        //eslint-disable-next-line
    }, [setTechs])

    const getData = async () => {
        setLoading(true)
        let resLogs = await axios.get('/logs/')
        let resTechs = await axios.get('/techs/')

        setLogs(resLogs.data)
        setTechs(resTechs.data)
        setLoading(false)
    }

    const getTech = (id) => {
        return techs.find(tech => tech._id === id)
    }

    if (loading) {
        return <Preloader />
    }

    return (
        <ul className="collection with-header">
            <li className="collection-header">
                <h4 className="center">System Logs</h4>
            </li>
            {(!loading && logs.length === 0) || (!loading && techs.length === 0) ?
                (<Preloader />) :
                (logs.map(log => <LogItem key={log._id} log={log} tech={getTech(log.tech)} />))
            }
        </ul>
    )
}

export default Logs
