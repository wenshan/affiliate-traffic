import DefaultProject from '@/components/DefaultProject';
import { costsExchangeQuery, costsExchangeSave } from '@/services/api/googleMerchant';
import { PageContainer, ProForm, ProFormDigit } from '@ant-design/pro-components';
import { Form, message } from 'antd';
import { useModel } from 'umi';

import './index.less';

type CostsExchange = {
  costFirstLegFreightRatio: number;
  costFbaRatio: number;
  costsAdvertisingRatio: number;
  targetProfitRatio: number;
  exchange_US: number;
  exchange_JP: number;
  exchange_KR: number;
  [key: string]: any;
};

const defaultCostsExchange = {
  costFirstLegFreightRatio: 10,
  costFbaRatio: 50,
  costsAdvertisingRatio: 5,
  targetProfitRatio: 30,
  exchange_US: 0.14,
  exchange_JP: 20.5,
  exchange_KR: 188,
  exchange_cm2in: 0.3937008,
  exchange_kg2lb: 2.2046226,
  exchange_g2lb: 0.0022046,
};

export default () => {
  const { setCostsExchange } = useModel('productCreateSkuModel');
  const [form] = Form.useForm<CostsExchange>();
  return (
    <PageContainer>
      <div className="costs-exchange">
        <DefaultProject></DefaultProject>
        <ProForm<CostsExchange>
          form={form}
          layout="horizontal"
          grid={true}
          rowProps={{
            gutter: [16, 0],
          }}
          onFinish={async (values) => {
            const result = await costsExchangeSave(values);
            if (result && result.status === 200 && result.data) {
              form.setFieldsValue(result.data);
              message.success('提交成功');
            } else {
              message.error('提交失败');
            }
          }}
          request={async () => {
            const result = await costsExchangeQuery();
            if (result && result.status === 200 && result.data) {
              setCostsExchange(result.data);
              return result.data;
            } else {
              return defaultCostsExchange;
            }
          }}
        >
          <ProForm.Group>
            <ProFormDigit
              fieldProps={{ addonAfter: '%' }}
              colProps={{ md: 12, xl: 8 }}
              name="costFirstLegFreightRatio"
              label="头程运费占比"
              placeholder="头程运费占比"
            />
            <ProFormDigit
              fieldProps={{ addonAfter: '%' }}
              colProps={{ md: 12, xl: 8 }}
              name="costFbaRatio"
              label="Fba成本占比"
              placeholder="Fba成本占比"
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormDigit
              fieldProps={{ addonAfter: '%' }}
              colProps={{ md: 12, xl: 8 }}
              name="costsAdvertisingRatio"
              label="广告成本占比"
              placeholder="广告成本占比"
            />
            <ProFormDigit
              colProps={{ md: 12, xl: 8 }}
              fieldProps={{ addonAfter: '%' }}
              name="targetProfitRatio"
              label="目标利润占比"
              placeholder="目标利润值"
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormDigit
              fieldProps={{ precision: 2, addonAfter: 'USD' }}
              colProps={{ md: 12, xl: 8 }}
              name="USD"
              label="美元汇率"
            />
            <ProFormDigit
              fieldProps={{ precision: 2, addonAfter: 'JPY' }}
              colProps={{ md: 12, xl: 8 }}
              name="JPY"
              label="日元汇率"
            />
            <ProFormDigit
              fieldProps={{ precision: 2, addonAfter: 'KRW' }}
              colProps={{ md: 12, xl: 8 }}
              name="KRW"
              label="韩元汇率"
            />
          </ProForm.Group>
        </ProForm>
      </div>
    </PageContainer>
  );
};
