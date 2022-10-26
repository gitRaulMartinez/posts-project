console.log('Hola crack todo piola')

const formLogin = document.getElementById('formLogin')

formLogin.addEventListener('submit',async e => {
    e.preventDefault()
    const data = { email: formLogin.email.value, passowrd: formLogin.password.value}
    console.log(data)
    const resp = await postFetch('/login',data)
    console.log(resp)
    document.getElementById('message').innerHTML = resp
})


async function postFetch(url,data){
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
