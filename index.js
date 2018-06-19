// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const state = {

 };
const defaultState = {};

let actionTypes = {
    AUTH_TOKEN_ADDED: 'AUTH_TOKEN_ADDED',
    AUTH_TOKEN_EXPIRED: 'AUTH_TOKEN_EXPIRED'
}

let electronMainReducer = (currentState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_TOKEN_ADDED:
        return addToken(currentState);
        case actionTypes.AUTH_TOKEN_EXPIRED:
        return tokenExpired(currentState);
        default:
        return currentState;
    }
}

let addToken = (currentState, action) => {
    let newToken = action.token;
    const nextState = {
        ...currentState,
        tokens: [newToken]
    }
    return nextState;
}

let tokenExpired = (currentState, action) => {
    const nextState = {
        ...currentState,
        tokens: []
    }
    return nextState;
}

const { createStore } = require('redux');
var store = createStore(electronMainReducer);
global.store = store;
