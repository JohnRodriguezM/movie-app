import { DOM_ELEMENTS } from './nodes.mjs';

const { categoriesPreviewSection } = DOM_ELEMENTS;

//boton 
const buttomMenu = document.getElementById('button-menu');
//contenedor del menu
const containerShowMenu = document.getElementById('categoriesPreview');
//categorys
const selectorCategorys = document.querySelector('.category-title');

buttomMenu.addEventListener('click', () => {
    containerShowMenu.classList.toggle('categoriesPreview-container--show');
    categoriesPreviewSection.style.display = "block";
});

export const prueba1= (container)=>{
    container.style.display = "none";

}
