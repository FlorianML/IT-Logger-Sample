import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateLog } from '../../actions/logActions'
import TechSelectOptions from '../techs/TechSelectOptions';

import M from 'materialize-css/dist/js/materialize.min.js';

const EditLogModal = ({ updateLog, current }) => {
    const [message, setMessage] = useState('');
    const [attention, setAttention] = useState(false);
    const [tech, setTech] = useState('');

    useEffect(() => {
        if (current) {
            setMessage(current.message)
            setAttention(current.attention)
            setTech(current.tech)
        }
    }, [current])

    const onSubmit = () => {
        if (message === '' || tech === '') {
            M.toast({ html: 'Please enter a message and technician' })
        } else {

            const updatedLog = {
                _id: current._id,
                message,
                tech,
                attention,
                dateCreated: Date.now()
            }
            updateLog(updatedLog)
            M.toast({ html: `Log updated` })

            setAttention(false);
            setMessage('');
            setTech('');
        }
    }

    return (
        <div id="edit-log-modal" className="modal" style={modalStyle}>
            <div className="modal-content">
                <h4>Enter System Log</h4>
                <div className="row">
                    <div className="input-field">
                        <input
                            type="text"
                            name="message"
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="input-field">
                        <select name="tech"
                            value={tech}
                            className="browser-default"
                            onChange={e => setTech(e.target.value)}>
                            <option value="" disabled>Select Technician</option>
                            <TechSelectOptions />
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field">
                        <p>
                            <label>
                                <input type="checkbox"
                                    className="filled-in"
                                    checked={attention}
                                    value={attention}
                                    onChange={e => setAttention(!attention)}
                                />
                                <span>Needs Attention</span>
                            </label>
                        </p>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <a href="#!" onClick={onSubmit}
                    style={marginStyle}
                    className="modal-close waves-effect blue waves-light btn">Enter</a>
            </div>
        </div>
    )
}

EditLogModal.propTypes = {
    updateLog: PropTypes.func.isRequired,
    current: PropTypes.object
}

const modalStyle = {
    width: '75%',
    height: '75%'
}

const marginStyle = {
    marginRight: '20px'
}

const mapStateToProps = state => ({
    current: state.log.current
})

export default connect(mapStateToProps, { updateLog })(EditLogModal)
