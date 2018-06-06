import React, { Component } from 'react';
import './HighScoreTable.css';

class HighScoreTable extends Component {
    render() {
        return (
          <div>
            <p className='highScoresTableHeader' >{this.props.title}</p>
            <table className='highScoresTable'>
                <tbody className='highScoresTableBody'> 
                  {/* <tr><td colSpan='2' >{this.props.title}</td></tr> */}
                  <tr><td>Score</td><td>Name</td></tr>
                  {
                    this.props.rows.map( (item, i) => {
                      return <tr key={i} >
                        <td>{item.score}</td>
                        <td>{item.name}</td>
                      </tr>
                    })
                  }
                </tbody>
            </table>
          </div>
        );
    }
}

export default HighScoreTable;