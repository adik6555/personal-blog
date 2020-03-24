import React, { useState } from "react";
import { Menu, Icon, Transition, List } from "semantic-ui-react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookMessengerShareButton
} from "react-share";

export default function MobileShareMenu(props) {
  const url = props.url;
  const [visibility, setVisibility] = useState(false);
  return (
    <div
      style={{
        width: "51px",
        textAlign: "center"
      }}
      onClick={() => setVisibility(!visibility)}
    >
      <Icon
        style={{ margin: "0", background: "white" }}
        circular
        name={visibility ? "close" : "share alternate"}
      ></Icon>
      <Transition.Group
        as={List}
        duration={300}
        verticalAlign="middle"
        animation="slide down"
      >
        {visibility && (
          <div>
            <Menu.Item>
              <TwitterShareButton
                url={url}
                style={{ paddingBottom: "7px", width: "100%" }}
              >
                <Icon
                  circular
                  style={{ margin: "0", background: "white" }}
                  name="twitter"
                />
              </TwitterShareButton>
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                var dummy = document.createElement("input"),
                  text = window.location.href;
                document.body.appendChild(dummy);
                dummy.value = text;
                dummy.select();
                document.execCommand("copy");
                document.body.removeChild(dummy);
              }}
            >
              <Icon
                color="black"
                style={{
                  padding: "13px",
                  width: "100%",
                  margin: "0 0 7px 0",
                  background: "white"
                }}
                circular
                name="copy"
              />
            </Menu.Item>
            <Menu.Item>
              <FacebookShareButton
                url={url}
                style={{ paddingBottom: "7px", width: "100%" }}
              >
                <Icon
                  circular
                  style={{ margin: "0", background: "white" }}
                  name="facebook"
                />
              </FacebookShareButton>
            </Menu.Item>
            <Menu.Item>
              <LinkedinShareButton
                url={url}
                style={{ paddingBottom: "7px", width: "100%" }}
              >
                <Icon
                  circular
                  style={{ margin: "0", background: "white" }}
                  name="linkedin"
                />
              </LinkedinShareButton>
            </Menu.Item>
          </div>
        )}
      </Transition.Group>
    </div>
  );
}
