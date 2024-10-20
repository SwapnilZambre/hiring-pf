const burger=document.querySelector('#burger');
const menu= document.querySelector('#menu');
burger.addEventListener('click',()=>{
    debugger
    if(menu.classList.contains('hidden')){
menu.classList.remove()
    }else{
        menu.classList.add('hidden')
    }
})