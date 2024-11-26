const form = document.getElementById('suscripciones1-form');

        
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); 

            
            const nombre = document.getElementById('name').value;
            const dni = document.getElementById('dni').value;
            const email = document.getElementById('email').value;

            
            const data = {
                nombre: nombre,
                dni: dni,
                email: email,
            };

            // URL de la MockAPI
            const apiUrl ='https://670ee5203e7151861656108a.mockapi.io/API/suscripciones2'

            try {
                
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                
                if (response.ok) { 
                    alert('¡Gracias por suscribirte! Tus datos han sido guardados.');
                    window.location.href = 'index.html'; 
                } else {
                    alert('Hubo un problema al guardar tus datos.');
                    window.location.href = 'index.html'; 
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
                alert('Hubo un problema al enviar tus datos.');
            }
        });