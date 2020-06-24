const moment = require('moment');

const Formatter = {
  modifyChangeRank: (rankChange) => {
    if (rankChange > 0) {
      return `↑${rankChange}`;
    } else if (rankChange < 0) {
      return `↓${Math.abs(rankChange)}`;
    }
    return '-';
  },

  getCellStyle: (cell, row, rowIndex, colIndex) => {
    if (typeof cell !== 'string') {
      return {
        color: 'black'
      };
    }

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
  },

  getMaxValue: (maxValue) => {
    return Math.max(5, Math.round(maxValue * 1.05));
  },

  getTimestamp: (timestamp) => {
    const date = moment(timestamp);
    const current = moment();
    var diff = Math.floor((current - date) / 1000);
    var timeDiff;

    const getPlural = (word, count) => {
      if (count <= 1) {
        return word;
      }

      return `${word}s`;
    };

    if (diff < 60) {
      timeDiff = `${diff} ${getPlural('second', diff)}`;
    } else if (diff < 3600) {
      diff = Math.floor(diff / 60);
      timeDiff = `${diff} ${getPlural('minute', diff)}`;
    } else if (diff < 86400) {
      diff = Math.floor(diff / 3600);
      timeDiff = `${diff} ${getPlural('hour', diff)}`;
    } else {
      diff = Math.floor(diff / 86400);
      timeDiff = `${diff} ${getPlural('day', diff)}`;
    }

    return `${timeDiff} ago`;
  }
}

export default Formatter