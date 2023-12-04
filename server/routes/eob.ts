import { Bundle } from "fhir/r4";
import express, { Request, Response, Router } from "express";
import { fetchWithRetry } from "./fhir"

const router: Router = express.Router();

router.get("*", async (req: Request, res: Response) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).send("All requests must be authenticated.");
    }

    const { href } = new URL(
        `fhir/ExplanationOfBenefit${req.path}`,
        process.env.FLEXPA_PUBLIC_API_BASE_URL,
    );

    try {
        const eobResponse = await fetchWithRetry(href, authorization);
        const eobBody: Bundle | unknown = await eobResponse.json();
        res.send(eobBody)
    } catch (err) {
        console.log(`Error retrieving EOB: ${err}`);
        return res.status(500).send(`Error retrieving EOB: ${err}`);
    }
})

export default router;
