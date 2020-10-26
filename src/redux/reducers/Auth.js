import {REDUX_SETUP, LOGIN_STATUS,FEATURED_QUESTIONS,GET_USER_DETAILS,USER_TAGS_DETAILS,USER_QUESTION_DETAILS} from '../Types';

const initial_state={
    login_status:false,
    redux_setup:false,
    featured_questions:[],
    user_details:null,
    user_tag_details:null,
    user_question_details:null
}

export default(state=initial_state,action)=>{
    switch(action.type){
        case LOGIN_STATUS:return{
            ...state,
            login_status:action.payload
        }
        case REDUX_SETUP:return{
            ...state,
            redux_setup:action.payload
        }
        case FEATURED_QUESTIONS:return{
            ...state,
            featured_questions:action.payload
        }
        case GET_USER_DETAILS:return{
            ...state,
            user_details:action.payload
        }
        case USER_TAGS_DETAILS:return{
            ...state,
            user_tag_details:action.payload
        }
        case USER_QUESTION_DETAILS:return{
            ...state,
            user_question_details:action.payload
        }
        default: return state;
    }
}