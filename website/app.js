//API Variables.
const baseURL = "https://api.openweathermap.org/data/2.5/weather?";
const apiKey = 'be31ead1e89c0885b27e5c0d4c54b426&units=metric';

// Dynamic js date instance.
let d = new Date();
const newDate = d.getDate() + " - " + (d.getMonth() + 1) + " - " + d.getFullYear();

//setting the dynamic UI.
//grabbing the entry div.
const entry = document.querySelector('.entry');

//styling the entry div.
entry.style.cssText = `display: flex; flex-direction: column; align-items: center;`;

//creating a div to hold the entry divs.
const entryDivsHolder = document.getElementById('entryHolder');

//dynamically creating the divs for the recent entry.
const dateDiv = document.getElementById('date');
const tempDiv = document.getElementById('temp');
const contentDiv = document.getElementById('content');
const feelings = document.getElementById('feelings');

//appending the divs where they should be.
entry.appendChild(entryDivsHolder);
entryDivsHolder.appendChild(dateDiv);
entryDivsHolder.appendChild(tempDiv);
entryDivsHolder.appendChild(contentDiv);

//styling the divs holder.
entryDivsHolder.style.cssText = `display: flex; flex-direction: row; justify-content: space-evenly; width: 100%; background-color: white; height: 100px; background-color: transparent;`;

//giving classes to each one of the divs.
dateDiv.classList.add('entryDivs');
tempDiv.classList.add('entryDivs');
contentDiv.classList.add('entryDivs');

//styling the divs using the classes.
const entryDivs = document.getElementsByClassName('entryDivs');

for(let i = 0; i < entryDivs.length; i++) {
    entryDivs[i].style.cssText = `background-color: white; width: 30%; height: 100%; border-radius: 10px; color: black; font-size: 10; font-family: 'Oxygen', Sans-Serif; display: flex; flex-direction: column;`;
}

//creating organisation divs.
const dateDivTitle = document.createElement('div');
dateDivTitle.textContent = 'Date';
const dateDivInfo = document.createElement('div');
const tempDivTitle = document.createElement('div');
tempDivTitle.textContent = 'Temperature';
const tempDivInfo = document.createElement('div');
const contentDivTitle = document.createElement('div');
contentDivTitle.textContent = 'Feelings';
const contentDivInfo = document.createElement('div');

//appending divs.
dateDiv.appendChild(dateDivTitle);
dateDiv.appendChild(dateDivInfo);
dateDiv.appendChild(dateDivTitle);
dateDiv.appendChild(dateDivInfo);
tempDiv.appendChild(tempDivTitle);
tempDiv.appendChild(tempDivInfo);
contentDiv.appendChild(contentDivTitle);
contentDiv.appendChild(contentDivInfo);

//styling the content divs
dateDivTitle.style.cssText = `background-color: DarkSlateBlue; width: 100%; height: 40%; border-radius: 10px; color: white; font-size: 10; font-family: 'Oxygen', Sans-Serif; justify-content: center; text-align: center; font-weight: bold;`;
dateDivInfo.style.cssText = `text-align: center; font-weight: bold;`;
tempDivTitle.style.cssText = `background-color: DarkSlateBlue; width: 100%; height: 40%; border-radius: 10px; color: white; font-size: 10; font-family: 'Oxygen', Sans-Serif; justify-content: center; text-align: center; font-weight: bold;`;
tempDivInfo.style.cssText = `text-align: center; font-weight: bold;`;
contentDivTitle.style.cssText = `background-color: DarkSlateBlue; width: 100%; height: 40%; border-radius: 10px; color: white; font-size: 10; font-family: 'Oxygen', Sans-Serif; justify-content: center; text-align: center; font-weight: bold;`;
contentDivInfo.style.cssText = `text-align: center; font-weight: bold;`;

//storing the user's response.
const userResponse = document.querySelector('.myInput').textContent;

//event listener for the generation button.
const generateButton = document.querySelector('#generate');
generateButton.addEventListener('click', function (event) {
    //preventing Default.
    event.preventDefault();

    //grabbing the user's response.
    const zip = document.getElementById('zip').value;
    const content = document.getElementById('content').value;
    
    //API call.
    const getWeatherData = async () => {
        const response = await fetch(`${baseURL}zip=${zip},us&appid=${apiKey}`);
        try {
            //converting the response to json.
            const data = await response.json();            
            return data;
        } catch (error) {
            console.log("error", error);
        }
    }

    //calling the API.
    getWeatherData(baseURL, zip, apiKey)
    .then(tempreture => {
        projectData = {
            temp: tempreture.main.temp,
            date,
            userResponse
        };
        //Writting the data to the relevant DOM Elements.
        dateDivInfo.textContent = newDate;
        tempDivInfo.textContent = `${projectData.temp} °C`;
        contentDivInfo.textContent = feelings.value;
        postData('/projectData', projectData)
        .then(() => {
            //updating the UI after fetching the data.
            async (url) => {
                const response = await fetch(url);
                const data = await response.json();
            }
        })
        .catch(error => {
            console.log(error);
        });})});

        //function to post the data.
const postData = async (url, data) => {
            const request = await fetch(url, {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        
            try {
                const data = await request.json();
                return data;
            } catch (err) {
                console.log('Error:', err);
            };
        };