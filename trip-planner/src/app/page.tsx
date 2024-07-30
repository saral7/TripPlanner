import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "@chakra-ui/react";

export default function Home() {
	return (
		<main className={styles.main}>
			<h1>Heyaaaaa</h1>
			<Button>Click me </Button>
		</main>
	);
}
