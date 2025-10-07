document.addEventListener("DOMContentLoaded", () => {
	const list = document.querySelector("#movies-ul");
	const forms = document.forms;
	const addMovie = forms["movie-form"];
	const confirmEdit = document.forms["movie-edit-form"];

	const moviesEditContainer = document.querySelector("#movies-edit-container");
	const movieEditButton = document.querySelector("#movie-edit-button");

	const addMovieItem = () => {
		let inputElement = addMovie.querySelector('input[type="text"]');
		let inputValue = inputElement.value;
		if (!inputValue) {
			return;
		}
		let listItem = document.createElement("li");
		listItem.classList.add("movies__li");
		let listSpan = document.createElement("span");
		listSpan.textContent = inputValue;
		let buttonContainer = document.createElement("div");
		buttonContainer.classList.add("movies__buttons");
		let editButton = document.createElement("button");
		editButton.classList.add("movies__edit");
		editButton.textContent = "Edit";
		let deleteButton = document.createElement("button");
		deleteButton.classList.add("movies__delete");
		deleteButton.textContent = "Delete";
		buttonContainer.appendChild(editButton);
		buttonContainer.appendChild(deleteButton);
		listItem.appendChild(listSpan);
		listItem.appendChild(buttonContainer);
		list.appendChild(listItem);
		inputElement.value = "";
	};

	let currentEditSpan = null;

	const deleteMovie = (event) => {
		const li = event.target.parentElement.parentElement;
		li.parentElement.removeChild(li);
	};

	const confirmMovieEdit = (event) => {
		console.log("Hello");
		let editInput = confirmEdit.querySelector("input[type='text']");
		let editValue = editInput.value;

		console.log(editValue);

		if (!editValue || !currentEditSpan) return;

		currentEditSpan.textContent = editValue;
		editInput.value = "";
		moviesEditContainer.classList.add("hidden");
	};

	const editMovie = (event) => {
		moviesEditContainer.classList.remove("hidden");
		currentEditSpan = event.target.parentElement.previousElementSibling;
	};

	confirmEdit.addEventListener("submit", (e) => {
		e.preventDefault();
		confirmMovieEdit();
	});

	addMovie.addEventListener("submit", (e) => {
		e.preventDefault();
		addMovieItem();
	});

	list.addEventListener("click", (e) => {
		if (e.target.className === "movies__delete") {
			deleteMovie(e);
			return;
		} else if (e.target.className === "movies__edit") {
			editMovie(e);
			return;
		} else {
			return;
		}
	});
});
