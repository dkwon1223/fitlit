// Your fetch requests will live here!
(fetch("https://fitlit-api.herokuapp.com/api/v1/users").then(response => response.json()).then(data => usersData = data))

let usersData 
let hydration
function fetchUserData(){
    return (fetch("https://fitlit-api.herokuapp.com/api/v1/users").then(response => response.json()).then(data => usersData = data))
}
function fetchHydrationData(){
    return fetch("https://fitlit-api.herokuapp.com/api/v1/hydration").then(repsonse => repsonse.json()).then(data => hydration = data)
}


export{ fetchHydrationData,fetchUserData, usersData, hydration}
