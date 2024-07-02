export default (list) => {
  // https://www.xiabingbao.com/post/comments/comments-list-to-tree-r7zsnb.html
  const newList = JSON.parse(JSON.stringify(list)); // 避免影响外层的数组
  const map = new Map();
  const result = [];

  newList.forEach((item) => {
    map.set(item.key, item);
  });
  newList.forEach((item) => {
    if (item.father_key) {
      const parentItem = map.get(item.father_key);
      if (parentItem) {
        if (!parentItem.children) {
          parentItem['children'] = [];
        }
        parentItem.children.push(item);
      }
    } else {
      result.push(item);
    }
  });
  return result;
};
