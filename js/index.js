const nameInput = document.getElementById("search");
const submitButton = document.querySelector('.submit');
const who = document.getElementById('who')
const blog = document.querySelector('#list').querySelector('#b').querySelector('#pb').querySelector('#ab')
const bio = document.querySelector('#list').querySelector('#i').querySelector("#pi")
const where = document.querySelector('#list').querySelector('#l').querySelector("#pl")
const profile = document.getElementById('profile')

// send request to server and get data for input name then call functions to show result
async function getData(e) {
    console.log("Data getting")
    let name = nameInput.value; 
    e.preventDefault();
    if (checkValidity(name)) {
        try {
            let response = await fetch(`https://api.github.com/users/${name}`);
            let obj = await response.json();
            if (response.status != 200) {
                nameInput.style.color = 'red'
                nameInput.value = 'User not found! Try again'
                return Promise.reject(`Request failed with error ${response.status}`);
            }
            nameInput.style.color = 'black'
            setData(obj);
        } catch (e) {
            console.log(e);
        }
    } else {
        showAlert("Invalid input!");
    }
}

// show Prediction result to user
function setData(obj) {
    nameData = obj.name
    blogData = obj.blog
    locData = obj.location
    profData = obj.avatar_url
    bioData = obj.bio
    gitID = obj.login
    setCookie(nameInput,obj, 1)
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


// this function check input name validity
function checkValidity(name) {
    // const regex1 = /[A-Za-z ]+/g;
    // const regex2 = /[0-9\.\-\/]+/g;
    // const foundValid = name.match(regex1);
    // const foundNotValid = name.match(regex2);
    // if (foundNotValid == null && foundValid.length > 0) {
    //     return true;
    // }
    return true;

}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }


console.log("Hi samin")
submitButton.addEventListener('click', getData);