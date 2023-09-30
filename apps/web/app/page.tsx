"use client";

// Install the "ui" package by running the following command in your terminal:
// npm install ui

// Import the `Button` component from the `ui` module by adding the following line of code at the top of your file:

import styles from "../styles/index.module.css";
import { Button } from "ui";

export default function Web(): any {
  return (
    <div className={styles.container}>
      <h1>Web</h1>
      <Button onClick={() => console.log("Pressed!")} text="Boopies Biatch" />
    </div>
  );
}

