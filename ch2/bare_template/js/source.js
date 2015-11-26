$(document).ready(function(){
  $('.buttons').on('click', 'button', function(event){
    var name = $(event.target).html()
    console.log(name)
    window[name]()
  })
});
