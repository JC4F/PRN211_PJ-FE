let _$ = (selector) => document.querySelector(selector);
let alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
let listQues = [];
let toastElement = _$('.toast');
let toast = new bootstrap.Toast(toastElement)
let toastBody = _$('.toast-body');
let mess='';
let image=''
//handle event toast
toastElement.addEventListener('show.bs.toast', () => {
    toastBody.innerHTML = mess
})

const handleImages = () => {
    let inputImage = _$('#quizz-image')
    
    inputImage.addEventListener('change', () => {
        const [file] = inputImage.files
        if (file) {
            _$('.preview-image').src = URL.createObjectURL(file)
            let reader = new FileReader();
            reader.onloadend = function() {
                image = reader.result;
            }
            reader.readAsDataURL(file);
        }
    })
}
const arrangeOrderAnswers = () => {
    let listAnswers = document.querySelectorAll('.add-answer__item')
    for(let i=0; i<listAnswers.length; i++){
        listAnswers[i].querySelector('.col-form-label span').innerHTML = alphabets[i];
    }
}
const handleRemoveAnswerClick = (e) => {
    let parentEle = e.srcElement.closest('.add-answer__item')
    parentEle.remove();
    arrangeOrderAnswers();
}
const handleAddAnswerClick = () => { 
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
    remmoveIcon.addEventListener('click', handleRemoveAnswerClick)
    addIcon.addEventListener('click', handleAddAnswerClick)
    arrangeOrderAnswers();
}
const handleAddNewAnswer = () => {
    let addBtns = document.querySelectorAll('.aai-action__wrapper .fa-circle-plus')
    let removeBtns = document.querySelectorAll('.aai-action__wrapper .fa-trash-can')
    for(let addBtn of addBtns){
        addBtn.addEventListener('click', handleAddAnswerClick)
    }
    for(let removeBtn of removeBtns){
        removeBtn.addEventListener('click', handleRemoveAnswerClick)
    }
}

const handleAddNextQuestion = () => {
    _$('.add-question__heading button').innerHTML = 'Add to Quizz'
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

const handleClearOtherWhenAddQuizz = ()=>{
    let allInputChecks = document.querySelectorAll('input[type="checkbox"]')
    for(let allInputCheck of allInputChecks){
        allInputCheck.checked = false;
    }
}
const renderItemToListQuiz = () => {
    let nextItem = document.createElement('div');
    nextItem.className ='quizz-wrapper__item';
    nextItem.innerHTML = `<div class="qw-item__left">
            <input class="form-check-input mx-1" type="checkbox">
            <span>Exercise <span class="qw-item__index">${listQues.length}</span></span>
        </div>
        <div class="qw-item__right">
            <i class="fa-solid fa-trash-can"></i>
        </div>`;
    _$('.quizz-wrapper__list').appendChild(nextItem)
    nextItem.querySelector('.fa-trash-can').addEventListener('click', handleClickDelete)
    nextItem.querySelector('input').addEventListener('click', handleVerifyCheckAll)
    nextItem.querySelector('input + span').addEventListener('click', handleClickSelect)
}
const verifyAddQuizz = (question, ansList) => {
    if(question.trim()===''){
        mess='Question is required!';
        toast.show()
        return false
    }
    if(ansList.some(cur => cur.answer.trim()==='')){
        mess='One of answer is empty!';
        toast.show()
        return false
    }
    if(ansList.length===1){
        mess='Answer must more than one!';
        toast.show()
        return false
    }
    if(!ansList.some(cur => cur.istrue===true)){
        mess='Question must have correct answer!';
        toast.show()
        return false
    }
    return true;
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
        if(addToQuizzBtn.innerHTML=='Add to Quizz'){
            if(!verifyAddQuizz(question, ansList)) return;
            let singleQues = {
                question, ansList
            }
            listQues.push(singleQues)
            renderItemToListQuiz()
            handleAddNextQuestion()
            handleClearOtherWhenAddQuizz();
            mess='Add success!';
            toast.show()
        } else if(addToQuizzBtn.innerHTML=='Update Quizz'){
            if(!verifyAddQuizz(question, ansList)) return;
            let index = +_$('.add-question__index').innerHTML-1;
            listQues[index] = {...listQues[index], question, ansList}
            mess='Update success!';
            toast.show()
        }
    })
}


const ArrangeNumQuizz = ()=>{
    let quizzItemIndexs = document.querySelectorAll('.qw-item__index')
    for(let i=0; i<quizzItemIndexs.length; i++){
        quizzItemIndexs[i].innerHTML = i+1;
    }
}
const handleClickDelete = (e)=>{
    let removeEle = e.srcElement.closest('.quizz-wrapper__item');
    listQues.splice(+removeEle.querySelector('.qw-item__index').innerHTML-1, 1)
    removeEle.remove()
    ArrangeNumQuizz();
    _$('.add-question__index').innerHTML = listQues.length + 1;
}
const handleDeleletSeleted = ()=>{
    let selectedDelBtn = _$('.quizz-wrapper__heading .btn-danger')
    selectedDelBtn.addEventListener('click', ()=>{
        let checkItems = document.querySelectorAll('.quizz-wrapper__item input')
        for(let checkItem of checkItems){
            if(checkItem.checked){
                listQues.splice(+checkItem.closest('.quizz-wrapper__item').querySelector('.qw-item__index').innerHTML-1, 1)
                checkItem.closest('.quizz-wrapper__item').remove()
                ArrangeNumQuizz();
            }
        }
        _$('.add-question__index').innerHTML = listQues.length + 1;
    })
}
const handleDeleteListQuizz = () => {
    let listQuizzes = document.querySelectorAll('.quizz-wrapper__item .fa-trash-can')
    if(listQuizzes){
        for(let listQuizz of listQuizzes){
            listQuizz.addEventListener('click', handleClickDelete)
        }
    }
}

