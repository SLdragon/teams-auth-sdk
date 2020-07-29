export class UserInfo {
    public readonly userName: string;
    public readonly preferredUserName: string;
    constructor(userName: string, preferredUserName: string) {
        this.userName = userName;
        this.preferredUserName = preferredUserName;
    }
}