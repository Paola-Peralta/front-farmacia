
// console.log("clientes.js cargado");

// const modal = document.querySelector('#modalAPI');
// const tbody = document.querySelector('#clientTableBody');

// //Elementos del modal del formulario

// const codigo = document.querySelector('#n-codigo');
// const nombre = document.querySelector('#n-name');
// const pApellido = document.querySelector('#n-fname');
// const sApellido = document.querySelector('#n-sname');
// const direccion = document.querySelector('#n-address');
// const telefono = document.querySelector('#n-phone');

// //inicializado las variables globales
// let items;
// let id;

// function openModal(edit=false, index = 0){
//     modal.classList.add('active');

//     modal.onclick = e=>{

//         // if (e.target.id === 'modalAPI') {
//         //     modal.classList.remove('active');
//         // }

//         if(e.target.className.indexOf('modalAPI')!== -1)
//         {
//             modal.classList.remove('active');
//         }
//     }

//     if(edit){
//         codigo.value = items[index].codigo
//         nombre.value = items[index].nombre
//         pApellido.value = items[index].pApellido
//         sApellido.value = items[index].sApellido
//         direccion.value = items[index].direccion
//         telefono.value = items[index].telefono
//         id = index

//     }

//     else{
//         codigo.value = ''
//         nombre.value = ''
//         pApellido.value = ''
//         sApellido.value = ''
//         direccion.value = ''
//         telefono.value = ''
//     }
// }