//Modules
const {ipcRenderer} = require('electron')
const items = require('./items.js')

// DOM nodes
let showModal = document.getElementById('show-modal')
let closeModal = document.getElementById('close-modal')
let Modal = document.getElementById('modal')
let addItem = document.getElementById('add-item')
let itemUrl = document.getElementById('url')
let search = document.getElementById('search')

// open model from menu
ipcRenderer.on('menu-show-modal', () => {
    showModal.click()
})

// open selected item from menu
ipcRenderer.on('menu-open-item', () => {
    items.open()
})

// delete selected item from menu
ipcRenderer.on('menu-delete-item', () => {
    let selectedItem = items.getSelectedItem()
    items.delete(selectedItem.index)
})

// open item in native browser from menu
ipcRenderer.on('menu-open-item-native', () => {
    items.openNative()
})

// focus the search input from menu
ipcRenderer.on('menu-focus-search', () => {
    search.focus()
})

// filter items with "search"
search.addEventListener('keyup', e =>{
    
    // loop items 
    Array.from(document.getElementsByClassName('read-item')).forEach(item => {

        // hide items that don't match the search value
        let hasMatch = item.innerText.toLowerCase().includes(search.value)
        item.style.display = hasMatch ? 'flex' : 'none'
    })
})

//navigate item selection with up/down arrows
document.addEventListener('keydown', e=> {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        items.changeSelection(e.key)
    }
})


// Disable & enable modal buttons
const toggleModalButtons = () => {

    //check state of button 
    if(addItem.disabled === true){
        addItem.disabled = false
        addItem.style.opacity = 1
        addItem.innerText = 'Add item'
        closeModal.style.display = 'inline'
    }else{
        addItem.disabled = true
        addItem.style.opacity = 0.5
        addItem.innerText = 'Adding....'
        closeModal.style.display = 'none'
    }
}


// Show modal
showModal.addEventListener('click', e => {
    modal.style.display = 'flex'
    itemUrl.focus()
})

// Hide modal
closeModal.addEventListener('click', e => {
    modal.style.display = 'none'
})

// Handle new items
addItem.addEventListener('click', e => {

    // checking if exists
    if(itemUrl.value){
        
        // sending new item url to main process
        ipcRenderer.send('new-item', itemUrl.value)

        //disable button 
        toggleModalButtons()
    }
})


// listen for new item from main process 
ipcRenderer.on('new-item-success', (e, newItem) => {
    
    // console.log(newItem);

    //add new item to 'items' node
    items.addItem(newItem, true)


    //enable button
    toggleModalButtons()

    //hide and clear value
    modal.style.display = 'none'
    itemUrl.value = ''
})

// listen for enter key
itemUrl.addEventListener('keyup', e => {
    if(e.key === 'Enter') addItem.click()
})