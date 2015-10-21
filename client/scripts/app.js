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
          // process chats
          app.fillPage(data.results) 
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
      console.log(data);
    },

    fillPage: function(data) {
      var index = data.length - 1;
      while(index >= 0){
        var msg = data[index];
        var $msg = $('<div></div>').attr('class', 'msg').attr('class', msg.username);
        $msg.html(msg.username + ':' + '<br>' + msg.text + " " + index);
        $msg.appendTo('#chats').hide().slideDown('slow');
        index -= 1;
      } 
    },

    clearMessages: function(){
      $('#chats').html('');
    },

    addMessage: function(message){
      app.send(message);
      // append message
      $('#chats').append($('<div>')).text('whatever').attr('class', 'msg')
    }


  };
})

// var dataStream;

var testMessage = {
  username: 'whatever',
  text: 'this is the text',
  roomname: 'anon'
};



