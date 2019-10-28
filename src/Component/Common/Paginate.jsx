import React, { Component } from 'react';
import _ from 'lodash';

class Paginate extends Component {
    render() {
        const totalPage = Math.ceil(this.props.totalCount / this.props.pageSize);
        const pages = _.range(1, totalPage + 1)
        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {pages.map(page => <li className="page-item"><a className="page-link" onClick={() => this.props.onChange(page)}>{page}</a></li>)}
                </ul>
            </nav>
        )
    }
}

export default Paginate;
