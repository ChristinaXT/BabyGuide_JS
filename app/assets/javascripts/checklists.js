$(document).ready(() => {
  alert("Loaded")
  indexChecklists()
  showChecklist()
})

// using fetch get request indexChecklists(), we get all checklists and send a get request as soon as the page loads.
//using JQuery, each checklist object is created for each node and rendered to the page.

function indexChecklists(){
  $('.checklists_data').on('click', function(event){
    event.preventDefault()
    history.pushState(null, null, 'checklists')
//get back promise parsing the data on the response.
  fetch('/checklists.json')
    .then(resp => resp.json())
    .then(checklists => {
      $('checklist_container').html('')

      checklists.forEach(checklist => {
        let newChecklist = new Checklist(checklist)
        let checklistHtml = newChecklist.formatIndex()
  //Inject the HTML to the body of the page using append
        $('#checklist_container').append(checklistHtml)
       })
    })
  })
}

function showChecklist(){
  $(document).on('click','.show_checklists', function(event){
    event.preventDefault()
    let id = $(this).attr('data-id')

  fetch('/checklists/${id}.json')
     .then(resp => resp.json())
     .then(checklist => {
       $('#checklist_container').html('')
         let newChecklist = new Checklist(checklist)
         let checklistHtml = newChecklist.newChecklistForm()
         $('#topic_container').append(topicHtml)
     })
  })
}

//The newChecklistForm prototype template is rendered using this object’s attributes and injected into the page.

$(function() {
  $('form#new_checklist').on('submit',function (event) {
    event.preventDefault()

    const values = $(this).serialize()
    $.post('/checklists', values).done(function(data) {
      console.log(data)
    $('#checklist_container').html(" ")

    const newChecklist = new Checklist(data)
    const htmltoAdd = newChecklist.newChecklistForm()
    $('#checklist_container').html(htmltoAdd)
    })
  })
})
