const request = require('request');
const cfg = require('../config.json');
const say = require('say');

let home = [
  '192.168.1.1'
];

function loopScan() {
  setInterval(()=>{
    // 每天中午12点清空缓存
    clearCache()
    getJson(callback)
  },5000)
}

function clearCache(){
  const now = new Date()
  const hours = now.getHours()
  const min = now.getMinutes()
  if ((hours===12 && min===0)) {
    home = [
      '192.168.1.1',
      '192.168.1.110'
    ]
  }
}

function getJson(){
  request(cfg.remoteJsonPath, function (error, response, body) {
    console.log(body)
    if (!error && response.statusCode == 200) {
      // console.log(body) // 请求成功的处理逻辑
      callback(JSON.parse(body))
    }
  });
}

function callback(json){
  if (!json || !json.length) return
  let searchIndex = -1
  json.forEach((item)=>{
    searchIndex = home.indexOf(item.ip);
    if (searchIndex<0) {
      say.speak(`有人回家了,ip地址${item.ip}`)
      console.log(`有人回家了${item.ip}`)
      home.push(item.ip)
    }
  })
  // home.forEach((ip)=>{
  //   if (ip) {}
  // })
}

loopScan()
