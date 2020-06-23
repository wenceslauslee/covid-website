import { Component } from 'react';
import React from 'react';

const dateStyle = {
  fontSize: '18px',
  fontWeight: 'bold'
};

class ChangeLog extends Component {
  render() {
    return (
      <div>
        <p style={{ display: 'inline-block', textAlign: 'left', minWidth: '750px' }}>
          For reference, full change logs can be viewed <a href='https://github.com/wenceslauslee/covid-report-website/commits/master'>here</a>.<br/><br/>
          <div style={ dateStyle }>-- June 22, 2020 --</div>
          * Fix bug with dates on state/county graphs.<br/>
          * Update documentation and sources.<br/>
          * Added change logs tab and contents.<br/><br/>
          <div style={ dateStyle }>-- June 21, 2020 --</div>
          * Publish link to public and open up for feedback!<br/><br/>
          Special thanks to all who gave me ideas on how to improve this page!
        </p>
      </div>
    );
  }
}

export default ChangeLog;
