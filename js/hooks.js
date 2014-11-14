//hooks
function hooks(hooksTitle, hooksMessage, hooksApi){
  var data = { hooksTitle: hooksTitle, hooksMessage: hooksMessage, hooksApi: hooksApi };
  
  body = "";
  for (var key in data){
    body += key + "=" + encodeURIComponent(data[key]) + "&";
  }
  body = body.substring(0, body.length - 1);
 
  var req = new XMLHttpRequest;
  req.open('POST', 'http://hooks.events/hooks/post.php', true);
  req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  req.send(body);
}
