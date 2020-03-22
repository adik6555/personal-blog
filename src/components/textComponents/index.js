import * as React from "react";
import { Header } from "semantic-ui-react";

export const H1 = props => (
  <Header as="h1" {...props}>
    {props.children}
  </Header>
);
export const H2 = props => (
  <Header as="h2" {...props}>
    {props.children}
  </Header>
);
export const H3 = props => (
  <Header as="h3" {...props}>
    {props.children}
  </Header>
);
export const H4 = props => (
  <Header as="h4" {...props}>
    {props.children}
  </Header>
);
export const H5 = props => (
  <Header as="h5" {...props}>
    {props.children}
  </Header>
);
export const H6 = props => (
  <Header as="h6" {...props}>
    {props.children}
  </Header>
);
