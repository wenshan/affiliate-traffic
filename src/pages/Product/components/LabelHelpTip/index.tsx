import labelHelpTip from '@/constant/helpTip';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Col, Row, Tooltip } from 'antd';

import './index.less';

type Props = {
  keyLabel: string;
};
export default (props: Props) => {
  const proHtml = async ({ des, rule, exam }) => {
    const ruleHtml = [];
    const ruleRrr = (rule.length && rule.indexOf('。') > 0 && rule.split('。')) || [];
    if (ruleRrr && ruleRrr.length) {
      ruleRrr.map((item: any, idx: any) => {
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

  if (!props.keyLabel) {
    return;
  }
  const currentHelpObj = props.keyLabel && labelHelpTip && labelHelpTip[props.keyLabel];
  if (!currentHelpObj) {
    return '--';
  }
  const { title, des, rule, exam, required } = currentHelpObj;
  if (!title) {
    return '--';
  }
  return (
    <span className="label-help-tip">
      <span className="label">
        {required ? <i>*</i> : ''} {title}
        <Tooltip title={() => proHtml({ des, rule, exam })} color="rgba(244, 244, 244, 0.9)">
          <QuestionCircleOutlined />
        </Tooltip>
        :{' '}
      </span>
    </span>
  );
};
