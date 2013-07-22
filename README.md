# Nodejs - FastLoad

This is a loading optimizer and on-the-fly image manipulation module for express web application framework.

## Basic

This project is designed for express web application framework, you may use it with other node framework. To use it in express, add the following code to your entry script (e.g. app.js).

	var app = express();
	...
	app.use(require('nodejs-fastload').loader());

Once it restarted your web app, **FastLoad** by default will handle all requests with prefix "/l". That is <domain name>/l/<parameters or "_" means nothing>/<original image URL>.

For example, if you want to load a image URL with **FastLoad**, you may load your image as below.

	http://yourdomainname.com/l/_/http://www.google.com/images/srpr/logo4w.png

The above image URL (http://www.google.com/images/srpr/logo4w.png) can be either internal or external image link.

## Advanced

Apart from the loading optimization, this project makes use of GraphicMagick module to enable image manipulation on-the-fly. You can replace the "_" from the parameteres part to any of the following configurations.

