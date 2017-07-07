$(function () {
    var count = 1;
    var emailRegular = /^[a-z0-9_-]+@[a-z0-9-]+\.[a-z]{2,6}$/i;
    var textRegular = /(<([^>]+)>)/ig;
    var ip = $('#ip').data('ip');
    var browser = $('#browser').data('browser');

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $('#add-note-fade-in').on('click', function () {
        $('.form-horizontal').slideToggle(200);
        setTimeout(function () {
            $('.form-note').show();
        }, 50);
    });

    $('#add-note').on('click', function () {
        count--;
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();
        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();
        var createdAt =
            ((''+day).length<2 ? '0' : '') + day + '.' +
            ((''+month).length<2 ? '0' : '') + month + '.' +
            year + ' ' +
            ((''+hour).length<2 ? '0' : '') + hour + ":" +
            ((''+min).length<2 ? '0' : '') + min + ":" +
            ((''+sec).length<2 ? '0' : '') + sec;
        var lastNote = 25 + count;
        var username = $('#username').val();
        var email = $('#email').val();
        var homepage = $('#homepage').val();
        if (homepage.length === 0) {
            homepage = 'no homepage';
        }
        var text = $('#text').val();
        if (username !== '') {
            if (email !== '') {
                if (email.search(emailRegular) === 0) {
                    if (text !== '') {
                        if (text.search(textRegular) !== 0) {
                            if(grecaptcha.getResponse() !== "") {
                                $.ajax({
                                    url: "add-note",
                                    method: "POST",
                                    data: {
                                        username: username,
                                        email: email,
                                        homepage: homepage,
                                        text: text,
                                        ip: ip,
                                        browser: browser
                                    },
                                    success: function (data) {
                                        var note="";
                                        note += "<div id=\"note" + count + "\">";
                                        note += "<div class=\"note-text\" '>";
                                        note += text;
                                        note += "<\/div>";
                                        note += "<div class=\"note-name-time\">";
                                        note += "User: <b>" + username + "<\/b> wrote on <b>" + createdAt + "<\/b>";
                                        note += "<\/div>";
                                        note += "<div class=\"note-email-homepage\">";
                                        note += "E-mail: <b>" + email + "<\/b> Homepage: <b>" + homepage + "<\/b>";
                                        note += "<\/div>";
                                        note += "<div class=\"note-ip-browser\">";
                                        note += "IP: <b>" + ip + "<\/b> Browser: <b>" + browser + "<\/b>";
                                        note += "<\/div>";
                                        note += "<div class=\"border\"><\/div>";
                                        note += "<\/div>";
                                        $(note).prependTo(".ajax-note");
                                        $('#note' + lastNote).remove();
                                        $('.alert-success').slideToggle(400).fadeIn('fast').text('Note added!');
                                        setTimeout(function() {
                                            $('.alert-success').slideToggle(400).fadeOut('fast');
                                        }, 2000);
                                        $('#username').val('');
                                        $('#email').val('');
                                        $('#homepage').val('');
                                        grecaptcha.reset();
                                        $('#text').val('');
                                    },
                                    error: function () {
                                        $('.alert-danger').slideToggle('fast').fadeIn('fast').text('Something is wrong');
                                        setTimeout(function() {
                                            $('.alert-danger').slideToggle('fast').fadeOut('fast');
                                        }, 1500);
                                    }
                                });
                            } else {
                                $('.alert-danger').slideToggle('fast').fadeIn('fast').text('CAPTCHA');
                                setTimeout(function() {
                                    $('.alert-danger').slideToggle('fast').fadeOut('fast');
                                }, 1500);
                            }
                        } else {
                            $('.alert-danger').slideToggle('fast').fadeIn('fast').text('The text should not contain html tags');
                            setTimeout(function() {
                                $('.alert-danger').slideToggle('fast').fadeOut('fast');
                            }, 1500);
                        }
                    } else {
                        $('.alert-danger').slideToggle('fast').fadeIn('fast').text('Text is empty');
                        setTimeout(function() {
                            $('.alert-danger').slideToggle('fast').fadeOut('fast');
                        }, 1500);
                    }
                } else {
                    $('.alert-danger').slideToggle('fast').fadeIn('fast').text('Incorrect email');
                    setTimeout(function() {
                        $('.alert-danger').slideToggle('fast').fadeOut('fast');
                    }, 1500);
                }
            } else {
                $('.alert-danger').slideToggle('fast').fadeIn('fast').text('Email is empty');
                setTimeout(function() {
                    $('.alert-danger').slideToggle('fast').fadeOut('fast');
                }, 1500);
            }
        } else {
            $('.alert-danger').slideToggle('fast').fadeIn('fast').text('Username is empty');
            setTimeout(function() {
                $('.alert-danger').slideToggle('fast').fadeOut('fast');
            }, 1500);
        }
    });

    function getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    $('#sort-by-user').on('click', function () {
        if (getCookie('type') !== 'user') {
            document.cookie = "type=user";
            document.cookie = "sort=desc";
        } else {
            if (getCookie('sort') === 'desc') {
                document.cookie = "sort=asc";
            } else {
                document.cookie = "sort=desc";
            }
        }
        location.href = window.location.href;
    });

    $('#sort-by-email').on('click', function () {
        if (getCookie('type') !== 'email') {
            document.cookie = "type=email";
            document.cookie = "sort=desc";
        } else {
            if (getCookie('sort') === 'desc') {
                document.cookie = "sort=asc";
            } else {
                document.cookie = "sort=desc";
            }
        }
        location.href = window.location.href;
    });

    $('#sort-by-date').on('click', function () {
        if (getCookie('type') !== 'date') {
            document.cookie = "type=date";
            document.cookie = "sort=desc";
        } else {
            if (getCookie('sort') === 'desc') {
                document.cookie = "sort=asc";
            } else {
                document.cookie = "sort=desc";
            }
        }
        location.href = window.location.href;
    });
});