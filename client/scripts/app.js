// YOUR CODE HERE:
var app;
$(function(){


  app = {
    server: 'https://api.parse.com/1/classes/chatterbox',
    room: 'lobby',

    init: function(){
      $('#chats').text('HEYYY')
      app.$roomSelect = $('#roomSelect');
      app.fetch();
    },

    send: function(data){
      $.ajax({
        // This is the url you should use to communicate with the parse API server.
        url: app.server,
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
          console.log('chatterbox: Message sent. Data: ', data);
        },
        error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to send message. Error: ', data);
        }
      })
    },

    fetch: function(){
        $.ajax({
        // This is the url you should use to communicate with the parse API server.
          // This line allows us to see the message, but if we delete we pass the test.
          // + '?order=-createdAt',
        url: app.server,
        type: 'GET',
        data: {order: '-createdAt'},
        contentType: 'application/json',
        success: function (data) {
          console.log('chatterbox: Message retrieved. Data: ', data);
          // process rooms
          app.populateRooms(data.results);
          // process chats (maybe add escapeHTML here)
          // app.fillPage(data.results)
          app.populatePage(data.results);
        },
        error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to retrieve message. Error: ', data);
        }
      })   
      // app.fetch();

      // setTimeout(function(){app.fetch()}, 3000);
    },

    populateRooms: function(data){
      app.$roomSelect.html('<option value="__newRoom">New Room</option><option value="lobby" slected>Lobby</option>');
      if( data ){
        var processedRooms = {};
        data.forEach(function(d){
          var roomName = d.roomname;
          // if roomname is undefined or already exist don't worry about this if state.
          if( roomName && !processedRooms[roomName] ){
            app.addRoom(roomName);
            // app.room = roomName; // you can't stop me
            processedRooms[name] = true;
          }
        })
      }
      // we want to update line 60's value = lobby so think app.$roomSelect.val(app.room)
      // by setting a 'select' element's value it will go through and change that value
      app.$roomSelect.val(app.room)
    },

    addRoom: function(roomname){
      var $option = $('<option />').val(roomname).text(roomname);
      app.$roomSelect.append($option);
    },

    populatePage: function(data){
      app.clearMessages();
      if( Array.isArray(data) ){
        data.forEach(app.addMessage)
      }
    },

    // ORIGINAL ATTEMPT
    // fillPage: function(data) {
    //   var index = data.length - 1;
    //   while(index >= 0){
    //     var msg = data[index];
    //     // this better not break!
    //     var $msg = $('<div />').attr('class', 'msg').attr('class', msg.username);
    //     $msg.html(msg.username + ':' + '<br>' + msg.text + " " + index);
    //     $msg.appendTo('#chats').hide().slideDown('slow');
    //     index -= 1;
    //   } 
    // },

    clearMessages: function(){
      $('#chats').html('');
    },

    addMessage: function(data){
      if( !data.roomname ){
        roomname = 'lobby';
      }

      if (data.roomname === app.room ) {
        var $chat = $('<div class="chat" />');
        var $username = $('<span class="username />');
        $username.text(data.username + ': ')
          .attr('data-username', data.username)
          .attr('data-roomname', data.roomname)
          .appendTo('#chat');
        var $message = $('<br /><span />');
        $message.text(data.text).appendTo($chat);

        $('#chat').append($chat)
      }
    }
    // addMessage: function(message){
    //   app.send(message);
    //   // append message
    //   $('#chats').append($('<div>')).text('whatever').attr('class', 'msg')
    // }


  };
})

// Very likely useful, later.
// var entityMap = {
//     "&": "&amp;",
//     "<": "&lt;",
//     ">": "&gt;",
//     '"': '&quot;',
//     "'": '&#39;',
//     "/": '&#x2F;',
//     "\n" : '<br>'
// };

// var escapeHtml = function (string) {
//   return String(string).replace(/[&<>"'\/]|[\n]/g, function (s) {
//     return entityMap[s];
//   });
// }


// var dataStream;

var testMessage = {
  username: 'whatever',
  text: 'this is the text',
  roomname: 'anon'
};



