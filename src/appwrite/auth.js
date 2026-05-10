import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";
 
export class AuthService {
    client = new Client();
    account;
 
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }
 
    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                await this.login({email, password}); // login but don't return session
                return await this.account.get();     // return actual user object with $id
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }
 
    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }
 
    async getCurrentUser() {
    try {
        const user = await this.account.get();
        // Return only plain serializable fields
        return {
            $id: user.$id,
            name: user.name,
            email: user.email,
            emailVerification: user.emailVerification,
            prefs: user.prefs ?? {},
        };
    } catch (error) {
        console.log("Appwrite service :: getCurrentUser :: error", error);
    }
    return null;
}
 
    async logout() {
        try {
            await this.account.get();            // ← throws 401 if no session
            await this.account.deleteSessions(); // ← only runs if user exists
        } catch (error) {
            if (error?.code !== 401) {
                console.log("Appwrite service :: logout :: error", error);
            }
            // 401 = already logged out, silently ignore
        }
    }
}
 
const authService = new AuthService();
export default authService;