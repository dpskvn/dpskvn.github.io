grow = (ele) ->
  ($(ele).css 'height': $(window).height())

$ ->
  grow '.splash'
  bg = new Image()
  bg.src = "assets/images/tracks.jpg";
  bg.onload = ->
    $(".splash").css("background-image": "url(assets/images/tracks.jpg)")
    $(".splash").animate {"opacity": 1}, 1000, (callback) ->
      $('.ontrack').addClass 'animated fadeInDown'
      $('.track').addClass 'animated fadeIn'

  $(window).resize ->
    grow '.splash'
  
  $('.email').attr 'href': 'mailto:dpaskvan@gmail.com'