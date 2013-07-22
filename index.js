var request = require("request"),
	gm = require("gm"),
	fs = require("fs");

// Prefix of URL
var pUrl;

// use to download file from http / http URL
var download = function(uri, filename, cb){
	request.get(uri)
		.on('error', function(err) {
			cb(err, null);
		})
		.on('end', function() {
			cb(undefined, filename);
		}).pipe(fs.createWriteStream(filename));
}

// use to extract filter rules in object
var ruleToObj = function(req) {
	var obj = {};
	if ('string' !== typeof req) {
		return obj;
	}
	if (req == '_') {
		return obj;
	}
	var _r = req.split(',');
	for (var i in _r) {
		if (/^c\d+x\d+(x[\d-]+x[\d-]+)?$/i.test(_r[i])) {
			obj.crop = _r[i].replace('X','x').replace(/c/i, '').split('x');
			if (obj.crop.length == 2) {
				obj.crop.push.apply(obj.crop, [0,0]);
			}
		} else if (/^\d+x\d+$/i.test(_r[i])) {
			obj.resize = _r[i].replace('X','x').split('x');
		} else if (/^r[\d-]+$/i.test(_r[i])) {
			obj.rotate = _r[i].replace(/r/i, '');
		} else if (/^q\d+$/i.test(_r[i])) {
			obj.quality = _r[i].replace(/q/i, '');
		} else {
			switch (_r[i]) {
				case 'flop':
					obj.flop = true;
				default:
					continue;
			}
		}
	}
	return obj;
}

exports.filter = function(req, res) {
	var re = new RegExp("/^"+pUrl.replace('\\','\\\\')+"\/([\w-,]+)\/(.+)");
	var m = req.url.match(re);
	if ('object'===typeof m && m.length == 2) {
		var rule=m[0], imgUrl = m[1];
	} else {
		res.send(500, "Invalid URL or request!");
		return;
	}
	var rule=req.params[0], imgUrl=req.params[1];
	var tmpname = (new Date()).getTime()+Math.floor(Math.random()*1000)+'-img';
	download(imgUrl, '/tmp/'+tmpname, function(err, filename) {
		if (err) {
			res.send("Error to download: "+imgUrl);
			return;
		}
		var fgm = gm(filename);
		var rules = ruleToObj(rule);
		for (var i in rules) {
			switch (i) {
				case 'resize':
					fgm.resize.apply(fgm, rules[i]);
					break;
				case 'rotate':
					fgm.rotate('rgb(255,255,255,0)', rules[i]);
					break;
				case 'flop':
					fgm.flop();
				case 'quality':
					fgm.quality(rules[i]);
					break;
			}
		}
		// do the cropping at last
		if (rules['crop']) {
			fgm.crop.apply(fgm, rules['crop']);
		}

		fgm.stream(function(err, stdout, stderr) {
			if (err) {
				res.send("Error to load: "+imgUrl);
				fs.unlink('/tmp/'+tmpname);
				return;
			}
			stdout.pipe(res);
			// remove when output to user
			stdout.on('end', function() {
				fs.unlink('/tmp/'+tmpname);
			});
		});
	});
};

exports.loader = function(prefix) {
	pUrl = prefix || '/l';

	return exports.filter;
}