import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import LogItem from './LogItem';
import Preloader from '../layout/Preloader';
import { getLogs } from '../../actions/logActions'
import { getTechs } from '../../actions/techActions'


const Logs = ({ log: { logs, logLoading, filtered }, tech: { techs, techLoading }, getLogs, getTechs }) => {

    const loading = logLoading && techLoading

    useEffect(() => {
        getLogs()
        getTechs()
        //eslint-disable-next-line
    }, [])

    const getTech = (id) => {
        return techs.find(tech => tech._id === id)
    }

    if (loading || logs === null || techs === null) {
        return <Preloader />
    }

    return (
        <ul className="collection with-header">
            <li className="collection-header">
                <h4 className="center">System Logs</h4>
            </li>
            {(!loading && logs.length === 0) || (!loading && techs.length === 0) || (filtered !== null && filtered.length === 0) ?
                (<p className='center'>No logs to show...</p>) :
                filtered === null ?
                    (logs.map(log => <LogItem key={log._id} log={log} tech={getTech(log.tech)} />)) :
                    (filtered.map(log => <LogItem key={log._id} log={log} tech={getTech(log.tech)} />))
            }
        </ul>
    )
}

Logs.propTypes = {
    log: PropTypes.object.isRequired,
    getLogs: PropTypes.func.isRequired,
    getTechs: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    log: state.log,
    tech: state.tech
});

export default connect(mapStateToProps, { getLogs, getTechs })(Logs)
