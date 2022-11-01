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
                window.location.href = '/posts'
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
})
