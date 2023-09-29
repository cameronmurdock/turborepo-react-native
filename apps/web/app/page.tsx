"use client";

import { Button } from "ui";

import styles from "../styles/index.module.css";

export default function Web() {
  return (
    <div className={styles.container}>
      <h1>Web</h1>
      <Button onClick={() => console.log("Pressed!")} text="Boopies Biatch" />

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JSON editor</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background: #f4f4f4;
            padding: 20px;
            color: #333;
        }

        .container {
            display: flex;
            gap: 20px;
        }

        .column {
            flex: 1;
            display: flex;
            flex-direction: column;
        }

        .expandable-container {
            border: 1px solid #ccc;
            border-radius: 5px;
            overflow-y: auto;
            max-height: 100px; /* Set a fixed initial max-height */
            transition: max-height 0.3s ease; /* Add a transition for smoother expansion/collapse */
        }

        .expandable-container.open {
            max-height: 500px; /* Set max-height when expanded */
        }

        .top-container {
            width: 100%;
            height: 250px;
            background: url('https://i.imgur.com/0SYKRVA.jpg') no-repeat center center;
            background-size: cover;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-bottom: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }

        img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            border: 5px solid white;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }

        .expandable-container h2 {
            margin: 0;
            padding: 10px;
            background: #e7e7e7;
            display: flex;
            align-items: center;
            cursor: pointer;
        }

        .expandable-container h2 img {
            width: 20px;
            height: 20px;
            margin-right: 10px;
        }

        .expandable-content {
            padding: 10px;
            display: none;
        }

        select,
        input[type="text"] {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        button {
            padding: 5px 10px;
            background: #333;
            border: none;
            border-radius: 5px;
            color: white;
            cursor: pointer;
            margin-top: 10px;
        }

        button:hover {
            background: #555;
        }
    </style>
</head>

<body>
    <div class="top-container">
        <h1 id="Name"></h1>
        <img id="Image" src="" alt="Image">
    </div>

    <div class="container">
        <div class="column" id="dynamicContainer1">
            <!-- The expandable containers for column 1 will be dynamically generated here -->
        </div>
        <div class="column" id="dynamicContainer2">
            <!-- The expandable containers for column 2 will be dynamically generated here -->
        </div>
        <div class="column" id="dynamicContainer3">
            <!-- The expandable containers for column 3 will be dynamically generated here -->
        </div>
    </div>

    <script>

    let currentData = null;
    let data = {}; // Initialize an empty object for data



    function handleDoubleClick(event, columnIndex) {
        const clickedValue = event.target.value;
        const jsonUrl = `./data${columnIndex}.json`; // Construct the relative URL for the specific column's JSON data

        // Fetch JSON data from the relative path
        fetch(jsonUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(jsonData => {
                data = jsonData; // Store the fetched data in the data object
                updateUIWithData(data);
            })
            .catch(error =>
                console.error('Error fetching or processing the JSON data:', error)
            );
    }



    // Fetch and populate data for each column
    for (let i = 1; i <= 3; i++) {
        const dynamicContainers = document.getElementById(`dynamicContainer${i}`);
        // Fetch and display data for each column based on the index (i)
        fetch(`./data${i}.json`)
            .then(response => response.json())
            .then(jsonData => {
                // Create expandable containers for the fetched data
                for (let key in jsonData) {
                    if (
                        key !== "id" &&
                        key !== "name" &&
                        key !== "icon" &&
                        key !== "image" &&
                        key !== "backgroundImage"
                    ) {
                        const container = createExpandableContainer(
                            key,
                            jsonData[key],
                            jsonData.icon
                        );
                        dynamicContainers.appendChild(container);
                    }
                }
            })
            .catch(error =>
                console.error(`Error fetching or processing data for column ${i}:`, error)
            );
    }

        function updateUIWithData(jsonData) {
            // Populate data into the Name and Image elements
            document.getElementById('Name').textContent = `${jsonData.firstName} ${jsonData.lastName}`;
            document.getElementById('Image').src = jsonData.image;

            // Set the initial content if it's not already set
            if (document.getElementById('Name').textContent === '') {
                document.getElementById('Name').textContent = '';
            }
            if (document.getElementById('Image').src === '') {
                document.getElementById('Image').src = '';
            }
        }



        function toggleExpand(element) {
            const content = element.nextElementSibling;
            if (content.style.display === "none" || content.style.display === "") {
                content.style.display = "block";
            } else {
                content.style.display = "none";
                element.parentElement.style.maxHeight = "auto"; // this will set the height to the natural height of the header
            }
        }

        function saveField(fieldId) {
            const fieldValue = document.getElementById(fieldId).value;
            console.log(`Saved ${fieldId}: ${fieldValue}`);
        }

        function addToFieldFromDropdown(dropdown, fieldId) {
            const fieldValue = document.getElementById(fieldId).value;
            const selectedValue = dropdown.value;
            if (fieldValue) {
                document.getElementById(fieldId).value = `${fieldValue}, ${selectedValue}`;
            } else {
                document.getElementById(fieldId).value = selectedValue;
            }
        }


        function createExpandableContainer(key, value, iconUrl) {
            const container = document.createElement('div');
            container.className = 'expandable-container';

            const header = document.createElement('h2');
            const icon = document.createElement('img');
            icon.src = iconUrl;
            header.appendChild(icon);
            header.appendChild(document.createTextNode(key));
            header.onclick = () => {
                toggleExpand(header);
                currentData = { key, value, iconUrl };
            };

            const content = document.createElement('div');
            content.className = 'expandable-content';

            if (key === 'liveLocation') {
                const iframe = document.createElement('iframe');
                iframe.src = 'https://earth.google.com/web/';
                iframe.style.width = '100%';
                iframe.style.height = '200px';
                content.appendChild(iframe);
            } else if (Array.isArray(value)) {
                const dropdown = document.createElement('select');
                value.forEach(item => {
                    const option = document.createElement('option');
                    option.value = item;
                    option.innerText = item;
                    dropdown.appendChild(option);
                });
                dropdown.onchange = () => addToFieldFromDropdown(dropdown, key);
                content.appendChild(dropdown);

                const input = document.createElement('input');
                input.type = 'text';
                input.id = key;
                input.addEventListener('dblclick', handleDoubleClick);
                content.appendChild(input);
            } else if (key === 'website') {
                const iframe = document.createElement('iframe');
                iframe.src = value;
                iframe.style.width = '100%';
                iframe.style.height = '200px';
                content.appendChild(iframe);
            } else {
                const input = document.createElement('input');
                input.type = 'text';
                input.id = key;
                input.value = value;
                input.addEventListener('dblclick', handleDoubleClick);
                content.appendChild(input);
            }

            const saveButton = document.createElement('button');
            saveButton.innerText = 'Save Changes';
            saveButton.onclick = () => saveField(key);
            content.appendChild(saveButton);

            container.appendChild(header);
            container.appendChild(content);

            return container;
        }



        // Fetch initial JSON data from a relative path (you can update the file name)
        fetch('./data.json')
            .then(response => response.json())
            .then(jsonData => {
                data = jsonData; // Store the fetched data in the data object
                updateUIWithData(data); // Update the UI with the initial data
            })
            .catch(error =>
                console.error('Error fetching the JSON data:', error)
            );

    </script>

</body>

</html>
    </div>
  );
}
