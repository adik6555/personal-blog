import React, { useEffect, Children } from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import Prism from "prismjs";
import darkTheme from "prism-react-renderer/themes/github";
import { Button, Label } from "semantic-ui-react";

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
  console.log(language);

  return (
    <>
      <Highlight
        {...defaultProps}
        theme={darkTheme}
        code={code.join("")}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <>
            <pre
              className={className}
              style={{ ...style, padding: "10px 20px 0px 20px" }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "20px"
                  }}
                >
                  <Button
                    color={numbered ? "grey" : ""}
                    onClick={toggleNumbered}
                  >
                    {numbered ? "Hide" : "Show"} line numbers
                  </Button>
                  <Label color="grey" style={{ maxHeight: "25px" }}>
                    {language}
                  </Label>
                </div>
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
              </div>
            </pre>
          </>
        )}
      </Highlight>
    </>
  );
};
