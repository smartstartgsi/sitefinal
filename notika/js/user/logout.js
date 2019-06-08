function logout(){

    async function fetchAsync() {
    
        const response = await fetch('http://35.222.187.200:8080/api/auth/logout',{
        headers: {'Content-Type': 'application/json'},
        credentials: "include",
        method: 'GET',
        });
        const rep = await response.json();
        window.location.href = "../Front-End/index.html";
        
    }
        //chama a função fetchAsync()
        fetchAsync().then(function(data){
        console.log('ok');
        }).catch(function(reason){
            console.log(reason.message);
        });

}