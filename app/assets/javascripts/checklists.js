const getChecklistsIndex = () => {
  $('.checklists_data').on('click', function(e) {
    e.preventDefault()
    history.pushState(null, null, 'checklists')

fetch('/checklists.json')

//get back promise parsing the data on the response.

.then(resp => resp.json())
    .then(checklists => {
      $('checklist_container').html('')

checklists.forEach(checklist => {
  let newChecklist = new Checklist(checklist)
  let checklistHtml = newChecklist.renderIndex()

  //Inject the HTML to the body of the page using append
$('#checklist_container').append(checklistHtml)
       })
    })
  })
}



//$(function(){
  //$("form").submit(function(event){
  //  event.preventDefault();

      // this debugger should be hit when you click the submit button!
    //  debugger;
  //  });
//});
