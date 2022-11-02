window.addEventListener('DOMContentLoaded', (event) => {
    if(document.getElementById('formEditProfile')){
        console.log('Hola')
        const form = document.getElementById('formEditProfile')
        const name = document.getElementById('e-name')
        const last = document.getElementById('e-last')
        const profile = document.getElementById('e-profile')
        const btn = document.getElementById('btn-autocomplete')
        let autocomplete = false
        form.addEventListener('submit',async (e) => {
            e.preventDefault()
            const data = {
                _id: form._id.value,
                name: form.name.value,
                last: form.last.value,
                profile: form.profile.value
            }
            const resp = await put('/profile/edit'+data._id,data)
            console.log(resp)
            if(resp.data.message){
                //window.location.href = '/posts/my-posts'
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

        const listElement = ['name','last','profile']
        addEventFieldRemoveError(listElement)
    }
})
