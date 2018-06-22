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
                      let score = item.score || item[this.props.scoreAlias];
                      let name = item.name || item[this.props.nameAlias];

                      return <tr key={i} >
                        <td>{score}</td>
                        <td>{name}</td>
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