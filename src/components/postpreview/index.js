import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Card, Grid, Image, Header, Responsive } from "semantic-ui-react";
import Img from "gatsby-image";
import thumbnailPic from "../../posts/main/post-one/thumbnail.jpg";

// props:[
//   title, meta, description, img
// ]

export default function PostPreview(props) {
  return (
    <Grid centered>
      <Grid.Column computer={12} tablet={12} widescreen={9} mobile={15}>
        <Card fluid link href={props.link} style={{ color: "black" }}>
          <Card.Content>
            <Responsive minWidth={451}>
              <Grid>
                <Grid.Column
                  verticalAlign="middle"
                  textAlign="center"
                  width={4}
                >
                  <Img fluid={props.image} />
                </Grid.Column>
                <Grid.Column width={props.image ? 12 : 16}>
                  <Header as="h4" style={{ marginBottom: "5px" }}>
                    {props.title}
                  </Header>
                  <Card.Meta>{props.date}</Card.Meta>
                  <Card.Description>{props.description}</Card.Description>
                </Grid.Column>
              </Grid>
            </Responsive>
            <Responsive maxWidth={450}>
              <Img fluid={props.image} />
              <Card.Header as="h4">{props.title}</Card.Header>
              <Card.Meta>{props.date}</Card.Meta>
              <Card.Description>{props.description}</Card.Description>
            </Responsive>
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  );
}
