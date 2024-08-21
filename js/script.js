import Etudiants from "./Etudiants.js";

const displayEtudiants = function () {
    return Etudiants.all().then(function(response) {
        return response.map((data) => {
            const { id, name, date, note } = data;
            const etudiant = new Etudiants(name,date,note);
            return `
            <tr class="bg-white border-b">
            <td class="px-6 py-4">
                    ${id}
                </td>
                <td class="px-6 py-4">
                    ${name}
                </td>
                <td class="px-6 py-4">
                    ${etudiant.getAge()} ans         
                <td class="px-6 py-4">
                    <span class="rounded-md bg-${etudiant.isSucceeded() ? 'green' : 'red'}-50 px-2 py-1 text-xs font-medium text-${etudiant.isSucceeded() ? 'green' : 'red'}-700 ring-1 ring-inset ring-${etudiant.isSucceeded() ? 'green' : 'red'}-600/20">
                     ${note} / ${Etudiants.MAX_NOTE}
                    </span>
                </td>

                <td class="px-6 py-4">
                    <button id="deleteEtudiant" onclick="deleteEtudiant(${id})" class="inline-flex items-center px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
                           \t<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           \t  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                           \t</svg>
                           \tDelete
                    </button>
                </td>
            </tr>
            `
        });
    });
}
const  renderEtudiants = () =>{
    const body = document.querySelector('#render_etudiants')
    displayEtudiants().then(
        data => body.innerHTML = data.join(''),
        init
    )
}
const addEtudiant = (event) => {
    event.preventDefault();
    const [name, date, note] = document.querySelectorAll('#name,#date,#note');
    const etudiant = new Etudiants(name.value,date.value, note.value);
    etudiant.add()
}
window.deleteEtudiant = (id) => {
    Etudiants.delete(id)
}
const init = () =>{
    const refresh = document.getElementById('refresh')
    refresh.addEventListener('click',() => {
        renderEtudiants()
    })
    const addButton = document.getElementById('addEtudiant')
    addButton.addEventListener('click',(event) => {
        addEtudiant(event)
    })
    const deleteButton = document.getElementById('deleteEtudiant')
    deleteButton.addEventListener('click',(id) => {
        deleteEtudiant(id)
    })
}

renderEtudiants()
