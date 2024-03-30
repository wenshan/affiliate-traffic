import { Button, Input, Modal, message } from 'antd';
import { Component } from 'react';
import CustomProductType from '../CustomProductType';
import GoogleProductCategory from '../GoogleProductCategory';

import './index.less';

class CreateMainModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isProductTypeShow: false,
      isProductCategoryShow: false,
      currentProductMain: {
        title: '',
        product_type_id: { key: '', title: '' },
        offer_id: '',
        google_product_category: {
          key: 632,
          title: '五金/硬件',
        },
        gtin: '',
        brand: '',
      },
      productTypeOption: [],
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
    this.props.dispatch({
      type: 'product/updateProduct',
      payload: {
        currentProductMain: newCurrentProductMain,
      },
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
  // CustomProductType
  productTypeCallBackCancel = () => {
    this.setState({
      isProductTypeShow: false,
    });
  };
  // 管理页面回调
  productTypeCallBackOk = (item) => {
    const { currentProductMain } = this.state;
    const newCurrentProductMain = Object.assign({}, currentProductMain, {
      product_type_id: item[0],
    });
    this.setState({
      isProductTypeShow: false,
      currentProductMain: newCurrentProductMain,
    });
  };

  // 编辑 新增 确认回调
  productTypeAddCallBackOk = (item, type) => {
    if (this.props.callbackAddProductType) {
      this.props.callbackAddProductType(item, type);
    }
  };
  productTypeDelCallBackOk = (item) => {
    if (this.props.callbackDelProductType) {
      this.props.callbackDelProductType(item);
    }
  };
  // GoogleProductCategory
  productCategoryCallBackOk = (option) => {
    const { currentProductMain } = this.state;
    const newCurrentProductMain = Object.assign({}, currentProductMain, {
      google_product_category: option,
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
    console.log('currentProductMain:', currentProductMain);
    for (let key in currentProductMain) {
      if (key !== 'gtin' && key !== 'remark' && key !== 'imgSrc') {
        if (!currentProductMain[key]) {
          message.warning({
            content: '必填字段不能为空~',
          });
          return;
        }
      }
    }
    if (this.props.callbackOk) {
      this.props.callbackOk(currentProductMain);
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
        productTypeOption: nextProps.dataSource.productTypeOption,
      });
    }
  }

  render() {
    const { currentProductMain, productTypeOption } = this.state;
    const { title, product_type_id, offer_id, google_product_category, gtin, brand } =
      currentProductMain;
    return (
      <div className="custom-product-type">
        <Modal
          title={this.props.optionAction > 0 ? '编辑主商品信息' : '创建主商品信息'}
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
              <Input
                placeholder="自定商品分类"
                style={{ width: 350 }}
                value={product_type_id.title}
                disabled
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
                value={offer_id}
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
                value={google_product_category.title}
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
            <div className="form-item">
              <span className="label">品牌名称:</span>
              <Input
                placeholder="品牌名称"
                style={{ width: 350 }}
                value={brand}
                onChange={this.brandInputHandle}
              />
            </div>
          </div>
          <CustomProductType
            dataSource={productTypeOption}
            open={this.state.isProductTypeShow}
            callbackCancel={this.productTypeCallBackCancel}
            callbackOk={this.productTypeCallBackOk}
            callbackAddOk={this.productTypeAddCallBackOk}
            callbackDelOk={this.productTypeDelCallBackOk}
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
