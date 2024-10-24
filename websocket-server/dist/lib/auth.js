"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NEXT_AUTH = void 0;
const credentials_1 = __importDefault(require("next-auth/providers/credentials"));
const google_1 = __importDefault(require("next-auth/providers/google"));
const singletonDb_1 = __importDefault(require("./singletonDb"));
const jose_1 = require("jose");
exports.NEXT_AUTH = {
    providers: [
        (0, credentials_1.default)({
            name: "Email",
            credentials: {
                name: { label: "Name", type: "text", placeholder: "john doe" },
                username: { label: "Email", type: "text", placeholder: "example@gmail.com" },
                password: { label: "Password", type: "password", placeholder: "password" }
            },
            authorize(credentials) {
                return __awaiter(this, void 0, void 0, function* () {
                    const response = yield singletonDb_1.default.user.findFirst({
                        where: {
                            email: credentials.username,
                            password: credentials.password
                        }
                    });
                    if (response) {
                        const jwt = generateToken({
                            id: response.id
                        });
                        return {
                            id: response.id,
                            name: response.name,
                            email: credentials.username,
                            token: jwt
                        };
                    }
                    try {
                        const user = yield singletonDb_1.default.user.create({
                            data: {
                                email: credentials.username,
                                password: credentials.password,
                                name: credentials.name
                            }
                        });
                        const jwt = generateToken({ id: user.id });
                        return {
                            id: user.id,
                            name: credentials.name,
                            email: credentials.username,
                            token: jwt
                        };
                    }
                    catch (error) {
                        return null;
                    }
                });
            }
        }),
        (0, google_1.default)({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        session: ({ session, token, user }) => {
            const newSession = session;
            if (newSession && token.uid) {
                newSession.user.id = token.uid;
                newSession.user.jwtToken = token.jwtToken;
            }
            return session;
        },
        jwt: ({ token, user }) => {
            const newToken = token;
            if (user) {
                newToken.uid = user.id;
                newToken.jwtToken = user.token;
            }
            return newToken;
        }
    }
};
function generateToken(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const secret = process.env.JWT_SECRET || "secret";
        const jwk = yield (0, jose_1.importJWK)({ k: secret, alg: "HS256", kty: "oct" });
        const jwt = yield new jose_1.SignJWT(payload)
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("365d")
            .sign(jwk);
        return jwt;
    });
}
