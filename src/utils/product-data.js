const productData = {};
data = [
  {
    value: 632,
    name0: '五金/硬件',
    name1: '',
    name2: '',
    name3: '',
    name4: '',
    name5: '',
    name6: '',
  },
  {
    value: 500096,
    name0: '五金/硬件',
    name1: '五金泵',
    name2: '',
    name3: '',
    name4: '',
    name5: '',
    name6: '',
  },
  {
    value: 500100,
    name0: '五金/硬件',
    name1: '五金泵',
    name2: '井泵/系统',
    name3: '',
    name4: '',
    name5: '',
    name6: '',
  },
  {
    value: 500101,
    name0: '五金/硬件',
    name1: '五金泵',
    name2: '实用泵',
    name3: '',
    name4: '',
    name5: '',
    name6: '',
  },
  {
    value: 500099,
    name0: '五金/硬件',
    name1: '五金泵',
    name2: '家用电器泵',
    name3: '',
    name4: '',
    name5: '',
    name6: '',
  },
  {
    value: 500098,
    name0: '五金/硬件',
    name1: '五金泵',
    name2: '泳池、喷泉与池塘泵',
    name3: '',
    name4: '',
    name5: '',
    name6: '',
  },
  {
    value: 500097,
    name0: '五金/硬件',
    name1: '五金泵',
    name2: '洒水器、助力器与灌溉系统泵',
    name3: '',
    name4: '',
    name5: '',
    name6: '',
  },
  {
    value: 500102,
    name0: '五金/硬件',
    name1: '五金泵',
    name2: '集水坑/下水道/污水泵',
    name3: '',
    name4: '',
    name5: '',
    name6: '',
  },
  {
    value: 2878,
    name0: '五金/硬件',
    name1: '五金配件',
    name2: '',
    name3: '',
    name4: '',
    name5: '',
    name6: '',
  },
  {
    value: 500054,
    name0: '五金/硬件',
    name1: '五金配件',
    name2: '五金紧固件',
    name3: '',
    name4: '',
    name5: '',
    name6: '',
  },
  {
    value: 2195,
    name0: '五金/硬件',
    name1: '五金配件',
    name2: '五金紧固件',
    name3: '垫圈',
    name4: '',
    name5: '',
    name6: '',
  },
  {
    value: 2230,
    name0: '五金/硬件',
    name1: '五金配件',
    name2: '五金紧固件',
    name3: '子母螺丝/对锁螺丝',
    name4: '',
    name5: '',
    name6: '',
  },
  {
    value: 1739,
    name0: '五金/硬件',
    name1: '五金配件',
    name2: '五金紧固件',
    name3: '螺帽与螺栓',
    name4: '',
    name5: '',
    name6: '',
  },
  {
    value: 500055,
    name0: '五金/硬件',
    name1: '五金配件',
    name2: '五金紧固件',
    name3: '螺纹杆',
    name4: '',
    name5: '',
    name6: '',
  },
  {
    value: 2251,
    name0: '五金/硬件',
    name1: '五金配件',
    name2: '五金紧固件',
    name3: '螺钉',
    name4: '',
    name5: '',
    name6: '',
  },
  {
    value: 2408,
    name0: '五金/硬件',
    name1: '五金配件',
    name2: '五金紧固件',
    name3: '钉子',
    name4: '',
    name5: '',
    name6: '',
  },
  {
    value: 7062,
    name0: '五金/硬件',
    name1: '五金配件',
    name2: '五金紧固件',
    name3: '铆钉',
    name4: '',
    name5: '',
    name6: '',
  },
  {
    value: 1508,
    name0: '五金/硬件',
    name1: '五金配件',
    name2: '五金紧固件',
    name3: '镙钉套',
    name4: '',
    name5: '',
    name6: '',
  },
];
const data1 = [];
data.forEach(function (item, index) {
  const temp = {};
  if (item.name6) {
    temp['value'] = item.value;
    temp['name'] =
      item.name0 +
      '>' +
      item.name1 +
      '>' +
      item.name2 +
      '>' +
      item.name3 +
      '>' +
      item.name4 +
      '>' +
      item.name5 +
      '>' +
      item.name6;
  }
  if (item.name5) {
    temp['value'] = item.value;
    temp['name'] =
      item.name0 +
      '>' +
      item.name1 +
      '>' +
      item.name2 +
      '>' +
      item.name3 +
      '>' +
      item.name4 +
      '>' +
      item.name5;
  }
  if (item.name4) {
    temp['value'] = item.value;
    temp['name'] =
      item.name0 + '>' + item.name1 + '>' + item.name2 + '>' + item.name3 + '>' + item.name4;
  }
  if (item.name3) {
    temp['value'] = item.value;
    temp['name'] = item.name0 + '>' + item.name1 + '>' + item.name2 + '>' + item.name3;
  }
  if (item.name2) {
    temp['value'] = item.value;
    temp['name'] = item.name0 + '>' + item.name1 + '>' + item.name2;
  }
  if (item.name1) {
    temp['value'] = item.value;
    temp['name'] = item.name0 + '>' + item.name1;
  }
  if (item.name0) {
    temp['value'] = item.value;
    temp['name'] = item.name0;
  }
  data1.push(temp);
});
