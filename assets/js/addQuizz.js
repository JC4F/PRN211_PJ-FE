let _$ = (selector) => document.querySelector(selector);
let toastElement = _$('.toast');
let toast = new bootstrap.Toast(toastElement)
let toastBody = _$('.toast-body');
let errorMess='';
//handle event toast
toastElement.addEventListener('show.bs.toast', () => {
    toastBody.innerHTML = errorMess
})

const handleAddQuizz = ()=>{
    let inputImage = _$('#quizz-image')

    inputImage.addEventListener('change', () => {
        const [file] = inputImage.files
        if (file) {
            _$('.preview-image').src = URL.createObjectURL(file)
        }
    })
}

handleAddQuizz()