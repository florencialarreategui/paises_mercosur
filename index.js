async function loadCountries() {
    const countries = ['Argentina', 'Uruguay', 'Brazil', 'Paraguay']; 

    const countryCardsContainer = document.getElementById('country-cards');
   

    for (let country of countries) {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
            const data = await response.json();
            const countryInfo = data[0]; 

           
        const countryCode = countryInfo.cca2.toLowerCase(); 
        // Generamos la URL de la bandera usando la API de flagcdn
        const flagUrl = `https://flagcdn.com/w320/${countryCode}.png`; 

            const cardHTML = `
                <div class="col-md-4 mb-4">
                    <a href="${country.toLowerCase()}.html" class="text-decoration-none">
                        <div class="card">
                           <img src="${flagUrl}" class="card-img-top" alt="Bandera de ${country}">
                            <div class="card-body">
                                <h5 class="card-title">${countryInfo.name.common}</h5>
                                <p class="card-text">Haz clic para ver más información sobre ${country}.</p>
                            </div>
                        </div>
                    </a>
                </div>
            `;

            countryCardsContainer.innerHTML += cardHTML; 
        } catch (error) {
            console.error('Error al cargar la información del país:', error);
        }
    }
}


window.onload = loadCountries;

//----------------------------------------------------------------------------
 
 async function loadCountryInfo(countryName) {
    try {
        
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const data = await response.json();
        const country = data[0];

        
        document.getElementById('country-title').innerText = `Información sobre ${country.name.common}`;
        document.getElementById('country-name').innerText = country.name.common;
        document.getElementById('country-capital').innerText = country.capital ? country.capital[0] : 'No disponible';
        document.getElementById('country-population').innerText = country.population.toLocaleString();
        document.getElementById('country-languages').innerText = Object.values(country.languages || {}).join(', ');
        document.getElementById('country-currency').innerText = Object.values(country.currencies || {}).map(c => c.name).join(', ');
        document.getElementById('country-region').innerText = `${country.region} - ${country.subregion}`;

       
        const countryCode = country.cca2.toLowerCase();
        const flagUrl = `https://flagcdn.com/w320/${countryCode}.png`;
        document.getElementById('country-flag').src = flagUrl;


    } catch (error) {
        console.error('Error al cargar la información del país:', error);
    }
}

const countryName = window.location.pathname.split('/').pop().split('.')[0]; 
loadCountryInfo(countryName);


const map = L.map('map').setView([0, 0], 2); 


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);


