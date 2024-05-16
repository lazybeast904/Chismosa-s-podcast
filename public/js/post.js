


async function fetchDataFromAPI() {
    try {
        const response = await fetch('/api/gossip');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function processDatabaseTable() {
    const databaseTable = await fetchDataFromAPI();

    databaseTable.forEach((dataObject) => {
        // Execute createDataEntryDiv() for each object in the database table
        createDataEntryDiv(dataObject);

        // You can access the data for the current object here and use it as needed
        console.log('Data for current object:', dataObject);
    });
}



function createDataEntryDiv(dataObject) {
    // Create a div element
    const div = document.createElement('div');

    // Create p elements to display the information
    const titleP = document.createElement('p');
    titleP.textContent = `Title: ${dataObject.title}`;

    const sourceP = document.createElement('p');
    sourceP.textContent = `Source: ${dataObject.source}`;

    const storyP = document.createElement('p');
    storyP.textContent = `Story: ${dataObject.story}`;

    // Append the p elements to the div
    div.appendChild(titleP);
    div.appendChild(sourceP);
    div.appendChild(storyP);

    // Append the div to the section with id "gossip"
    const gossipSection = document.getElementById('gossip');
    if (gossipSection) {
        gossipSection.appendChild(div);
    } else {
        console.error('Section with id "gossip" not found');
    }
}

processDatabaseTable()