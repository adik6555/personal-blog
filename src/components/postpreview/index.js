import React, { useEffect, useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { Card, Grid, Header, Responsive } from "semantic-ui-react";
import Img from "gatsby-image";

// props:[
//   title, meta, description, img
// ]

export default function PostPreview(props) {
  return (
    <Grid.Column computer={12} tablet={12} widescreen={9} mobile={15}>
      <Card fluid link href={props.link} style={{ color: "black" }}>
        <Card.Content>
          <Responsive minWidth={451}>
            <Grid>
              <Grid.Column verticalAlign="middle" textAlign="center" width={4}>
                <Img fluid={props.image} />
              </Grid.Column>
              <Grid.Column width={props.image ? 12 : 16}>
                <Header as="h4" style={{ marginBottom: "5px" }}>
                  {props.title}
                </Header>
                <Card.Meta>{props.date}</Card.Meta>
                {props.description && (
                  <Card.Description>
                    {props.description.substring(0, 350)}...
                  </Card.Description>
                )}
              </Grid.Column>
            </Grid>
          </Responsive>
          <Responsive maxWidth={450}>
            <Img fluid={props.image} />
            <Card.Header as="h4">{props.title}</Card.Header>
            <Card.Meta>{props.date}</Card.Meta>
            {props.description && (
              <Card.Description>
                {props.description.substring(0, 300)}...
              </Card.Description>
            )}
          </Responsive>
        </Card.Content>
      </Card>
    </Grid.Column>
  );
}
