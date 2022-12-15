const socket = io.connect()

function renderProducts(data){
    const html = data.map(obj =>{
        return (`<div class='row mt-1 mb-1 d-flex align-items-around justify-content-evenly'>
                <div class='col mt-1 mb-1 d-flex justify-content-start'>${obj.producto}</div>
                <div class='col mt-1 mb-1 d-flex justify-content-start'>$ ${obj.precio}</div>
                <div class='col mt-1 mb-1 d-flex justify-content-start'>
                    <img class='img-fluid' width='25%' src='${obj.foto}'>
                </div>
                </div>
                <hr>`)
    }).join(' ');

    document.getElementById('tableProducts').innerHTML = html
}

function addProduct(){
    const producto = document.getElementById('producto').value;
    const precio = document.getElementById('precio').value;
    const foto = document.getElementById('foto').value;

    const newProduct = {
        producto: producto,
        precio: precio,
        foto: foto
    }

    socket.emit('newProduct', newProduct);

    return false
}

socket.on('productos', data => {
    renderProducts(data)
})

function renderChat(data){
    const html = data.map(item => {
        return (`<div>
                    <strong>${item.author}</strong> [at ${item.time}]: <em>${item.text}</em>
                </div>
                <hr>`)
    }).join(' ')

    document.getElementById('message').innerHTML = html
}

function alertMsj(data){
    // renderizamos la data en el div de la plantilla HTML
    document.getElementById('nameMsj').innerHTML = `
            <div class="toast align-items-center text-bg-primary border-0 fade show" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        <font style="vertical-align: inherit;">
                            <font style="vertical-align: inherit;" id="nameMsj">
                                Nuevo mensaje de:  ${data[data.length - 1].author}
                            </font>
                        </font>
                    </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close">X</button>
                </div>
            </div>
            `
}

function addMessage() {
    const authorName = document.getElementById('author').value;
    const textMsn = document.getElementById('text').value;
    const time = new Date();

    const mensaje = {
        author: authorName,
        text: textMsn,
        time: time
    }

    document.getElementById('text').value = '';

    socket.emit('newMessage', mensaje);

    return false;
}

socket.on('message', data => {
    renderChat(data)
    alertMsj(data)
})