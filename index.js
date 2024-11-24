async function loadCountries() {
    const countries = ['Argentina', 'Uruguay', 'Brazil', 'Paraguay']; // Lista de países que queremos mostrar

    const countryCardsContainer = document.getElementById('country-cards');
    // countryCardsContainer.innerHTML = ''; // Limpiar el contenedor antes de cargar nuevos datos

    for (let country of countries) {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
            const data = await response.json();
            const countryInfo = data[0]; // Usamos el primer país (por nombre)
            
            // Usamos el código de país en formato ISO 3166-1 alfa-2 (como "ar" para Argentina)
        const countryCode = countryInfo.cca2.toLowerCase(); // Obtiene el código de país (ej. 'AR')
        // Generamos la URL de la bandera usando la API de flagcdn
        const flagUrl = `https://flagcdn.com/w320/${countryCode}.png`; // URL de la bandera

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

            countryCardsContainer.innerHTML += cardHTML; // Agregar la tarjeta al contenedor
        } catch (error) {
            console.error('Error al cargar la información del país:', error);
        }
    }
}

// Llamar a la función para cargar los países cuando la página se carga
window.onload = loadCountries;

//----------------------------------------------------------------------------
 // Función para cargar la información de un país específico
 async function loadCountryInfo(countryName) {
    try {
        // Solicitar los datos del país a la API
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const data = await response.json();
        const country = data[0];

        // Actualizar el contenido del HTML con los datos obtenidos
        document.getElementById('country-title').innerText = `Información sobre ${country.name.common}`;
        document.getElementById('country-name').innerText = country.name.common;
        document.getElementById('country-capital').innerText = country.capital ? country.capital[0] : 'No disponible';
        document.getElementById('country-population').innerText = country.population.toLocaleString();
        document.getElementById('country-languages').innerText = Object.values(country.languages || {}).join(', ');
        document.getElementById('country-currency').innerText = Object.values(country.currencies || {}).map(c => c.name).join(', ');
        document.getElementById('country-region').innerText = `${country.region} - ${country.subregion}`;

        // Establecer la bandera usando el código del país
        const countryCode = country.cca2.toLowerCase();
        const flagUrl = `https://flagcdn.com/w320/${countryCode}.png`;
        document.getElementById('country-flag').src = flagUrl;


    } catch (error) {
        console.error('Error al cargar la información del país:', error);
    }
}
// Llamar a la función para cargar la información del país cuando se cargue la página
const countryName = window.location.pathname.split('/').pop().split('.')[0]; // Usar el nombre del archivo
loadCountryInfo(countryName);

// Inicialización del mapa interactivo
const map = L.map('map').setView([0, 0], 2); // Ubicación inicial del mapa, zoom nivel 2

// Cargar las capas del mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Función para cargar información del país
async function loadCountryInfo(countryName) {
   
    try {
        
        // Hacer la solicitud a la API de RestCountries
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const data = await response.json();
        const country = data[0];

        // Obtener las coordenadas
        const coords = country.latlng;

        // Actualizar información del país en la página
        document.getElementById('country-title').innerText = `Información sobre ${country.name.common}`;
        document.getElementById('country-name').innerText = country.name.common;
        document.getElementById('country-capital').innerText = country.capital ? country.capital[0] : 'No disponible';
        document.getElementById('country-population').innerText = country.population.toLocaleString();
        document.getElementById('country-languages').innerText = Object.values(country.languages || {}).join(', ');
        document.getElementById('country-currency').innerText = Object.values(country.currencies || {}).map(c => c.name).join(', ');
        document.getElementById('country-region').innerText = `${country.region} - ${country.subregion}`;

        // Cambiar la bandera
        const countryCode = country.cca2.toLowerCase();
        const flagUrl = `https://flagcdn.com/w320/${countryCode}.png`;
        document.getElementById('country-flag').src = flagUrl;

          // Centrar el mapa en el país
          map.setView(coords, 5); // Ajustar zoom y centrar en las coordenadas del país

          // Añadir un marcador en el mapa para el país
          L.marker(coords).addTo(map).bindPopup(`<b>${country.name.common}</b><br>${country.capital}`);
  
          // Añadir puntos turísticos
          addTouristSpots(countryName, coords);
  
          // Ajustar el tamaño del mapa para que se redibuje correctamente
          setTimeout(() => map.invalidateSize(), 200);
  
      } catch (error) {
          console.error('Error al cargar la información del país:', error);
      }
  }
  
 function addTouristSpots(countryName, countryCoords) {
    // Contenedor donde se agregarán las cards de los puntos turísticos
    const touristSpotsContainer = document.getElementById('tourist-spots-container');

    // Limpiar cualquier card existente antes de agregar nuevas
    touristSpotsContainer.innerHTML = '';

    // Definir puntos turísticos por país (con imágenes y descripciones)
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

    const spots = touristSpots[countryName] || []; // Obtiene los puntos turísticos del país

    // Añadir los puntos turísticos al mapa
    spots.forEach(spot => {
        // Crear un marcador en el mapa
        const marker = L.marker(spot.coords).addTo(map).bindPopup(`<b>${spot.name}</b>`);

        // Crear una card para el punto turístico
        const card = document.createElement('div');
        card.classList.add('col-12', 'col-md-4', 'mb-3'); // Clase de Bootstrap para fila
        card.innerHTML = `
            <div class="card">
                <img src="${spot.image}" class="card-img-top" alt="${spot.name}">
                <div class="card-body">
                    <h5 class="card-title">${spot.name}</h5>
                    <p class="card-text">${spot.description}</p>
                </div>
            </div>
        `;

        // Agregar la card al contenedor debajo del mapa
        touristSpotsContainer.appendChild(card);

        // Al hacer clic en el marcador, resaltar la card asociada
        marker.on('click', function() {
            // Limpiar todas las cards
            const allCards = touristSpotsContainer.querySelectorAll('.card');
            allCards.forEach(card => {
                card.classList.remove('selected'); // Quitar la clase 'selected' de todas las cards
            });

            // Resaltar la card asociada
            card.classList.add('selected'); // Añadir la clase 'selected' a la card correspondiente
        });
         // Al hacer clic en la card, centrar el mapa y hacer zoom en el punto turístico
         card.addEventListener('click', function() {
            map.setView(spot.coords, 8); // Centrar el mapa y hacer zoom en el punto turístico
            // También podrías agregar un marcador temporal para este punto si lo deseas:
            L.marker(spot.coords).addTo(map).bindPopup(`<b>${spot.name}</b><br>${spot.description}`).openPopup();
        });
    });
}
