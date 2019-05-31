const cheerio = require('cheerio')
const $ = cheerio.load('<h2 class="title">Hello world</h2>')
 console
$('h2.title').text('Hello there!')
$('h2').addClass('welcome')
 
$.html()