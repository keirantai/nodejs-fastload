# Nodejs - FastLoad

This is a loading optimizer and on-the-fly image manipulation module for express web application framework.

## Basic

This project is designed for express web application framework, you may use it with other node framework. To use it in express, add the following code to your entry script (e.g. app.js).

	var app = express();
	...
	app.use(require('nodejs-fastload').loader());

Once it restarted your web app, **FastLoad** by default will handle all requests with prefix "/l". That is 

	http://[domain name]/l/[parameters or "_" means nothing]/[original image URL]

For example, if you want to load a image URL with **FastLoad**, you may load your image as below.

	http://yourdomainname.com/l/_/http://www.google.com/images/srpr/logo4w.png

The above image URL (http://www.google.com/images/srpr/logo4w.png) can be either internal or external image link.

**Use different prefix of URL**

In case, you don't want to use "/l" prefix as the default URI for **FastLoad** module. You can specify your own URI as below.

	var app = express();
	...
	app.use(require('nodejs-fastload').loader('/myownuri'));

## Advanced

Apart from the loading optimization, this project makes use of GraphicMagick module to enable image manipulation on-the-fly. You can replace the "_" from the parameteres part to any of the following configurations.

**Resizing an image**

To resize an image, you need to specify the maximum width and height of the new image size. **FastLoad** will resize the image within the maximum size on proportion.

	http://[domain name]/l/[max. width]x[max. height]/[original image URL]

Example:

	http://yourdomainname.com/l/100x100/http://www.google.com/images/srpr/logo4w.png

**Cropping an image**

To crop and image, you have to specify the new width and height of the image with prefix "c".

	http://[domain name]/l/c[new width]x[new height]/[original image URL]

Example:

	http://yourdomainname.com/l/c100x100/http://www.google.com/images/srpr/logo4w.png

**Rotating an image**

To rotate the angel of an image, you simply tell the degrees of the angel with prefix "r".

	http://[domain name]/l/r[degrees of the angel]/[original image URL]

Example:

	http://yourdomainname.com/l/r90/http://www.google.com/images/srpr/logo4w.png

**Flopping an image from left-to-right or vice versa**

To flop an image, you only give the keyword "flop".

	http://[domain name]/l/flop/[original image URL]

Example:

	http://yourdomainname.com/l/flop/http://www.google.com/images/srpr/logo4w.png

**Changing quality of an image**

To change the quality of an image, you can specify the percentage of quality from 1 to 100 as low to high with prefix "q".

	http://[domain name]/l/q[percentage of quality]/[original image URL]

Example:

	http://yourdomainname.com/l/q100/http://www.google.com/images/srpr/logo4w.png

### Multiple Options

In additions to the single setting of the image manipulation, **FastLoad** also supports implement multiple options by using comma separator. For example you may want to resize an image to 100px width and 100px height, meanwhile, to rotate the image 90 degrees.

	http://yourdomainname.com/l/100x100,r90/http://www.google.com/images/srpr/logo4w.png
