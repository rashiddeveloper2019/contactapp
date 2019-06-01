function Signup() {
    console.log("yeha a gya hu =======")
    var name = document.getElementById('name').value;
    var email =document.getElementById('email').value;
    var password = document.getElementById('password').value;
    // console.log("====================",name,email,password)

    $.ajax({
        url: '/signup',
        dataType: 'json',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify( {"email":email,"phone":name,"password":password } ),
        processData: false,
        success: function( data ){
            
            
           
            console.log(data.message,"=============1234========699996=========")
            alert(data.message)
            window.location = '/login';
            
        },
        error: function( error ){
            alert(error)
        }
    });
  

}

function Signin(){
    console.log("login ho rha h kya ======")
    var email = document.getElementById('email').value;
    var password = document.getElementById('pwd').value;
    console.log("----------121--", email,password)

    $.ajax({
        url: '/signin',
        dataType: 'json',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify({"email": email, "password": password}),
        processData: false,
        success: function(data){
            if(data.status){
            console.log(data,"+++++++++123+")
            console.log(data.token)
            var token =data.token;
            localStorage.setItem("JWTtoken",token)
            alert(data.message)
            window.location = '/home'
            }else{
                console.log("================12===========")
                alert(data.message)
            }
        }
    })
}

function Contactapp() {
    console.log("====qwe==")
    var email = document.getElementById('email').value;
    var name = document.getElementById('name').value;
    var phone = document.getElementById('phone').value;
    console.log("-----iwd==",email,"====",name,"///",phone)
    var token = localStorage.getItem('JWTtoken')
    console.log(token)
    $.ajax({
        url : '/contactapp',
        dataType: 'json',
        type: 'post',
        contentType: 'application/json',
        headers: {
            'x-auth' : token
       },
        data: JSON.stringify({"email":email,"name":name,"phone":phone}),
        processData: false,
        success: function(data){
            console.log("oooooooooo---",data)
            location.reload();
        }

    })
}

function Signout() {
    console.log("------okm")
    var token = localStorage.getItem('JWTtoken')
    console.log(token,"--------wqe----")
    $.ajax({
        url: '/signout',
        dataType: 'json',
        type:'get',
        contentType: 'application/json',
        headers:{
            'x-auth' : token
        },
        processData: false,
        success:function(data){
            console.log(data, "-----===---")
            localStorage.removeItem('JWTtoken')
            window.location = '/login'
        }
    })
} 

function Showdata() {
 console.log('--------ooo----')
 var token = localStorage.getItem('JWTtoken')
 console.log(token,"-----pppp--")
 $.ajax({
     url: '/getdata',
     dataType: 'json',
     type:'get',
     contentType:'application/json',
     headers:{
         'x-auth': token
     },
     processData: false,
     success:function(data){
         console.log(data,"]]]]]]]]ii===")
        console.log(data.data[0].email)
        var obj = data.data
        console.log("=================",obj)
         
        var html ='';
    for(var i=0;i<obj.length;i++)
    {
        html += `<tr id=row${i + 1}>`; 
                         html += `<td id=id${i+1}>` + obj[i]._id + '</td>';
                         html += `<td id=name${i+1}>` +obj[i].name  + '</td>';
                         html += `<td id=phone${i+1} >`+obj[i].phone + '</td>';
                         html += `<td id=email${i+1}>`+obj[i].email + '</td>';
                         html += '<td>' + `<button type="button" id=update${i + 1} onclick="update(${i + 1})" >` + "update" + `</button>` + `</td>`;
                         html += '<td>' + `<button type="button" id=del${i + 1} onclick="del(${i + 1})" >` + "DELETE" + `</button>` + `</td>`;
                         html += '<td>' + `<button type="button" id=edit${i   + 1} onclick="edit(${i   + 1})">`  + "EDIT"   + `</button>` + `</td>`;
                         html += '</tr>';

    //    $("#mytable").append(tr+td1+td2+td3); 

    }  
    html += '</br>';
                document.getElementById('mytable').innerHTML = html;
     }
 })
}

function update (id) {
 console.log('=====---====qwertyu',id)  
 var q =document.getElementById(`id${id}`).innerHTML;
 var w =document.getElementById(`phone${id}`).innerHTML;
 console.log(q,w,"=====qq====")
 var token = localStorage.getItem('JWTtoken')
 console.log(token)
 $.ajax({
     url:'/updatedata',
     type:'json',
     type: 'post',
     contentType: 'application/json',
     headers:{
       'x-auth': token
     },
     data: JSON.stringify({"_id":q,"phone":w}),
     processData: false,
     success: function(data){
         console.log("=====ppp===",data)
         location.reload();
     }
 })
}
 function del(id){
console.log('=========for deletion =====',id)
var q = document.getElementById(`id${id}`).innerHTML;
console.log(q,"===id for deletion===")
var token = localStorage.getItem('JWTtoken')
console.log(token)
$.ajax({
    url:'/deletedata',
    type:'json',
    type:'post',
    contentType:'application/json',
    headers:{
        'x-auth':token
    },
    data:JSON.stringify({"_id":q}),
    processData:false,
    success: function(data){
        console.log("====-------qqq====",data)
        location.reload();
    }

})
}



function edit (id) {
    document.getElementById(`phone${id}`).setAttribute("contenteditable",true)
}
