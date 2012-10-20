/**
 * Asimi JS - An express.js based webapp that allows you to control Arduino based robots from anywhere
 *
 * http://hardwarefun.com/projects/asimijs
 *
 * Author: Sudar
 */

var socket = io.connect('http://hardwarefun.com:3000');

// When the list of users is updated
socket.on('list', function (data) {
    $('#user-list li').remove();

    for (var i = 0; i < data.list.length; i++) {
        if (data.list[i] == 'Sudar') {
            $('#user-list ul').append('<li class = "admin">' + data.list[i] + '</li>');
        } else {
            $('#user-list ul').append('<li>' + data.list[i] + '</li>');
        }
    }
});

$(document).ready(function () {
    $('#addme').click(function () {
        var nickname = $('#name').val();

        if (nickname !== '') {
            if (nickname === 'Sudar') {
                socket.emit('join', { nickname: 'Sudar', pass: $('#password').val() }, function (result) {
                    if (!result) {
                        alert ("You don't seem to be Sudar. Are you?");    
                    } else {
                        $('div.login').hide();
                        $('div.admin_main').show();
                    }    
                });
            } else {
                alert ("You don't seem to be Sudar. Are you?");    
            }
        }
    });

    // choosing a user
    $('#user-list ul').delegate('li', 'click', function () {
        var user = $(this).text();

        if (user != '') {
            socket.emit('choose', {nickname: user});
        }
    });

    // To make enter work
    $('#name,#password').keyup(function (event) {
        if (event.keyCode == 13) {
            $('#addme').click();
        }
    });
});
