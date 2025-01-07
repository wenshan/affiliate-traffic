import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './index.less';

type Props = {
  initValuerTextEditor: string;
  callbackValue: any;
};

function RichTextEditor(props: Props) {
  const [value, setValue] = useState<string>(props.initValuerTextEditor || '');
  const onChangeSubmit = (value: string) => {
    if (props && props.callbackValue) {
      setValue(value);
      props.callbackValue(value);
    }
  };

  useEffect(() => {
    setValue(props.initValuerTextEditor || '');
  }, [props.initValuerTextEditor]);
  return (
    <div className="rich-text-editor">
      <div className="rich-text-editor-container">
        <ReactQuill theme="snow" value={value} onChange={onChangeSubmit} />
      </div>
    </div>
  );
}

/*
class RichTextEditor extends Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: props.initValuerTextEditor || '',
    };
  }
  static getDerivedStateFromProps(nextProps: { initValuerTextEditor: any; }, prevState: { value: any; }) {
    if (nextProps.initValuerTextEditor !== prevState.value) {
      // 返回新的state对象
      return { value: nextProps.initValuerTextEditor };
    }
    // 如果没有变化，返回null
    return null;
  }
  setValue = (value: any) => {
    if (this.props && this.props.callbackValue) {
      this.props.callbackValue(value);
    }
  };
  render() {
    const { value } = this.state;
    return (
      <div className="rich-text-editor">
        <div className="rich-text-editor-container">
          <ReactQuill theme="snow" value={value} onChange={this.setValue} />
        </div>
      </div>
    );
  }
}
  */

export default RichTextEditor;
