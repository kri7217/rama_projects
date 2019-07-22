import { Injectable } from '@angular/core';

export interface Question {
    name: string;
    options: string[];
    answer: string
}

@Injectable({
    providedIn:"root"
})
export class QuestionService {

    private questions: Question[];
    constructor() {
        this.questions = [
            {
                name:"what is 0 ",
                options:['qwerty','asdfg','mnbv','sade'],
                answer:"sade"
            }
        ]

        for(let i=1;i<=19;i++){
            this.questions[i]={...this.questions[0]}
            this.questions[i].name = `what is ${i}`
        }
    }

    getQuestions(){
        return this.questions;
    }
}