
  (function ($) {
  
  "use strict";

    // MENU
    $('.navbar-collapse a').on('click',function(){
      $(".navbar-collapse").collapse('hide');
    });
    
    // CUSTOM LINK
    $('.smoothscroll').click(function(){
      var el = $(this).attr('href');
      var elWrapped = $(el);
      var header_height = $('.navbar').height();
  
      scrollToDiv(elWrapped,header_height);
      return false;
  
      function scrollToDiv(element,navheight){
        var offset = element.offset();
        var offsetTop = offset.top;
        var totalScroll = offsetTop-navheight;
  
        $('body,html').animate({
        scrollTop: totalScroll
        }, 300);
      }
    });

    $(window).on('scroll', function(){
      function isScrollIntoView(elem, index) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();
        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(window).height()*.5;
        if(elemBottom <= docViewBottom && elemTop >= docViewTop) {
          $(elem).addClass('active');
        }
        if(!(elemBottom <= docViewBottom)) {
          $(elem).removeClass('active');
        }
        var MainTimelineContainer = $('#vertical-scrollable-timeline')[0];
        var MainTimelineContainerBottom = MainTimelineContainer.getBoundingClientRect().bottom - $(window).height()*.5;
        $(MainTimelineContainer).find('.inner').css('height',MainTimelineContainerBottom+'px');
      }
      var timeline = $('#vertical-scrollable-timeline li');
      Array.from(timeline).forEach(isScrollIntoView);
    });
  
  })(window.jQuery);

  window.addEventListener('DOMContentLoaded', function () {
    var timeFields = document.querySelectorAll('input[name="form_time"]');
    var now = Date.now().toString();
    timeFields.forEach(function (field) {
      field.value = now;
    });

    var params = new URLSearchParams(window.location.search);
    var status = params.get('inquiry');
    var errorMessage = params.get('error');
    if (!status) {
      return;
    }

    var modalEl = document.getElementById('inquiryStatusModal');
    var titleEl = document.getElementById('inquiryStatusTitle');
    var bodyEl = document.getElementById('inquiryStatusBody');
    var message = status === 'success'
      ? 'Thank you! Your inquiry has been sent successfully.'
      : 'Sorry, your inquiry could not be sent. ' + (errorMessage ? decodeURIComponent(errorMessage) : 'Please try again later.');

    if (titleEl) {
      titleEl.textContent = status === 'success' ? 'Inquiry Sent' : 'Inquiry Failed';
    }
    if (bodyEl) {
      bodyEl.textContent = message;
    }

    if (modalEl && window.bootstrap && window.bootstrap.Modal) {
      var modal = new window.bootstrap.Modal(modalEl);
      modal.show();
    } else if (modalEl && window.jQuery && window.jQuery.fn && window.jQuery.fn.modal) {
      window.jQuery(modalEl).modal('show');
    } else {
      alert(message);
    }

    params.delete('inquiry');
    var newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '') + window.location.hash;
    window.history.replaceState({}, '', newUrl);
  });
