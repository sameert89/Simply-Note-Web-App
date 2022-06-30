const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
const arr1 = ["#fff56b", "#fc9eff", "#9effd5", "#c29eff", "#ff3d6a"]
var arr_notes = JSON.parse(localStorage.getItem("arrNotes"));
class note {
  constructor(title, content, color) {
    this.title = title;
    this.content = content;
    this.color = color;
  }
}
const sample_note = new note("Sample Note", "Hello This is Simply Note, Your easy digital note taking app. Press the add button to add a new Note. Happy Note Taking🐼", "#ffbb33")
const printNotes = function (note) {
  // console.log("function called");
  arr_notes.pop();
  arr_notes.push(`<div style="background-color: ${note.color} !important;" class="card text-white bg-warning mb-3 col-md-12 col-lg-4 col-sm-12">
    <div class="card-body">
      <button type="button" class="delete_btn" onclick="deleteNote(this)">X</button>
      <h5 class="card-title">${note.title} </h5>
      <p class="card-text">${note.content}</p>
    </div>
  </div>`);
  arr_notes.push(`<div class="add_button card text-white mb-3 no_bg col-md-12 col-lg-4 col-sm-12">
    <button type="button" id="new_note" onclick="showForm()"><i class="fa-solid fa-circle-plus fa-5x"></i></button>
  </div>`);
  localStorage.clear();
  // console.log(arr_notes);
  localStorage.setItem("arrNotes", JSON.stringify(arr_notes))
  //printing
  document.getElementsByClassName("card_deck")[0].innerHTML = '';
  arr_notes.forEach(element => {
    document.getElementsByClassName("card_deck")[0].innerHTML += element;
  })
}
const addNote = () => {
  let title = document.getElementById("Title").value;
  let content = document.getElementById("content").value;
  if (title === '' || content === '') {
    alert("Please fill the data!!!");
  }
  else {
    const color = arr1[Math.floor(5 * (Math.random()))];
    //creating object
    const newNote = new note(title, content, color);
    // console.log(newNote);
    printNotes(newNote);
    document.getElementsByClassName('input_form')[0].reset();
    hideForm();
  }
}
if (arr_notes === null) {
  arr_notes = [];
  arr_notes.push(`<div class="add_button card text-white mb-3 no_bg col-md-12 col-lg-4 col-sm-12">
<button type="button" id="new_note" onclick="showForm()"><i class="fa-solid fa-circle-plus fa-5x"></i></button>
</div>`);
  printNotes(sample_note);
  arr_notes.pop();
  arr_notes.pop();
  arr_notes.push(`<div class="add_button card text-white mb-3 no_bg col-md-12 col-lg-4 col-sm-12">
<button type="button" id="new_note" onclick="showForm()"><i class="fa-solid fa-circle-plus fa-5x"></i></button>
</div>`);
}
else {

  document.getElementsByClassName("card_deck")[0].innerHTML = '';
  arr_notes.forEach(element => {
    document.getElementsByClassName("card_deck")[0].innerHTML += element;
  })
}


function showForm() {
  document.getElementsByClassName("input_form")[0].classList.add("show_form");
  document.getElementsByClassName("input_form")[0].classList.remove("hide_form")
  document.getElementsByClassName("note_space")[0].classList.add("blur_bg");
  document.getElementsByClassName("bg")[0].classList.add("blur_bg");
  // console.log("added");
}
function hideForm() {
  document.getElementsByClassName("input_form")[0].classList.add("hide_form");
  document.getElementsByClassName("input_form")[0].classList.remove("show_form")
  document.getElementsByClassName("note_space")[0].classList.remove("blur_bg");
  document.getElementsByClassName("bg")[0].classList.remove("blur_bg");
}

function deleteNote(element) {
  // console.log("called delete");
  const Id = element.parentNode.parentNode.outerHTML;
  // console.log(element.nextSibling)
  // console.log("ID ", Id);
  for (var i = 0; i < arr_notes.length; i++) {
    // console.log("arr ", arr_notes[i])
    if (arr_notes[i] === Id) {
      // console.log("spliced")
      arr_notes.splice(i, 1);
      localStorage.clear();
      // console.log(arr_notes);
      localStorage.setItem("arrNotes", JSON.stringify(arr_notes));
      break;
    }
  }

  element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode);
}