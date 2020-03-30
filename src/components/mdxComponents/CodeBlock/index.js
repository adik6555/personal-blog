import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import darkTheme from "prism-react-renderer/themes/github";
import { Button, Label, Segment, Icon } from "semantic-ui-react";

export default ({ children, className }) => {
  const code = [];
  children.props.children.forEach(child => {
    if (typeof child === "string") {
      code.push(child);
    } else {
      if (child.props) {
        code.push(child.props.children);
      }
    }
  });
  const [numbered, setNumbered] = React.useState(false);
  const language = className ? className.replace(/language-/, "") : "";
  const toggleNumbered = () => {
    setNumbered(!numbered);
  };

  return (
    <div
      style={{ margin: "40px 0", boxShadow: "0px 0px 9px 3px rgb(0,0,0,0.2)" }}
    >
      <Highlight
        {...defaultProps}
        theme={darkTheme}
        code={code.join("")}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <>
            <Segment style={{ padding: "0" }}>
              <Label attached="top left" color="grey">
                {language}
              </Label>
              <Label
                as="a"
                color={numbered ? "grey" : ""}
                onClick={toggleNumbered}
                attached="top right"
              >
                {numbered ? "Hide" : "Show"} line numbers
              </Label>
              <pre
                className={className}
                style={{ ...style, padding: "50px 20px 20px 20px", margin: 0 }}
              >
                <div style={{ overflow: "auto" }}>
                  {tokens.map((line, i) => (
                    <>
                      <div>
                        <div key={i} {...getLineProps({ line, key: i })}>
                          {numbered && (
                            <span
                              style={{
                                marginRight: "20px",
                                color: "rgb(128,128,128,0.7)"
                              }}
                            >
                              {i}
                            </span>
                          )}
                          {line.map((token, key) => (
                            <span
                              key={key}
                              {...getTokenProps({ token, key })}
                            />
                          ))}
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </pre>
            </Segment>
          </>
        )}
      </Highlight>
    </div>
  );
};
