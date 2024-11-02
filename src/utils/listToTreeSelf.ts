export default (list: any, currentItem = { key: '', father_key: '' }) => {
  // https://juejin.cn/post/7043324432537878536
  // https://www.xiabingbao.com/post/comments/comments-list-to-tree-r7zsnb.html
  const newList = JSON.parse(JSON.stringify(list)); // 避免影响外层的数组
  const map = new Map();
  const result: any[] = [];
  const rowsList: any[] = [];
  const father_key = [];

  newList.forEach((item: { key: any }) => {
    const temp = Object.assign({}, item, { active: 0 });
    map.set(item.key, temp);
  });

  // @ts-ignore
  if (currentItem && currentItem.key) {
    father_key.push(currentItem.key);
    if (currentItem.father_key) {
      const father01 = map.get(currentItem.father_key);
      if (father01) {
        father_key.push(father01.key);
        if (father01.father_key) {
          const father02 = map.get(father01.father_key);
          father_key.push(father02.key);
          if (father02.father_key) {
            const father03 = map.get(father02.father_key);
            father_key.push(father03.key);
            if (father03.father_key) {
              const father04 = map.get(father02.father_key);
              father_key.push(father04.key);
            }
          }
        }
      }
    }
    father_key.forEach((itemKey) => {
      const currentMap = map.get(itemKey);
      if (currentMap) {
        const tempObj = Object.assign({}, currentMap, { active: 1 });
        map.set(itemKey, tempObj);
      }
    });
  }

  map.forEach((value) => {
    rowsList.push(Object.assign({}, value));
    if (value.father_key) {
      let parentItem = map.get(value.father_key);
      if (parentItem) {
        if (!parentItem.children) {
          parentItem['children'] = [];
        }
        parentItem.children.push(value);
      }
    } else {
      result.push(value);
    }
  });
  return { rowsTree: result, rowsList };
};
