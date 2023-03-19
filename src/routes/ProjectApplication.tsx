import styles from "./ProjectApplication.module.css";
import { useLoaderData } from "react-router-dom";
import type { ProjectLoaderData } from "./Project";
import { Form } from "react-router-dom";
import { useState } from "react";
import type { ActionFunctionArgs } from "react-router-dom";

export default function ProjectApplication() {
    const project = useLoaderData() as ProjectLoaderData;

    return (
        <Form className={styles.form} method="post">
            <label htmlFor="message">Application message:</label>
            <textarea id="message" name="message" required />

            <label htmlFor="role">Select a role:</label>
            <select id="role" name="role" required>
                <option value="">-- Select a role --</option>
                <option value="frontend-developer">Frontend Developer</option>
                <option value="backend-developer">Backend Developer</option>
                <option value="designer">Designer</option>
            </select>

            <label htmlFor="cv">Upload your CV:</label>
            <input type="file" id="cv" name="cv" accept=".pdf" required />

            <button type="submit">Submit</button>
        </Form>
    );
}

export async function applicationAction(args: ActionFunctionArgs) {
    const formData = await args.request.formData();
    console.log([...formData.entries()]);
}
