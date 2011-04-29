$(document).ready(function() {
  Object.prototype.isEmpty = function() {
    for (var prop in this) {
        if (this.hasOwnProperty(prop)) return false;
    }
    return true;
  };

  $('#warning').hide();
  $('#first').show();
  $('#footer').show();
  $('#menu').show();
  $('#logo').hover(function() {
      $('#copyright').fadeIn('slow');
    },
    function() {
      $('#copyright').fadeOut('slow');
    }
  );
  var storedName = $.cookie('confusedTreeName');
  if(storedName.isEmpty()) {
    $('.nameC').html('<input type="text" class="name" value="[insert name]"></input>');
  } else {
    $('.nameC').html(storedName)
    $('.nameC2').html(', ' + storedName)
  }
  $('.name').change(function() {
    $.cookie('confusedTreeName', $('.name').val(), { expires: 7});
  });
  $(".name").bind("keypress", function(e) {
    if (e.keyCode == 13) {
      return false;
    };
  });  
  $(".nameC").click(function(){
    $('.nameC').html('<input type="text" class="name" value=""></input>');
    $('.name').focus();
    $('.name').change(function() {
      $.cookie('confusedTreeName', $('.name').val()), { expires: 7};
    });
    $('.name').focusout(function() {
      if($.cookie('confusedTreeName').isEmpty()) {
        $('.nameC').html('<input type="text" class="name" value="[insert name]"></input>');
        $('.nameC2').html('');
      } else {
        $('.nameC').html($.cookie('confusedTreeName'));
        $('.nameC2').html(', ' + $.cookie('confusedTreeName'));
      }
    });
  });
  
  $(document).bind("contextmenu",function(e){
    return false;
  });
  
  var enableFade = true;
  
  if(enableFade) {
    $('.color1').click(function() {
      $('#first').fadeIn(1000);
      $('#second').fadeOut(1000);
      $('#third').fadeOut(1000);
      $('#fourth').fadeOut(1000);
      $('#fifth').fadeOut(1000);
      favicon.change('images/favicons/favicon.png');
    });
    $('.color2').click(function() {
      $('#first').fadeOut(1000);
      $('#second').fadeIn(1000);
      $('#third').fadeOut(1000);
      $('#fourth').fadeOut(1000);
      $('#fifth').fadeOut(1000);
      favicon.change('images/favicons/favicon2.png');
    });
    $('.color3').click(function() {
      $('#first').fadeOut(1000);
      $('#second').fadeOut(1000);
      $('#third').fadeIn(1000);
      $('#fourth').fadeOut(1000);
      $('#fifth').fadeOut(1000);
      favicon.change('images/favicons/favicon3.png');
    });
    $('.color4').click(function() {
      $('#first').fadeOut(1000);
      $('#second').fadeOut(1000);
      $('#third').fadeOut(1000);
      $('#fourth').fadeIn(1000);
      $('#fifth').fadeOut(1000);
      favicon.change('images/favicons/favicon4.png');
    });
    $('.color5').click(function() {
      $('#first').fadeOut(1000);
      $('#second').fadeOut(1000);
      $('#third').fadeOut(1000);
      $('#fourth').fadeOut(1000);
      $('#fifth').fadeIn(1000);
      favicon.change('images/favicons/favicon5.png');
    });
  };
});