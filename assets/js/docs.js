
var q = "";

jQuery(function($) {

    // hiding the mobile navigation
    $('.main-nav').removeClass('expanded');

    // and toggling it again with a button
    $('.menu-toggle').click(function() {
        $('.main-nav').toggleClass('expanded');
        $(this).toggleClass('active');
    });

    $('.button-bars').click(function () {
        $('.docs__sidebar--menu').slideToggle();
    });

    $('.button-search').click(function () {
        $('.docs__sidebar--search').slideToggle();
    });

    $('main .content a.popup').magnificPopup({
        type: 'image'
    });

    $('div.gallery-popup').magnificPopup({
      delegate: 'a',
      type: 'image',
      gallery:{
        enabled:true
      }
    });

    // $(window).scroll(function () {
    //     $('header').css('backgroundPosition', '0px ' + (posTop() / 2) + 'px');
    // });

    // Jumpmenu for the versions.
    $("#version-changer-submit").hide();
    $("#version-changer select").change(function() {
        console.log('jo');
        window.location = $("#version-changer select option:selected").val();
    })

    // Zero Clipboard stuff.
    // $('pre code').each(function(index) {
    //     // Get the text to be copied to the clipboard
    //     var text = $(this).text();

    //     // Create the copy button
    //     var copyBtn = $('<span class="copy-btn">[ Copy Code ]</span>')
    //         .attr('data-clipboard-text', text) // set the text to be copied
    //         .insertBefore(this); // insert copy button before <pre>
    // });

    // initClipBoard();

    // Remove 'version changer' from the hash.
    if (window.location.hash == '#version-changer') {
        window.location.hash = '';
    }
    // Perhaps set focus to the search input, if there's no hash, and
    // '#jumpbutton' is visible, meaning we're on a large screen.
    if (window.location.hash == '' && !$('#jumpbutton').is(':visible')) {
        $('input#algolia-search').focus();
    }

    // Add 'stack' class to tables generated by markdown, so they display better on mobile.
    $('.content table').addClass('stack');

});

// function initClipBoard() {

//     var clipboard = new Clipboard('.copy-btn');

//     clipboard.on('success', function(e) {
//         $(e.trigger).text('[ Copied ]');
//         window.setTimeout(function(){ $(e.trigger).text('[ Copy code ]'); }, 2000);
//         e.clearSelection();
//     });

// }

function formatForUrl(str) {
    return str.replace(/_/g, '-')
        .replace(/ /g, '-')
        .replace(/:/g, '-')
        .replace(/\\/g, '-')
        .replace(/\//g, '-')
        .replace(/[^a-zA-Z0-9\-]+/g, '')
        .replace(/-{2,}/g, '-')
        .toLowerCase();
};

// function posTop() {
//     return typeof window.pageYOffset != 'undefined' ? window.pageYOffset: document.documentElement.scrollTop? document.documentElement.scrollTop: document.body.scrollTop? document.body.scrollTop:0;
// }

(function () {
    if (typeof self === 'undefined' || !self.Prism || !self.document) {
        return;
    }

    if (!Prism.plugins.toolbar) {
        console.warn('Copy to Clipboard plugin loaded before Toolbar plugin.');

        return;
    }

    var Clipboard = window.Clipboard || undefined;

    if (Clipboard && /(native code)/.test(Clipboard.toString())) {
        Clipboard = undefined;
    }

    if (!Clipboard && typeof require === 'function') {
        Clipboard = require('clipboard');
    }

    var callbacks = [];

    if (!Clipboard) {
        var script = document.createElement('script');
        var head = document.querySelector('head');

        script.onload = function () {
            Clipboard = window.Clipboard;

            if (Clipboard) {
                while (callbacks.length) {
                    callbacks.pop()();
                }
            }
        };

        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/1.7.1/clipboard.min.js';
        head.appendChild(script);
    }

    Prism.plugins.toolbar.registerButton('copy-to-clipboard', function (env) {
        var linkCopy = document.createElement('a');
        linkCopy.className = 'copy-code';
        linkCopy.setAttribute('aria-label', 'Copy Code');
        linkCopy.innerHTML = '<i class="icon-copy"></i>';

        if (!Clipboard) {
            callbacks.push(registerClipboard);
        } else {
            registerClipboard();
        }

        return linkCopy;

        function registerClipboard() {
            var clip = new Clipboard(linkCopy, {
                'text': function () {
                    return env.code;
                }
            });

            clip.on('success', function () {
                linkCopy.setAttribute('aria-label', 'Copied!');

                resetText();
            });
            clip.on('error', function () {
                linkCopy.textContent = 'Press Ctrl+C to copy';

                resetText();
            });
        }

        function resetText() {
            setTimeout(function () {
                linkCopy.setAttribute('aria-label', 'Copy Code');
            }, 5000);
        }
    });
})();