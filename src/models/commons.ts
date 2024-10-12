/* eslint-disable */
/* @ts-ignore */
import QueryString from 'query-string';
import { useEffect, useState } from 'react';

// platform: 'pc', // wap:浏览器访问 wxwap: 微信访问
// type: 1, // 登录参数 1.微信 2.QQ 3.穿新衣 4.微信公众号 5.芝麻信用 6.京东 7.宝宝树 8.返利 9.QQ内部应用登录 10.微信积分购小程序 11. 支付宝无线换小程序 12.微信无线换小程序 13.微信穿新衣小程序
function Commons() {
  const [userinfo, setUserinfo] = useState();
  const [platform, setPlatform] = useState();
  const [type, setType] = useState();
  const [code, setCode] = useState();
  const [state, setState] = useState();
  const [defaultProject, setDefaultProject] = useState();
  const [language, setLanguage] = useState<string>('en-US');
  const initQueryParams = async () => {
    const { search } = window.document.location;
    const query = QueryString.parse(search);
    if (query) {
      const { platform, type, code, state } = query;
      if (platform) {
        // @ts-ignore
        setPlatform(platform);
      }
      if (type) {
        // @ts-ignore
        setType(type);
      }
      if (code) {
        // @ts-ignore
        setCode(code);
      }
      if (state) {
        // @ts-ignore
        setState(state);
      }
    }
  };
  useEffect(() => {
    initQueryParams();
  }, []);
  return {
    userinfo,
    setUserinfo,
  };
}
export default Commons;
