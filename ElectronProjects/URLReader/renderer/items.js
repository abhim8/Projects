// modules
const { shell } = require('electron')
const fs = require('fs')

// DOM Nodes
let items = document.getElementById('items')

// get readerJS content 
let readerJS
fs.readFile(`${__dirname}/reader.js`, (err, data) => {
    readerJS = data.toString()
})

// track items in storage
exports.storage = JSON.parse(localStorage.getItem('readit-items')) || []

// listen for "done" message from reader window 
window.addEventListener('message', e => {
    

    //check for correct message
    if(e.data.action === 'delete-reader-item'){
        // delete item at given index 
        // console.log(e.data)
        this.delete(e.data.itemIndex)
    }

    //closs the renderer window
    e.source.close()
})


// delete item 
exports.delete = itemIndex => {

    // remove item from the DOM 
    items.removeChild( items.childNodes[itemIndex] )

    // remove item from storage
    this.storage.splice(itemIndex,1)

    //persist storage
    this.save()

    // select previous item or new top item
    if (this.storage.length) {
        
        //get new selected item index
        let = newSelectedItemIndex = (itemIndex === 0) ? 0 : itemIndex - 1

        // select item at new index
        document.getElementsByClassName('read-item')[newSelectedItemIndex].classList.add('selected')
    }
}


// get selected item index
exports.getSelectedItem = () => {

    // get the selected node
    let currentItem = document.getElementsByClassName('read-item selected')[0]

    // get item index 
    let itemIndex = 0
    let child = currentItem
    while((child =child.previousElementSibling) != null) itemIndex++

    // return selected item and index
    return {node: currentItem, index: itemIndex}

}


//persists storage
exports.save = () => {
    localStorage.setItem('readit-items', JSON.stringify(this.storage))
}

// set item as selected 
exports.select = e => {

    // remove currently selected item class
    this.getSelectedItem().node.classList.remove('selected')

    // add to clicked item
    e.currentTarget.classList.add('selected')
}

// move to newly selected item 
exports.changeSelection = direction => {

    // get selected item
    let currentItem = this.getSelectedItem()

    //handle up/down
    if(direction === 'ArrowUp' && currentItem.node.previousElementSibling){
        currentItem.node.classList.remove('selected')
        currentItem.node.previousElementSibling.classList.add('selected')
    }
    else if(direction === 'ArrowDown' && currentItem.node.nextElementSibling){
        currentItem.node.classList.remove('selected')
        currentItem.node.nextElementSibling.classList.add('selected')
    }
}


// Open selected item in native browser
exports.openNative = () => {

    //only if we have items (in case of menu open) 
    if(!this.storage.length) return

    // get selected item 
    let selectedItem = this.getSelectedItem()

    //get selected items url
    let contentURL = selectedItem.node.dataset.url

    // open in system default's browser
    shell.openExternal(contentURL)
    

}


// open selected item
exports.open = () => {

    //only if we have items (in case of menu open) 
    if(!this.storage.length) return

    // get selected item 
    let selectedItem = this.getSelectedItem()

    //get selected items url
    let contentURL = selectedItem.node.dataset.url
     
    //open item in a proxy BrowserWindow
    // console.log('opening item: ', contentURL)
    let readerWin =  window.open(contentURL, '', `
        maxWidth=2000,
        maxHeight=2000,
        width=1000,
        height=700,
        backgroundColor=#DEDEDE,
        nodeIntegration=0,
        contextIsolation=1
    `)

    //inteject Javascript with specific item index (selectedItem.index)
    readerWin.eval( readerJS.replace('{{index}}', selectedItem.index) )
}

//add new Item
exports.addItem = (item, isNew = false) => { 

    // create a new DOM node
    let itemNode = document.createElement('div')

    // assing "read-item" class
    itemNode.setAttribute('class', 'read-item')

    //set item URL as data attribute
    itemNode.setAttribute('data-url', item.url)

    //add inner HTML 
    itemNode.innerHTML = `<img src="${item.screenshot}"><h2>${item.title}</h2>`

    // appending new node to "items"
    items.appendChild(itemNode)

    // attach click handler to select
    itemNode.addEventListener('click', this.select)

    // attach doubleclick handler to open
    itemNode.addEventListener('dblclick', this.open)
    

    // if this is the first item, select it
    if (document.getElementsByClassName('read-item').length === 1) {
        itemNode.classList.add('selected')
    }

    // add item to storage and persist
    if(isNew){
        this.storage.push(item)
        this.save()
    }
}    
    // add items from storage when app loads
    this.storage.forEach(item => {
        this.addItem(item)
    });
