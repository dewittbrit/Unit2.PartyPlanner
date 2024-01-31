let testUrl = "https://fsa-crud-2ahttps://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/eventsa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/recipes"

async function addParty(info){
    console.log(info)
    try{
        const response = await fetch(Url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(info),
        });

        console.log(response)

const additionalParty = await response.json();
displayParty(info);

    }catch(error){
        console.error("Oops, you had an error occur while adding a party:", error)
    }
}

document.getElementById("addPartyForm").addEventListener("submit", submitParty)

function submitParty(event){
    event.preventDefault();

    const nameValue = document.getElementById("name").value;
    const dateValue = document.getElementById("date").value;
    const locationValue = document.getElementById("location").value;
    const descriptionValue = document.getElementById("description").value;


console.log(nameValue,dateValue,locationValue,descriptionValue)

const PartyInfo = {

    name: nameValue,
    date: dateValue,
    location: locationValue,
    description: descriptionValue,
};

console.log(PartyInfo)

addParty(PartyInfo);

document.getElementById("addPartyForm").reset();
}

function displayParty(party){

    const partiesDiv = document.createElement("div");

    const btn = document.createElement("button");
    btn.innerHTML = "Delete Party"

    
    btn.addEventListener("click ", () => deleteParty(party.id, partiesDiv));
    
}



// async function deleteArtist(id){
//     try{
//         const response = await fetch(testUrl+"/"+id,{
//             method: "DELETE",
//             headers: {"Content-Type":"application/json"},
//         })
//         // console.log(response)
//         // const responseObj = await response.json()
//         // console.log(responseObj.data)
//     }catch(error){
//         console.error("oh no!", error)
//     }
// }
// async function test(){
//     // 1. first create artist
//     let artistId = await createArtists()
//     // ToDo = your createArtist function should return the id of the artist you just created
//     // 2. get artists (verify that artist has been created)
//     await getArtists()
//     // 3. Delete artists that was just creates
//     await deleteArtist(artistId)
//     // 4. verify that artist got deleted (get artists)
//     await getArtists()
// }
// test()