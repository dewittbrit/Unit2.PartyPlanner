const COHORT = "2109-CPU-RM-WEB-PT";
    const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/events`;

    const state = {
      parties: [],
    };

    const partyList = document.querySelector("#partyList");
    const addPartyForm = document.querySelector("#addParty");
    addPartyForm.addEventListener("submit", addParty);


    async function render() {
        await getParties();
        renderParties();
    }

    async function getParties() {
        try {
            const response = await fetch(`https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/events`);
            const json = await response.json();
            state.parties = json.data;
        } catch (error) {
            console.error(error);
        }
    }

    function renderParties() {
        if (!state.parties.length) {
            partyList.innerHTML = "<li>No scheduled parties.</li>";
            return;
        }

        const partyElements = state.parties.map((party) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <h2>${party.name}</h2>
                <p>Date: ${party.date}</p>
                <p>Time: ${party.time}</p>
                <p>Location: ${party.location}</p>
                <p>Description: ${party.description}</p>
                <button onclick="deleteParty(${party.id})">Delete</button>
            `;
            return li;
        });

        partyList.replaceChildren(...partyElements);
    }

    async function addParty(event) {
        event.preventDefault();
        

        try {
            const response = await fetch(`https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/events`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: addPartyForm.name.value,
                    date: addPartyForm.date.value,
                    time: addPartyForm.time.value,
                    location: addPartyForm.location.value,
                    description: addPartyForm.description.value,
                    
                }),
        });

        if (!response.ok) {
            throw new Error("Failed to schedule party");
        }

        render();
        } catch (error) {
            console.error(error);
        }
    }

    async function deleteParty(id) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE"
            });

        if (!response.ok) {
            throw new Error(`Failed to delete party with ID: ${id}`);
        }

            render();
        } catch (error) {
            console.error(error);
        }
    }

    render();