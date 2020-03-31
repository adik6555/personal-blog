import React from "react";
import { Header } from "semantic-ui-react";
import { Table } from "semantic-ui-react";
import Img from "gatsby-image";

const HeaderStyles = {
  fontSize: "180%",
  fontFamily: "Bitter, serif",
  textAlign: "initial",
  marginTop: "20px"
};

const ParagraphStyles = {
  fontFamily: "Montserrat, sans-serif",
  letterSpacing: "1px",
  color: "black"
};

export function Header1(props) {
  return (
    <Header style={HeaderStyles} as="h1" {...props}>
      {props.children}
    </Header>
  );
}

export function Header2(props) {
  return (
    <Header style={HeaderStyles} as="h2" {...props}>
      {props.children}
    </Header>
  );
}

export function Header3(props) {
  return (
    <Header style={HeaderStyles} as="h3" {...props}>
      {props.children}
    </Header>
  );
}

export function Header4(props) {
  return (
    <Header style={HeaderStyles} as="h4" {...props}>
      {props.children}
    </Header>
  );
}

export function Header5(props) {
  return (
    <Header style={HeaderStyles} as="h5" {...props}>
      {props.children}
    </Header>
  );
}

export function Header6(props) {
  return (
    <Header style={HeaderStyles} as="h6" {...props}>
      {props.children}
    </Header>
  );
}

export function Paragraph(props) {
  return (
    <p style={ParagraphStyles} {...props}>
      {props.children}
    </p>
  );
}

export function UnorderedList(props) {
  return (
    <ul style={ParagraphStyles} {...props}>
      {props.children}
    </ul>
  );
}

export function OrderedList(props) {
  return (
    <ol style={ParagraphStyles} {...props}>
      {props.children}
    </ol>
  );
}

export function CustomTable(props) {
  return (
    <div
      style={{
        overflow: "auto",
        margin: "20px 0",
        boxShadow: "0px 0px 9px 3px rgb(0,0,0,0.2)"
      }}
    >
      <Table unstackable selectable celled style={ParagraphStyles} {...props}>
        {props.children}
      </Table>
    </div>
  );
}

export function TableRow(props) {
  return (
    <Table.Row style={ParagraphStyles} {...props}>
      {props.children}
    </Table.Row>
  );
}
export function TableCell(props) {
  return (
    <Table.Cell textAlign={props.align} style={ParagraphStyles} {...props}>
      {props.children}
    </Table.Cell>
  );
}

export function Code(props) {
  return (
    <span
      style={{
        background: "rgb(215,214,215)",
        borderRadius: "3px"
      }}
    >
      <code style={{ margin: "0 5px" }} {...props}>
        {props.children}
      </code>
    </span>
  );
}
