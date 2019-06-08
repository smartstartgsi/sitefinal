window.onload = function(){
    refresh2();
}
function refresh2() {
    async function fetchAsync() {
        const render = document.getElementById("housesTableBody");
        let txt = "";
        const response = await fetch('http://35.222.187.200:8080/api/user/getHouses/',{
            headers: {'Content-Type': 'application/json'},
            credentials: "include",
            method: 'GET'
            });
        const result = await response.json();
        var houses = result.houses;
        var isInsured = result.isInsured;
        console.log(result);
        var index = 0;
        //percorrer a variável users e por cada user cria a linha da tabela com os dados presentes
        for (const house of houses) {
            txt += "<tr><td>" + house.idHome + "</td><td>" + house.morada + "</td><td><button type = 'button' onclick= 'passContentDelete()'style='float: right;' class='btn btn-danger notika-btn-danger waves-effect'><i class='glyphicon glyphicon-trash'></i> Eliminar</button>"; 
            txt += "<button type = 'button' data-toggle='modal' data-target='#modalRegisterForm' style='float: right' onclick='passContentUpdate()' class='btn btn-info notika-btn-info waves-effect'><i class='glyphicon glyphicon-edit'></i> Editar</button>"
            txt += "<button class='btn btn-success notika-btn-success waves-effect' type = 'button' data-toggle='modal' data-target='#modalSimulation' onclick = 'passContentSimulation()' style = 'float: right;display:" + isHouseInsured(isInsured[index]) + "'><i class='far fa-chart-bar'></i> Simular</button></td>"
            txt += "<td style= 'display:none'>" + house.area + "</td><td style= 'display:none'>" + house.ano + "</td><td style= 'display:none'>" + house.capitalImovel + "</td><td style= 'display:none'>" + house.owner + "</td><td style='display:none;'>"+ house.solarPanels + "</td>"
            txt += "<td style='display:none;'>" + house.prevention + "</td><td style='display:none;'>" + house.topologia + "</td></tr>"
            index += 1;
        }
        render.innerHTML = txt;
    }
        //chama a função fetchAsync()
        fetchAsync().then(function(data){
        console.log('ok');
        }).catch(function(reason){
            console.log(reason.message);
        });
}



function addHome(){
    isHouseInsured(22);
    console.log('save() foi corrido');
    var idHome = document.getElementById('idHome2').value;
    var morada = document.getElementById('morada2').value;
    var area = document.getElementById('area2').value;
    var ano = document.getElementById('ano2').value;
    var capitalImovel = document.getElementById('capitalImovel2').value;
    var owner = document.getElementById('owner2').value;
    var solarPanels = document.getElementById('solarPanels2').value;
    var prevention = document.getElementById('prevention2').value;
    var topologia = document.getElementById('topologia2').value;
    var data = {
        morada,
        area,
        ano,
        capitalImovel,
        owner,
        solarPanels,
        prevention,
        topologia
    };
    console.log(data);
    fetch('http://35.222.187.200:8080/api/user/addHome',{
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(data)
    }).then(function(response){
        if (!response.ok) {
            alertify.notify('Houve um erro ao adicionar a casa!', 'error', 5, function(){  console.log('dismissed'); });
            if (response.status === 409) {
            } else {
            throw Error(response.statusText);
            }
        } else {
            alertify.notify('Casa adicionada com sucesso!', 'success', 5, function(){  console.log('dismissed'); });
            refresh2();    
        }
    }).then(function (result) {
                console.log(result);
                
            }).catch(function (err) {
                            console.log(err);
        });    
}


function isHouseInsured(isInsured){

    if(isInsured == true){
        return 'none';
    }else{
        return 'inline';
    }

        
    }

function passContentSimulation(){
    var id = document.getElementById("idHome3");
    var table = document.getElementById('housesTable');
    for(var i = 0; i<table.rows.length; i++){
        table.rows[i].onclick = function(){
            id.value = this.cells[0].innerHTML;
        }
    }
}

