import { PageContainer } from '@ant-design/pro-components';
import { Component } from 'react';

class Welcome extends Component {
  constructor(props) {
    super(props);
    console.log('props:', props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    return (
      <PageContainer>
        <h1>欢迎</h1>
      </PageContainer>
    );
  }
}

export default Welcome;
