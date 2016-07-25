var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var reqUrl = 'http://desk.zol.com.cn/bizhi/854_10047_2.html';

request(reqUrl,function(err,res,body){
	if(err){
		console.log('error: ' + err.message);
		process.exit();
	}
	if(res.statusCode === 200){
		handle(body);
	}
});

function handle(body){
	var $ = cheerio.load(body);
	var img = $('#showImg li img').toArray();
	var len = img.length;
	for(var i = 0; i < len; ++i){
		var url = i >= 4 ? img[i].attribs.srcs : img[i].attribs.src;
		url = url.replace('144x90','1366x768');
		request(url).pipe(fs.createWriteStream('images/sc/' + i + '.jpg'));
	}
}