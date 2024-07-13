export default {
  setType: [
    { value: 'home', label: 'home' },
    { value: 'list', label: 'list' },
    { value: 'product', label: 'product' },
    { value: 'detail', label: 'detail' },
    { value: 'other', label: 'other' },
  ],
  getTableType: {
    all: { text: '所有', status: 'all' },
    home: { text: 'home', status: 'home' },
    list: { text: 'list', status: 'list' },
    product: { text: 'product', status: 'product' },
    detail: { text: 'detail', status: 'detail' },
    other: { text: 'other', status: 'other' },
  },
};
