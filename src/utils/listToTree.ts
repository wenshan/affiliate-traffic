const listToTree = (list: any) => {
  const newList = JSON.parse(JSON.stringify(list)); // 避免影响之前的数组
  const map = new Map();
  const result: any[] = [];

  newList.forEach((item: { key: any }) => {
    map.set(item.key, item);
  });

  newList.forEach((item: { key: any; father_key: any }) => {
    if (item.father_key) {
      const parent = map.get(item.father_key);
      if (parent) {
        if (!parent.children) {
          parent['children'] = [];
        }
        parent.children.push(item);
      }
    } else {
      result.push(item);
    }
  });
  console.log('listToTree result:', result);
  return result;
};

export default listToTree;
