async function loadCountries() {
    const countries = ['Argentina', 'Uruguay', 'Brazil', 'Paraguay']; // Lista de países que queremos mostrar

    const countryCardsContainer = document.getElementById('country-cards');
    countryCardsContainer.innerHTML = ''; // Limpiar el contenedor antes de cargar nuevos datos

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