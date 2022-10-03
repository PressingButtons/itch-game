import Folder from "../folder/folder.js";

/* empty(string)
    removes all child nodes from an element
*/
export function empty(query) {
    const element = document.querySelector(query);
    while(element.firstChild) element.firstChild.remove( );
}

/*
    setFolders(object)
    iterates through object to create folders from its properties
*/
export function setFolders(data) {
    for(const name in data) setFolders(name, data[name]);
}

function setFolder(name, data) {
    name = name.charAt(0).toUpperCase( ) + name.slice(1);
    const folder = new Folder(name);
    for(const url in data) {
        const id = url.substring(url.lastIndexOf('/') + 1);
        folder.addItem(id, data);
    }
    folder.anchor('#file-directory');
}