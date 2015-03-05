/*global $:false*/
'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var App = App || {
  url: 'http://localhost:3000'
};

App.getPosts = function(){
  $.ajax({
    url: App.url + '/posts',
    type: 'GET',
  }).done(function(data){
    App.indexPosts(data);
  }).fail(function(jqXHR, textStatus, errorThrown){
    trace(jqXHR, textStatus, errorThrown);
  });
};

App.indexPosts = function(posts){
  posts.forEach(App.renderPost);
};

App.renderPost = function(currentVal,index,array){
  $('div.row').append('<article class="post">' + '<h1 class="post-title">' + currentVal.title + '</h1>' + '<p class="post-body">' + currentVal.body + '</p>' + '<small class="post-author">' + currentVal.author + '</small>' + '<p>Comments: ' + currentVal.comments.length + '</p>' + '</article>');
};

App.submitPost = function(event){
  if(event.preventDefault) event.preventDefault();
  $.ajax({
    url: App.url + '/posts',
    type: 'POST',
    data: { post: {
        title: $('input#post-title').val(),
        body: $('textarea#post-body').val(),
        author: $('input#post-author').val()
      }
    },
  }).done(function(data){
    window.location.href = '/';
  }).fail(function(jqXHR,textStatus,errorThrown){
    trace('error, error, error');
  });
};

$(document).ready(function(){
  App.getPosts();
  $('form.new-post-form').on('submit',function(event){
    App.submitPost(event);
  });
  trace('hello world');
});








