function hooks(hooksTitle, hooksMessage, hooksApi){

  $.ajax({
    type: "POST",
    dataType: "html",
    url: "http://hooks.events/hooks/post.php",
    data: { hooksTitle: hooksTitle, hooksMessage: hooksMessage, hooksApi: hooksApi }
    }).done(function(data) {

    });

}