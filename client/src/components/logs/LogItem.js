import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const LogItem = ({ log, tech }) => {
    return (
        <li className="collection-item">
            <div>
                <a href="#edit-log-modal" className={`modal-trigger ${log.attention ? 'red-text' : 'blue-text'}`}>{log.message}</a>
                <br />
                <span className="grey-text">
                    <span className="black-text">ID #{log._id.substring(0, 6)}</span> last updated by {' '}
                    <span className="black-text">{`${tech.firstName} ${tech.lastName}`}</span> on {' '}
                    <Moment format="MMMM Do YYYY, h:mm:ss a">{log.dateCreated}</Moment>
                </span>
                <a href="#!" className="secondary-content">
                    <i className="material-icons grey-text">delete</i>
                </a>
            </div>
        </li>
    )
}

LogItem.propTypes = {
    log: PropTypes.object.isRequired,
    tech: PropTypes.object.isRequired,
}

export default LogItem
