export default (list, keys = []) => {
  // https://juejin.cn/post/7043324432537878536
  // https://www.xiabingbao.com/post/comments/comments-list-to-tree-r7zsnb.html
  const newList = JSON.parse(JSON.stringify(list)); // 避免影响外层的数组
  const map = new Map();
  const result = [];

  newList.forEach((item) => {
    const temp = Object.assign({}, item, { active: 0 });
    map.set(item.key, temp);
  });
  if (keys && keys.length > 0) {
    keys.forEach((itemKey) => {
      const currentMap = map.get(itemKey);
      if (currentMap) {
        const tempObj = Object.assign({}, currentMap, { active: 1 });
        map.set(itemKey, tempObj);
      }
    });
  }
  const newLists = map.values();
  newLists.forEach((item) => {
    if (item.father_key) {
      let parentItem = map.get(item.father_key);
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