async function loadCountryInfo(countryName) {
   
    try {
        
        
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const data = await response.json();
        const country = data[0];

        
        const coords = country.latlng;

        
        document.getElementById('country-title').innerText = `Información sobre ${country.name.common}`;
        document.getElementById('country-name').innerText = country.name.common;
        document.getElementById('country-capital').innerText = country.capital ? country.capital[0] : 'No disponible';
        document.getElementById('country-population').innerText = country.population.toLocaleString();
        document.getElementById('country-languages').innerText = Object.values(country.languages || {}).join(', ');
        document.getElementById('country-currency').innerText = Object.values(country.currencies || {}).map(c => c.name).join(', ');
        document.getElementById('country-region').innerText = `${country.region} - ${country.subregion}`;

        
        const countryCode = country.cca2.toLowerCase();
        const flagUrl = `https://flagcdn.com/w320/${countryCode}.png`;
        document.getElementById('country-flag').src = flagUrl;

         
          map.setView(coords, 5); 

          
          L.marker(coords).addTo(map).bindPopup(`<b>${country.name.common}</b><br>${country.capital}`);
  
          
          addTouristSpots(countryName, coords);
  
          
          setTimeout(() => map.invalidateSize(), 200);
  
      } catch (error) {
          console.error('Error al cargar la información del país:', error);
      }
  }
  
 function addTouristSpots(countryName, countryCoords) {
    
    const touristSpotsContainer = document.getElementById('tourist-spots-container');

    
    touristSpotsContainer.innerHTML = '';

    
    const touristSpots = {
        'argentina': [
            { 
                name: 'Cataratas del Iguazú', 
                coords: [-25.6953, -54.4367], 
                image: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Foz_de_Igua%C3%A7u_27_Panorama_Nov_2005.jpg', 
                description: 'Un conjunto de impresionantes cascadas en la frontera entre Argentina y Brasil.'
            },
            { 
                name: 'Aconcagua', 
                coords: [-32.6532, -70.0103], 
                image: 'https://img.freepik.com/foto-gratis/paisaje-montanas-nevadas-villar-d-arene-francia-sobre-cielo-azul_181624-25859.jpg', 
                description: 'El pico más alto de América del Sur, ubicado en los Andes.'
            },
            { 
                name: 'Buenos Aires', 
                coords: [-34.6037, -58.3816], 
                image: 'https://turismo.buenosaires.gob.ar/sites/turismo/files/obelisco-noche-1500x610-luces-2022.jpg', 
                description: 'La vibrante capital de Argentina, famosa por su arquitectura y vida nocturna.'
            }
        ],
        'brazil': [
            { 
                name: 'Cristo Redentor', 
                coords: [-22.9519, -43.2105], 
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Cristo_Redentor_do_Rio_de_Janeiro_0.jpg/800px-Cristo_Redentor_do_Rio_de_Janeiro_0.jpg', 
                description: 'La famosa estatua de Jesucristo en Río de Janeiro, una de las Nuevas Siete Maravillas del Mundo.'
            },
            { 
                name: 'Amazonas', 
                coords: [-3.4653, -62.2159], 
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Amazon17_%285641020319%29.jpg/1200px-Amazon17_%285641020319%29.jpg', 
                description: 'La selva tropical más grande del mundo, hogar de una increíble biodiversidad.'
            },
            { 
                name: 'Ipanema', 
                coords: [-22.9877, -43.2003], 
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/1_ipanema_beach_vidigal_sunset.jpg/1200px-1_ipanema_beach_vidigal_sunset.jpg', 
                description: 'Una de las playas más famosas de Río de Janeiro, conocida por su belleza y ambiente relajado.'
            }
        ],
        'paraguay': [
            { 
                name: 'Cataratas del Yguazú', 
                coords: [-25.6922, -54.4381], 
                image: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Foz_de_Igua%C3%A7u_27_Panorama_Nov_2005.jpg', 
                description: 'Unas impresionantes cataratas situadas en la frontera entre Paraguay y Brasil.'
            },
            { 
                name: 'Encarnación', 
                coords: [-27.3428, -55.8668], 
                image: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Puente_San_Roque_y_Costanera.jpg', 
                description: 'Una ciudad en el sur de Paraguay conocida por sus playas y su vida nocturna.'
            },
            { 
                name: 'Asunción', 
                coords: [-25.2637, -57.5759], 
                image: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Palacio_de_Gobierno2.jpg', 
                description: 'La capital de Paraguay, una ciudad con una rica historia y una vibrante cultura.'
            }
        ],
        'uruguay': [
            { 
                name: 'Colonia del Sacramento', 
                coords: [-34.4737, -57.8387], 
                image: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Calle_de_los_Suspiros%2C_Colonia_del_Sacramento%2C_Uruguay_-_panoramio.jpg', 
                description: 'Una ciudad histórica con un casco antiguo bien conservado, declarada Patrimonio de la Humanidad por la UNESCO.'
            },
            { 
                name: 'Punta del Este', 
                coords: [-34.9506, -54.9602], 
                image: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Punta_del_Este_Montaje.png', 
                description: 'Un famoso balneario en Uruguay, conocido por sus playas y su vida nocturna.'
            },
            { 
                name: 'Montevideo', 
                coords: [-34.9011, -56.1645], 
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Letras_Montevideo_en_Pocitos.jpg/232px-Letras_Montevideo_en_Pocitos.jpg', 
                description: 'La capital de Uruguay, famosa por su rambla costera, sus playas y su arquitectura.'
            }
        ]
    };

    const spots = touristSpots[countryName] || []; 

    
    spots.forEach(spot => {
        
        const marker = L.marker(spot.coords).addTo(map).bindPopup(`<b>${spot.name}</b>`);

        
        const card = document.createElement('div');
        card.classList.add('col-12', 'col-md-4', 'mb-3'); 
        card.innerHTML = `
            <div class="card">
                <img src="${spot.image}" class="card-img-top" alt="${spot.name}">
                <div class="card-body">
                    <h5 class="card-title">${spot.name}</h5>
                    <p class="card-text">${spot.description}</p>
                </div>
            </div>
        `;

       
        touristSpotsContainer.appendChild(card);

       
        marker.on('click', function() {
            
            const allCards = touristSpotsContainer.querySelectorAll('.card');
            allCards.forEach(card => {
                card.classList.remove('selected'); 
            });

            
            card.classList.add('selected'); 
        });
         
         card.addEventListener('click', function() {
            map.setView(spot.coords, 8); 
            L.marker(spot.coords).addTo(map).bindPopup(`<b>${spot.name}</b><br>${spot.description}`).openPopup();
        });
    });
}
