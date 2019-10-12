import firebase from 'firebase';
export function save(data){
    if (navigator.onLine) {
        return firebase.database().ref('/').set(data);
    } else {
        return saveToLocalStorage(data);
    }
}

export function get(){
    if (navigator.onLine) {
        return  firebase.database().ref('/').once('value').then(function(snapshot) {
            return snapshot.val();
        });
    } else {

         return getFromLocalStorage();   

        }
        
    }
    


function saveToLocalStorage(data) {
    return new Promise(function(resolveFn) {
        // set of instructions
        localStorage.setItem('notesData', JSON.stringify(data));
        resolveFn();
    });
}

function getFromLocalStorage(){
    return new Promise(function(resolveFn){
       var save= localStorage.getItem("notesData");

        resolveFn(JSON.parse(save))
    })
}
