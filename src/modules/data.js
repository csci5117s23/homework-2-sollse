const backend_base = "https://backend-3ocf.api.codehooks.io/dev";


export async function getUndoneTodos(userId, authToken){
    const result = await fetch(`${backend_base}/todos?userId=${userId}&complete=false`, {
        'method': 'GET',
        'headers': {
            // 'x-apikey': '3bc38e6f-b1ad-4210-8bf2-c39dddd01983'
            'Authorization': 'Bearer ' + authToken,
            'Accept': 'application/json'
        } 
    })
    return await result.json();
}

export async function getTodoWithID(userId, todoItem, authToken){
    const result = await fetch(`${backend_base}/todos?userId=${userId}&item=${todoItem}`, {
        'method': 'GET',
        'headers': {
            // 'x-apikey': '3bc38e6f-b1ad-4210-8bf2-c39dddd01983'
            'Authorization': 'Bearer ' + authToken,
            'Accept': 'application/json'
        } 
    })
    return await result.json();
}

export async function getDoneTodos(userId, authToken){
    const result = await fetch(`${backend_base}/todos?userId=${userId}&complete=true`, {
        'method': 'GET',
        'headers': {
            // 'x-apikey': '3bc38e6f-b1ad-4210-8bf2-c39dddd01983'
            'Authorization': 'Bearer ' + authToken,
            'Accept': 'application/json'
        } 
    })
    return await result.json();
}


export async function addNewTodo(userId, newTodo, authToken){
    const result = await fetch(`${backend_base}/todos`, {
        'method': 'POST',
        'headers': {
            'Authorization': 'Bearer ' + authToken,
            // 'x-apikey': '3bc38e6f-b1ad-4210-8bf2-c39dddd01983',
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify({
            user: userId,
            item: newTodo,
            complete: false
        })
    });
    // return;
    return await result.json();
}

