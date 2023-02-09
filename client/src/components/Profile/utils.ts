export const validateProfileQuery = (query: string): boolean => {
    // create regex pattern that matches an ethereum address, a lens handle (xxx.lens), ens handle (xxx.eth), or a username prefixed with @ (@xxx)
    let valid = false;
    const pattern = /0x[a-fA-F0-9]{40}|[a-zA-Z0-9]{1,}\.lens|[a-zA-Z0-9]{1,}\.eth|@[a-zA-Z0-9]{1,}/g;
    // throw error if query doesn't match pattern
    if (!query.match(pattern)) {
        throw new Error("Invalid query");
    } 
    valid = true;
    return valid
}

