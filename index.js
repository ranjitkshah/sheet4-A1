const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const sex = document.getElementById('sex');
const role = document.querySelectorAll('input[name="role"]'); 
const rolei = document.getElementById('role');

const permi = document.getElementById('perm');
 

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    validate();
})



const isemail = (emailc)=>{
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(mailformat.test(emailc)){
        return true;
    }
    else{
        return false;
    }

}

const ispass = (passc)=>{
        var passformat =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
        if(passformat.test(passc)){
            return true;
        }
        else{
            return false;
        }
}


function setClassname(input){
    const formctrl=input.parentElement;
    const className=formctrl.className; 
    const id=className.split(' ')[0];
    formctrl.className=`${id}`;
}

function setErrormsg(input,errormsgs){
    const formctrl=input.parentElement;
    console.log(formctrl)
    const className=formctrl.className;
    const id=className.split(' ')[0];
    console.log(id)
    const small = formctrl.querySelector('small');
    formctrl.className=`${id} error`;
    small.innerText = errormsgs;
}

function setSuccessmsg(input){
    const formctrl=input.parentElement;
    const className=formctrl.className; 
    const id=className.split(' ')[0];
    formctrl.className=`${id} success`;

}

const validate= ()=>{

    const emailval = email.value.trim().toLowerCase();
    console.log(emailval);  
    const passval = password.value.trim();
    
    const sexval = sex.value;
    console.log(sexval);
    let roleValue;
    for (const rv of role) {
        if (rv.checked) {
            roleValue = rv.value;
            break;
        }
    }

    console.log(roleValue);

    count =0;

    //perm validate
    var perm = document.querySelectorAll('input[name="perm"]:checked');
    permval=[];
    Array.prototype.forEach.call(perm, function(el) {
        permval.push(el.value);
    });

    if(permval.length>=2){
        setSuccessmsg(permi);
        count++;
    }
    else{
        setErrormsg(permi,'select atleast 2 permissions')
    }


    //role validate
    if(roleValue===undefined){
        setErrormsg(rolei,'role is not selected')
    }
    else{
        setSuccessmsg(rolei)
        count++;
    }

    //email validate
    if(emailval===""){
        setErrormsg(email,'email cannot be blank');
    }
    else if(!isemail(emailval)){
        setErrormsg(email,'not a valid email');
    }
    else{
        setSuccessmsg(email);
        count++;
    }

    //password validate
    if(passval===""){
        setErrormsg(password,'password cannot be blank')
    }
    else if(!ispass(passval)){
        setErrormsg(password,'password should be min 6 character with MIX of Upercase, lowercase, digits')
    }
    else{
        setSuccessmsg(password)
        count++
    }

    //gender validation

    if(sexval=="select"){
        setErrormsg(sex,'gender is not selected');
    }
    else{
        setSuccessmsg(sex);
        count++
    }

    
console.log(count);

if(count==5){
    Swal.fire({
        title: 'Do you want to submit the form?',
        html:`<div>
        Email : ${emailval} <br>
                   Gender : ${sexval} <br>
                   Role : ${roleValue} <br>
                   permissions : ${permval} <br>
    </div>`,
       
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, submit it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'submit!',
            'Your data has been submit.',
            'success'
            
            )
            
            
        }
        
    })
    form.reset();
    setClassname(email);
    setClassname(password);
    setClassname(sex);
    setClassname(rolei);
    setClassname(permi);
}


}