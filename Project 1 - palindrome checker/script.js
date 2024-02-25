const textInput = document.getElementById('text-input');
const checkButton = document.getElementById('check-btn');
const result = document.getElementById('result');


checkButton.addEventListener('click', ()=>{
    let text = textInput.value;
    if(text === ""){
        alert('Please input a value');
    }
    else{
        // in this case, A palindrome is a word or sentence that's 
        // spelled the same way both forward and backward, 
        // ignoring punctuation, case, and spacing.
        let new_text= text.replace(/[-+_:\s\\\/.,\(\)]/g,'')
        new_text = new_text.toLowerCase()
        if(new_text === new_text.split('').reverse().join((''))){
            result.innerHTML=`${text} is a palindrome`
        }
        else{
            result.innerText=`${text} is not a palindrome`
        }
    }
})

