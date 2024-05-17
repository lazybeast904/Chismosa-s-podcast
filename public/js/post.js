
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
    const gossipPost = document.createElement('div');
    gossipPost.style.backgroundColor = "#8c52ff";
    gossipPost.style.alignContent = "center";
    gossipPost.style.marginTop = "20px";
    gossipPost.style.width= "40vw";
    gossipPost.style.marginLeft= "33px";
    gossipPost.style.marginRight= "33px";
    gossipPost.style.height= "25vw";
    gossipPost.style.border= "5px solid black";



    // Create p elements to display the information
    const titleP = document.createElement('p');
    titleP.textContent = `Title: ${dataObject.title}`;
    titleP.style.fontSize = "24px";
    titleP.style.color = "white";

    const userP = document.createElement('p');
    userP.textContent = `By: ${dataObject.user}`;
    userP.style.color = "white";
    userP.style.fontSize = "14px";

    const sourceP = document.createElement('p');
    sourceP.textContent = `Source: ${dataObject.source}`;
    sourceP.style.color = "white";
    sourceP.style.fontSize = "14px";

    const storyP = document.createElement('p');
    storyP.textContent = `Story: ${dataObject.story}`;
    storyP.style.color = "white";
    storyP.style.fontSize = "18px";

    // Append the p elements to the div
    gossipPost.appendChild(titleP);
    gossipPost.appendChild(userP);
    gossipPost.appendChild(sourceP);
    gossipPost.appendChild(storyP);

    // Append the div to the section with id "gossip"
    const gossipSection = document.getElementById('gossip');
    if (gossipSection) {
        gossipSection.appendChild(gossipPost);
    } else {
        console.error('Section with id "gossip" not found');
    }
}

processDatabaseTable()