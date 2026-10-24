const form = document.getElementById('note-form');
const input = document.getElementById('note-input');
const list = document.getElementById('notes');
const message = document.getElementById('message');
let notes = JSON.parse(localStorage.getItem('quick-notes') || '[]');

function draw() {
  list.innerHTML = '';
  notes.forEach((text, index) => {
    const li = document.createElement('li');
    li.textContent = text + ' ';
    const del = document.createElement('button');
    del.textContent = 'Delete';
    del.addEventListener('click', () => { notes.splice(index, 1); persist(); draw(); });
    li.appendChild(del);
    list.appendChild(li);
  });
}

function persist() { localStorage.setItem('quick-notes', JSON.stringify(notes)); }

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) { message.textContent = 'Please write something first.'; return; }
  message.textContent = '';
  notes.push(text);
  input.value = '';
  persist();
  draw();
});

draw();
