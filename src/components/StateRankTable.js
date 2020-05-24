import { Component } from 'react';
import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import _ from 'lodash';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

class StateRankTable extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      validDate: ''
    };
  }

  componentDidMount() {
    fetch('https://s7poydd598.execute-api.us-east-1.amazonaws.com/prod/rank?infoKey=stateRanking')
      .then(res => res.json())
      .then(rdata => {
        const filtered = _.filter(rdata.rankByCases, d => {
          return d.stateNameFullProper !== /*'-----'*/null && d.detailedInfo.activePercentage !== 'NaN';
        });

        _.each(filtered, f => {
          f.detailedInfo.activeRankChange =
            this.modifyChangeRank(f.detailedInfo.activeRankPast - f.detailedInfo.activeRank);
          f.detailedInfo.deathRankChange =
            this.modifyChangeRank(f.detailedInfo.deathRankPast - f.detailedInfo.deathRank);

          if (f.detailedInfo.activeChange >= 0) {
            f.detailedInfo.activeChange = `+${f.detailedInfo.activeChange}`;
          }

          f.detailedInfo.activePercentage = f.detailedInfo.activePercentage + '%';
        })
        this.setState({
          data: filtered,
          validDate: rdata.reportDate
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  modifyChangeRank(rankChange) {
    if (rankChange > 0) {
      return `↑${rankChange}`;
    } else if (rankChange < 0) {
      return `↓${Math.abs(rankChange)}`;
    }
    return '-';
  }

  getCellStyle(cell, row, rowIndex, colIndex) {
    var colorToUse = '';
    if (cell.startsWith('↑')) {
      colorToUse = 'red';
    } else if (cell.startsWith('↓')) {
      colorToUse = 'green';
    } else {
      colorToUse = 'black';
    }

    return {
      color: colorToUse
    };
  }

  indexN(cell, row, rowIndex) {
    return (<div>{ rowIndex + 1 }</div>);
  }

  render() {
    const columns = [
      {
        dataField: 'any',
        text: '#',
        formatter: this.indexN
      },
      {
        dataField: 'stateNameFullProper',
        text: 'State',
        sort: true
      },
      {
        dataField: 'detailedInfo.activeCount',
        text: 'Case Count',
        sort: true
      },
      {
        dataField: 'detailedInfo.activeRankChange',
        text: '-',
        style: this.getCellStyle
      },
      {
        dataField: 'detailedInfo.activeChange',
        text: 'Case Count Change',
        sort: true,
        sortFunc: (a, b, order, dataField) => {
          if (order === 'asc') {
            return parseInt(a) - parseInt(b);
          }
          return parseInt(b) - parseInt(a);
        }
      },
      {
        dataField: 'detailedInfo.deathCount',
        text: 'Death Count',
        sort: true
      },
      {
        dataField: 'detailedInfo.deathRankChange',
        text: '-',
        style: this.getCellStyle
      },
      {
        dataField: 'detailedInfo.activePercentage',
        text: 'Pop %',
        sort: true
      }
    ];

    const defaultSorted = [{
      dataField: 'detailedInfo.activeCount',
      order: 'desc'
    }];

    return (
      <div>
        <p align="left"> * Data reflects situation at <span style={{ 'fontWeight': 'bold'}}>{ this.state.validDate } 23:59:59 PM EST</span>.</p>
        <BootstrapTable bootstrap4={ true } keyField='state-rank-table'
          data={ this.state.data } columns={ columns } defaultSorted={ defaultSorted }>
        </BootstrapTable>
      </div>
    );
  }
}

export default StateRankTable;