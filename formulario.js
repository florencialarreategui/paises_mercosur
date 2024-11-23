const form = document.getElementById('subscription-form');

        // Manejar el envío del formulario
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); // Evitar que el formulario se envíe de la forma tradicional

            // Obtener los valores de los campos del formulario
            const nombre = document.getElementById('nombre').value;
            const dni = document.getElementById('dni').value;
            const email = document.getElementById('email').value;

            // Crear el objeto con los datos a enviar
            const data = {
                nombre: nombre,
                dni: dni,
                email: email
            };

            // URL de la MockAPI
            const apiUrl = 'https://6737db304eb22e24fca64f87.mockapi.io/subscripciones/subscripcion';

            try {
                // Enviar los datos a la API usando fetch
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                // Revisar la respuesta de la API
                if (response.ok) { // Si la respuesta fue exitosa (código 201)
                    alert('¡Gracias por suscribirte! Tus datos han sido guardados.');
                    window.location.href = 'index.html'; // Redirigir al usuario
                } else {
                    alert('Hubo un problema al guardar tus datos.');
                    window.location.href = 'index.html'; // Redirigir en caso de error
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
                alert('Hubo un problema al enviar tus datos.');
            }
        });