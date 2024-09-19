import { Button, Input, Modal, message } from 'antd';
import { Component } from 'react';
// import GoogleProductCategory from '../GoogleProductCategory';
import LabelHelpTip from '../LabelHelpTip';

import './index.less';

class CreateMainModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isProductCategoryShow: false,
      currentProductMain: {
        title: '',
        offer_id: '',
        google_product_category: {
          key: 4,
          title: '动物/宠物用品>宠物用品>猫用品',
        },
        google_product_category_id: 4,
        gtin: '',
        brand: 'Limeet',
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
  // 品牌
  brandInputHandle = (e) => {
    const { value } = e.target;
    const { currentProductMain } = this.state;
    const newCurrentProductMain = Object.assign({}, currentProductMain, { brand: value });
    this.setState({
      currentProductMain: newCurrentProductMain,
    });
  };

  // 商品货号
  offerIdInputHandle = (e) => {
    const { value } = e.target;
    const { currentProductMain } = this.state;
    const newCurrentProductMain = Object.assign({}, currentProductMain, { offer_id: value });
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
  // GoogleProductCategory
  productCategoryCallBackOk = (option) => {
    const { currentProductMain } = this.state;
    const newCurrentProductMain = Object.assign({}, currentProductMain, {
      google_product_category: option,
      google_product_category_id: option.key,
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
    const { google_product_category, google_product_category_id, title, offer_id, brand } =
      currentProductMain;
    if (google_product_category && google_product_category_id && title && offer_id && brand) {
      if (this.props.callbackOk) {
        this.props.callbackOk(currentProductMain);
      }
    } else {
      message.warning({
        content: '必填字段不能为空~',
      });
      return;
    }
  };

  handleCancel = () => {
    if (this.props.callbackCancel) {
      this.props.callbackCancel();
    }
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.dataSource !== this.props.dataSource) {
      this.setState({
        currentProductMain: nextProps.dataSource.currentProductMain,
      });
    }
  }

  render() {
    const { currentProductMain } = this.state;
    const { title, offer_id, google_product_category, gtin, brand } = currentProductMain;
    return (
      <div className="custom-product-type">
        <Modal
          title={this.props.optionAction > 0 ? '编辑主商品信息' : '创建主商品信息'}
          open={this.props.open}
          width={900}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div className="header">
            <div className="sub-header">多语言通用的商品类别和标识码</div>
          </div>
          <div className="content form-box">
            <div className="form-item">
              <span className="label">
                <i>*</i> 主商品名称:
              </span>
              <Input
                placeholder="主商品名称"
                style={{ width: 350 }}
                value={title}
                onChange={this.titleHandleInput}
              />
            </div>
            <div className="form-item">
              <LabelHelpTip keyLabel="offer_id"></LabelHelpTip>
              <Input
                placeholder="商品货号"
                style={{ width: 350 }}
                value={offer_id}
                onChange={this.offerIdInputHandle}
              />
            </div>
            <div className="form-item">
              <LabelHelpTip keyLabel="google_product_category"></LabelHelpTip>
              <Input
                placeholder="选择Google商品类目"
                style={{ width: 350 }}
                value={google_product_category.title}
                disabled
              />
              <span className="operate">
                <Button
                  type="primary"
                  size="small"
                  onClick={this.googleProductCategoryButtonHandle}
                >
                  选择Google商品类目
                </Button>
              </span>
            </div>
            <div className="form-item">
              <LabelHelpTip keyLabel="gtin"></LabelHelpTip>
              <Input
                placeholder="商品GTIN码"
                style={{ width: 350 }}
                value={gtin}
                onChange={this.gtinInputHandle}
              />
            </div>
            <div className="form-item">
              <LabelHelpTip keyLabel="brand"></LabelHelpTip>
              <Input
                placeholder="品牌名称"
                style={{ width: 350 }}
                value={brand}
                onChange={this.brandInputHandle}
              />
            </div>
          </div>
          {/*

          <GoogleProductCategory
            open={this.state.isProductCategoryShow}
            callbackCancel={this.productCategoryCallBackCancel}
            callbackOk={this.productCategoryCallBackOk}
          ></GoogleProductCategory>
                      */}
        </Modal>
      </div>
    );
  }
}

export default CreateMainModal;
