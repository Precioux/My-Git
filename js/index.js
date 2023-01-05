const nameInput = document.getElementById("search");
const submitButton = document.querySelector('.submit');

// send request to server and get data for input name then call functions to show result
async function getData(e) {
    console.log("Data getting")
    let name = nameInput.value;
    console.log(name)    
    e.preventDefault();
    if (checkValidity(name)) {
        try {
            console.log('Getting result from git')
            let response = await fetch(`https://api.github.com/users/${name}`);
            console.log(response)
            let obj = await response.json();
            if (response.status != 200) {
                return Promise.reject(`Request failed with error ${response.status}`);
            }
            console.log(obj)
            // setData(obj);
            // let data = await JSON.parse(window.localStorage.getItem(name));
            // console.log(data);
            // if (data != null) {
            //     savedAnswerCard.style.display = "block";
            //     setSavedAnswer(data);
            // } else {
            //     savedAnswerCard.style.display = "none";
            // }
        } catch (e) {
            console.log(e);
        }
    } else {
        showAlert("Invalid input!");
    }
}

// show Prediction result to user
function setData(obj) {
    if (obj.gender == null) {
        predictionGender.innerHTML = '<span><i class="fas fa-ban"></i></span>';
        predictionPercent.innerHTML = '<span><i class="fas fa-question"></i></span>';
        showAlert("Can't Find!");
    } else {
        if (obj.gender == "male") {
            var icon = '<span><i class="fas fa-male"></i><span>';
        } else if (obj.gender == "female") {
            var icon = '<span><i class="fas fa-female"></i><span>';
        }
        predictionGender.innerHTML = "<span>" + icon + "  " + obj.gender + "</span>";
        predictionPercent.innerHTML = '<span><i class="fas fa-percent" style="font-size:10px" ></i>  ' + (obj.probability * 100) + '</span>';
    }
}


// this function check input name validity
function checkValidity(name) {
    const regex1 = /[A-Za-z ]+/g;
    const regex2 = /[0-9\.\-\/]+/g;
    const foundValid = name.match(regex1);
    const foundNotValid = name.match(regex2);
    if (foundNotValid == null && foundValid.length > 0) {
        return true;
    }
    return false;

}

console.log("Hi samin")
submitButton.addEventListener('click', getData);