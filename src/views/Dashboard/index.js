import React, { Component } from 'react';
import {getAllQuestions} from 'redux/actions/Auth';
import {connect} from 'react-redux';
import { Row, Col, Card, Tag, Avatar, Pagination, Popover, Skeleton,Button  } from 'antd';
import idx from 'idx';
import moment from 'moment';
// import { UserOutlined } from '@ant-design/icons';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';


class Dashboard extends Component {
    state = { 
        currentPage: 1,
        isLoading:false
     }

    componentDidMount = () =>{
        this.setState({
            isLoading:true
        })
        this.props.getAllQuestions(this.state.currentPage,()=>{
            this.setState({
                isLoading:false
            })
        });
    }

    getColorCode = () =>{
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }


    paginationHandler = (current) => {
        console.log("paginationHandler ",current);
        this.setState({
            isLoading:true
        })
        this.setState({
            currentPage: current,
          });
        this.props.getAllQuestions(current,()=>{
            this.setState({
                isLoading:false
            })
        });
    }

    pageInecrement = (value) => {
        this.setState({
            currentPage:value 
        })
        const {id} = this.props.match.params;
        this.props.getAllQuestions(value);
    }

    pageDecrement = (value) => {
        this.setState({
            currentPage:value 
        })
        const {id} = this.props.match.params;
        console.log("pageDecrement ",value)
        this.props.getAllQuestions(value);
    }

    render() { 
        return ( 
            <div>
               <Row>
                    <Col span={5}></Col>
                    <Col span={14}>
                        <div className="header-mini-container">
                            Featured Questions
                        </div>
                        {idx(this.props.featured_questions,_=>_.items.length) ? 
                        idx(this.props.featured_questions,_=>_.items.map((item,key)=>
                            <Card style={{marginBottom:'10px'}} key={key}>
                                <div className="featured-que-container">
                                    <div className="count-container">
                                        <div className="column-flex">
                                            <div className="mb-10">{item.score}</div>
                                            <div>votes</div>
                                        </div>
                                        <div className="column-flex">
                                            <div className="mb-10">{item.answer_count}</div>
                                            <div>answers</div>
                                        </div>
                                        <div className="column-flex">
                                            <div className="mb-10">{item.view_count}</div>
                                            <div>views</div>
                                        </div>
                                    </div>
                                    <div className="que-tag-container">
                                        <div className="question">
                                            <Tag color="#0779e4" style={{fontSize:'14px'}}>+{item.bounty_amount}</Tag>
                                            <span style={{fontSize:'16px'}}>{item.title}</span>
                                        </div>
                                        <div className="tags-time-container">
                                            <div className="tags-container">
                                                {idx(item,_=>_.tags.length)?
                                                    idx(item,_=>_.tags.map((tag,ind)=>
                                                    ind < 4 && <Tag color="blue" className="clickable" key={ind}>{tag}</Tag>
                                                    ))
                                                :null}
                                            </div>
                                            <div style={{display:'flex',alignItems:'center'}}>
                                                <div className="time-style mr-10">
                                                    {moment(item.creation_date * 1000).format(`MMM DD' YY`)}
                                                </div>
                                                <Popover content={item.owner.display_name}>
                                                    <Avatar
                                                        style={{
                                                            backgroundColor: `${this.getColorCode()}`,
                                                        }}
                                                        className="clickable"
                                                        // icon={<UserOutlined />}
                                                        src={item.owner.profile_image}
                                                        onClick={()=> this.props.history.push(`/dashboard/${item.owner.user_id}`)}
                                                    />
                                                </Popover>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))
                        :
                        <Card>
                            <Skeleton active paragraph={{ rows: 1 }}/>
                        </Card>
                        }
                        {/* <div className="pagination-container mtb-25">
                            {idx(this.props.featured_questions,_=>_.items.length) ? 
                                <Pagination  onChange={this.paginationHandler}  defaultCurrent={this.state.current} total={140} showSizeChanger={false} />
                            :null}
                        </div> */}
                         <div className="pagination-container mtb-25">
                            <Button type="primary" shape="round" className="mlr-10" onClick={() => this.pageDecrement(this.state.currentPage-1)} disabled={this.state.currentPage == 1} icon={<CaretLeftOutlined />} />
                            <Button type="primary" shape="round" className="mlr-10" onClick={()=>this.pageInecrement(this.state.currentPage+1)} disabled={!idx(this.props.featured_questions,_=>_.has_more)}  icon={<CaretRightOutlined />} />
                        </div>
                    </Col>
                    <Col span={5}></Col>
                </Row>
            </div> 
        );
    }
}
 
// export default Dashboard;
function mapStateToProps(state){
    return{
        featured_questions:state.Auth.featured_questions
    }
}

export default connect(mapStateToProps,{
    getAllQuestions
})(Dashboard);