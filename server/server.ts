import express, { Express } from 'express';
import morgan from 'morgan';
import cors from "cors";
import eob from "./routes/eob";
import flexpaAccessToken from "./routes/flexpa_access_tokens";
import { fhirRouter } from "./routes/fhir";
import "dotenv/config";

const router: Express = express();

/** Logging */
router.use(morgan('dev'));
/** Parse the request */
router.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
router.use(express.json());
/** CORS */
router.use(cors());

/** Routes */
router.use("/flexpa-access-token", flexpaAccessToken);
router.use("/fhir", fhirRouter);
router.use("/eob", eob);

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

/** Server */
const PORT: any = process.env.PORT ?? 6060;
router.listen(PORT, () => console.log(`The server is running on port ${PORT}`));