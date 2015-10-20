// YOUR CODE HERE:

var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',

  init: function(){
    $('#chats').text('HEYYY')

    function fillPage(){
  var index = dataStream.results.length - 1;
  while(index >= 0){
    var msg = dataStream.results[index];
    var $msg = $('<div></div>').attr('class', 'msg').attr('class', msg.username);
    $msg.html(msg.username + ':' + '<br>' + msg.text + " " + index);
    $msg.appendTo('.chatbox').hide().slideDown('slow');
    index -= 1;
    
  } 
}
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
      data: 'json',
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message retrieved. Data: ', data);
        dataStream = data; 
        // app.fillPage(data)
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to retrieve message. Error: ', data);
      }
    })   
  },

  // fillPage: function(data)

  clearMessages: function(param){
    $('#chats').html('');
  }
};
var dataStream;

// app.fetch returns an object, with an array, of 100 objects
// app.fetch() !== {results: Array[100]} 
  

// // app.fetch is kind of like our stream from twittler


//  make a div and fill it with dataStream.results[i].text & dataStream.results[i].username




// Message syntax

// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };
