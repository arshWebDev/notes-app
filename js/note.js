// --------------------- note create ---------------------- //

// note-content placeholder

const noteInputs = document.querySelectorAll(".note-input");

noteInputs.forEach((input) => {
  input.addEventListener("keydown", () => {
    input.setAttribute("aria-label", " ");
  });

  input.addEventListener("keyup", () => {
    if (input.innerHTML == "" || input.innerHTML == " ") {
      noteInputs[0].setAttribute("aria-label", "Title");
      noteInputs[1].setAttribute("aria-label", "Take a note");
    }
  });
});

// showing note create on click

const createBtn = document.querySelector(".create-btn");
const noteCreateContainer = document.querySelector(".note-create-container");

createBtn.addEventListener("click", noteCreateVisible);

function noteCreateVisible() {
  noteCreateContainer.classList.toggle("display--none");
}

// creating notes

const noteContainer = document.querySelector(".notes-container");
const addBtn = document.querySelector(".create-note--add-btn");
const cancelBtn = document.querySelector(".create-note--cancel-btn");

addBtn.addEventListener("click", addNote);

cancelBtn.addEventListener("click", () => {
  noteCreateVisible();
  placeholder();
  document
    .querySelector(".note-create-container .create-url-input-container")
    .classList.add("screen--hidden");
  document
    .querySelector(".note-create-container .labels-container")
    .classList.add("screen--hidden");
  document.querySelector(".note-create-label-container").innerHTML = "";
});

function placeholder() {
  noteInputs[0].innerHTML = "";
  noteInputs[0].setAttribute("aria-label", "Title");
  noteInputs[1].innerHTML = "";
  noteInputs[1].setAttribute("aria-label", "Take a note");
}

function addNote(e) {
  if (noteInputs[0].innerHTML == "" || noteInputs[1].innerHTML == "") return;
  if (noteInputs[0].innerHTML == " " || noteInputs[1].innerHTML == " ") return;

  let noteCreatedDate = new Date();
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let note = document.createElement("div");
  note.classList.add("note");

  let labels = document.querySelectorAll(
    ".note-create-label-container .note-label span"
  );
  labels.forEach((label) => {
    note.classList.add(label.innerHTML.replace(" ", "-"));
  });

  note.innerHTML = `
  <div class="select-btn"><i class="far fa-check-circle select-logo"></i></div>
  <div class="note-title">
    ${noteInputs[0].innerHTML}
  </div>
  <div class="note-content">
    ${noteInputs[1].innerHTML}
  </div>
  <div class="note-label-container">
  ${document.querySelector(".note-create-label-container").innerHTML}
  </div>
  <div class="note-footer">
    Created on ${
      noteCreatedDate.getDate() +
      " " +
      month[noteCreatedDate.getMonth()] +
      " " +
      noteCreatedDate.getFullYear()
    }
  </div>

  <div class="note-edit--action-btn">
    <div class="url-add-container">
      <button title="Add Url" class="url-btn"><i class="fas fa-at"></i></button>
      <div class="url-input-container screen--hidden">
        <input type="text" name="url" class="url-input" placeholder="Enter Url">
        <button class="url-ok-btn">Ok</button>
      </div>
    </div>
    <div class="add-label-container">
        <button title="Add label" class="add-label-btn"><i class="fas fa-tag"></i></button>
        <div class="labels-container screen--hidden">
          <div class="label">Tasks</div>
          <div class="label">Office work</div>
          <div class="label">Address</div>
          <div class="label">Questions</div>
          <div class="label">Code</div>
          <div class="label">URL</div>
          <div class="label">Person names</div>
          <div class="label">Dates</div>
        </div>
      </div>
    <button class="close-btn--note-edit">Close</button>
  </div> `;

  document
    .querySelector(".empty-note-statement")
    .classList.add("display--none");
  noteContainer.appendChild(note);
  noteCreateVisible();
  placeholder();
  setLocalStorage();

  document
    .querySelector(".note-create-container .create-url-input-container")
    .classList.add("screen--hidden");
  document
    .querySelector(".note-create-container .labels-container")
    .classList.add("screen--hidden");
  document.querySelector(".note-create-label-container").innerHTML = "";
}

noteCreateContainer.addEventListener("click", (e) => {
  showUrlAdd(e);
  if (e.target.classList.contains("create-url-ok-btn")) addUrl(e);
  if (e.target.classList.contains("create-url-input")) {
    e.target.addEventListener("keyup", (event) => {
      if (event.keyCode == 13) addUrl(e);
    });
  }

  showLabel(e);
  addLabel(e);
  deleteLabel(e);
});

// add url

let UrlContainerCounter = 1;

function showUrlAdd(e) {
  let element = e.target.parentElement;

  if (e.target.classList.contains("fa-at")) {
    if (UrlContainerCounter % 2 == 1) {
      element.nextElementSibling.classList.remove("screen--hidden");
      element.parentElement.nextElementSibling.childNodes[3].classList.add(
        "screen--hidden"
      );
      UrlContainerCounter++;
    } else {
      element.nextElementSibling.classList.add("screen--hidden");
      UrlContainerCounter++;
    }
  }
}

function addUrl(e) {
  if (
    e.target.classList.contains("create-url-input") ||
    e.target.classList.contains("url-input")
  ) {
    if (e.target.value == "" || e.target.value == " ") return;
  } else if (
    e.target.previousElementSibling.value == "" ||
    e.target.previousElementSibling.value == " "
  )
    return;

  let link = document.createElement("a");

  if (
    e.target.classList.contains("create-url-input") ||
    e.target.classList.contains("url-input")
  ) {
    link.setAttribute("href", e.target.value);
    link.innerHTML = e.target.value;
  } else if (
    e.target.classList.contains("create-url-ok-btn") ||
    e.target.classList.contains("url-ok-btn")
  ) {
    link.setAttribute("href", e.target.previousElementSibling.value);
    link.innerHTML = e.target.previousElementSibling.value;
  }

  link.setAttribute("target", "_blank");

  let linksContainer =
    e.target.parentElement.parentElement.parentElement.previousElementSibling
      .previousElementSibling;
  if (
    e.target.classList.contains("url-ok-btn") ||
    e.target.classList.contains("url-input")
  ) {
    linksContainer =
      e.target.parentElement.parentElement.parentElement.previousElementSibling
        .previousElementSibling.previousElementSibling;
  }

  linksContainer.appendChild(link);
  e.target.parentElement.classList.add("screen--hidden");
  if (e.target.getAttribute("class").includes("url-input")) {
    e.target.value = "";
  } else {
    e.target.previousElementSibling.value = "";
  }
}

// add label

let labelContainerCounter = 1;

function showLabel(e) {
  if (e.target.classList.contains("fa-tag")) {
    let element = e.target.parentElement;

    if (labelContainerCounter % 2 == 1) {
      element.nextElementSibling.classList.remove("screen--hidden");
      element.parentElement.previousElementSibling.childNodes[3].classList.add(
        "screen--hidden"
      );
      labelContainerCounter++;
    } else {
      element.nextElementSibling.classList.add("screen--hidden");
      labelContainerCounter++;
    }
  }
}

function addLabel(e) {
  if (
    e.target.classList.contains("note-create-label") ||
    e.target.classList.contains("label")
  ) {
    let label = document.createElement("div");
    label.classList.add("note-label");
    label.innerHTML = `<span>${e.target.innerHTML}</span> <i class="far fa-times-circle"></i>`;

    if (e.target.classList.contains("label")) {
      e.target.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling.appendChild(
        label
      );
    } else {
      e.target.parentElement.parentElement.parentElement.previousElementSibling.appendChild(
        label
      );
    }

    e.target.parentElement.classList.add("screen--hidden");
  }
}

// delete label

