import { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import './index.less';

/*
function RichTextEditor(props) {
  console.log(props);
  const [ value, setValue ] = useState('');
  useEffect(
    () => {
      setValue(props.initValuerTextEditor || '');
    },
    [ props ]
  );

  return (
    <div className='rich-text-editor'>
      <div className='rich-text-editor-container'>
        <ReactQuill theme='snow' value={value} onChange={setValue} />
      </div>
    </div>
  );
}
  */
class RichTextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.initValuerTextEditor || '',
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.initValuerTextEditor !== prevState.value) {
      // 返回新的state对象
      return { value: nextProps.initValuerTextEditor };
    }
    // 如果没有变化，返回null
    return null;
  }
  setValue = (value) => {
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

export default RichTextEditor;
