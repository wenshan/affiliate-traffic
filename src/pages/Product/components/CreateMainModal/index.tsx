import { Button, Input, Modal, Select } from 'antd';
import { Component } from 'react';
import CustomProductType from '../CustomProductType';
import GoogleProductCategory from '../GoogleProductCategory';

import './index.less';

class CreateMainModal extends Component {
  constructor(props) {
    super(props);
    console.log('props:', props);
    this.state = {
      isProductTypeShow: false,
      isProductCategoryShow: false,
      currentProductMain: {
        title: '',
        productType: { value: '1', label: 'Jack' },
        offerId: '111111',
        googleProductCategory: { key: '1', title: 'Jack' },
        gtin: '123123123123',
      },
    };
  }
  // 商品名称
  titleHandleInput = (e) => {
    const { value } = e.target;
    const { currentProductMain } = this.state;
    const newCurrentProductMain = Object.assign({}, currentProductMain, { title: value });
    this.setState({
      currentProductMain: newCurrentProductMain,
    });
  };
  // 自定商品分类
  productTypeSelectHandle = (event, option) => {
    const { currentProductMain } = this.state;
    const newCurrentProductMain = Object.assign({}, currentProductMain, { productType: option });
    this.setState({
      currentProductMain: newCurrentProductMain,
    });
  };

  productTypeButtonHandle = () => {
    this.setState({
      isProductTypeShow: true,
    });
  };
  // 商品货号
  offerIdInputHandle = (e) => {
    const { value } = e.target;
    const { currentProductMain } = this.state;
    const newCurrentProductMain = Object.assign({}, currentProductMain, { offerId: value });
    this.setState({
      currentProductMain: newCurrentProductMain,
    });
  };
  // Google 商品类目
  googleProductCategoryButtonHandle = () => {
    this.setState({
      isProductCategoryShow: true,
    });
  };
  // 商品GTIN码
  gtinInputHandle = (e) => {
    const { value } = e.target;
    const { currentProductMain } = this.state;
    const newCurrentProductMain = Object.assign({}, currentProductMain, { gtin: value });
    this.setState({
      currentProductMain: newCurrentProductMain,
    });
  };
  // CustomProductType
  productTypeCallBackCancel = () => {
    this.setState({
      isProductTypeShow: false,
    });
  };
  productTypeCallBackOk = () => {
    this.setState({
      isProductTypeShow: false,
    });
  };
  // GoogleProductCategory
  productCategoryCallBackOk = (option) => {
    const { currentProductMain } = this.state;
    const newCurrentProductMain = Object.assign({}, currentProductMain, {
      googleProductCategory: option,
    });
    this.setState({
      isProductCategoryShow: false,
      currentProductMain: newCurrentProductMain,
    });
  };
  productCategoryCallBackCancel = () => {
    this.setState({
      isProductCategoryShow: false,
    });
  };
  // Modal
  handleOk = () => {
    const { currentProductMain } = this.state;
    if (this.props.callbackOk) {
      this.props.callbackOk(currentProductMain);
    }
  };
  handleCancel = () => {
    if (this.props.callbackCancel) {
      this.props.callbackCancel();
    }
  };

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps) {
    console.log('nextProps:', nextProps);
    if (nextProps.dataSource.currentProductMain) {
      this.setState({
        currentProductMain: nextProps.dataSource.currentProductMain,
      });
    }
  }

  render() {
    console.log('dataSource:', this.props.dataSource);
    const { currentProductMain } = this.state;
    const { productTypeOption } = this.props.dataSource;
    const { title, productType, offerId, googleProductCategory, gtin } = currentProductMain;
    return (
      <div className="custom-product-type">
        <Modal
          title="创建主商品信息 "
          open={this.props.open}
          width={900}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div className="content form-box">
            <div className="form-item">
              <span className="label">
                <i>*</i> 商品名称:
              </span>
              <Input
                placeholder="商品名称"
                style={{ width: 350 }}
                value={title}
                onChange={this.titleHandleInput}
              />
            </div>
            <div className="form-item">
              <span className="label">
                <i>*</i> 自定商品分类:
              </span>
              <Select
                value={productType.value}
                style={{ width: 120 }}
                onChange={this.productTypeSelectHandle}
                options={productTypeOption}
              />
              <span className="operate">
                <Button type="primary" size="small" onClick={this.productTypeButtonHandle}>
                  管理自定商品分类
                </Button>
              </span>
            </div>
            <div className="form-item">
              <span className="label">
                <i>*</i> 商品货号:
              </span>
              <Input
                placeholder="商品货号"
                style={{ width: 350 }}
                value={offerId}
                onChange={this.offerIdInputHandle}
              />
            </div>
            <div className="form-item">
              <span className="label">
                <i>*</i> 选择Google商品类目:
              </span>
              <Input
                placeholder="选择Google 商品类目"
                style={{ width: 350 }}
                value={googleProductCategory.title}
                disabled
              />
              <span className="operate">
                <Button
                  type="primary"
                  size="small"
                  onClick={this.googleProductCategoryButtonHandle}
                >
                  商品类目
                </Button>
              </span>
            </div>
            <div className="form-item">
              <span className="label">商品GTIN码:</span>
              <Input
                placeholder="商品GTIN码"
                style={{ width: 350 }}
                value={gtin}
                onChange={this.gtinInputHandle}
              />
            </div>
          </div>
          <CustomProductType
            dataSource={productTypeOption}
            open={this.state.isProductTypeShow}
            callbackCancel={this.productTypeCallBackCancel}
            callbackOk={this.productTypeCallBackOk}
          ></CustomProductType>
          <GoogleProductCategory
            open={this.state.isProductCategoryShow}
            callbackCancel={this.productCategoryCallBackCancel}
            callbackOk={this.productCategoryCallBackOk}
          ></GoogleProductCategory>
        </Modal>
      </div>
    );
  }
}

export default CreateMainModal;
