formulario = document.getElementById('task-form');
listaTareas = document.getElementById('lista-tareas');

class Task{
    constructor(name, description){
        this.name = name;
        this.description = description;
    }

    agregaTarea(){
        const div = document.createElement('div');
        div.innerHTML = `
        <div id="tarea" class="mb-3">
            <strong>Tarea</strong>: ${this.name}
            <strong>Description</strong>: ${this.description}
            <a href="#" class="btn btn-danger" name="delete">Delete</a>
        </div>
        `;
        listaTareas.appendChild(div);
        formulario.reset();
    }

    quitaTarea(elemento){
        if(elemento.name === 'delete'){
            elemento.parentElement.remove();
            this.agregaMensaje('Task deleted successfuly', 'info');
        }
    }

    agregaMensaje(mensaje, cssCLASS){
        const div = document.createElement('div');
        div.className = `alert alert-${cssCLASS} mt-4`;
        div.appendChild(document.createTextNode(mensaje));
        // mostrando en el DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#app');
        container.insertBefore(div, app);
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);
    }

}


// eventos del DOM

formulario.addEventListener('submit', guardaDatos);
listaTareas.addEventListener('click', eliminaTarea);

function guardaDatos(e){
    e.preventDefault();

    const name = document.getElementById('name').value;
    const desc = document.getElementById('description').value;
    const tarea = new Task(name, desc);

    if(name==='' || desc===''){
        return tarea.agregaMensaje('Please, complete the form', 'warning');
    }
    
    tarea.agregaTarea();
    tarea.agregaMensaje('Task added succesfully', 'success');
}

function eliminaTarea(e){
    const tarea = new Task();
    tarea.quitaTarea(e.target);
}