function createFollowersHashTable(followers){

    let hashTable = {};

    for (const f of followers) {
        hashTable[f.followedId] = true;
    }

    return hashTable;
}

export default createFollowersHashTable;