import React, { Component } from 'react';
import {Routes} from 'config/Routes';

class HeaderContainer extends Component {

    logoutHandler = () =>{
        // localStorage
        localStorage.clear();
        this.props.history.push(Routes.LandingPage)
    }

    render() {
        console.log("77777 ",this.props.location.pathname)
        return (
            <div className="Header-style-container">
                <div className='part-one'>
                    <div className="logo-container">
                        <img alt="task-manager" src="/img/logo.svg" height="40px" width="auto"/>
                        <div className="stack">stack</div>
                        <div className="question">Questions</div>
                    </div>
                    <div className="link-style" style={{color : this.props.location.pathname == Routes.Dashboard && '#665df5' }}  onClick={()=> this.props.history.push('/dashboard')}>
                        Dashboard
                    </div>
                </div>

                <div className="logout-btn" onClick={this.logoutHandler}>
                    <img src="/img/logout.svg" alt="log-out" height="30px" width="30px"/>
                </div>
            </div>
        );
    }
}

export default HeaderContainer;