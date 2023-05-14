import {
  BookmarkBorderRounded,
  HomeRounded,
  ListAltOutlined,
  MailOutlineRounded,
  MoreHoriz,
  MoreHorizOutlined,
  NotificationsNoneRounded,
  PersonOutlineOutlined,
  TagRounded,
  Twitter,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React, { useState } from "react";
import Home from "../../pages/Home/Home";
import "./styles.css";

function Sidebar() {
  const [active, setActive] = useState("Home");
  return (
    <div className="appContainer">
      <div className="sideBar">
        <h1>
          <Twitter className="sidebarIcon" />
        </h1>
        <ul className="sideBarList">
          <li
            className="sideBarListItem"
            onClick={() => setActive("Home")}
            style={{ fontWeight: active === "Home" ? "bolder" : "" }}
          >
            <HomeRounded className="sidebarIcon" />
            Home
          </li>
          <li className="sideBarListItem">
            <TagRounded className="sidebarIcon" />
            Explore
          </li>
          <li className="sideBarListItem">
            <NotificationsNoneRounded className="sidebarIcon" />
            Notifications
          </li>
          <li className="sideBarListItem">
            <MailOutlineRounded className="sidebarIcon" />
            Messages
          </li>
          <li className="sideBarListItem">
            <BookmarkBorderRounded className="sidebarIcon" />
            Bookmarks
          </li>
          <li className="sideBarListItem">
            <ListAltOutlined className="sidebarIcon" />
            Lists
          </li>
          <li
            className="sideBarListItem"
            
          >
            <PersonOutlineOutlined className="sidebarIcon" />
            Profile
          </li>
          <li className="sideBarListItem">
            <MoreHorizOutlined className="sidebarIcon" />
            More
          </li>
        </ul>
        <button className="sideBarTweetButton">Tweet</button>
        <div className="profileSetting">
          <div className="row-nospace">
            <Avatar src="https://res.cloudinary.com/dp1kzy3fs/image/upload/v1683992711/Test/profileImage_zogw6i.jpg" />
            <div className="profileSettingInfo">
              <h5>Mayank Garg</h5>
              <p>@Mayank Garg</p>
            </div>
          </div>
          <MoreHoriz />
        </div>
      </div>
      <div>
        <Home />
        {/* {active === "Home" ? <Home /> : null}
        {active === "Profile" ? <Profile /> : null} */}
      </div>
    </div>
  );
}

export default Sidebar;
