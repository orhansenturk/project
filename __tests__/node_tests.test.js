import request from 'supertest'

import app from '../src/express/routes';
import getQuestions from '../src/getQuestions';

const mock_questions = {
    categories:[
        {
            name: "category-1",
            description: "category-1"
        }
    ],
    questions:[
        {
            category: "category-1"
        },
        {
            category: "category-1"
        }
    ]
};

describe('getQuestions', () => {
    let questions = getQuestions(mock_questions).questions;
    let categories = getQuestions(mock_questions).categories;
    it('categories by name', () => {
        return expect(questions).toHaveProperty('category-1');
    });
    it('questions for categories', () => {
        return expect(questions['category-1']).toHaveLength(2);
    });
    it('categories', () => {
        return expect(categories).toHaveLength(1);
    })
});

describe('API Tests', () => {
    let questions = getQuestions(mock_questions);

    it('questions', () => {
        return request(app(questions)).get('/questions-by-category')
            .expect(200)
            .then((response)=>{
                expect(response.body).toHaveProperty('questions');
            })
    });
    it('questions by category', () => {
        return request(app(questions)).get('/questions-by-category')
            .expect(200)
            .then((response)=>{
                expect(response.body.questions).toHaveProperty('category-1');
                expect(response.body.questions['category-1']).toHaveLength(2);
            })
    });

});

