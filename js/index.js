const nameInput = document.getElementById("search");
const submitButton = document.querySelector('.submit');
const who = document.getElementById('who')
const blog = document.querySelector('#list').querySelector('#b').querySelector('#pb').querySelector('#ab')
const bio = document.querySelector('#i').querySelector("#pi")
const where = document.querySelector('#list').querySelector('#l').querySelector("#pl")
const profile = document.getElementById('profile')
const Welcome = document.getElementById('welcome')

// send request to server and get data for input name then call functions to show result
async function getData(e) {
    let name = nameInput.value; 
    if(checkLocal(name) == false){
    e.preventDefault();
    try {
            Welcome.innerHTML="Welcome!"
            let response = await fetch(`https://api.github.com/users/${name}`);
            let obj = await response.json();
            if (response.status != 200) {
                nameInput.style.color = 'red'
                nameInput.value = 'User not found! Try again'
                return Promise.reject(`Request failed with error ${response.status}`);
                }
            nameInput.style.color = 'black'
            setData(obj);
            addLocal(name,JSON.stringify(obj))
        } catch (e) {
            console.log(e);
        }
    }
    else
    {      e.preventDefault();
           try {
                Welcome.innerHTML="Welcome "+ name+" !"
                getLocal(name)
               }
           catch (e) {
            console.log(e);
        }

    }
}

// set user data
function setData(obj) {
    nameData = obj.name
    blogData = obj.blog
    locData = obj.location
    profData = obj.avatar_url
    bioData = obj.bio
    gitID = obj.login
    if(nameData != null)
    {
        who.innerHTML = nameData
    }
    else
    {
        who.innerHTML = gitID
    }
    if(blogData != '')
    {
        blog.href = blogData
        blog.innerHTML = blogData
    }
    else
    {
        blog.href = "github.com/"+ gitID
        blog.innerHTML = "github.com/"+ gitID
    }
    if(locData != null)
    {
        where.innerHTML = locData
    }
    if(profData != null)
    {
        profile.src = profData
        profile.alter = nameData
    }
    if(bioData != null)
    {
        bio.innerHTML = bioData
    }
    else
    {
        bio.innerHTML = 'Coding...'
    }

}

//adding to local storage
function  addLocal(gitID,obj)
{
    localStorage.setItem(gitID,obj)
}

//getting data from local storage
function getLocal(gitID)
{
    objData = localStorage.getItem(gitID)

    const realObj = JSON.parse(objData)
    setData(realObj)

}

//checking local storage
function checkLocal(gitID)
{
    x = false
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if(key == gitID){
           x = true
        }
      }
    return x
}
submitButton.addEventListener('click', getData);
localStorage.clear()