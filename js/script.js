var opened = false;

$(document).ready(function() {
  
  $('.logo').click(function() {
    if(!opened) {
      $('#under').slideDown(800);
      opened = true;
    } else {
      $('#under').slideUp(800);
      opened = false;
    }
  });
  
  $(".hover").hover(
    function() {
      $(this).stop().animate({"opacity": "0"}, 600);
    },
    function() {
      $(this).stop().animate({"opacity": "1"}, 600);
  });
  
  $('.info').click(function() {
    $('#infopage').slideDown(800);
    $('.tipsy').fadeOut(200);
    $('.info').fadeOut(400);
    $('.close').delay(400).fadeIn(400);
    $('footer').fadeOut(400);
  });
  
  $('.close').click(function() {
    $('#infopage').slideUp(800);
    $('.tipsy').fadeOut(200);
    $('.close').fadeOut(400);
    $('.info').delay(400).fadeIn(400);
    $('footer').fadeIn(400);
  });
  
  $('.info').tipsy({gravity: 'e', fade: true, offset: 10, delayIn: 400});
  $('.close').tipsy({gravity: 'e', fade: true, offset: 10, delayIn: 400});
  $('.twitter').tipsy({gravity: 's', fade: true, offset: 10, delayIn: 400});
  $('.forrst').tipsy({gravity: 's', fade: true, offset: 10, delayIn: 400});
  $('.tumblr').tipsy({gravity: 's', fade: true, offset: 10, delayIn: 400});
  $('.facebook').tipsy({gravity: 's', fade: true, offset: 10, delayIn: 400});
  $('.linkedin').tipsy({gravity: 's', fade: true, offset: 10, delayIn: 400});
  $('.copy').tipsy({gravity: 's', fade: true, offset: 10, delayIn: 400});
  $('.heart').tipsy({gravity: 's', fade: true, offset: 0});
  $('.logo').tipsy({gravity: 's', fade: true, offset: 20, delayIn: 400});
  $('#loc').tipsy({gravity: 'e', fade: true, offset: 20, delayIn: 400});
  $('.counter').tipsy({gravity: 's', fade: true, offset: 20, delayIn: 400});
  
  $(document).keyup(function(e) {
	  if(e.keyCode == 13 || e.keyCode == 32 || e.keyCode == 33 || e.keyCode == 34) {
	  	if(!opened) {
        $('#under').slideDown(800);
        opened = true;
      } else {
        $('#under').slideUp(800);
        opened = false;
      }
	  }
	  if(e.keyCode == 73) {
	    $('#infopage').slideDown(800);
      $('.tipsy').fadeOut(200);
      $('.info').fadeOut(400);
      $('.close').delay(400).fadeIn(400);
      $('footer').fadeOut(400);
	  }
	  if(e.keyCode == 88) {
	    $('#infopage').slideUp(800);
      $('.tipsy').fadeOut(200);
      $('.close').fadeOut(400);
      $('.info').delay(400).fadeIn(400);
      $('footer').fadeIn(400);
    }
  });
});