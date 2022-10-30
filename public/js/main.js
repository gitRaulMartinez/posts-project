console.log('Hola crack todo piola')
const swalTailWind = Swal.mixin({
    customClass: {
      confirmButton: 'text-sm bg-slate-800 py-2 px-4 border-none rounded-md shadow-sm border-transparent mt-5 text-center text-slate-100 hover:bg-slate-900 focus:ring-2 focus:ring-offset-2 focus:ring-slate-800',
    },
    buttonsStyling: false
})

if(document.getElementById('menu')){
    const menu = document.getElementById('menu')
    const dropdown = document.getElementById('dropdown')
    menu.addEventListener('click', () => {
        dropdown.classList.toggle('hidden')
    })
}

if(document.getElementById('formLogin')){ 
    const formLogin = document.getElementById('formLogin') 
    const message = document.getElementById('message-login')
    const cancel = document.getElementById('message-cancel')
    formLogin.addEventListener('submit',async e => {
        e.preventDefault()
        const data = { email: formLogin.email.value, password: formLogin.password.value}
        const resp = await post('/auth/login',data)
        if(resp.message){
            document.getElementById('message').innerHTML = resp.message
            message.classList.add('error')
        }   
        else{
            window.location.href = '/posts'
        }
    })

    cancel.addEventListener('click',()=>{
        message.classList.remove('error')
    })
}

if(document.getElementById('formRegister')){
    const formRegister = document.getElementById('formRegister')
    
    formRegister.addEventListener('submit',async e => {
        e.preventDefault()
        const data = {
            name: formRegister.name.value,
            last: formRegister.last.value,
            email: formRegister.email.value,
            password: formRegister.password.value,
            confirmPassword: formRegister.confirmPassword.value
        }
        const resp = await post('/signup',data)

        if(resp.data.message){
            console.log(resp.data.message)
            swalTailWind.fire({
                position: 'top',
                showCloseButton: true,
                confirmButtonText: 'Iniciar Sesión',
                title: `<h2 class="text-2xl">¡Se ha registrado de manera exitosa!</h2>`
            }).then((result) => {
                window.location = '/signin'
            })
        }
        else{
            errorForm(resp.data)
        }
    })

    addEventFieldRemoveError()
}


async function post(url,data){
    const response = await fetch(url,{
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

function errorForm(errors){
    errors.forEach(error => {
        console.log(error)
        const element = document.getElementById('error-'+error.field)
        element.classList.add('error')
        const message = document.getElementById('message-'+error.field)
        message.innerText = error.message
    });
}

function addEventFieldRemoveError(){
    listFormField = ['name','last','email','password','confirmPassword']
    listFormField.forEach(field =>{
        const element = document.getElementById('error-'+field)
        element.addEventListener('keyup',()=>{
            element.classList.remove('error')
        })
    })
}