function deleteLabel(e) {
  if (
    e.target.classList.contains("fa-times-circle") &&
    e.target.parentElement.classList.contains("note-label")
  ) {
    e.target.parentElement.parentElement.parentElement.classList.remove(
      e.target.parentElement.childNodes[0].innerHTML.replace(" ", "-")
    );
    e.target.parentElement.remove();
  }
}

// --------------------- notes ---------------------- //

// editing notes

noteContainer.addEventListener("click", (e) => {
  let target = e.target;

  if (
    target.classList.contains("note-title") ||
    target.classList.contains("note-content") ||
    target.classList.contains("note-label-container") ||
    target.classList.contains("note-footer")
  ) {
    target.parentElement.classList.add("note--edit");
    noteEdit();
  } else if (target.classList.contains("note")) {
    target.classList.add("note--edit");
    noteEdit();
  }

  if (target.classList.contains("close-btn--note-edit")) {
    if (
      target.parentElement.parentElement.childNodes[3].innerHTML == "" ||
      target.parentElement.parentElement.childNodes[5].innerHTML == ""
    )
      return;
    if (
      target.parentElement.parentElement.childNodes[3].innerHTML == " " ||
      target.parentElement.parentElement.childNodes[5].innerHTML == " "
    )
      return;

    let labels =
      target.parentElement.previousElementSibling.previousElementSibling.querySelectorAll(
        ".note-label span"
      );
    if (labels != null) {
      labels.forEach((label) => {
        if (
          target.parentElement.parentElement
            .getAttribute("class")
            .includes(label.innerHTML)
        ) {
          target.parentElement.parentElement.classList.remove(label.innerHTML);
        }
        target.parentElement.parentElement.classList.add(
          label.innerHTML.replace(" ", "-")
        );
      });
    }

    target.parentElement.parentElement.classList.remove("note--edit");

    let element =
      target.parentElement.previousElementSibling.previousElementSibling;
    element.previousElementSibling.removeAttribute("contenteditable");
    element.previousElementSibling.removeAttribute("role");
    element.removeAttribute("contenteditable");
    element.removeAttribute("role");

    e.target.previousElementSibling.previousElementSibling.childNodes[3].classList.add(
      "screen--hidden"
    );
    e.target.previousElementSibling.childNodes[3].classList.add(
      "screen--hidden"
    );

    setLocalStorage();
  }

  showUrlAdd(e);
  if (e.target.classList.contains("url-ok-btn")) addUrl(e);
  if (e.target.classList.contains("url-input")) {
    e.target.addEventListener("keyup", (event) => {
      if (event.keyCode == 13) addUrl(e);
    });
  }

  showLabel(e);
  addLabel(e);
  deleteLabel(e);
});

function noteEdit() {
  document
    .querySelector(".note--edit .note-title")
    .setAttribute("contenteditable", "true");
  document
    .querySelector(".note--edit .note-title")
    .setAttribute("role", "textbox");
  document
    .querySelector(".note--edit .note-content")
    .setAttribute("contenteditable", "true");
  document
    .querySelector(".note--edit .note-content")
    .setAttribute("role", "textbox");
}

// selecting notes

const cancelSelectionBtn = document.querySelector(".cancel-btn i");

noteContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("select-logo")) {
    if (e.target.classList.contains("selected-note-btn"))
      deSelectingNote(e.target);
    else selectingNote(e.target);
  }
});

function selectingNote(target) {
  document
    .querySelector(".delete-note-container")
    .classList.remove("display--none");
  target.parentElement.parentElement.classList.add("selected-note");
  document.querySelector(".selected-items-count").innerHTML =
    document.querySelectorAll(".selected-note").length;
  target.classList.remove("far");
  target.classList.add("fas", "selected-note-btn");
}