const handleVerifyCheckAll = ()=>{
    let checkAll = _$('.quizz-wrapper__heading input')
    let checkList = document.querySelectorAll('.quizz-wrapper__item input')
    for(let checkItem of checkList){
        if(!checkItem.checked) {
            checkAll.checked = false;
            return;
        }
    }
    checkAll.checked = true;
}
const handleCheckQuiz = ()=>{
    let checkAll = _$('.quizz-wrapper__heading input')
    let checkList = document.querySelectorAll('.quizz-wrapper__item input')
    for(let checkItem of checkList){
        checkItem.addEventListener('click', handleVerifyCheckAll)
    }
    checkAll.addEventListener('click', ()=>{
        let checkListTmp = document.querySelectorAll('.quizz-wrapper__item input')
        for(let checkItem of checkListTmp){
            checkItem.checked = checkAll.checked;
        }
    })
}

const handleClickSelect = (e)=>{
    handleAddNextQuestion();
    let clickSelect = e.srcElement;
    let index = +clickSelect.querySelector('.qw-item__index').innerHTML;
    _$('.add-question__index').innerHTML = index;
    _$('.add-question__content textarea').value = listQues[index-1].question;
    
    //answer
    document.querySelectorAll('.add-answer__item input[type="checkbox"]')[0].checked = listQues[index-1].ansList[0].istrue
    document.querySelectorAll('.add-answer__item input[type="text"]')[0].value = listQues[index-1].ansList[0].answer

    listQues[index-1].ansList.forEach((cur, index1)=>{
        if(index1!=0){
            let nextAnswer = document.createElement('div');
            nextAnswer.className ='add-answer__item';
            nextAnswer.innerHTML = `<div class="mb-3 row">
                    <label class="col-sm-1 col-form-label">
                        <input class="form-check-input mx-1" type="checkbox" ${cur.istrue?'checked':''}>
                        <span>${alphabets[index1]}</span>
                    </label>
                    <div class="col-sm-8">
                    <input type="text" class="form-control" value="${cur.answer}">
                    </div>
                    <div class="col-sm-2 aai-action__wrapper">
                        <i class="fa-solid fa-circle-plus"></i>
                        <i class="fa-solid fa-trash-can"></i>
                    </div>
                </div>`;
            _$('.add-answer__List').appendChild(nextAnswer)
    
            let addIcon = nextAnswer.querySelector('.fa-circle-plus')
            let remmoveIcon = nextAnswer.querySelector('.fa-trash-can')
            remmoveIcon.addEventListener('click', handleRemoveAnswerClick)
            addIcon.addEventListener('click', handleAddAnswerClick)
        }
    })
    _$('.add-question__heading button').innerHTML = 'Update Quizz'
}
const handleSelectQuestion = ()=>{
    let selectQuestions = document.querySelectorAll('.qw-item__left input + span')
    if(selectQuestions){
        for(let selectQuestion of selectQuestions){
            selectQuestion.addEventListeners('click', handleClickSelect)
        }
    }
}

const verifySubmitQuizz = (quizzInfo, listQues)=>{
    if(Object.entries(quizzInfo).some(cur => cur[1].trim()==='')){
        mess='All quizz information is required!';
        toast.show()
        return false
    }
    if(listQues.length===0){
        mess='Quizz required at list one question!';
        toast.show()
        return false
    }
    return true;
}
const handleSubmitAddQuizz = () => {
    let submitBtn = _$('.header-control .btn-success')
    submitBtn.addEventListener('click', () =>{
        let quizzInfo = {
            title: _$('#quizz-title').value,
            description: _$('#quizz-description').value,
            subjectId: _$('#quizz-subject').value,
            code: _$('#quizz-code').value,
            time: _$('#quizz-time').value,
            image,
        }
        if(!verifySubmitQuizz(quizzInfo, listQues)) return;
        let allData = {
            ...quizzInfo,
            listQues
        }

        console.log(JSON.stringify(allData))
    })
}

const handleAddQuizzToSystem = ()=>{
    handleImages();
    let allData = {}

    handleAddNewAnswer()
    handleAddNewQuestion()
    handleAddQuiz()
    handleDeleteListQuizz()
    handleCheckQuiz()
    handleDeleletSeleted()
    handleSelectQuestion()
    handleSubmitAddQuizz()
}

handleAddQuizzToSystem()