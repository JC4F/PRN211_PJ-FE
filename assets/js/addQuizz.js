let _$ = (selector) => document.querySelector(selector);
let alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
let listQues = [];
let toastElement = _$('.toast');
let toast = new bootstrap.Toast(toastElement)
let toastBody = _$('.toast-body');
let errorMess='';
//handle event toast
toastElement.addEventListener('show.bs.toast', () => {
    toastBody.innerHTML = errorMess
})

const handleImages = () => {
    let inputImage = _$('#quizz-image')
    
    inputImage.addEventListener('change', () => {
        const [file] = inputImage.files
        if (file) {
            _$('.preview-image').src = URL.createObjectURL(file)
        }
    })
}
const arrangeOrderAnswers = () => {
    let listAnswers = document.querySelectorAll('.add-answer__item')
    for(let i=0; i<listAnswers.length; i++){
        listAnswers[i].querySelector('.col-form-label span').innerHTML = alphabets[i];
    }
}
const handleRemoveClick = (e) => {
    let parentEle = e.srcElement.closest('.add-answer__item')
    parentEle.remove();
    arrangeOrderAnswers();
}
const handleAddClick = () => { 
    let nextAnswer = document.createElement('div');
    nextAnswer.className ='add-answer__item';
    nextAnswer.innerHTML = `<div class="mb-3 row">
            <label class="col-sm-1 col-form-label">
                <input class="form-check-input mx-1" type="checkbox">
                <span>A</span>
            </label>
            <div class="col-sm-8">
            <input type="text" class="form-control">
            </div>
            <div class="col-sm-2 aai-action__wrapper">
                <i class="fa-solid fa-circle-plus"></i>
                <i class="fa-solid fa-trash-can"></i>
            </div>
        </div>`;
    _$('.add-answer__List').appendChild(nextAnswer)

    let addIcon = nextAnswer.querySelector('.fa-circle-plus')
    let remmoveIcon = nextAnswer.querySelector('.fa-trash-can')
    remmoveIcon.addEventListener('click', handleRemoveClick)
    addIcon.addEventListener('click', handleAddClick)
    arrangeOrderAnswers();
}
const handleAddNewAnswer = () => {
    let addBtns = document.querySelectorAll('.aai-action__wrapper .fa-circle-plus')
    let removeBtns = document.querySelectorAll('.aai-action__wrapper .fa-trash-can')
    for(let addBtn of addBtns){
        addBtn.addEventListener('click', handleAddClick)
    }
    for(let removeBtn of removeBtns){
        removeBtn.addEventListener('click', handleRemoveClick)
    }
}

const handleAddNextQuestion = () => {
    _$('.add-question__index').innerHTML = listQues.length + 1;
    _$('.add-question__content textarea').value = '';
    let answerList = document.querySelectorAll('.add-answer__item')
    for(let i=0; i<answerList.length; i++){
        if(i===0){
            answerList[i].querySelector('input[type="checkbox"]').checked = false;
            answerList[i].querySelector('input[type="text"]').value = '';
        } else {
            answerList[i].remove();
        }
    }
}
const handleAddNewQuestion = () => {
    let addBtn = _$('.header-control .btn-secondary')
    addBtn.addEventListener('click', handleAddNextQuestion)
}

const renderItemToListQuiz = () => {
    let nextItem = document.createElement('div');
    nextItem.className ='quizz-wrapper__item';
    nextItem.innerHTML = `<div class="qw-item__left">
            <input class="form-check-input mx-1" type="checkbox">
            <span>Exercise ${listQues.length}</span>
        </div>
        <div class="qw-item__right">
            <i class="fa-solid fa-trash-can"></i>
        </div>`;
    _$('.quizz-wrapper__list').appendChild(nextItem)
}
const handleAddQuiz = () => {
    let addToQuizzBtn = _$('.add-question__heading button');
    addToQuizzBtn.addEventListener('click', ()=>{
        let answerList = document.querySelectorAll('.add-answer__item')
        let question = _$('.add-question__content textarea').value;
        let ansList = [...answerList].map((cur, index)=>{
            return {
                answer: cur.querySelector('input[type="text"]').value, 
                istrue: cur.querySelector('input[type="checkbox"]').checked
            }
        })
        let singleQues = {
            question, ansList
        }
        listQues.push(singleQues)
        renderItemToListQuiz()
    })
}

const handleAddQuizz = ()=>{
    handleImages();
    let allData = {}
    let quizzInfo = {
        title: "",
        description: "",
        subjectId: "",
        code: "",
        time: ""
    };
    

    handleAddNewAnswer()
    handleAddQuiz()
    handleAddNewQuestion()
}

handleAddQuizz()