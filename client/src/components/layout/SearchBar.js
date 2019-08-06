import React from 'react'
import { connect } from 'react-redux'
import { searchLogs } from '../../actions/logActions'

const SearchBar = ({ searchLogs, filtered }) => {

    const onChange = e => {
        searchLogs(e.target.value)
    }
    return (
        <nav style={{ marginBottom: '30px' }} className="blue">
            <div className="nav-wrapper">
                <form>
                    <div className="input-field">
                        <input id="search" type="search" onChange={onChange} />
                        <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                        <i className="material-icons">close</i>
                    </div>
                </form>
            </div>
        </nav>
    )
}


export default connect(null, { searchLogs })(SearchBar)
