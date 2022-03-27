let editbtn = document.querySelector('.profile__editbtn');
let editWindow = document.querySelector('.profile');



function openEditWindow() {
  editWindow.insertAdjacentHTML('afterbegin ', `
        <div class="song">
          <h4 class="song__artist">Кино</h4>
          <p class="song__title">Дерево</p>
          <button class="song__like"></button>
        </div>
  `);
}

editbtn.addEventListener('click', openEditWindow);

