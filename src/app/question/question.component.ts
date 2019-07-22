import { Component, OnInit } from '@angular/core';
import { QuestionService, Question } from '../Question.Service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  currentQuestion:Question;
  questionIndexs:number[];
  questions:Question[];
  questionNumber:number
  isAnswerCorrect?:boolean;
  isComplete:boolean;
  clearOption
  amountWon:number
  timer:number
  interval;

  constructor(private service:QuestionService) { 
    this.questionIndexs=[]  
    this.questionNumber=0;
    this.isAnswerCorrect=null
    this.clearOption=null
    this.amountWon=0;
    this.isComplete=false;
    this.timer=30;

  }

  ngOnInit() {
    this.questions=this.service.getQuestions()
    this.generateNextQuestion()
  }

  onSelectionChanged(selectedOption){
    if(selectedOption == this.currentQuestion.answer){
      this.isAnswerCorrect=true;
      this.amountWon += 100; 
      clearInterval(this.interval)
          
    }else{
      this.isAnswerCorrect=false;
    }
    setTimeout(()=>{
      this.isAnswerCorrect = null
      this.clearOption=null;
      this.generateNextQuestion()
    },5000)
  }  

  generateNextQuestion(){
    let randonQuestionIndex
  
    if(this.questionNumber >=10) {
      this.isComplete=true;
      return;
    }

    while(true){
      randonQuestionIndex = Math.floor(Math.random()*20)
      if(this.questionIndexs.indexOf(randonQuestionIndex)== -1)
        break;
        continue;
    }    
      this.currentQuestion = this.questions[randonQuestionIndex]
      this.questionIndexs.push(randonQuestionIndex)
      this.questionNumber+=1;
      //console.log(this.questionNumber)
      this.timer = 30 
      this.interval = setInterval(()=>{
        if(this.timer >0){
        this.timer --;
      }
        else{
          this.isAnswerCorrect=false;
        }
      },1000)
  }

}
