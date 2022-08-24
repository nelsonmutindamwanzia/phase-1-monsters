console.log('before Load');
document.addEventListener('DOMContentLoaded', (e) =>{
    console.log('after load');

    let page = 1;
    function fetchMonsters(pageNum){
        fetch(`http://localhost:3000/monsters?_limit=50&_page=${pageNum}`)
        .then(resp => resp.json())
        .then(data => {
            displayMonsters(data)
            createForm()
        })  
    }
    fetchMonsters(page)
    function displayMonsters(monster){
        console.log(monster)
        monster.forEach(element => {
            let h2 = document.createElement('h2');
            let h4 = document.createElement('h4');
            let parag = document.createElement('p');
            h2.innerText = element.name;
            h4.innerHTML = `Age: ${element.age}`;
            parag.innerText = element.description;
            document.querySelector('#monster-container').append(h2, h4, parag)
            
        });
    }
    function createForm(){
        let createMonster = document.getElementById('create-monster')
        createMonster.innerHTML = `
            <form id='create-mon'>
                <input id ='name' placeholder = 'name...'>
                <input id ='age' placeholder = 'age...'>
                <input id ='description' placeholder = 'description..'>
                <button id='button'>Create</button>
            </form>
        `
        let form = document.getElementById('create-mon')
        console.log(form);
        form.addEventListener('submit', addMonster)
    }
    function addMonster(e){
        e.preventDefault();
        let newMonsterObj = {
            name: e.target.querySelector('#name').value,
            age: e.target.querySelector('#age').value,
            description: e.target.querySelector('#description').value
        }
        console.log(newMonsterObj);
        //displayMonsters(newMonsterObj)
        postMonster(newMonsterObj)
    }
    function postMonster(monster){
        fetch('http://localhost:3000/monsters', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(monster)          
        })
        .then(resp => resp.json())
        .then(data => data)
    }
    function prevNextPages(){
        document.getElementById('forward').addEventListener('click', ()=>{
            page+=1
            document.querySelector('#monster-container').innerHTML = ""
            fetchMonsters(page)
    
        })
        document.getElementById('back').addEventListener('click', ()=>{
            page-=1
            if(page>=1){
                document.querySelector('#monster-container').innerHTML = ""
                fetchMonsters(page)
            }else{
                alert ('click next page')
            }           
    
        })
    } 
    prevNextPages()    
})