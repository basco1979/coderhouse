const restoreBtn = document.getElementById('restoreBtn')
const emailInput = document.getElementById('emailInput')
const passwordInput = document.getElementById('passwordInput')
const resultMessagge = document.getElementById('resultMessagge')

restoreBtn.addEventListener('click', async(e) => {
    const email = emailInput.value
    const password = passwordInput.value
    const result = await fetch('http://localhost:8080/api/session/recovery', {
        body: JSON.stringify({email, password}),
        headers: {
            'Content-Type': 'application/json',        
        },
        method: 'POST'
    });
    if(result.status === 200 || result.status === 201){
        resultMessagge.innerHTML = 'Password restaurada'
    }
    else{
        resultMessagge.innerHTML = 'Error al restaurar la password'

    }
})