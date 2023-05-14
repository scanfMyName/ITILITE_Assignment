import {
  AutoAwesomeOutlined,
  BallotOutlined,
  CalendarMonthOutlined,
  GifBoxOutlined,
  InsertPhotoOutlined,
  LocationOnOutlined,
  SearchOutlined,
  SentimentSatisfiedAltOutlined,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import { React, useState, useEffect, useRef } from "react";
import "./styles.css";
import feeds from "../../data/Feed.json";
import trends from "../../data/Trend.json";
import FeedItem from "../../container/FeedItem/FeedItem";
import TrendItem from "../../container/TrendItem/TrendItem";

function Home() {
  const [feedState, setFeedState] = useState(feeds.feed);
  const [selectedFile, setSelectedFile] = useState(null);
  const [newTweet, setNewTweet] = useState("");
  const [newTweetId, setNewTweetId] = useState(feeds.feed.length + 1);
  const [delTweetId, setDelTweetId] = useState(0);
  const inputRef = useRef(null);
  const [startTime, setStartTime] = useState(new Date());
  const handleClick = (event) => {
    event.preventDefault();
    // console.log(inputRef);
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleImageUpload = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    setSelectedFile(file);
    alert("Image successfully selected");
  };
  const tellTime = (dif) => {
    dif /= 1000;
    dif = ~~dif;
    let h = 0,
      m = 0,
      s = 0;
    let ans = "";
    if (dif > 3600) {
      h += dif / 3600;
      dif -= h * 3600;
      ans += `${h} hours`;
    }
    if (dif > 60) {
      m += dif / 60;
      dif -= 60 * m;
      ans += `${m} minutes`;
    }
    if (dif > 0) {
      ans += `${dif} seconds ago`;
    }
    return ans;
  };
  const deleteTweet = (id) => {
    // let tmp =
    console.log("Selected tweet id:", id);
    setFeedState(feedState.filter((item) => item.id !== id));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let now = new Date();
    let dif = now - startTime;
    let imageLink = "";
    if (selectedFile) {
      const formdata = new FormData();
      formdata.append("file", selectedFile);
      formdata.append("upload_preset", "upload");
      const options = {
        method: "POST",
        body: formdata,
      };
      try {
        let tmp = await fetch(
          "https://api.Cloudinary.com/v1_1/dp1kzy3fs/image/upload",
          options
        );
        console.log("tmp:", tmp);
        let newtmp = tmp;
        imageLink = tmp.url;
        console.log(
          "imageLink:",
          imageLink,
          ", newtmp.secure_url:",
          newtmp.secure_url
        );
        if (imageLink != undefined) alert("Image successfully uploaded");
      } catch (err) {
        console.log("error while uploading", err);
        alert("There is some error while uploading your file:" + err);
      }

      setSelectedFile(null);
    }
    let tmp = {
      id: newTweetId,
      verified: true,
      avatarurl:
        "https://res.cloudinary.com/dp1kzy3fs/image/upload/v1683992711/Test/profileImage_zogw6i.jpg",
      name: "Mayank Garg",
      time: tellTime(dif),
      text: newTweet,
      image: imageLink,
      view: 1,
      like: 0,
      comment: 0,
      retweet: 0,
    };
    console.log(tmp);
    setFeedState([...feedState, tmp]);
    setNewTweet("");
    setNewTweetId(newTweetId + 1);
  };

  const chnageDel = (id) => {
    console.log("id:", id);
    setDelTweetId(id);
  };
  // useEffect(() => {
  //   // console.log("delTweetId:",delTweetId)
  // }, [delTweetId]);

  return (
    <div className="home">
      <div style={{ maxWidth: "50vw" }}>
        <div className="header">
          <div className="row-between">
            <h4>Home</h4>
            <AutoAwesomeOutlined className="headerIcon" />
          </div>
          <div className="headerCreate">
            <div className="row-nospace">
              <Avatar
                sx={{ width: 50, height: 50 }}
                src="https://res.cloudinary.com/dp1kzy3fs/image/upload/v1683992711/Test/profileImage_zogw6i.jpg"
              />
              <div style={{ width: "80%", height: "30%" }}>
                <textarea
                  className="headerCreateInput"
                  placeholder="What's happening?"
                  value={newTweet}
                  required
                  onChange={(e) => {
                    // console.log(e)
                    setNewTweet(e.target.value);
                  }}
                />
                <div className="row-between">
                  <div className="headerCreateIcons">
                    <input
                      ref={inputRef}
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageUpload}
                    />
                    <InsertPhotoOutlined onClick={handleClick} />
                    <GifBoxOutlined />
                    <BallotOutlined />
                    <SentimentSatisfiedAltOutlined />
                    <CalendarMonthOutlined />
                    <LocationOnOutlined />
                  </div>
                  <div className="headerCreateButton">
                    <button type="onSubmit" onClick={handleSubmit}>
                      Tweet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="feed">
          {feedState.map((item) => (
            <FeedItem
              setDelTweetId={chnageDel}
              avatarurl={item.avatarurl}
              name={item.name}
              time={item.time}
              text={item.text}
              image={item.image}
              view={item.view}
              comment={item.comment}
              retweet={item.retweet}
              like={item.like}
              verified={item.verified}
            />
          ))}
        </div>
      </div>

      <div className="search">
        <div className="searchTwitter">
          <div className="row-nospace">
            <SearchOutlined className="searchTwitterIcon" />
            <input
              type="text"
              placeholder="Search Twitter"
              className="searchTwitterInput"
            />
          </div>
        </div>

        <div className="trends">
          <h4>Trends For You</h4>
          {trends.trend.slice(0, 6).map((item) => (
            <TrendItem
              trendtweetcount={item.trendtweetcount}
              trendname={item.trendname}
              trendlocation={item.trendlocation}
            />
          ))}
          <div className="trendsFooter">
            <p>Show More</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
