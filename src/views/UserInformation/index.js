import React, { Component } from 'react';
import { Row, Col,Card, Tag,Image , Skeleton,Button } from 'antd';
import idx from 'idx';
import {connect} from 'react-redux';
import {getUserDetails,getUserTagsDetails,getUserQuestionDetails} from 'redux/actions/Auth';
import moment from 'moment';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';


class UserInfromation extends Component {

    state = { 
        currentPage:1
     }
 
    componentDidMount = () =>{
        const {id} = this.props.match.params;
        this.props.getUserDetails(id);
        this.props.getUserTagsDetails(id);
        this.props.getUserQuestionDetails(id,this.state.currentPage);
    }

    getColorCode = () =>{
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    pageInecrement = (value) => {
        this.setState({
            currentPage:value 
        })
        const {id} = this.props.match.params;
        this.props.getUserQuestionDetails(id,value);
    }

    pageDecrement = (value) => {
        this.setState({
            currentPage:value 
        })
        const {id} = this.props.match.params;
        console.log("pageDecrement ",value)
        this.props.getUserQuestionDetails(id,value);
    }

    render() { 
        return ( 
            <div>
                <Row gutter={16}>
                    <Col span={5}>
                        {idx(this.props.user_details,_=>_.items.length) ?
                        <div className="possition-sticky">
                            <div className="user-infor-container">
                                <div className="image-container">
                                    <Image
                                        width={200}
                                        src={idx(this.props.user_details,_=>_.items[0]['profile_image'])}
                                    />
                                </div>
                                <div className="reputation-container">
                                    <span className="reputation-number">{idx(this.props.user_details,_=>_.items[0]['reputation'])}</span>
                                    <span className="reputation-text ml-10">reputation</span>
                                </div>
                                <div className="medal-container">
                                    <div className="gold-medal">
                                        <div className="dot"></div>
                                        <div>{idx(this.props.user_details,_=>_.items[0]['badge_counts']['gold'])}</div>
                                    </div>
                                    <div className="silver-medal">
                                        <div className="dot"></div>
                                        <div>{idx(this.props.user_details,_=>_.items[0]['badge_counts']['silver'])}</div>
                                    </div>
                                    <div className="bronze-medal">
                                        <div className="dot"></div>
                                        <div>{idx(this.props.user_details,_=>_.items[0]['badge_counts']['bronze'])}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="plr-15 ptb-10 user-name">
                                {idx(this.props.user_details,_=>_.items[0]['display_name'])}
                            </div>
                            <div className="plr-15 ptb-10 user-name">
                                {idx(this.props.user_details,_=>_.items[0]['location'])}
                            </div>
                        </div>: 
                            <Card>
                                <Skeleton active paragraph={{ rows: 1 }}/>
                            </Card>}
                    </Col>
                    <Col span={14}>
                        {/* <div className="header-mini-container">
                            Featured Questions
                        </div> */}
                        {idx(this.props.user_question_details,_=>_.items.length) ? 
                        idx(this.props.user_question_details,_=>_.items.map((item,key)=>
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
                                            {item.bounty_amount ? 
                                                <Tag color="#0779e4" style={{fontSize:'14px'}}>+{item.bounty_amount}</Tag>
                                                :null
                                            }
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
                                            <div className="time-style">
                                                {moment(item.creation_date * 1000).format(`MMM DD' YY`)}
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
                        <div className="pagination-container mtb-10">
                            <Button type="primary" shape="round" className="mlr-10" onClick={() => this.pageDecrement(this.state.currentPage-1)} disabled={this.state.currentPage == 1} icon={<CaretLeftOutlined />} />
                            <Button type="primary" shape="round" className="mlr-10" onClick={()=>this.pageInecrement(this.state.currentPage+1)} disabled={!idx(this.props.user_question_details,_=>_.has_more)}  icon={<CaretRightOutlined />} />
                        </div>
                    </Col>
                    <Col span={5}>
                        <div className="possition-sticky">
                            { idx(this.props.user_tag_details,_=>_.items.length) ? 
                                <Card>
                                    {idx(this.props.user_tag_details,_=>_.items.map((item,key)=>
                                        <Tag color={this.getColorCode()} className="mtb-5" key={key}>{item.name}</Tag>
                                    ))}        
                                </Card>
                            :
                            <Card>
                                <Skeleton active paragraph={{ rows: 1 }}/>
                            </Card>
                            }
                        </div>
                    </Col>
                </Row>
            </div>
         );
    }
}
 
// export default UserInfromation;
function mapStateToProps(state){
    return{
        user_question_details:state.Auth.user_question_details,
        user_details:state.Auth.user_details,
        user_tag_details:state.Auth.user_tag_details
    }
}

export default connect(mapStateToProps,{
    getUserDetails,
    getUserTagsDetails,
    getUserQuestionDetails
})(UserInfromation);