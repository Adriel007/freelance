(async function () {
  const response = await fetch("data.json");
  const data = await response.json();

  document.head.querySelector("title").textContent = data.info.name;
  document.querySelector('meta[name="description"]').content =
    data.info.description;
  document.body.style.backgroundImage = `url("${data.info.background}")`;

  document.body.innerHTML = document.body.innerHTML.replaceAll(
    "@name",
    data.info.name
  );
  document.body.innerHTML = document.body.innerHTML.replace(
    "@description",
    data.info.description
  );

  if (data.special.itemsID.length > 0) {
    const specialSection = `
      <section id="menu" class="mt-5 animationRL">
        <h2 class="text-white">${data.special.title}</h2>
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            ${data.special.itemsID
              .map(
                (item, index) => `
              <div class="carousel-item${index === 0 ? " active" : ""}">
                <img src="https://via.placeholder.com/300" class="d-block w-100" alt="${
                  data.cards[item].title
                }">
                <div class="carousel-caption d-none d-md-block">
                  <h5>${data.cards[item].title}</h5>
                  <p>${data.cards[item].description}</p>
                  <h3 class="text-success fw-bold">R$ ${data.cards[
                    item
                  ].price.toFixed(2)}</h3>
                  <button id="${item}" class="btn btn-primary _add"><i class="bi bi-cart-plus-fill h1"></i></button>
                </div>
              </div>
            `
              )
              .join("")}
          </div>
          <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Anterior</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Próximo</span>
          </a>
        </div>
      </section>
    `;
    document.body.innerHTML = document.body.innerHTML.replace(
      "@special",
      specialSection
    );
  } else {
    document.body.innerHTML = document.body.innerHTML.replace("@special", "");
  }

  document.body.innerHTML = document.body.innerHTML.replace(
    "@cards",
    `
    <ul class="nav nav-tabs justify-content-between" id="myTab" role="tablist">
      ${data.groups
        .map(
          (group, index) => `
        <li class="nav-item flex-grow-1 text-center m-2">
          <a class="nav-link bg-white w-100${
            index === 0 ? " active" : ""
          }" id="${group}-tab" data-toggle="tab" href="#${group}" role="tab"
            aria-controls="${group}" aria-selected="true">${group}</a>
        </li>
      `
        )
        .join("")}
    </ul>
    <div class="tab-content p-2" id="myTabContent">
      ${data.groups
        .map(
          (group, index) => `
        <div class="tab-pane fade show${
          index === 0 ? " active" : ""
        }" id="${group}" role="tabpanel" aria-labelledby="${group}-tab">
          <div class="row">
            ${data.cards
              .filter((card) => card.group === index.toString())
              .map(
                (card) => `
              <div class="col-md-6 mb-4">
                <div class="card h-100">
                  <img src="https://via.placeholder.com/300" class="card-img-top img-fluid" alt="${
                    card.title
                  }">
                  <div class="card-body">
                    <h5 class="card-title">${card.title}</h5>
                    <p class="card-text">${card.description}</p>
                    <div class="d-flex flex-row justify-content-between align-baseline">
                      <h3 class="text-success fw-bold">R$ ${card.price.toFixed(
                        2
                      )}</h3>
                      <button id="${data.cards.indexOf(
                        card
                      )}" class="btn btn-primary _add"><i class="bi bi-cart-plus-fill h1"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `
  );

  document.body.innerHTML = document.body.innerHTML.replaceAll(
    "@whatsapp",
    data.info.whatsapp === ""
      ? ""
      : `
    <li>
      <i class="bi bi-whatsapp"></i>
      <strong>Whatsapp:</strong>
      <a id="whatsapp" href="https://wa.me/${data.info.whatsapp.replace(
        /[ ()+\-]/g,
        ""
      )}">${data.info.whatsapp}</a>
    </li>
  `
  );

  document.body.innerHTML = document.body.innerHTML.replaceAll(
    "@instagram",
    data.info.instagram === ""
      ? ""
      : `
    <li>
      <i class="bi bi-instagram"></i>
      <strong>Instagram:</strong>
      <a href="https://www.instagram.com/${data.info.instagram}">${data.info.instagram}</a>
    </li>
  `
  );

  document.body.innerHTML = document.body.innerHTML.replace(
    "@telephone",
    data.info.telephone
  );
  document.body.innerHTML = document.body.innerHTML.replace(
    "@address",
    data.info.address
  );

  document.getElementById("shooping-cart").onclick = () => {
    Swal.fire({
      title: "Pedidos",
      html: checkLocalStorage()
        ? `<div class="d-flex flex-column">
        <div class="d-flex w-100 flex-row" data-toggle="buttons">
          <label class="btn btn-light w-50 m-2 radioBTN" onclick="radioBTN(this)">
            <input type="radio" name="receive" id="local" class="d-none"> Retirar no local
          </label>
          <label class="btn btn-light w-50 m-2 radioBTN" onclick="radioBTN(this)">
            <input type="radio" name="receive" id="home" class="d-none"> Receber em casa
          </label>
        </div>
        ${Object.keys(localStorage)
          .map((key) =>
            key.includes("item")
              ? `
          <div class="shadow p-3 mb-5 bg-white rounded m-2 d-flex flex-column justify-content-start align-items-start">
            <h3>${data.cards[key.replace("item - ", "")].title}</h3>
            <span>${data.cards[key.replace("item - ", "")].description}</span>
            <div class="d-flex flex-row justify-content-between align-baseline w-100 flex-wrap">
              <h4 class="text-success fw-bold" id="${key}_price">R$ ${
                  data.cards[key.replace("item - ", "")].price.toFixed(2) *
                  JSON.parse(localStorage[key]).quantity
                }</h4>
              <input oninput="changeQuantity('${key}', this.value)" class="_quantity form-control w-25 p-0 text-right" placeholder="Quantidade" type="number" value="${
                  JSON.parse(localStorage[key]).quantity
                }" min="1">
            </div>
            <button id="${key}_remove" class="btn btn-danger _remove w-100">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        `
              : ""
          )
          .join("")} 
      </div>`
        : "<h3>Seu carrinho esta vazio</h3>",
      showCancelButton: checkLocalStorage(),
      showConfirmButton: checkLocalStorage(),
      timer: checkLocalStorage() ? null : 3000,
      reverseButtons: true,
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn btn-success m-2",
        cancelButton: "btn btn-danger m-2",
      },
      confirmButtonText: "Confirmar pedido",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const radio = [...document.getElementsByName("receive")];

        if (radio[0].checked) {
          confirmBuy("local");
        } else if (radio[1].checked) {
          confirmBuy("home");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Selecione uma forma de entrega",
          }).then(() => {
            document.getElementById("shooping-cart").click();
          });
        }
      }
    });

    document.querySelectorAll("._remove").forEach((element) => {
      element.onclick = () => {
        localStorage.removeItem(element.id.replace("_remove", ""));
        Swal.close();
        setTimeout(() => document.getElementById("shooping-cart").click(), 100);
      };
    });
  };

  document.querySelectorAll("._add").forEach((element) => {
    element.onclick = () =>
      localStorage.setItem(
        `item - ${element.id}`,
        JSON.stringify({ ...data.cards[element.id], quantity: 1 })
      );
  });

  $(".carousel").carousel();
})();

