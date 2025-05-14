"use client";
import Link from "next/link";
import styles from "./AuthLink.module.css";

export default function AuthLink({ href, text }) {
  return (
    <Link href={href} className={styles.link}>
      {text}
    </Link>
  );
}
