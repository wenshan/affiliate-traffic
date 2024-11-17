'use strict';
const { Client } = require('node-scp');
// https://blog.mazey.net/2180.html
// 服务器信息
const host = '139.224.110.211';
const username = 'root';
const password = 'hws2416$';
const port = 22;
const localFilePath = `${__dirname}/dist/index.html`;
const remoteFilePath = '/www/wwwroot/affiliate-traffic';
// const remoteFilePath = '/www/traffic';

const remoteAddress = `${username}:${password}@${host}`;
console.log('localFilePath:', `${localFilePath}`);
console.log('au:', `${remoteAddress}:${remoteFilePath}`);

Client({
  host,
  port,
  username,
  password,
})
  .then((client) => {
    client
      .uploadFile(
        localFilePath,
        remoteFilePath,
        // options?: TransferOptions
      )
      .then((response) => {
        client.close(); // remember to close connection after you finish
      })
      .catch((error) => {});
  })
  .catch((e) => console.log(e));