function deSelectingNote(target) {
  target.classList.remove("fas", "selected-note-btn");
  target.classList.add("far");
  target.parentElement.parentElement.classList.remove("selected-note");

  document.querySelector(".selected-items-count").innerHTML =
    document.querySelectorAll(".selected-note").length;
  if (document.querySelector(".selected-note") == null) {
    document
      .querySelector(".delete-note-container")
      .classList.add("display--none");
    document.querySelector(".selected-items-count").innerHTML =
      document.querySelectorAll(".selected-note").length;
  }
}

cancelSelectionBtn.addEventListener("click", () => {
  document
    .querySelector(".delete-note-container")
    .classList.add("display--none");
  document.querySelectorAll(".selected-note .select-logo").forEach((btn) => {
    btn.classList.remove("fas");
    btn.classList.add("far");
  });
  document.querySelectorAll(".selected-note").forEach((note) => {
    note.classList.remove("selected-note");
  });
});

// deleting notes

const deleteBtn = document.querySelector(".delete-btn");

deleteBtn.addEventListener("click", () => {
  document.querySelectorAll(".selected-note").forEach((note) => {
    note.remove();
  });
  if (document.querySelector(".note") == null)
    document
      .querySelector(".empty-note-statement")
      .classList.remove("display--none");
  document
    .querySelector(".delete-note-container")
    .classList.add("display--none");

  setLocalStorage();
});

// searching notes

const searchBar = document.querySelector("#search-bar");

searchBar.addEventListener("input", () => {
  document.querySelectorAll(".note").forEach((note) => {
    note.classList.add("display--none");
    if (note.childNodes[3].innerHTML.includes(searchBar.value)) {
      note.classList.remove("display--none");
    }
  });
});

// --------------------- note filters ---------------------- //

// adding 'active-filter' class to filters

const tags = document.querySelectorAll(".tag");

tags.forEach((tag) => {
  tag.addEventListener("click", () => {
    for (let x of tags) {
      x.classList.remove("active-filter");
    }
    tag.classList.add("active-filter");
  });
});

// filtering notes

let allNotesBtn = document.querySelector(".all-notes-btn");
let filters = document.querySelectorAll(".filter");

allNotesBtn.addEventListener("click", () => {
  document
    .querySelectorAll(".note")
    .forEach((note) =>
      note.classList.remove("screen--hidden-2", "position--absolute")
    );
});

filters.forEach((filter) => {
  filter.parentElement.addEventListener("click", () => {
    document.querySelectorAll(".note").forEach((note) => {
      if (
        note.classList.contains(
          filter.getAttribute("class").replace("filter ", "")
        )
      ) {
        document
          .querySelectorAll(
            `.${filter.getAttribute("class").replace("filter ", "")}`
          )
          .forEach((note) =>
            note.classList.remove("screen--hidden-2", "position--absolute")
          );
        return;
      } else {
        note.classList.add("screen--hidden-2");
        setTimeout(() => note.classList.add("position--absolute"), 400);
      }
    });
  });
});

// --------------------- local storage ---------------------- //

function setLocalStorage() {
  localStorage.setItem(
    "userName",
    document.querySelector(".profile p").innerHTML
  );
  localStorage.setItem(
    "profilePic",
    document.querySelector(".profile img").getAttribute("src")
  );
  localStorage.setItem("notes", noteContainer.innerHTML);
}

function getLocalStorage() {
  if (localStorage.getItem("theme") !== null) {
    document.body.setAttribute("data-theme", localStorage.getItem("theme"));
  }

  if (localStorage.getItem("notes") !== null) {
    noteContainer.innerHTML = localStorage.getItem("notes");
  }

  if (
    localStorage.getItem("userName") != null &&
    localStorage.getItem("profilePic") != null
  ) {
    document.querySelector(".profile-chooser").classList.add("display--none");
    document.querySelector(".profile p").innerHTML =
      localStorage.getItem("userName");
    document
      .querySelector(".profile img")
      .setAttribute("src", localStorage.getItem("profilePic"));
  }
}

getLocalStorage();

export default setLocalStorage;
