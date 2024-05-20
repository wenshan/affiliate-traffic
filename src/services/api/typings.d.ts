declare namespace API {
  type CurrentUser = {
    name?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type getFakeCaptchaParams = {
    /** 手机号 */
    phone?: string;
  };

  type LoginParams = {
    name?: string;
    password?: string;
    autoLogin?: boolean;
    email?: string;
  };

  type RegisterParams = {
    name?: string;
    password?: string;
    autoLogin?: boolean;
    email?: string;
  };

  type LoginResult = {
    status?: number;
    success?: boolean;
    msg?: string;
    currentAuthority?: string;
  };

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type RuleListItem = {
    id?: number;
    key?: number;
    userid?: number;
    roomid?: string;
    areas?: string;
    region?: string;
    build?: number;
    unit?: number;
    room?: number;
    is_certification?: number;
    name?: string;
    owner?: number;
    contractId?: string;
    contractPath?: string;
    signatureFile?: string;
    is_checkSignature?: number;
    is_submitConfirmation?: number;
    submitConfirmation?: number;
    is_submitContractUnwilling?: number;
    mobile?: number;
    is_checkMobile?: number;
    propertyType?: number;
    feedback?: string;
    updatedAt?: string;
    createdAt?: string;
  };

  type ruleParams = {
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  };
}
