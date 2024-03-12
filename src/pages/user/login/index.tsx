import { Footer } from '@/components';
import { Helmet } from '@umijs/max';
import { Button } from 'antd';
import { Component } from 'react';
import { connect } from 'umi';

@connect(({ common, login }) => ({
  common,
  login,
}))
class Login extends Component {
  constructor(props) {
    super(props);
    console.log('props:', props);
    this.state = {};
  }
  handleSubmit = () => {};

  testHandleSubmit = () => {
    this.props.dispatch({
      type: 'login/googleAuth2InitCodeClient2',
    });
  };
  testHandleSubmit2 = () => {
    this.props.dispatch({
      type: 'login/googleGetToken',
    });
  };

  componentDidMount() {}

  render() {
    return (
      <div className="container">
        <Helmet>
          <title></title>
        </Helmet>
        <div>
          <Button onClick={this.handleSubmit}>Google 登录</Button>
          <Button onClick={this.testHandleSubmit}>Authorize with Google</Button>
          <Button onClick={this.testHandleSubmit2}>Get Authorize Token with Google</Button>

          <div
            id="g_id_onload"
            data-client_id="894075544945-9akdiivfddi14fksil4s2pdrva0rgls9.apps.googleusercontent.com"
            data-context="signin"
            data-ux_mode="popup"
            data-login_uri="https://dreamstep.top/user/login"
            data-close_on_tap_outside="false"
            data-itp_support="false"
          ></div>

          <div
            className="g_id_signin"
            data-type="standard"
            data-shape="rectangular"
            data-theme="outline"
            data-text="signin_with"
            data-size="large"
            data-logo_alignment="left"
          ></div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Login;
