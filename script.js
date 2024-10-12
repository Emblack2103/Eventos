$(document).ready(function() {
    $('#myTable').DataTable();

    let cart = [];
    
    $('.view-products').click(function() {
        $('#product-view').show();
        $('#datatable-view').hide();
        $('#cart-view').hide();
    });

    $('.view-datatable').click(function() {
        $('#product-view').hide();
        $('#datatable-view').show();
        $('#cart-view').hide();
    });

    $('.view-cart').click(function() {
        $('#product-view').hide();
        $('#datatable-view').hide();
        $('#cart-view').show();
        updateCartView();
    });

    // Agregar producto al carrito
    $('.add-to-cart').click(function() {
        const product = $(this).closest('.product');
        const name = product.data('name');
        const price = product.data('price');
        cart.push({ name: name, price: price });
        $('.cart-count').text(cart.length); 

        // Mostrar alerta de éxito
        showAlert(`${name} ha sido añadido al carrito`);
    });

    // Función para mostrar la alerta
    function showAlert(message) {
        const alertDiv = $('<div class="alert"></div>').text(message);
        $('body').append(alertDiv);
        
        // Desaparecer la alerta después de 3 segundos
        setTimeout(function() {
            alertDiv.fadeOut(500, function() {
                $(this).remove();
            });
        }, 3000);
    }

    // Actualizar vista del carrito
    function updateCartView() {
        $('#cart-items').empty(); 
        let total = 0; 
        cart.forEach((item, index) => {
            $('#cart-items').append(`
                <tr>
                    <td>${item.name}</td>
                    <td>$${item.price}</td>
                    <td><button class="remove-from-cart" data-index="${index}">Eliminar</button></td>
                </tr>
            `);
            total += item.price; 
        });
        $('#cart-items').append(`
            <tr>
                <td colspan="2"><strong>Total Productos: $${total.toFixed(2)}</strong></td>
            </tr>
        `);
    }

    // Proceder a la compra
    $('#checkout-button').click(function() {
        const descuentoPorcentaje = parseFloat($('#input-descuento').val()) || 0; 
        const costoEnvio = parseFloat($('#input-envio').val()) || 0; 
        let totalCarrito = 0;

        // Calcular total del carrito
        cart.forEach(item => {
            totalCarrito += item.price;
        });

        // Aplicar descuento si es válido
        if (descuentoPorcentaje > 0 && descuentoPorcentaje <= 100) {
            const descuento = (totalCarrito * descuentoPorcentaje) / 100; 
            totalCarrito -= descuento;
        }

        // Sumar costo de envío
        totalCarrito += costoEnvio;

        alert(`Total a pagar: $${totalCarrito.toFixed(2)}\n(Incluye un ${descuentoPorcentaje}% de descuento y envío de $${costoEnvio})`);
    });

    // Eliminar producto del carrito
    $(document).on('click', '.remove-from-cart', function() {
        const index = $(this).data('index');
        cart.splice(index, 1); 
        $('.cart-count').text(cart.length); 
        updateCartView(); 
    });

    // Vaciar carrito
    $('#clear-cart-button').click(function() {
        cart = []; 
        $('.cart-count').text(cart.length); 
        updateCartView(); 
    });

    // Función para manejar el menú desplegable
    $('.menu-button').click(function() {
        const menuContainer = $(this).closest('.menu-container');
        menuContainer.toggleClass('active'); // Añadir o remover la clase 'active' para mostrar/ocultar el menú
    });

    // Cerrar el menú si se hace clic fuera del mismo
    $(document).click(function(event) {
        if (!$(event.target).closest('.menu-container').length) {
            $('.menu-container').removeClass('active');
        }
    });
});
