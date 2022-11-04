const swalTailWind = Swal.mixin({
    customClass: {
    confirmButton: 'text-sm bg-slate-800 py-2 px-4 border-none rounded-md shadow-sm border-transparent mt-5 text-center text-slate-100 hover:bg-slate-900 focus:ring-2 focus:ring-offset-2 focus:ring-slate-800',
    },
    buttonsStyling: false
})

const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-start',
    showConfirmButton: false,
    timer: 5000,
    didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

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

async function postImage(url,data){
    const response = await fetch(url,{
        method: 'POST',
        cache: 'no-cache',
        body: data
    })
    return response.json()
}

async function put(url,data){
    const response = await fetch(url,{
        method: 'PUT',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

async function putImage(url,data){
    const response = await fetch(url,{
        method: 'PUT',
        cache: 'no-cache',
        body: data
    })
    return response.json()
}

async function deleteFetch(url,data){
    const response = await fetch(url,{
        method: 'DELETE',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

async function getFetch(url,data){
    const response = await fetch(url,{
        method: 'GET',
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
        const element = document.getElementById('error-'+error.field)
        element.classList.add('error')
        const message = document.getElementById('message-'+error.field)
        message.innerText = error.message
    });
}

function addEventFieldRemoveError(listFormField){
    listFormField.forEach(field =>{
        removeErrorElement(field)
    })
}

function slugify(str){
    return str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
}

function removeErrorElement(data){
    if(document.getElementById('error-'+data)){
        const element = document.getElementById('error-'+data)
        element.addEventListener('input',()=>{
            if(element.classList.contains('error')){
                element.classList.remove('error')
            }
        })
    }
}

function removeErrorElementStatic(data){
    if(document.getElementById('error-'+data)){
        const element = document.getElementById('error-'+data)
        if(element.classList.contains('error')){
            element.classList.remove('error')
        }
    }
}

function closeModal(){
    swalTailWind.close()
}
async function deletePost(id){
    console.log(id)
    const data = await deleteFetch('/posts/'+id)
    window.location.href = "/posts/my-posts"
}

function changeFollowBtn(follow, id){
    const btns = document.querySelectorAll('.btn-follow')
    btns.forEach(btn => {
        if(btn.dataset.id == id){
            const text = btn.children[0]
            const icon = btn.children[1]
            if(follow){
                text.innerText = 'Siguiendo'
                icon.classList.remove('fa-circle-chevron-right')
                icon.classList.add('fa-circle-check')
            }
            else{
                text.innerText = 'Seguir'
                icon.classList.remove('fa-circle-check')
                icon.classList.add('fa-circle-chevron-right')
            }
        }   
    })   
}


async function stopFollowing(id,name){
    changeFollowBtn(false,id)
    closeModal()
    if(document.getElementById('follows')){
        document.getElementById('follows').innerText = parseInt(document.getElementById('follows').innerText) - 1
    }
    data = {
        _id: id
    }
    const resp = await post('/profile/stop-following',data)
    console.log(resp)
    Toast.fire({
        html: `
            <div class="flex justify-between items-center">
                <p class="font-medium text-md">Dejo de seguir a ${name}</p>
                <i class="fa-solid fa-circle-check text-2xl"></i>
            </div>
        `,
        color: 'white',
        background: '#292929',
        padding: '0.25rem 0.5rem'
    })
}

function onDark(){
    localStorage.theme = 'dark'
}

function onLight(){
    localStorage.removeItem('theme')
}

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('Hola crack todo piola')

    if(document.getElementById('btn-theme')){
        const btn = document.getElementById('btn-theme')
        if(localStorage.theme){
            document.querySelector('html').classList.add('dark')
            btn.children[0].classList.remove('fa-sun')
            btn.children[0].classList.add('fa-moon')
        }
        btn.addEventListener('click',()=>{
            if(localStorage.theme){
                onLight()
                document.querySelector('html').classList.remove('dark')
                btn.children[0].classList.remove('fa-moon')
                btn.children[0].classList.add('fa-sun')
            }
            else{
                onDark()
                document.querySelector('html').classList.add('dark')
                btn.children[0].classList.remove('fa-sun')
                btn.children[0].classList.add('fa-moon')
            }
        })
    }

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
            const resp = await post('/auth/signup',data)

            if(resp.data.message){
                swalTailWind.fire({
                    position: 'top',
                    showCloseButton: true,
                    confirmButtonText: 'Iniciar Sesión',
                    title: `<h2 class="text-2xl">¡Se ha registrado de manera exitosa!</h2>`
                }).then((result) => {
                    window.location = '/auth/signin'
                })
            }
            else{
                errorForm(resp.data)
            }
        })
        listFormField = ['name','last','email','password','confirmPassword']
        addEventFieldRemoveError(listFormField)
    }
    
    const btnsFollow = document.querySelectorAll('.btn-follow')
    if(btnsFollow){
        btnsFollow.forEach(btn=>{
            btn.addEventListener('click',async e => {
                const element = e.currentTarget
                const data = {
                    _id: element.dataset.id
                }
                const resp = await post('/profile/follow',data)
                let templateIcon = ''
                const id = element.dataset.id
                const name = element.dataset.name
                if(resp.error){
                    if(resp.message == 'modal'){
                        swalTailWind.fire({
                            position: 'center',
                            focusConfirm: false,
                            returnFocus: false,
                            showConfirmButton: false,
                            html: `
                                <div class="flex justify-between items-center w-full">
                                    <i class="fa-solid fa-circle-exclamation text-red-500 text-2xl mr-2"></i>
                                    <p class="text-md text-slate-600 text-start grow">¿Dejar de seguir a <strong>${name}</strong>?</p>
                                </div>
                                `,
                            footer: `
                                <div class="flex justify-end items-center w-full px-5">
                                    <button onclick="closeModal();" class="mr-2 text-sm bg-slate-100 py-2 px-4 border-none rounded-md shadow-sm border-transparent text-center text-slate-700 hover:bg-slate-200 focus:ring-2 focus:ring-offset-2 focus:ring-slate-200">Cerrar</button>
                                    <button onclick="stopFollowing('${id}','${name}');" class="text-sm bg-slate-700 py-2 px-8 border-none rounded-md shadow-sm border-transparent text-center text-slate-100 hover:bg-slate-800 focus:ring-2 focus:ring-offset-2 focus:ring-slate-800">Si</button>
                                </div>
                            `
                        })
                    }
                    else{
                        templateIcon = '<i class="fa-solid fa-circle-exclamation text-2xl"></i>'
                        Toast.fire({
                            html: `
                                <div class="flex justify-between items-center">
                                    <p class="font-medium text-md">${resp.message}</p>
                                    ${templateIcon}
                                </div>
                            `,
                            color: 'white',
                            background: '#292929',
                            padding: '0.25rem 0.5rem'
                        })
                    }
                    
                }
                else{
                    if(resp.message == 'ok'){
                        changeFollowBtn(true,id)
                        resp.message += (' '+name)
                    }
                    if(document.getElementById('follows')){
                        document.getElementById('follows').innerText = parseInt(document.getElementById('follows').innerText) + 1
                    }
                    templateIcon = '<i class="fa-solid fa-circle-check text-2xl"></i>'
                    Toast.fire({
                        html: `
                            <div class="flex justify-between items-center">
                                <p class="font-medium text-md">Siguiendo a ${name}</p>
                                ${templateIcon}
                            </div>
                        `,
                        color: 'white',
                        background: '#292929',
                        padding: '0.25rem 0.5rem'
                    })
                }
                
            })
        })
    }
})
