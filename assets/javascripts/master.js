(function() {
  var grow;

  grow = function(ele) {
    return $(ele).css({
      'height': $(window).height()
    });
  };

  $(function() {
    var bg;
    grow('.splash');
    bg = new Image();
    bg.src = "assets/images/tracks.jpg";
    bg.onload = function() {
      $(".splash").css({
        "background-image": "url(assets/images/tracks.jpg)"
      });
      return $(".splash").animate({
        "opacity": 1
      }, 1000, function(callback) {
        $('.ontrack').addClass('animated fadeInDown');
        return $('.track').addClass('animated fadeIn');
      });
    };
    $(window).resize(function() {
      return grow('.splash');
    });
    return $('.email').attr({
      'href': 'mailto:dpaskvan@gmail.com'
    });
  });

}).call(this);
