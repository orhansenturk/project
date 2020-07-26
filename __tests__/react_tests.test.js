import React from 'react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { fetchQuestions, fetchCategories} from '../src/react/actions'
import { mount } from 'enzyme';
import QuestionsByCategory from '../src/react/components/QuestionsByCategory'

if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
            timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };

if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };

if(!window.lastTime){
    window.lastTime = () => {}
}

describe('Backend communications', () => {
    it('fetches questions from correct URL', () => {
        let mock = new MockAdapter(axios);
        const mockHandler = jest.fn(() => [200, {questions:[]}]);
        mock.onGet('/questions-by-category').reply(() => mockHandler());
        expect.assertions(1);
        return fetchQuestions().then(()=>{
            expect(mockHandler).toHaveBeenCalledTimes(1);
        });
    });
    it('fetches categories from correct URL', () => {
        let mock = new MockAdapter(axios);
        const mockHandler = jest.fn(() => [200, {questions:[]}]);
        mock.onGet('/categories').reply(() => mockHandler());
        expect.assertions(1);
        return fetchCategories().then(()=>{
            expect(mockHandler).toHaveBeenCalledTimes(1);
        });
    });
});

describe('React component rendering', ()=>{
    const mock_data = {
        questions: [
            {
                "question": "Question 1",
                "category": "cat-1",
                "question_type": {
                    "type": "single_choice",
                    "options": [
                        "yes",
                        "sometimes",
                        "no"
                    ]
                }
            },
            {
                "question": "Question 2",
                "category": "cat-1",
                "question_type": {
                    "type": "single_choice_conditional",
                    "options": [
                        "not important",
                        "important",
                        "very important"
                    ],
                    "condition": {
                        "predicate": {
                            "exactEquals": [
                                "${selection}",
                                "very important"
                            ]
                        },
                        "if_positive": {
                            "question": "Bonus question",
                            "category": "cat-1",
                            "question_type": {
                                "type": "number_range",
                                "range": {
                                    "from": 18,
                                    "to": 140
                                }
                            }
                        }
                    }
                }
            },
            {
                "question": "Question 3",
                "category": "cat-2",
                "question_type": {
                    "type": "single_choice",
                    "options": [
                        "yes",
                        "sometimes",
                        "no"
                    ]
                }
            }
        ],
        categories: [
            {
                "name":"cat-1",
                "display":"Category 1"
            },{
                "name":"cat-2",
                "display":"Category 2"
            },
        ]


    }
    it('all questions by category', ()=>{
        return expect(
            mount(<QuestionsByCategory questions={mock_data.questions}/>).find('.question-visible').length
        ).toBe(mock_data.questions.length)
    });
    it('next category', ()=>{
        const mockFn = jest.fn();
        const comp = mount(<QuestionsByCategory questions={mock_data.questions} onCategoryChange={mockFn}/>)
        comp.instance().state.answers = [{ answer: true }];
        comp.instance().nextCategory(true);
        return expect(mockFn).toHaveBeenCalledTimes(1);
    });
    it('unanswered questions', () =>{
        const comp = mount(<QuestionsByCategory questions={mock_data.questions}/>);
        comp.find('button').simulate('click');
        return expect(comp.find('.ui.red').length).toBe(5);
    });
    it('unanswered questions message', ()=> {
        const comp = mount(<QuestionsByCategory questions={mock_data.questions}/>);
        window.requestAnimationFrame = jest.fn();
        comp.find('button').simulate('click');
        return expect(window.requestAnimationFrame).toHaveBeenCalled();
    });
});