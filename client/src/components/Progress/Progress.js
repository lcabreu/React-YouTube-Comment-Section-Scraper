import React, { Component } from 'react';
import './Progress.css'

class VideoSubmission extends Component {

  render() {
    const { ProgressScroll, ComExpand,
      ShowMoreRep, FindRep, ErrMsg, Thumbnail, Title } = this.props
    return (
      <div className="progress-class">
        <div>
          <h2>Progress</h2>
        </div>
        <div>
          <p>Your progress:</p>
          <p className="errorMsg">{ErrMsg}</p>
          <p>Scrolling: {ProgressScroll}</p>
          <p>Expanding Comments: {ComExpand}</p>
          <p>"Show More Replies" Buttons: {ShowMoreRep}</p>
          <p>Finding Replies: {FindRep}</p>
          <p>Video: https://www.youtube.com/watch?v=IHt71N47cc0</p>
          <p>https://www.youtube.com/watch?v=U1_ZvIVQHuI</p>
          
          <h3>{Title}</h3>
          
        </div>
        <div className="thumbnail">
          <img src={Thumbnail} alt=""/>
        </div>
      </div>
    )
  }
}

export default VideoSubmission;