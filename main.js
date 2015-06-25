var fs = require("fs"),
  http = require("http"),
  url = require('url');

  // console.log(marked('I am using __markdown__.'));
// Outputs: <p>I am using <strong>markdown</strong>.</p>

http.createServer(responseHandler).listen(process.env.PORT);

function responseHandler(req, res) {
  if (req.url.match("fav")) {
    res.end("");
    return;
  }

  if (req.url === "/") {
    res.writeHead(200, {"Content-Type": "text/html"});
    fs.readFile('index.html', 'utf8', function (err,data) {
     res.end(data);
    });
  }else if (req.url.match("/markdown")){
     res.writeHead(200, {"Content-Type": "text/html"});
     var marked = require('marked');
     var content = req.url.match(/markdown\/(.*)/)[1];
     var md = marked(decodeURIComponent(content));
     res.write(md);
     res.end();

   }
}
