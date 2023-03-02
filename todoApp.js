const itemsContainer = document.getElementById('items');
const itemTemplate = document.getElementById('item-Template');
const addButton = document.getElementById('add');

let items = getItems(); 

//create a function that'll save and get items from the local storage
function getItems() {
    //get the value from de local storage(if it already exists). if it doesnt exist it should show an empty array.
    const value = localStorage.getItem('todo-test') || '[]';

    //once we get de json array, we need to convert de json string into an actuall array
    return JSON.parse(value);
}

//once de user has added/change an item we want to set de item back(we want to refresh wat we just saved)
function setItems(items) {
    //converting the item to json strings/array
    const itemsJson = JSON.stringify(items)
    //then storing it in a local storage
    localStorage.setItem('todo-test', itemsJson);
}

//logic for adding a new item
function addItem() {
    //adding an element to de beginning of de array
    items.unshift({
        //defaults
        description: '',
        completed: false
    });

    setItems(items);
    //once de item has been added you refresh de list
    refreshList();
}

//how to make it save when when we put/enter some data in de input field
function updateItem(item, key, value) {
    item[key] = value;

    setItems(items);
    refreshList();
}

//refresh list is going to take de list of items nd render it to the user
function refreshList() {
    //first its going to sort de items
    items.sort((a, b) => {

        //if a is completed return 1(push it to then bottom of de list)
        if (a.completed) {
            return 1;
        }

        //if b is completed, return negative 1
        if (b.completed) {
            return -1;
        }

        //this will sort the list alphabetically
        return a.description < b.description ? -1 : 1;
    })

    //whenever we make a change to de list we want to clear de HTML, clear nd refresh it with a new data
    itemsContainer.innerHTML = '';
    //once its cleared out we say... for each item in de items list
    for (const item of items) {
        //then get the content from de item template then clone/make copy of the temp div
        const itemElement = itemTemplate.content.cloneNode(true);
        //get de description nd checkbox
        const descriptionInput = itemElement.querySelector('.item-description');
        const completedInput = itemElement.querySelector('.item-completed');

        descriptionInput.value = item.description;
        completedInput.checked = item.completed;

        //listens for when the user starts typing/editing
        descriptionInput.addEventListener('change', () => {
            //the call the update function
            updateItem(item, 'description', descriptionInput.value);
        });

        //listens for when the user clicks on checkbox
        completedInput.addEventListener('change', () => {
            updateItem(item, 'completed', completedInput.checked);
        });

        itemsContainer.append(itemElement);
    }
}

refreshList();

addButton.addEventListener('click', () => {
    addItem();
})

console.log(items);
