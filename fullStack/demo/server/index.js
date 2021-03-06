const api = require('./api')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(api)
// 访问静态资源文件 。
app.use(express.static(path.resolve(__dirname, '../dist')))
// 单页应用，所有请求都通过 /dist/index.html
app.get('*', function (req, res) {
  const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html', 'utf-8'))
  res.send(html)
})
// 监听8088端口
app.listen(8088)
console.log('success listen...')