function radioBTN(element) {
  const buttons = [...document.getElementsByClassName("radioBTN")];

  buttons.forEach((button) => {
    button.classList.add("btn-light");
    button.classList.remove("btn-primary");
  });

  element.classList.remove("btn-light");
  element.classList.add("btn-primary");
}

function confirmBuy(receive) {
  if (receive === "home") {
    Swal.fire({
      title: "Endereço",
      html: `
        <input id="input_city" class="swal2-input w-50" placeholder="Cidade" required>
        <input id="input_neighborhood" class="swal2-input w-50" placeholder="Bairro" required>
        <input id="input_street" class="swal2-input w-50" placeholder="Rua" required>
        <input id="input_number" class="swal2-input w-50" placeholder="Nº" required>
        <input id="input_complement" class="swal2-input w-50" placeholder="Complemento">
      `,
      showCancelButton: true,
      showConfirmButton: true,
      reverseButtons: true,
    })
      .then((result) => {
        if (result.isConfirmed) {
          const city = document.getElementById("input_city").value;
          const neighborhood =
            document.getElementById("input_neighborhood").value;
          const street = document.getElementById("input_street").value;
          const number = document.getElementById("input_number").value;
          const complement = document.getElementById("input_complement").value;

          if (city && neighborhood && street && number) {
            whatsApp(`Olá, gostaria de fazer o pedido:
          Endereço: ${city}, ${neighborhood}, ${street}, Nº ${number}${
              complement ? `, complemento: ${complement}` : ""
            }

          Itens: ${Object.keys(localStorage)
            .map((key) =>
              key.includes("item")
                ? `${JSON.parse(localStorage[key]).quantity} ${
                    JSON.parse(localStorage[key]).title
                  },
                  `
                : ""
            )
            .join("")}`);
          }
        }
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Confirmado!",
          text: `Obrigado pelo seu pedido, estamos redirecionando vocÊ ao WhatsApp.`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  } else {
    Swal.fire({
      icon: "success",
      title: "Confirmado!",
      text: `Obrigado pelo seu pedido, em breve enviaremos.`,
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      whatsApp(`Olá, gostaria de fazer o pedido:
          Vou retirar no local

          Itens: ${Object.keys(localStorage)
            .map((key) =>
              key.includes("item")
                ? `${JSON.parse(localStorage[key]).quantity} ${
                    JSON.parse(localStorage[key]).title
                  },
                  `
                : ""
            )
            .join("")}`);
    });
  }
}

function whatsApp(text) {
  window.open(
    `${document.getElementById("whatsapp").href}?text=${encodeURIComponent(
      text
    )}`
  );
  localStorage.clear();
}

function checkLocalStorage() {
  return Object.keys(localStorage).some((key) => key.includes("item")) > 0;
}

function changeQuantity(item, amount) {
  localStorage.setItem(
    item,
    JSON.stringify({
      ...JSON.parse(localStorage.getItem(item)),
      quantity: amount,
    })
  );

  document.getElementById(`${item}_price`).textContent = `R$ ${
    JSON.parse(localStorage[item]).price.toFixed(2) *
    JSON.parse(localStorage[item]).quantity
  }`;
}
