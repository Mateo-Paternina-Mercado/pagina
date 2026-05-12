

let productos = [

    {

        nombre: "Pijama Azul",

        precio: 50000,

        img: "https://i.imgur.com/qP6XKXG.jpg",

        stock: 10,

        desc: "Pijama suave y cómoda para dormir"

    },

    {

        nombre: "Pijama Negra",

        precio: 60000,

        img: "https://i.imgur.com/ZANVnHE.jpg",

        stock: 8,

        desc: "Pijama elegante"

    }

]



let carrito = []

let total = 0



let pedidos =

    JSON.parse(

        localStorage.getItem("pedidos")

    ) || []




function cargar() {


    let cont =

        document.getElementById("productos")


    cont.innerHTML = ""


    productos.forEach((p, i) => {


        cont.innerHTML += `

<div class="card"

onclick="verProducto(${i})">

<img src="${p.img}">

<h3>${p.nombre}</h3>

<p>$${p.precio}</p>

<div class="stock">

Stock ${p.stock}

</div>

</div>

`


    })

}



cargar()

mostrarPedidos()



function agregar(n, p) {


    carrito.push({

        n, p

    })


    total += p


    document.getElementById("contador")

        .textContent = carrito.length


}



function abrirCarrito() {


    document.getElementById("carrito")

        .classList.add("activo")



    let lista =

        document.getElementById("lista")


    lista.innerHTML = ""


    carrito.forEach(x => {


        lista.innerHTML +=

            `<li>

${x.n}

$${x.p}

</li>`


    })


    document.getElementById("total")

        .textContent = "Total $" + total


}



function cerrarCarrito() {

    document.getElementById("carrito")

        .classList.remove("activo")

}



function nequi() {

    document.getElementById("nequiModal")

        .classList.add("activo")


    document.getElementById("totalNequi")

        .textContent = "Total $" + total

}



function cerrarNequi() {

    document.getElementById("nequiModal")

        .classList.remove("activo")

}



function confirmarPago() {


    let pedido = {

        fecha: new Date(),

        total

    }


    pedidos.push(pedido)


    localStorage.setItem(

        "pedidos",

        JSON.stringify(pedidos)

    )



    alert("Pedido guardado")


    carrito = []

    total = 0


    cerrarNequi()

    cerrarCarrito()

    mostrarPedidos()


}



function mostrarPedidos() {


    let lista =

        document.getElementById("pedidos")


    lista.innerHTML = ""


    pedidos.forEach(p => {


        lista.innerHTML +=

            `<li>

${p.total}

</li>`


    })


}



function buscar() {


    let t =

        document.getElementById("buscador")

            .value.toLowerCase()


    let f =

        productos.filter(p =>

            p.nombre.toLowerCase()

                .includes(t)

        )


    let cont =

        document.getElementById("productos")


    cont.innerHTML = ""


    f.forEach(p => {


        cont.innerHTML += `

<div class="card">

<img src="${p.img}">

<h3>${p.nombre}</h3>

<p>$${p.precio}</p>


<button onclick="agregar('${p.nombre}',${p.precio})">

Comprar

</button>


</div>

`


    })


}



function irTienda() {

    document

        .getElementById("tienda")

        .scrollIntoView()

}



/* LOGIN ADMIN */

function abrirLogin() {

    document
        .getElementById("loginAdmin")
        .classList.add("activo")

}



function cerrarLogin() {

    document
        .getElementById("loginAdmin")
        .classList.remove("activo")

}



/* LOGIN */

function loginAdmin() {


    let u =

        document.getElementById("user")
            .value


    let p =

        document.getElementById("pass")
            .value



    if (u == "admin" && p == "1234") {


        cerrarLogin()


        document
            .getElementById("adminPanel")
            .classList.add("activo")



    }

    else {

        alert("Datos incorrectos")

    }

}



/* PANEL ADMIN */

function cerrarAdmin() {

    document
        .getElementById("adminPanel")
        .classList.remove("activo")

}



/* GUARDAR PRODUCTOS */

let productosGuardados =
    JSON.parse(
        localStorage.getItem("productos")
    )



if (productosGuardados) {

    productos = productosGuardados.map(p => ({

        nombre: p.nombre,

        precio: p.precio,

        img: p.img,

        stock: p.stock || 10,

        desc: p.desc || "Sin descripción"

    }))


    cargar()

}

// arreglar los stocks para que guarde la informacion en vez de poner undefine

/* AGREGAR PRODUCTO */

function agregarProducto() {


    let nombre =

        document.getElementById("nombreProducto")
            .value


    let precio =

        document.getElementById("precioProducto")
            .value


    let imagen =

        document.getElementById("imagenProducto")
            .value



    let nuevo = {

        nombre: nombre,

        precio: Number(precio),

        img: imagen

    }



    productos.push(nuevo)



    localStorage.setItem(

        "productos",

        JSON.stringify(productos)

    )



    cargar()



    alert("Producto agregado")


}


let productoActual = 0


function verProducto(i) {


    productoActual = i


    let p = productos[i]


    document
        .getElementById("productoVista")
        .classList.add("activo")


    document
        .getElementById("vistaImg")
        .src = p.img


    document
        .getElementById("vistaNombre")
        .textContent = p.nombre


    document
        .getElementById("vistaDesc")
        .textContent = p.desc


    document
        .getElementById("vistaPrecio")
        .textContent = "$" + p.precio


    document
        .getElementById("vistaStock")
        .textContent = "Stock " + p.stock


}


function cerrarVista() {

    document
        .getElementById("productoVista")
        .classList.remove("activo")

}



function comprarVista() {


    let p = productos[productoActual]


    if (p.stock <= 0) {

        alert("Sin stock")

        return

    }


    p.stock--


    agregar(p.nombre, p.precio)


    cargar()


    cerrarVista()

}


let cupones =

    JSON.parse(

        localStorage.getItem("cupones")

    ) || []



function crearCupon() {


    let c =

        document.getElementById("cuponAdmin")
            .value


    cupones.push(c)


    localStorage.setItem(

        "cupones",

        JSON.stringify(cupones)

    )


    alert("Cupón creado")

}


function aplicarCupon() {


    let c =

        prompt("Cupón")


    if (cupones.includes(c)) {

        total *= 0.8

        alert("20% descuento")

    }

    else {

        alert("Cupón inválido")

    }

}