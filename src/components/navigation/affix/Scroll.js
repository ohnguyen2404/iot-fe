import * as React from 'react';
import {Affix, Button} from 'antd';

class Scroll extends React.Component {
  state = {
    top: 10,
    bottom: 10,
  };

  render() {
    return (
        <div
            className="scrollable-container"
            ref={node => {
              this.container = node;
            }}
        >
          <div className="background">
            <Affix target={() => this.container}>
              <Button type="primary">Fixed at the top of container</Button>
            </Affix>
          </div>
        </div>
    );
  }
}

export default Scroll;
