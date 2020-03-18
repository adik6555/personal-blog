import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Card, Grid, Image, Header } from "semantic-ui-react";

// props:[
//   title, meta, description, img
// ]

export default function PostPreview(props) {
  return (
    <Grid centered>
      <Grid.Column computer={12} tablet={12} widescreen={9} mobile={15}>
        <Card fluid link>
          <Card.Content>
            <Grid>
              {props.image && (
                <Grid.Column textAlign="center" width={4}>
                  <Image size="small" src={props.image} />
                </Grid.Column>
              )}
              <Grid.Column width={props.image ? 12 : 16}>
                {props.title && (
                  <Header as="h4" style={{ marginBottom: "5px" }}>
                    {props.title}
                  </Header>
                )}
                {props.meta && <Card.Meta>{props.meta}</Card.Meta>}

                {props.description && (
                  <Card.Description>{props.description}</Card.Description>
                )}
              </Grid.Column>
            </Grid>
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  );
}
