$(document).ready(() => {
  indexChecklists()
  showChecklist()
})

// using fetch get request indexChecklists(), we get all checklists and send a get request as soon as the page loads.
//using JQuery, each checklist object is created for each node and rendered to the page.
//event listener
function indexChecklists(){
  $('#all_checklists').on('click', function(event) {
    // event.preventDefault()
    history.pushState(null, null, "checklists")
    //get back promise parsing the data on the response.

    fetch(`/checklists.json`)
      .then(resp => resp.json())
      .then(checklists => {
         $('#checklist_container').html('')
        // console.log(checklists)

        checklists.forEach(checklist => {
          let newChecklist = new Checklist(checklist)
          let checklistHtml = newChecklist.formatChecklist()
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
    let id = $(this).attr('data-id')

      fetch(`/checklists/${id}.json`)
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
//post
    const values = $(this).serialize()

    $.post('/checklists', values).done(function(data) {
    //  console.log(data)
    $('#checklist_container').html(" ")

    const newChecklist = new Checklist(data)
    const htmltoAdd = newChecklist.newChecklistForm()
    $('#checklist_container').html(htmltoAdd)
    })
  })
})

//model object requirement--- constructor - this is executing the checklist function
function Checklist(checklist) {
  this.id = checklist.id
  this.item = checklist.item
  this.user_id = checklist.user_id
  this.requests = checklist.requests
}

//Used the object on prototype to format Index Page through JSON
Checklist.prototype.formatChecklist = function() {
   return (`
     <tr>
      <td><a href="/checklists/${this.id}" data-id="${this.id}" class="show_checklists"><h4>${this.item}</h4></a></td>
       <td><button><a href="/checklists/${this.id}/edit" data-id="${this.id}" class="edit_checklist"> Edit</a></button></td>
      <td><button><a href="/checklists/${this.id}" data-id="${this.id}" class="delete_checklist" data-method="delete">Delete</a></button></td>
    </tr>
    `)
}

Checklist.prototype.newChecklistForm = function() {
  let requestsHtml = this.requests.map(request => {
    return (`
      <div>${request.item}</div>
    `)
  }).join(' ')

    return(`
    <h3>New Checklist</h3>
    <tr>
     <td><strong>Item:</strong> ${this.item}</td></br>
     <td><strong>Requests:</strong><ul>${requestsHtml}</ul></td></br></br>
  `)
}
