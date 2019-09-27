$(document).ready(() => {
  indexChecklists()
  showChecklist()
  sortChecklists()
  filterChecklists()

})

// using fetch get request indexChecklists(), we get all checklists and send a get request as soon as the page loads.
//using JQuery, each checklist object is created for each node and rendered to the page.
//event listener
function indexChecklists(){
  $('#all_checklists').on('click', function(event) {
    // when an element on the dom with an id of all_checklists, and it is clicked, run the following function
    // event.preventDefault()
    history.pushState(null, null, "checklists")
    //get back promise parsing the data on the response.
    //the data from url checklist.json
    fetch(`/checklists.json`)
      .then(resp => resp.json())
      .then(checklists => {
        //clears out
         $('#checklist_container').html('')

      //iteration
        checklists.forEach(checklist => {
          //variable      =   new class Checklist(argument is the object checklist)
          let newChecklist = new Checklist(checklist)
          let checklistHtml = newChecklist.formatChecklist()
  //Inject the HTML to the body of the page using append
        $('#checklist_container').append(checklistHtml)
       })
    })
  })
}
//refactor with sort function
//When do we use dot verses # in event listeners? -- we use # to access ID and dot (.) to access name of class
function sortChecklists() {
   $('.sort_button').on('click', function(event) {
    console.log('click')
    event.preventDefault()
    fetch(`/checklists.json`)
    .then(resp => resp.json())
    .then(checklists => {
       $('#checklist_container').html('')
      console.log(checklists)
    checklists.sort(function(a, b) {
      var itemA = a.item.toUpperCase(); // ignore upper and lowercase
      var itemB = b.item.toUpperCase(); // ignore upper and lowercase
      if (itemA < itemB) {
      return -1;
      }
      if (itemA > itemB) {
      return 1;
      }
  // items must be equal
       return 0;
       });
       console.log(checklists)
 //Added this part to display the sorted data -
          // iteration
          //     for each(variable in object) object for which properties are iterated
       checklists.forEach(checklist => {
         //statement
        let newChecklist = new Checklist(checklist)
        let checklistHtml = newChecklist.formatChecklist()
        //Inject the HTML to the body of the page using append
        $('#checklist_container').append(checklistHtml)
       })
     })
   })

 }
 //refactor assessment filter function
 function filterChecklists() {
    $('.beverages_button').on('click', function(event) {
      //console.log('click')
      event.preventDefault()
      //fetch the json data
      fetch(`/checklists.json`)
      //return on promise with response of the json data
      .then(resp => {
        resp.json()
      .then(checklists => {
        //clears out 
         $('#checklist_container').html('')
         //console.log(checklists)
         //filtering out the checklist items that = beverages
          const beveragesChecklist = checklists.filter(checklist => checklist.item === 'beverages')
          //iteration over map object checklist to return the key value of the new class object
         .map(checklist => new Checklist(checklist))
         //iteration with the forEach method executes the provided function once per key/value
         //for each of the checklist objects that match the value beverages, they will be listed in new form
         .forEach(checklist => $('#checklist_container').html(checklist.newChecklistForm()));
         });
      });
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
      <br>

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
    </tr>
  `)
}
