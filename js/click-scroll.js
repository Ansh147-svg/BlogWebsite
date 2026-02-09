//jquery-click-scroll
//by syamsul'isul' Arifin

var sectionArray = [1, 2, 3, 4, 5];

function getExistingSections() {
    var sections = [];
    $.each(sectionArray, function(_, value){
        var targetSelector = '#section_' + value;
        var targetElement = $(targetSelector);
        if (targetElement.length) {
            sections.push({
                index: value - 1,
                element: targetElement
            });
        }
    });
    return sections;
}

var sections = getExistingSections();

$(document).on('scroll', function(){
    if (!sections.length) {
        return;
    }

    var docScroll = $(document).scrollTop();
    var docScroll1 = docScroll + 1;

    $.each(sections, function(_, section){
        var offsetData = section.element.offset();
        if (!offsetData) {
            return;
        }

        var offsetSection = offsetData.top - 75;
        if (docScroll1 >= offsetSection) {
            $('.navbar-nav .nav-item .nav-link').removeClass('active');
            $('.navbar-nav .nav-item .nav-link:link').addClass('inactive');
            $('.navbar-nav .nav-item .nav-link').eq(section.index).addClass('active');
            $('.navbar-nav .nav-item .nav-link').eq(section.index).removeClass('inactive');
        }
    });
});

$(document).on('click', '.click-scroll', function(e){
    var href = $(this).attr('href');
    if (!href || href.charAt(0) !== '#') {
        return;
    }

    var targetElement = $(href);
    if (!targetElement.length) {
        return;
    }

    e.preventDefault();
    var offsetData = targetElement.offset();
    if (!offsetData) {
        return;
    }

    var offsetClick = offsetData.top - 75;
    $('html, body').animate({
        'scrollTop': offsetClick
    }, 300);
});

$(document).ready(function(){
    $('.navbar-nav .nav-item .nav-link:link').addClass('inactive');
    $('.navbar-nav .nav-item .nav-link').eq(0).addClass('active');
    $('.navbar-nav .nav-item .nav-link:link').eq(0).removeClass('inactive');
});
