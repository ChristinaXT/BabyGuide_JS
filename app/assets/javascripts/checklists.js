$(document).ready(() => {
  alert("Loaded")
  indexChecklists()
  showChecklist()
})

// using fetch get request indexChecklists(), we get all checklists and send a get request as soon as the page loads.
//using JQuery, each checklist object is created for each node and rendered to the page.

function indexChecklists(){
  $('.all_checklists').on('click', function (event){
    event.preventDefault()
    history.pushState(null, null, 'checklists')
    //get back promise parsing the data on the response.
    fetch('/checklists.json')
      .then(res => res.json())
      .then(checklists => {
        $('#checklist_container').html('')

        checklists.forEach(checklist => {
          let newChecklist = new Checklist(checklist)
          let checklistHtml = newChecklist.formatIndex()
  //Inject the HTML to the body of the page using append
        $('#checklist_container').append(checklistHtml)
       })
    })
  })
}
//sends a GET request to the application
function showChecklist(){
  $(document).on('click','.show_checklists', function(event){
    event.preventDefault()
    let item = $(this).attr('data-item')

      fetch('/checklists/${item}.json')
       .then(resp => resp.json())
       .then(checklist => {
         $('#checklist_container').html('')
           let newChecklist = new Checklist(checklist)
           let checklistHtml = newChecklist.newChecklistForm()
           $('#checklist_container').append(checklistHtml)
        })
     })
  }

//New Form requirement:

//The newChecklistForm prototype template is rendered using this object’s attributes and injected into the page.

$(function() {
  $('form#new_checklist').on('submit',function(event) {
    event.preventDefault()

    const values = $(this).serialize()
    $.post('/checklists', values).done(function(data) {
      //console.log(data)
    $('#checklist_container').html(" ")

    const newChecklist = new Checklist(data)
    const htmltoAdd = newChecklist.newChecklistForm()
    $('#checklist_container').html(htmltoAdd)
    })
  })
})
//constructor - this is executing the checklist function
function Checklist(checklist) {
  this.item = checklist.item
  this.user_id = checklist.user_id
}
//Used the object on prototype to format Index Page through JSON
Checklist.prototype.formatIndex = function() {
  return (`
     <tr>
     <td><a href="/checklists/${this.item}" data-item="{this.item}"
        class="show_checklists"><h1>${this.item}</h1></a></td>
    </tr>
  `)

}

Checklist.prototype.newChecklistForm = function() {
   let checklistHtml = `
     <h2>Checklist Created</h2>
       <h3>${this.item}</h3><br>
       `
   return checklistHtml

}
