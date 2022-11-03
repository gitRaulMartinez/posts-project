window.addEventListener('DOMContentLoaded', (event) => {
    if(document.getElementById('formEditProfile')){
        const form = document.getElementById('formEditProfile')
        const name = document.getElementById('e-name')
        const last = document.getElementById('e-last')
        const profile = document.getElementById('e-profile')
        const btn = document.getElementById('btn-autocomplete')
        const url = document.getElementById('image-url')
        const image = document.getElementById('image')
        const errorImage = document.getElementById('error-image')
        const message = document.getElementById('message-image')
        let autocomplete = false
        form.addEventListener('submit',async (e) => {
            e.preventDefault()
            errorImage.classList.remove('error')
            const data = {
                _id: form._id.value,
                name: form.name.value,
                last: form.last.value,
                profile: form.profile.value,
                image: image.files[0]
            }
            const formData = new FormData()
            for(const name in data){
                formData.append(name,data[name])
            }
            
            const resp = await putImage('/profile/edit'+data._id,formData)
            console.log(resp)
            
            if(resp.data.message){
                window.location.href = '/posts/my-posts'
            }   
            else{
                errorForm(resp.data)
            }
        })

        name.addEventListener('input',()=>{
            if(autocomplete){
                profile.value = slugify(name.value+' '+last.value)
                removeErrorElementStatic('profile')
            }
        })
        last.addEventListener('input',()=>{
            if(autocomplete){
                profile.value = slugify(name.value+' '+last.value)
                removeErrorElementStatic('profile')
            }
        })
        profile.addEventListener('input',() =>{
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
        image.addEventListener('change',()=>{
            const [file] = image.files
            errorImage.classList.remove('error')
            if(file.type == 'image/jpeg' || file.type == 'image/png'){
                if(file){
                    url.src = URL.createObjectURL(file)
                }
            }
            else{
                errorImage.classList.add('error')
                message.innerText = 'Formato no valido'
            }
        })

        const listElement = ['name','last','profile']
        addEventFieldRemoveError(listElement)
    }
})
