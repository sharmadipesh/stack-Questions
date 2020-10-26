import {REDUX_SETUP,LOGIN_STATUS,FEATURED_QUESTIONS,GET_USER_DETAILS,USER_TAGS_DETAILS,USER_QUESTION_DETAILS} from '../Types';
import {API_BASE_URL} from "config/config";
import {axiosNoAuth} from 'config/axios-instances';

export function reduxSetup(successCallBack,errorCallBack){
    return async function(dispatch){
        try{
            await dispatch({
                type:REDUX_SETUP,
                payload:true
            })
            successCallBack && successCallBack();
        }catch(e){
            console.log(e);
            errorCallBack && errorCallBack(e);
        }
    }
}

export function loginAuthHnadler(successCallBack,errorCallBack){
    return async function(dispatch){
        try{
            await dispatch({
                type:LOGIN_STATUS,
                payload:true
            })
            localStorage.setItem("login_status",  true);
            successCallBack && successCallBack();
        }catch(e){
            console.log(e);
            errorCallBack && errorCallBack(e);
        }
    }
}


export function getAllQuestions(page,successCallBack,errorCallBack){
    return async function(dispatch){
        try{
            // let response = await axiosNoAuth.get(API_BASE_URL+'/2.2/questions/featured?&site=stackoverflow');
            let response = await axiosNoAuth.get(API_BASE_URL+`/2.2/questions/featured?page=${page}&site=stackoverflow`);

            console.log("getAllQuestions ",response)
            await dispatch({
                type:FEATURED_QUESTIONS,
                payload:response.data
            })
            
            successCallBack && successCallBack();
        }catch(e){
            console.log(e);
            errorCallBack && errorCallBack(e);
        }
    }
}


export function getUserDetails(id,successCallBack,errorCallBack){
    return async function(dispatch){
        try{
           
            let response = await axiosNoAuth.get(API_BASE_URL+`/2.2/users/${id}?site=stackoverflow`);

            console.log("getUserDetails ",response)
            await dispatch({
                type:GET_USER_DETAILS,
                payload:response.data
            })
            
            successCallBack && successCallBack();
        }catch(e){
            console.log(e);
            errorCallBack && errorCallBack(e);
        }
    }
}

export function getUserTagsDetails(id,successCallBack,errorCallBack){
    return async function(dispatch){
        try{
           
            let response = await axiosNoAuth.get(API_BASE_URL+`/2.2/users/${id}/tags?site=stackoverflow`);

            console.log("getUserTagsDetails ",response)
            await dispatch({
                type:USER_TAGS_DETAILS,
                payload:response.data
            })
            
            successCallBack && successCallBack();
        }catch(e){
            console.log(e);
            errorCallBack && errorCallBack(e);
        }
    }
}

export function getUserQuestionDetails(id,page,successCallBack,errorCallBack){
    return async function(dispatch){
        try{

            // /2.2/users/{ids}/questions?page=1&order=desc&sort=activity&site=stackoverflow
           
            let response = await axiosNoAuth.get(API_BASE_URL+`/2.2/users/${id}/questions?page=${page}&site=stackoverflow`);

            console.log("getUserQuestionDetails ",response)
            await dispatch({
                type:USER_QUESTION_DETAILS,
                payload:response.data
            })
            
            successCallBack && successCallBack();
        }catch(e){
            console.log(e);
            errorCallBack && errorCallBack(e);
        }
    }
}

