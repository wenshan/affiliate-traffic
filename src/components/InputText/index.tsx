import { Input, InputProps } from 'antd';
import React, { ChangeEvent, CompositionEvent, useEffect, useState } from 'react';

interface ICommonInputProps extends Omit<InputProps, 'onChange'> {
  onChange?: (value: string) => void;
}

function InputText(props: ICommonInputProps) {
  const { value, onChange } = props;

  const [curValue, setValue] = useState(value);
  const [isComposing, setComposing] = useState(false); // 是否正在输入法录入中
  // 是否是谷歌浏览器
  const isChrome = navigator.userAgent.indexOf('WebKit') > -1;

  useEffect(() => {
    setValue(value);
  }, [value]);

  const handleCompositionStart = () => {
    setComposing(true);
  };

  const handleCompositionEnd = (event: CompositionEvent<HTMLInputElement>) => {
    setComposing(false);
    // 谷歌浏览器onChange事件在handleCompositionEnd之前触发
    if (isChrome) {
      onChange?.(event.currentTarget.value);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // 没有采用输入法的值
    const rawValue = event.target.value;
    setValue(rawValue);
    if (!isComposing) {
      onChange?.(rawValue);
    }
  };

  return (
    <Input
      {...props}
      value={curValue}
      onChange={handleChange}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
    />
  );
}

export default React.memo(InputText);
