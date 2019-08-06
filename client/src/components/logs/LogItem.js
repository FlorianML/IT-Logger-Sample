import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteLog, setCurrent } from '../../actions/logActions'

import M from 'materialize-css/dist/js/materialize.min.js';


const LogItem = ({ log, tech, deleteLog, setCurrent }) => {
    const { dateCreated, _id, attention, message } = log;
    const { firstName, lastName } = tech;

    const onDelete = id => {
        deleteLog(log._id)
        M.toast({ html: 'Log Deleted' })
    }
    return (
        <li className="collection-item">
            <div>
                <a href="#edit-log-modal"
                    className={`modal-trigger ${attention ? 'red-text' : 'blue-text'}`}
                    onClick={() => setCurrent(log)}
                >{message}</a>
                <br />
                <span className="grey-text">
                    <span className="black-text">ID #{_id.substring(0, 6)}</span> last updated by {' '}
                    <span className="black-text">{`${firstName} ${lastName}`}</span> on {' '}
                    <Moment format="MMMM Do YYYY, h:mm:ss a">{dateCreated}</Moment>
                </span>
                <a href="#!" onClick={onDelete} className="secondary-content">
                    <i className="material-icons grey-text">delete</i>
                </a>
            </div>
        </li>
    )
}

LogItem.propTypes = {
    log: PropTypes.object.isRequired,
    tech: PropTypes.object.isRequired,
    deleteLog: PropTypes.func.isRequired,
    setCurrent: PropTypes.func.isRequired,
}

export default connect(null, { deleteLog, setCurrent })(LogItem)
