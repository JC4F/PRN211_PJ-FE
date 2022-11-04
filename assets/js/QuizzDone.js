let _$ = (selector) => document.querySelector(selector);
let alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
let listQues = [], userAns={};
let toastElement = _$('.toast');
let toast = new bootstrap.Toast(toastElement)
let toastBody = _$('.toast-body');
let mess='';
let time = 2 * 60 * 1000
let quizzGenId
//handle event toast
toastElement.addEventListener('show.bs.toast', () => {
    toastBody.innerHTML = mess
})
function submitForm(path, params, method = 'get') {

    // The rest of this code assumes you are not using a library.
    // It can be made less verbose if you use one.
    const form = document.createElement('form');
    form.method = method;
    form.action = path;

    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            const hiddenField = document.createElement('input');
            hiddenField.type = 'hidden';
            hiddenField.name = key;
            hiddenField.value = params[key];

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}
const callApi = (url, dataSend = '', method = 'get') => {
    return $.ajax({
        url,
        type: method,
        data: dataSend
    })
}

const fakeListQuesAndAnswer = () => {
    listQues = [
		{
            ques: 'Cau hoi so 1',
            quizzQuesId: 1,
            quizzAns: [
                { quizzAnsId: 1, ans: 'dap an 1', isCorrect: true},
                { quizzAnsId: 2, ans: 'dap an 2', isCorrect: false},
                { quizzAnsId: 3, ans: 'dap an 3', isCorrect: true},
			]
		},
		{
            ques: 'Cau hoi so 2',
            quizzQuesId: 2,
            quizzAns: [
                { quizzAnsId: 4, ans: 'dap an 1', isCorrect: false},
                { quizzAnsId: 5, ans: 'dap an 2', isCorrect: true},
                { quizzAnsId: 6, ans: 'dap an 3', isCorrect: false},
                { quizzAnsId: 7, ans: 'dap an 4', isCorrect: false},
			]
        },
		{
            ques: 'Cau hoi so 2',
            quizzQuesId: 3,
            quizzAns: [
                { quizzAnsId: 8, ans: 'dap an 1', isCorrect: false},
                { quizzAnsId: 9, ans: 'dap an 2', isCorrect: true},
                { quizzAnsId: 10, ans: 'dap an 3', isCorrect: true},
                { quizzAnsId: 11, ans: 'dap an 4', isCorrect: false},
			]
        }
	]
    userAns = {
        accountId: 2,
        asnArr: JSON.stringify([1, 2, 5, 8]),
        score: 0
    }
}
const handleChangeSelectQuestion = () => {
    let allQues = document.querySelectorAll('.ques-index_list button')
    for(let i=0; i<allQues.length; i++) {
        allQues[i].className = 'btn btn-light mx-2'
    }
}
const handleClickSelectQuestion = (e) => {
    let AnsArr = JSON.parse(userAns.asnArr)
    let clickSelect = e.srcElement;
    let index = +clickSelect.innerHTML;
    handleChangeSelectQuestion()
    clickSelect.className = 'btn btn-info mx-2'
    _$('.choose-question__index').innerHTML = index;
    _$('.question-content').innerHTML = listQues[index - 1].ques;

    let allAsnwers = document.querySelectorAll('.choose-answer__List .choose-answer__item')
    for(let allAsnwer of allAsnwers)
        allAsnwer.remove()
    
    let rightAnswer = []
    listQues[index - 1].quizzAns.forEach((cur, indexTmp)=>{
        if(cur.isCorrect)
            rightAnswer.push(alphabets[indexTmp])
    })
    _$('.right-answer').innerHTML = `Right answer is ${rightAnswer.join(', ')}`

    listQues[index - 1].quizzAns.forEach((cur, indexTmp)=>{
        let nextAnswer = document.createElement('div');
        nextAnswer.className ='choose-answer__item';
        nextAnswer.innerHTML = `${(()=>{
            if(!AnsArr.includes(cur.quizzAnsId)) return ''
            if(cur.isCorrect && AnsArr.includes(cur.quizzAnsId)) 
                return '<i class="fa-solid fa-check mx-1"></i>'
            else if(!cur.isCorrect && AnsArr.includes(cur.quizzAnsId))
                return '<i class="fa-solid fa-xmark mx-1"></i>'
        })()}
        <div class="mb-2 row align-items-center" data-ansid="${cur.quizzAnsId}">
            <label class="col-sm-2 col-form-label">
                <input class="form-check-input mx-1" type="checkbox" ${AnsArr.includes(cur.quizzAnsId)? 'checked': ''} disabled>
                <span>${alphabets[indexTmp]}</span>.
            </label>
            <div class="col-sm-8">
            <p>${cur.ans}</p>
            </div>
        </div>`;
        _$('.choose-answer__List').appendChild(nextAnswer)
    })
}
const handleClientSubmitData = () => {

}
const handleClickSubmit = () => {
    let submitBtn = _$('.modal-footer .btn-primary')
    submitBtn.addEventListener('click', handleClientSubmitData)
}
const handleOnLoadData = async() => {
    fakeListQuesAndAnswer()
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
    handleClickSubmit()
}
takeExam()