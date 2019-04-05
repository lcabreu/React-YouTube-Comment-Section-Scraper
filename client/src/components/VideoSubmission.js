import React, { Component } from 'react';
import axios from 'axios';
import socketIOClient from 'socket.io-client';

class VideoSubmission extends Component {
 state = {
   // data: '',
   url:'',
   // response: '',
   ioResResult: false, // Result Response
   ioResProgressScroll: false, // Scroll Progress
   ioResComExpand: false, // "Comments Expaned" Response Progress
   ioResShowMoreRep: false, // "Show More Replies" Response Progress
   ioResFindRep: false, // "Find Replies" Progress
   ioErrMsg: false, // Puppeteer errors
   endpoint: "/" // originally: http://127.0.0.1:5000
 }

componentDidMount() {
//    axios.get('/api/hello')
//      .then(res => {
//        this.setState({
//          data: res.data.express
//        })
//      })
//      .catch(err => console.log(err))

    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("ResultData", data => this.setState({ ioResResult: data }));
    socket.on("ScrollData", data => this.setState({ioResProgressScroll: data}))
    socket.on("ExpandedCommentData", data => this.setState({ioResComExpand: data}))
    socket.on("ShowMoreRepData", data => this.setState({ioResShowMoreRep: data}))
    socket.on("FindRepliesData", data => this.setState({ioResFindRep: data}))
    socket.on("ErrorMsg", data => this.setState({ioErrMsg: data}))
    }

 // Listens to every change of value in input field
 handleChange = (e) => {
   this.setState({
     url: e.target.value
   });
 }

 handleSubmit = (e) => {
   e.preventDefault();
   console.log('form submitted', this.state.url)
   //2nd param passes data, the data is attached to the 'post' param - req.body.post
   axios.post('/youtubeData',{
     url: this.state.url
   })
     .then(res => {
       console.log('hit')
       console.log(res)
       // put the res.data inside our state, so we can use it in the component
       this.setState({
         url: '',
         // response: res.data
       });
     })
     .catch(err => console.log(err))
 }

 render() {
   const {ioResResult, ioResProgressScroll,ioResComExpand,
     ioResShowMoreRep ,iosResFindRep, ioErrMsg} = this.state
   // console.log(ioResResult)
   // console.log(this.state.data)
   // const { data } = this.state
   return (
     <div className="app container">
       <div>
         <h2>YouTube Comment Scraper</h2>
       </div>
       <div>
         <form onSubmit={this.handleSubmit}>
           {/* 'value' property used to make value = '' after submit, that's it */}
           <input type="text" onChange={this.handleChange} value={this.state.url} />
           <button>Submit</button>
         </form>
       </div>
       <div>
         <p>Your progress:</p>
         <p>Scrolling: {ioResProgressScroll}</p>
         <p>Expanding Comments: {ioResComExpand}</p>
         <p>"Show More Replies" Buttons: {ioResShowMoreRep}</p>
         <p>Finding Replies: {iosResFindRep}</p>
         <p>{ioErrMsg}</p>
         <p>Video: https://www.youtube.com/watch?v=IHt71N47cc0</p>
         <p>My ioResResult: {ioResResult}</p>
       </div>
     </div>
   )
 }
}

export default VideoSubmission;