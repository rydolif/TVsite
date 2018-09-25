$(function() {
  

//----------------------------parallax----------------------------------
  $(window).scroll(function() {

    var parallax = $(this).scrollTop();

    $('.s').css({
      'transform' : 'translate(0%, ' + parallax/7 + '%)'
    });

  });

//----------------------------wowJS-------------------------------
  var wow = new WOW(
    {
      boxClass:     'wow',      // animated element css class (default is wow)
      animateClass: 'animated', // animation css class (default is animated)
      offset:       0,          // distance to the element when triggering the animation (default is 0)
      mobile:       true,       // trigger animations on mobile devices (default is true)
      live:         true,       // act on asynchronously loaded content (default is true)
      callback:     function(box) {
        // the callback is fired every time an animation is started
        // the argument that is passed in is the DOM node being animated
      },
      scrollContainer: null // optional scroll container selector, otherwise use window
    }
  );
  wow.init();


//----------------------------masonry-------------------------------
  $('.grid').masonry({
    itemSelector: '.grid-item',
    columnWidth: 1
  });

//------------------------------гамбургер-----------------------------
  $('.hamburger').click(function() {
    $(this).toggleClass('hamburger-active');
    $('nav').toggleClass('nav-active');
    $('header').toggleClass('header-menu');
  });

//-------------------------------попандер---------------------------------------
  $('.modal').popup({transition: 'all 0.3s'});

//------------------------------------form-------------------------------------------
  $('input[type="tel"]').mask('+0 (000) 000-00-00');

  jQuery.validator.addMethod("phoneno", function(phone_number, element) {
     return this.optional(element) || phone_number.match(/\+[0-9]{1}\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}/);
  }, "Введите Ваш телефон");

  $(".form").each(function(index, el) {
    $(el).addClass('form-' + index);

    $('.form-' + index).validate({
      rules: {
        phone: {
          required: true,
          phoneno: true
        },
        name: 'required',
      },
      messages: {
        name: "Введите Ваше имя",
        phone: "Введите Ваш телефон",
      },
      submitHandler: function(form) {
        var t = {
          name: jQuery('.form-' + index).find("input[name=name]").val(),
          phone: jQuery('.form-' + index).find("input[name=phone]").val(),
          subject: jQuery('.form-' + index).find("input[name=subject]").val()
        };
        ajaxSend('.form-' + index, t);
      }
    });

  });

  function ajaxSend(formName, data) {
    jQuery.ajax({
      type: "POST",
      url: "sendmail.php",
      data: data,
      success: function() {
        $(".modal").popup("hide");
        $("#thanks").popup("show");
        setTimeout(function() {
          $(formName).trigger('reset');
        }, 2000);
      }
    });
  }

//----------------------------------------fixed----------------------------------
  $(window).scroll(function(){
      if($(this).scrollTop()>20){
          $('.header').addClass('header-active');
      }
      else if ($(this).scrollTop()<20){
          $('.header').removeClass('header-active');
      }
  });

//-------------------------скорость якоря---------------------------------------
  $(".header__list").on("click","a", function (event) {
      event.preventDefault();
      var id  = $(this).attr('href'),
          top = $(id).offset().top;
      $('body,html').animate({scrollTop: top - 60}, 'slow', 'swing');
  //--------------------закриття меню при кліку на ссилку якоря--------------------
     // $('.hamburger').removeClass('hamburger-active');
     // $('.header-menu').removeClass('header-menu');
     // $('.header-active').removeClass('header-active');
     // $('.nav-active').removeClass('nav-active');

  });
  
});

//----------------------------------------preloader----------------------------------

  $(window).on('load', function(){
    $('.preloader').delay(1000).fadeOut('slow');
  });


//----------------------------------------svg----------------------------------
  // ;( function( window, document )
  // {
  //   'use strict';

  //   var file     = 'img/symbols.html',
  //       revision = 1.2;

  //   if( !document.createElementNS || !document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' ).createSVGRect )
  //       return true;

  //   var isLocalStorage = 'localStorage' in window && window[ 'localStorage' ] !== null,
  //       request,
  //       data,
  //       insertIT = function()
  //       {
  //           document.body.insertAdjacentHTML( 'afterbegin', data );
  //       },
  //       insert = function()
  //       {
  //           if( document.body ) insertIT();
  //           else document.addEventListener( 'DOMContentLoaded', insertIT );
  //       };

  //   if( isLocalStorage && localStorage.getItem( 'inlineSVGrev' ) == revision )
  //   {
  //     data = localStorage.getItem( 'inlineSVGdata' );
  //     if( data )
  //     {
  //         insert();
  //         return true;
  //     }
  //   }

  //   try
  //   {
  //     request = new XMLHttpRequest();
  //     request.open( 'GET', file, true );
  //     request.onload = function()
  //       {
  //         if( request.status >= 200 && request.status < 400 )
  //           {
  //             data = request.responseText;
  //             insert();
  //             if( isLocalStorage )
  //             {
  //               localStorage.setItem( 'inlineSVGdata',  data );
  //               localStorage.setItem( 'inlineSVGrev',   revision );
  //             }
  //         }
  //     }
  //     request.send();
  //   }
  //   catch( e ){}

  // }( window, document ) );


         var acc = $('.calc__title');
var accContent = $('.calc__content');
$('.calc__title.calc__active').next().slideDown(500);
acc.on('click', function(e) {
  if ($(this).hasClass('calc__active')) {
    $(this).removeClass('calc__active');
    $(this).next().slideUp(500);
  }
  else {
    $(this).addClass('calc__active');
    accContent.not($(this).next()).slideUp(500);
    acc.not($(this)).removeClass('calc__active');
    $(this).next().slideDown(500);
  }
});