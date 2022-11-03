let _$ = (selector) => document.querySelector(selector);
let quizzSubject = [], quizzOrder = []

const fakeData = ()=>{
  quizzSubject = [
    {subjectName: 'PRN', quan: 10},
    {subjectName: 'PRN123', quan: 10},
    {subjectName: 'PRN111', quan: 9},
    {subjectName: 'PRN222', quan: 20},
    {subjectName: 'PRN233', quan: 8},
    {subjectName: 'PRN111', quan: 30}
  ]
  quizzOrder = [
    {quizztName: 'test 1', quan: 13},
    {quizztName: 'test 2', quan: 12},
    {quizztName: 'test 3', quan: 15},
    {quizztName: 'test 4', quan: 13},
    {quizztName: 'test 5', quan: 16},
    {quizztName: 'PRtest 3N', quan: 2},
    {quizztName: 'test 6', quan: 13}
  ]
}
const createChartQuizBySubject = ()=>{
  let subjectLabels=[], subjectData=[]
  quizzSubject.forEach(cur => {
    subjectLabels.push(cur.subjectName)
    subjectData.push(cur.quan)
  })
  const data = {
    labels: subjectLabels,
    datasets: [{
      label: 'Statistic Quizz By Subject',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: subjectData,
    }]
  };
  const config = {
    type: 'line',
    data: data,
    options: {}
  };
  const myChart = new Chart(
    document.getElementById('quiz-subject'),
    config
  );
}
const createChartOrderQuizz = ()=>{
  let orderLables=[], orderData=[];
  quizzOrder.forEach(cur => {
    orderLables.push(cur.quizztName)
    orderData.push(cur.quan)
  })

  const data = {
    labels: orderLables,
    datasets: [{
      label: 'Top 7 Quizz Done Most',
      data: orderData,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }]
  };
  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };
  const myChart = new Chart(
    document.getElementById('quiz-order'),
    config
  );
}
const handleDashBoard = () => {
  fakeData()
  createChartQuizBySubject()
  createChartOrderQuizz()
}

handleDashBoard()
