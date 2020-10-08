const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

function renderCafe(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    cross.textContent = 'x';

    li.appendChild(name); 
    li.appendChild(city);
    li.appendChild(cross);

    cafeList.appendChild(li);
    //deleting data
    cross.addEventListener('click', (e)=>{
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('cafes').doc(id).delete();
    });
}; 

form.addEventListener('submit', function(event){  
    event.preventDefault();
    db.collection('cafes').add({
        name : form.name.value,
        city : form.city.value
    });
});

db.collection('cafes').orderBy('city').onSnapshot(snapshot =>{
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added'){
            renderCafe(change.doc);
        }else if(change.type == 'removed'){
            let li = cafeList.querySelector('[data-id = '+ change.doc.id +']');
            cafeList.removeChild(li);
        }
    });
});

/*Getting documents that match a spacific order
db.collection('cafes').orderBy('name').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderCafe(doc)
    });
});*/

/*Getting documents that match a spacific order(Advance ordering)
db.collection('cafes').where('city', '==', 'Imo').orderBy('name').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderCafe(doc)
    });
});*/

/*Getting a simgle document based on conditions or query in a collection
db.collection('cafes').where('city', '==', 'califonia').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderCafe(doc)
    });
});*/

// Getting all the documents in a collection
/*db.collection('cafes').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderCafe(doc)
    });
});*/




    