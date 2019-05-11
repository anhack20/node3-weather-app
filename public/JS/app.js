const weather = document.querySelector('form')
const messageOne = document.querySelector('#bam')
const messageTwo = document.querySelector('#bang')

const address = document.querySelector('input')
  


//messageOne.textContent='From JavaScript'

weather.addEventListener('submit', (e) =>{
    e.preventDefault()

    const location =address.value
    messageOne.textContent = 'Loading...'  
    messageTwo.textContent = ''  

    fetch('http://localhost:3000/weather?address='+location).then((response) =>{
        response.json().then((data)=>{
            if(data.error){
            messageOne.textContent=data.error

            }else{
                
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast

               

            }
        })
    })
})