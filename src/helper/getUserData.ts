


export function getUserData(){
    try {
        const userData=localStorage.getItem('userData')
        if(typeof userData!=='object'){
            const parsedData=JSON.parse(userData)
            return parsedData
        }
        return 
    } catch (error) {
        console.log('failed to parsed user data')
    }
}

export function getUserId(): string | undefined{
    const user=getUserData()
    if(user){
        return user?.userData?.user?._id as string 
    }
    
}

export function getUserEmail(): string | undefined{
    const user=getUserData()
    if(user){
        return user?.userData?.user?.email as string 
    }
    
}