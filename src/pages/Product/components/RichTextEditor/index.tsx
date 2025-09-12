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

export default RichTextEditor;
