document.addEventListener('DOMContentLoaded', async function() {
    const form = document.getElementById("producto-form");
    const nameInput = document.getElementById('name');
    const priceInput = document.getElementById('price');
    const quantityInput = document.getElementById('quantity');
    const saveButton = document.getElementById('save-product');

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        let producto = await fetch(`http://localhost:3000/api/productos/${productId}`);
        let product = await producto.json();

        nameInput.value = product.nombre;
        priceInput.value = product.precio;
        quantityInput.value = product.cantidad;
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const name = nameInput.value;
        const price = parseFloat(priceInput.value);
        const quantity = parseInt(quantityInput.value);

        if(name && price && quantity) {
            const productoData = { nombre: name, precio: price, cantidad:quantity };

            if (productId) {
                await fetch(`http://localhost:3000/api/producto/${productId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(productoData)
                })

                alert('Producto actualizado con éxito')
                window.location.href = 'index.html';
            }
        } else {
            alert('Por favor, complete todos los campos.');
        }
    })

});