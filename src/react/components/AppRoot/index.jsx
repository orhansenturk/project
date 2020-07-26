import React from 'react';
import PropTypes from 'prop-types'
import { Header, Container, Step, Divider } from 'semantic-ui-react';
import Questions from '../QuestionsByCategory'

export default class AppRoot extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        const { steps, questions, onCategoryChange, lastCategory, finished} = this.props;
        
        let categoryQuestions;
        if(questions.length){
            categoryQuestions = <Questions questions={questions}
                                           onCategoryChange={onCategoryChange}
                                           lastCategory={lastCategory} />
        }
    

        if(finished){
            return <Container textAlign="center">
                <Header className="thank-you" as="h1">Thanks for completing the survey!</Header>
            </Container>
        }
        else{
            return (
                <div id="content">
                    <Container textAlign="center">
                        <Header className="the-title" as="h1">Personality Survey</Header>
                        <Step.Group size="large" fluid ordered items={steps} stackable="tablet"/>
                        <Divider horizontal>Please answer all the questions below</Divider>
                        { categoryQuestions }
                    </Container>
                </div>
            );
        }
        
    }
}

AppRoot.PropTypes = {
    steps: PropTypes.array.isRequired,
}