// src/types/express.d.ts (or similar path)

import { User } from '@prisma/client'; // Adjust the import path based on your setup

declare global {
    namespace Express {
        interface Request {
            user?: User; // Define user property as optional
        }
    }
}
