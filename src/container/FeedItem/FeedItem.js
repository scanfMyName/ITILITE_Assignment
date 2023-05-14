import {
  BarChartRounded,
  ChatOutlined,
  FavoriteBorderOutlined,
  IosShareOutlined,
  LoopOutlined,
  MoreHorizOutlined,
  VerifiedRounded,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import {React, useState, useEffect} from "react";

function FeedItem(props) {
  const {setDelTweetId} = props;
  const [countLike, setCountLike] = useState(props.like);
  const [countRetweet, setCountRetweet] = useState(props.retweet);

  // const [mount, steMount ] = useState(false)
  
  // useEffect(()=>{
    
  //   // alert("Are you sure you want to delete this tweet?")
  //   // .then(()=>{
  //   //   console.log("Tweet id to be ginna deleted in use effect:",delTweetId)
  //   //   deleteTweet(delTweetId)
  //   //   alert("The tweet has been deleted successfully")
  //   //   })
     
  //   //   .catch((err)=>{
  //   //     console.log(err)
  //   //     alert("There is some error while deleting your tweet:"+err)
  //   //   })

  // },[])

  return (
    <div className="feedItem w-100">
      <div className="row-between">
        <div className="row-nospace">
          <Avatar sx={{ width: 50, height: 50 }} src={props.avatarurl} />
          <div
            className="feedItemInfo row-nospace mt-1"
            style={{ width: "70%", marginLeft: 10 }}
          >
            <h4>
              {props.name}{" "}
              {props.verified === true ? (
                <VerifiedRounded
                  sx={{
                    color: "#1DA1F2",
                    fontSize: 15,
                    marginTop: "-5px",
                  }}
                />
              ) : (
                <div></div>
              )}
            </h4>
            <p>@{props.name}</p>
            <p style={{ fontWeight: "bolder" }}> · </p>
            <p>{props.time}</p>
          </div>
        </div>
        <MoreHorizOutlined className="feedMoreIcon" onClick={setDelTweetId(props.id)}/>
      </div>
      <div className="feedItemContent">
        <h4>
          {props.text}
          <br />
          {props.image === "" ? <div></div> : <img src={props.image} />}
        </h4>
      </div>
      <div className="feedItemFooter">
        <div className="row-between">
          <div className="feedItemIcons row-nospace View">
            <BarChartRounded />
            <p>{props.view}</p>
          </div>
          <div className="feedItemIcons row-nospace Reply">
            <ChatOutlined />
            <p>{props.comment}</p>
          </div>
          <div className="feedItemIcons row-nospace ReTweet">
            <LoopOutlined onClick = {()=>{
              if(countRetweet> props.retweet) setCountRetweet(props.retweet)
              else  setCountRetweet(countRetweet+1)
            }}/>
            <p>{countRetweet}</p>
          </div>
          <div className="feedItemIcons row-nospace Like">
            <FavoriteBorderOutlined onClick = {()=>{
              if(countLike> props.like) setCountLike(props.like)
              else setCountLike(countLike+1)
            }}/>
            <p>{countLike}</p>
          </div>
          <div className="feedItemIcons row-nospace Share">
            <IosShareOutlined />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedItem;
