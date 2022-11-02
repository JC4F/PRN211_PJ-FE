let _$ = (selector) => document.querySelector(selector);
let alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
let listQues = [], userAns=[];
let toastElement = _$('.toast');
let toast = new bootstrap.Toast(toastElement)
let toastBody = _$('.toast-body');
let mess='';
let time=2*60*1000
//handle event toast
toastElement.addEventListener('show.bs.toast', () => {
    toastBody.innerHTML = mess
})

const fakeListQues = () => {
    listQues = [
		{
			question: {id: 1, ques: 'Cau hoi so 1'},
			ansList: [
				{ansId: 1,answer: 'dap an 1', istrue: 1},
				{ansId: 2,answer: 'dap an 2', istrue: 0},
                {ansId: 3,answer: 'dap an 3', istrue: 1},
			]
		},
		{
            question: {id: 2, ques: 'Cau hoi so 2'},
			ansList: [
				{ansId: 4,answer: 'dap an 1', istrue: 0},
				{ansId: 5,answer: 'dap an 2', istrue: 1},
                {ansId: 6,answer: 'dap an 3', istrue: 0},
                {ansId: 7,answer: 'dap an 4', istrue: 0},
			]
        },
		{
            question: {id: 3, ques: 'Cau hoi so 2'},
			ansList: [
				{ansId: 8,answer: 'dap an 1', istrue: 0},
				{ansId: 9,answer: 'dap an 2', istrue: 1},
                {ansId: 10,answer: 'dap an 3', istrue: 1},
                {ansId: 11,answer: 'dap an 4', istrue: 0},
			]
        }
	]
}
const handleChangeSelectQuestion = () => {
    let allQues = document.querySelectorAll('.ques-index_list button')
    for(let ques of allQues){
        ques.className = 'btn btn-light mx-2'
    }
}
const handleChooseAnswer = (e) => {
    let clickSelect = e.srcElement;
    let questionId = +clickSelect.closest('.question-wrapper').querySelector('.choose-question__index').innerHTML
}
const handleClickSelectQuestion = (e) => {
    let clickSelect = e.srcElement;
    let index = +clickSelect.innerHTML;
    handleChangeSelectQuestion()
    clickSelect.className = 'btn btn-info mx-2'
    _$('.choose-question__index').innerHTML = index;
    _$('.question-content').innerHTML = listQues[index-1].question.ques;

    let allAsnwers = document.querySelectorAll('.choose-answer__List .choose-answer__item')
    for(let allAsnwer of allAsnwers)
        allAsnwer.remove()

    listQues[index-1].ansList.forEach((cur, index)=>{
        let nextAnswer = document.createElement('div');
        nextAnswer.className ='choose-answer__item';
        nextAnswer.innerHTML = `<div class="mb-2 row align-items-center" data-ansid="${cur.ansId}">
            <label class="col-sm-2 col-form-label">
                <input class="form-check-input mx-1" type="checkbox">
                <span>${alphabets[index]}</span>.
            </label>
            <div class="col-sm-8">
            <p>${cur.answer}</p>
            </div>
        </div>`;
        _$('.choose-answer__List').appendChild(nextAnswer)
    })
}
let x = setInterval(function() {
    let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((time % (1000 * 60)) / 1000);
  
    _$('.count-down p').innerHTML = `${('0' + hours).slice(-2)} : ${('0' + minutes).slice(-2)} : ${('0' + seconds).slice(-2)}`
    if (time === 0) {
      clearInterval(x);
      _$('.count-down p').innerHTML = "EXPIRED";
    }
    time-=1000
  }, 1000);

const handleOnLoadData = () => {
    fakeListQues()
    listQues.forEach((cur, index)=>{
        let ansList = []
        let questionId = cur.question.id
        userAns.push({questionId, ansList})
    })
    for(let i=0; i<listQues.length; i++){
        let nextItem = document.createElement('button');
        nextItem.className ='btn btn-light mx-2';
        nextItem.setAttribute('type', 'button');
        nextItem.innerHTML = `${i+1}`;
        _$('.ques-index_list').appendChild(nextItem)

        nextItem.addEventListener('click', handleClickSelectQuestion)
    }
    document.querySelectorAll('.ques-index_list button')[0].click()
}

const takeExam = () => {
    handleOnLoadData()
}
takeExam()