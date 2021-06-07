// modules
const {BrowserWindow} = require('electron')

// offscreen BrowserWindow
let offscreenWindow


//Exported readItem Function
module.exports = (url, callback) => {

    // create the offscreen window
    offscreenWindow = new BrowserWindow({
        width: 500, height:500,
        show: false,
        webPreferences:{
            offscreen: true
        }
    })

    //load item url
    offscreenWindow.loadURL(url)

    // wait for content to finish loading
    offscreenWindow.webContents.on('did-finish-load', e => {

        // get page title 
        let title = offscreenWindow.getTitle()

        // get screenshot (thumbnail)
        offscreenWindow.webContents.capturePage().then( image => {

            // get image as data URL
            let screenshot = image.toDataURL()

            // exectue callback with new item object
            callback({ title, screenshot, url })

            // clean Up
            offscreenWindow.close()
            offscreenWindow = null


        })
    })
}