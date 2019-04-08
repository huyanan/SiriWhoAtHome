const nmap = require('node-nmap');
nmap.nmapLocation = 'nmap'; //default
const say = require('say')
let fs = require('fs')
cfg = require('../config.json')
console.log(cfg.nmapJsonPath)

// Use default system voice and speed
// say.speak('启动谁在家系统!请等待大约5秒！')

let scanCount = 0


function newScan() {
  scanCount++
  console.log(scanCount)
  var osandports = new nmap.QuickScan('192.168.49.0-130');

  osandports.on('complete',function(data){
    // console.log(data);
    // data.forEach((item)=>{
      // if (item.ip === '192.168.49.254') {
      //   say.speak('楠哥已上线！')
      // }
    // })
    writeJson(data)
  });
  osandports.on('error', function(error){
    console.log(error);
  });

  osandports.startScan();
}

function writeJson (json) {
  fs.writeFile(cfg.nmapJsonPath, JSON.stringify(json), (err)=>{
    if (err) {
      console.error(err);
    }
    console.log('---json更新成功！---')
  })
}

function loopScan(){
  say.speak('启动谁在家系统!请等待大约5秒！')
  setInterval(()=>{
    newScan()
  },5000)
}

// 启动谁在家系统
loopScan()
