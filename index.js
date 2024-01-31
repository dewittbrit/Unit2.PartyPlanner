let testUrl = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2304-FTB-ET-WEB-PT/events'

document.addEventListener('DOMContentLoaded', () => {
    const partyForm = document.getElementById('partyForm');
    const partyList = document.getElementById('partyList');
  
    // Fetch parties from the API and render them on page load
    fetchParties();
  
    // Event listener for form submission
    partyForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const formData = new FormData(partyForm);
      const partyData = Object.fromEntries(formData.entries());
  
      // Call the function to add a new party
      await addParty(partyData);
  
      // Clear the form fields
      partyForm.reset();
  
      // Fetch and render updated parties after adding a new one
      fetchParties();
    });
  
    // Function to fetch parties from the API
    async function fetchParties() {
      try {
        const response = await fetch(testUrl);
        const parties = await response.json();
  
        // Call the function to render parties on the page
        renderParties(parties);
      } catch (error) {
        console.error('Error fetching parties:', error);
      }
    }
  
    // Function to render parties on the page
    function renderParties(parties) {
      partyList.innerHTML = '';
  
      parties.forEach((party) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <strong>${party.name}</strong> - ${party.date}, ${party.time}<br>
          Location: ${party.location}<br>
          Description: ${party.description}
          <button data-id="${party.id}" class="deleteButton">Delete</button>
        `;
  
        // Event listener for delete button
        const deleteButton = listItem.querySelector('.deleteButton');
        deleteButton.addEventListener('click', () => {
          // Call the function to delete the party
          deleteParty(party.id);
  
          // Fetch and render updated parties after deleting one
          fetchParties();
        });
  
        partyList.appendChild(listItem);
      });
    }
  
    // Function to add a new party to the API
    async function addParty(partyData) {
      try {
        const response = await fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(partyData),
        });
  
        const newParty = await response.json();
        console.log('New party added:', newParty);
      } catch (error) {
        console.error('Error adding party:', error);
      }
    }
  
    // Function to delete a party from the API
    async function deleteParty(id) {
      try {
        await fetch(testUrl+"/"+id, {
          method: 'DELETE',
        });
  
        console.log(`Party with ID ${partyId} deleted`);
      } catch (error) {
        console.error('Error deleting party:', error);
      }
    }
  });

