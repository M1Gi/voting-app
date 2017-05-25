'use strict';

var $ = require('jquery');
var localStorage = require('localStorage');

$(document).ready(function () {
    if (window.location.pathname === localStorage.lastClicked) {
        $('.main-nav a[href="' + localStorage.lastClicked + '"]').addClass('active-class');
        $('.register a[href="' + localStorage.lastClicked + '"]').addClass('active-class');
    }
    $('a').click(function () {
        localStorage.lastClicked = $(this).attr('href');
    });

    $('#bar').click(function () {
        $('.mobile-nav').slideToggle(300);
    });

    var howMany = $('input[type="text"]').length
    $('#add-button').click(function () {
        console.log(howMany)
        if (howMany !==10 ) {
            $('input[name="choice' + (howMany - 1) + '"]').after(`<input maxlength="40"required type="text" placeholder="Choice #${howMany}" name="choice${howMany}" />`)
            howMany++;
        }
    });


});