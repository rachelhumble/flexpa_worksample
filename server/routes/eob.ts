import { Bundle } from "fhir/r4";
import express, { Request, Response, Router } from "express";
import { fetchWithRetry } from "./fhir"

const router: Router = express.Router();

interface EobResponse {
    id: string;
    patient: string;
    provider: string;
    diagnosis: string[];
}

router.get("*", async (req: Request, res: Response) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).send("All requests must be authenticated.");
    }

    const { href } = new URL(
        `fhir/ExplanationOfBenefit${req.path}`,
        process.env.FLEXPA_PUBLIC_API_BASE_URL,
    );

    // https://api.flexpa.com/fhir/ExplanationOfBenefit

    try {
        const eobResponse = await fetchWithRetry(href, authorization);
        const eobBody: Bundle | unknown = await eobResponse.json() as EobResponse;
        res.send(eobBody)
    } catch (err) {
        console.log(`Error retrieving FHIR: ${err}`);
        return res.status(500).send(`Error retrieving FHIR: ${err}`);
    }
})

export default router;


// const getPost = async (req: Request, res: Response, next: NextFunction) => {
//     // get the post id from the req
//     let id: string = req.params.id;
//     // get the post
//     let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
//     let post: Post = result.data;
//     return res.status(200).json({
//         message: post
//     });
// };