var cheerio = require("cheerio");
var request = require("request");
var fs = require("fs");

var reqUrl = "https://www.zhihu.com/question/48804993#answer-40578029";

request(reqUrl, function(err, res, body) {
	if (err) {
		console.log("error" + err.message);
		process.exit();
	}
	if (res.statusCode === 200) {
		handle(body);
	}
});

function handle(body) {
	var $ = cheerio.load(body);
	var imgs = $(".zm-editable-content img").toArray();
	var imgSrcs = [];
	for (var i = 0; i < imgs.length; ++i) {
		var url = imgs[i].attribs.src;
		if (url.indexOf("http") === 0) {
			imgSrcs.push(url);
		}
	}
	for (var j = 0; j < imgSrcs.length; ++j) {
		var num = 0;
		(function(j) {
			request(imgSrcs[j], function() {
				console.log(num++ + " success\n");
			}).pipe(fs.createWriteStream('images/' + j + '.jpg'));
		})(j);
	}
}