


export type UserDataType = {
    user: string,
    password: string,
}

export type LoginRequestType = {
    username : string,
    password : string;
}

export type AuthResponseType = {
    accessToken : string,
    refreshToken : string,
    expiresIn : number,
    refreshExpiresIn: number,
    tokenType: string,
    tenantId : string,
    timezone : string,
    directoryId : string,
}
export type ErrorResponseType = {
   statusCode : number,
   description? : string,  
   message?: string,
   details? : string,
}

export type CreateUserResponseType = {
    code : number,
    message : string
}

