// User {email: string, preferences: array storing Preference objects, matches: array storing Match objects}
// Preference {name: string, value: Number, weight: Number (0-1)}
// Match {user: User, match: Number}
// name: preference type, value: selected value in form, weight: importance of preference
// users: array of User objects
let users = [];
// Current types of preferences
let preferenceTypes = ["Noise Level", "Cleanliness", "Closeness", "Academic Importance", "In Room", "Guests"];

// For testing, populates users with randomly created users
for(let i = 0; i<10; i++){
    let newUser = {};
    newUser.email = "User" + i.toString() + "@umass.edu";
    newUser.preferences = [];
    newUser.matches = [];
    // Generates random preference values for each preference type
    preferenceTypes.forEach((preference)=>{
        newUser.preferences.push({name: preference, value:Math.floor(Math.random()*100), weight: Math.random()});
    });

    users.push(newUser);
}

// Binary search to find placement of match in matches array
function findMatchIndex(matchVal, matches, low, high){
    if(matches.length === 0) return 0;
    //if(matches.legnth === 1) return matches[0] > matchVal ? 1 : 0;
    // Base Case
    if(low>=high) {return low;}

    // Recursive Case
    let idx = Math.floor((low+high)/2);

    if(matches[idx].match < matchVal){
        return findMatchIndex(matchVal, matches, low, idx);
    }
    else if(matches[idx].match > matchVal){
        return findMatchIndex(matchVal, matches, idx+1, high);
    }
    // Match values are equal
    else{
        return idx;
    }
}

// Takes in a user and ranks the other users by similarity of preferences
function determineMatching(user, users){
    users.forEach((otherUser)=>{
        if(otherUser.email === user.email) return;
        let match = 600; // For now this is the max possible difference btwn users if all weights are 1 and theres a diff of 100 on each pref
        otherUser.preferences.forEach((pref, idx) =>{
            // Match value is decreased by difference of each preference, multiplied with the preference weight
            let val = Math.abs(user.preferences[idx].value - pref.value)*user.preferences[idx].weight;
            match -= val;
        });

        // Uses binary search to keep match array sorted by highest to lowest match value
        let idx = findMatchIndex(match, user.matches, 0, user.matches.length);
        user.matches.splice(idx, 0, {user: otherUser, match: match});
    });
}
