$(function () {
    var emailRegular = /^[a-z0-9_-]+@[a-z0-9-]+\.[a-z]{2,6}$/i;
    var textRegular = /(<([^>]+)>)/ig;
    var ip = $('#ip').data('ip');
    var browser = $('#browser').data('browser');
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
                                        note += "<div id=\"note\" hidden>";
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
                                        $(note).appendTo(".ajax-note");
                                        setTimeout(function () {
                                            $('#note').slideToggle(200);
                                        }, 200);
                                        $('#note25').remove();
                                        setTimeout(function () {
                                            $('.alert-success').fadeIn('fast').text('Note added!');
                                        }, 300);
                                        setTimeout(function() {
                                            $('.alert-success').fadeOut('fast');
                                        }, 1000);
                                    },
                                    error: function () {
                                        $('.alert-danger').fadeIn('fast').text('Something is wrong');
                                        setTimeout(function() {
                                            $('.alert-danger').fadeOut('fast');
                                        }, 1500);
                                    }
                                });
                            } else {
                                $('.alert-danger').fadeIn('fast').text('CAPTCHA');
                                setTimeout(function() {
                                    $('.alert-danger').fadeOut('fast');
                                }, 1500);
                            }
                        } else {
                            $('.alert-danger').fadeIn('fast').text('The text should not contain html tags');
                            setTimeout(function() {
                                $('.alert-danger').fadeOut('fast');
                            }, 1500);
                        }
                    } else {
                        $('.alert-danger').fadeIn('fast').text('Text is empty');
                        setTimeout(function() {
                            $('.alert-danger').fadeOut('fast');
                        }, 1500);
                    }
                } else {
                    $('.alert-danger').fadeIn('fast').text('Incorrect email');
                    setTimeout(function() {
                        $('.alert-danger').fadeOut('fast');
                    }, 1500);
                }
            } else {
                $('.alert-danger').fadeIn('fast').text('Email is empty');
                setTimeout(function() {
                    $('.alert-danger').fadeOut('fast');
                }, 1500);
            }
        } else {
            $('.alert-danger').fadeIn('fast').text('Username is empty');
            setTimeout(function() {
                $('.alert-danger').fadeOut('fast');
            }, 1500);
        }
    });
});