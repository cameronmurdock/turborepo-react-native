"use client";

import { Button } from "ui";
import { UserForm } from "components";
import styles from "../styles/index.module.css";

export default function Web() {
  return (
    <div className={styles.container}>
      <h1>Web</h1>
      <Button onClick={() => console.log("Pressed!")} text="Boopies Biatch" />
      {/* Render the UserForm component */}
      <UserForm />
    </div>
  );
}
