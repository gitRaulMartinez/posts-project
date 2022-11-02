window.addEventListener('DOMContentLoaded', (event) => {
    if(document.getElementById('formNewPost')){
        const form = document.getElementById('formNewPost')
        const title = document.getElementById('title')
        const body = document.getElementById('body')
        const url = document.getElementById('url')
        const btn = document.getElementById('btn-autocomplete')
        let autocomplete = true
        form.addEventListener('submit',async (e) => {
            e.preventDefault()
            const data = {
                title: form.title.value,
                body: form.body.value,
                url: form.url.value
            }
            const resp = await post('/posts/create',data)
            if(resp.data.message){
                window.location.href = '/posts/my-posts'
            }   
            else{
                errorForm(resp.data)
            }
        })

        title.addEventListener('input',()=>{
            if(autocomplete){
                url.value = slugify(title.value)
                removeErrorElementStatic('url')
            }
        })
        url.addEventListener('input',() =>{
            autocomplete = false
            btn.innerText = 'Auto: off'
        })
        btn.addEventListener('click',()=>{
            if(autocomplete){
                btn.innerText = 'Auto: off'
            }
            else{
                btn.innerText = 'Auto: on'
            }
            autocomplete = !autocomplete
        })

        const listElement = ['title','body','url']
        addEventFieldRemoveError(listElement)
    }

    if(document.getElementById('formEditPost')){
        const form = document.getElementById('formEditPost')
        const title = document.getElementById('title')
        const url = document.getElementById('url')
        const btn = document.getElementById('btn-autocomplete')
        let autocomplete = true
        form.addEventListener('submit',async (e) => {
            e.preventDefault()
            const data = {
                _id: form._id.value,
                title: form.title.value,
                body: form.body.value,
                url: form.url.value,
                user: form.user.value
            }
            const resp = await put('/posts/'+data._id,data)
            if(resp.data.message){
                //window.location.href = '/posts/my-posts'
                Toast.fire({
                    html: `<div class="flex justify-between items-center"><p class="font-medium text-md">${resp.data.message}</p><i class="fa-solid fa-circle-check text-2xl"></i></div>`,
                    color: 'white',
                    background: '#292929',
                    padding: '0.25rem 0.5rem'
                })
            }   
            else{
                errorForm(resp.data)
            }
            console.log(resp)
        })

        title.addEventListener('input',()=>{
            if(autocomplete){
                url.value = slugify(title.value)
                removeErrorElementStatic('url')
            }
        })
        url.addEventListener('input',() =>{
            autocomplete = false
            btn.innerText = 'Auto: off'
        })
        btn.addEventListener('click',()=>{
            if(autocomplete){
                btn.innerText = 'Auto: off'
            }
            else{
                btn.innerText = 'Auto: on'
            }
            autocomplete = !autocomplete
        })

        
        const listElement = ['title','body','url']
        addEventFieldRemoveError(listElement)
    }
    
    document.querySelectorAll('.formDeletePost').forEach(form => {
        form.addEventListener('submit',async function(e){
            e.preventDefault()
            e.stopPropagation()
            let id = form._id.value.toString()
            let title = form.title.value
            console.log('id',id)
            swalTailWind.fire({
                position: 'center',
                focusConfirm: false,
                returnFocus: false,
                showConfirmButton: false,
                html: `
                    <div class="flex justify-between items-center w-full">
                        <i class="fa-solid fa-circle-exclamation text-red-500 text-2xl mr-2"></i>
                        <p class="text-md text-slate-600 text-start grow">Está por eliminar el post <strong>${title}</strong>, no podrá recuperar los datos guardados.<br>¿Está seguro que quiere hacerlo?</p>
                    </div>
                    `,
                footer: `
                    <div class="flex justify-end items-center w-full px-5">
                        <button onclick="closeModal();" class="mr-2 text-sm bg-slate-100 py-2 px-4 border-none rounded-md shadow-sm border-transparent text-center text-slate-700 hover:bg-slate-200 focus:ring-2 focus:ring-offset-2 focus:ring-slate-200">Cerrar</button>
                        <button onclick="deletePost('${id}');" class="text-sm bg-red-600 py-2 px-4 border-none rounded-md shadow-sm border-transparent text-center text-slate-100 hover:bg-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-red-700">Eliminar</button>
                    </div>
                `
            })
        })
    })

    
})


