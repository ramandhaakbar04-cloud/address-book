const form = document.getElementById("contactForm");
const contactList = document.getElementById("contactList");
const searchInput = document.getElementById("search");

let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
let editIndex = null;

// render kontak
function renderContacts() {
  contactList.innerHTML = "";
  const keyword = searchInput.value.toLowerCase();

  contacts.forEach((c, index) => {
    if (
      c.name.toLowerCase().includes(keyword) ||
      c.phone.includes(keyword) ||
      c.email.toLowerCase().includes(keyword)
    ) {
      const div = document.createElement("div");
      div.className = "contact";

      div.innerHTML = `
        <strong>${c.name}</strong><br>
        📞 ${c.phone}<br>
        ✉️ ${c.email}
        <div class="actions">
          <button class="edit" onclick="editContact(${index})">Edit</button>
          <button class="delete" onclick="deleteContact(${index})">Hapus</button>
        </div>
      `;

      contactList.appendChild(div);
    }
  });
}

// submit form
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!name || !phone || !email) {
    alert("Semua data wajib diisi!");
    return;
  }

  if (editIndex === null) {
    contacts.push({ name, phone, email });
  } else {
    contacts[editIndex] = { name, phone, email };
    editIndex = null;
  }

  localStorage.setItem("contacts", JSON.stringify(contacts));
  form.reset();
  renderContacts();
});

// edit
function editContact(index) {
  const c = contacts[index];
  document.getElementById("name").value = c.name;
  document.getElementById("phone").value = c.phone;
  document.getElementById("email").value = c.email;
  editIndex = index;
}

// hapus
function deleteContact(index) {
  contacts.splice(index, 1);
  localStorage.setItem("contacts", JSON.stringify(contacts));
  renderContacts();
}

// search
searchInput.addEventListener("input", renderContacts);

// load awal
renderContacts();