function deleteHome(id){
    
   
    console.log('delete a correr');
            console.log(id);
    fetch('http://35.222.187.200:8080/api/user/deleteHome/' + id,{
                headers: {'Content-Type': 'application/json'},
                method: 'DELETE',
                credentials : "include"
            }).then(function(response){
                if (!response.ok) {
                    alertify.notify('Houve um erro ao eliminar a casa!', 'error', 5, function(){  console.log('dismissed'); });
                } else {
                    alertify.notify('Casa eliminada com sucesso!', 'success', 5, function(){  console.log('dismissed'); });
                    
                    }
                    return response.json();
            }).then(function (result) {
                        
                        console.log(result);
                        refresh2();
                    }).catch(function (err) {
                            console.log(err);
                    });
                }

    
function passContentDelete(){
    var id;
    var table = document.getElementById('housesTable');
    console.log
    for(var i = 0; i<table.rows.length; i++){
        table.rows[i].onclick = function(){
            id = this.cells[0].innerHTML;
            console.log(id);
            swal({
                title: "Atenção!",
                text: "Tem a certeza que quer eliminar esta casa?!",
                icon: "warning",
                buttons: ["Cancelar", true],
                dangerMode: true,
                })
                .then((willDelete) => {
                if (willDelete) {
                    deleteHome(id);
                    }
                    });
            
        }
    }
}

function passContentUpdate(){

    var idHome = document.getElementById('idHome');
    var morada = document.getElementById('morada');
    var area = document.getElementById('area');
    var ano = document.getElementById('ano');
    var capitalImovel = document.getElementById('capitalImovel');
    var owner = document.getElementById('owner');
    var solarPanels = document.getElementById('solarPanels');
    var prevention = document.getElementById('prevention');
    var topologia = document.getElementById('topologia');
    var table = document.getElementById('housesTable');
    for(var i = 0; i<table.rows.length; i++){
        table.rows[i].onclick = function(){
            idHome.value = this.cells[0].innerHTML;
            morada.value = this.cells[1].innerHTML;
            area.value = this.cells[3].innerHTML;
            ano.value = this.cells[4].innerHTML;
            capitalImovel.value = this.cells[5].innerHTML;
            owner.value = this.cells[6].innerHTML;
            solarPanels.value = this.cells[7].innerHTML;
            prevention.value = this.cells[8].innerHTML;
            topologia.value = this.cells[9].innerHTML;
            
        }
    }
    
}

function confirmUpdate(){
    swal({
        title: "Atenção!",
        text: "Tem a certeza que quer alterar?!",
        icon: "warning",
        buttons: ["Cancelar", true],
        dangerMode: true,
        })
        .then((willDelete) => {
        if (willDelete) {
            	updateHome();
            }
            });
}
function updateHome(){
    console.log('update() foi corrido');
    var idHome = document.getElementById('idHome').value;
    var morada = document.getElementById('morada').value;
    var area = document.getElementById('area').value;
    var ano = document.getElementById('ano').value;
    var capitalImovel = document.getElementById('capitalImovel').value;
    var owner = document.getElementById('owner').value;
    var solarPanels = document.getElementById('solarPanels').value;
    var prevention = document.getElementById('prevention').value;
    var topologia = document.getElementById('topologia').value;
    var data = {
           morada,
           area,
           ano,
           capitalImovel,
           owner,
           solarPanels,
           prevention,
           topologia
    };
    console.log(data);
    fetch('http://35.222.187.200:8080/user/alterHome/' + idHome,{
    headers: {'Content-Type': 'application/json'},
    method: 'PUT',
    credentials : "include",
    body: JSON.stringify(data)
    }).then(function(response){
        if (!response.ok) {
            swal("Erro!", "Tente novamente!", "error");
        } else {
            swal("Alterado com sucesso!", "", "success");
          
            
            }
            return response.json();
    }).then(function (result) {
                console.log(result);
                refresh2();
            }).catch(function (err) {
                    console.log(err);
                        });
        
}



