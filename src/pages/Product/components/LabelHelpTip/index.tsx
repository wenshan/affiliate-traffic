import { QuestionCircleOutlined } from '@ant-design/icons';
import { Col, Row, Tooltip } from 'antd';
import { Component } from 'react';
import labelHelpTip from '../../../../constant/helpTip';

import './index.less';

class LabelHelpTip extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  proHtml = ({ des, rule, exam }) => {
    const ruleHtml = [];
    const ruleRrr = (rule.length && rule.indexOf('。') > 0 && rule.split('。')) || [];

    if (ruleRrr && ruleRrr.length) {
      ruleRrr.map((item, idx) => {
        ruleHtml.push(<dd key={idx}>{item}</dd>);
      });
    } else {
      ruleHtml.push('-');
    }
    const html = (
      <>
        <Row>
          <Col span={12}>
            <div className="des">{des}</div>
            <div className="exam">
              <div className="title">示例：</div>
              {exam}
            </div>
          </Col>
          <Col span={12}>
            <dl>
              <dt>要求:</dt>
              {ruleHtml}
            </dl>
          </Col>
        </Row>
      </>
    );
    return html;
  };

  render() {
    if (!this.props.keyLabel) {
      return;
    }
    const currentHelpObj = labelHelpTip[this.props.keyLabel];
    console.log('currentHelpObj:', currentHelpObj);
    if (currentHelpObj && !currentHelpObj.title) {
      return;
    }
    const { title, des, rule, exam, required } = currentHelpObj;

    return (
      <span className="label-help-tip">
        <span className="label">
          {required ? <i>*</i> : ''} {title}
          <Tooltip title={() => this.proHtml({ des, rule, exam })} color="rgba(244, 244, 244, 0.9)">
            <QuestionCircleOutlined />
          </Tooltip>
          :{' '}
        </span>
      </span>
    );
  }
}

export default LabelHelpTip;
