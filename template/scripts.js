window.onload = function () {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            document.head.title.textContent = data.info.name;
            document.querySelector('meta[name="description"]').content = data.info.description;

            document.body.style.backgroundImage = `url("${data.info.background}")`;

            document.body.innerHTML = document.body.innerHTML.replaceAll("@name", data.info.name);
            document.body.innerHTML = document.body.innerHTML.replace("@description", data.info.description);

            if (data.special.itemsID.length > 0) {
                document.body.innerHTML = document.body.innerHTML.replace("@special", `
                <section id="menu" class="mt-5 animationRL">
                <h2 class="text-white">${data.special.title}</h2>
                <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        ${data.special.itemsID.map((item, index) => `
                            <div class="carousel-item${index === 0 ? ' active' : ''}">
                                <img src="https://via.placeholder.com/300" class="d-block w-100" alt="${data.cards[item].title}">
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>${data.cards[item].title}</h5>
                                    <p>${data.cards[item].description}</p>
                                    <h3 class="text-success fw-bold">R$ ${data.cards[item].price.toFixed(2)}</h3>
                                    <a href="#" class="btn btn-primary">Selecionar</a>
                                </div>
                            </div>
                        `).join('')}
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
                `);
            } else {
                document.body.innerHTML = document.body.innerHTML.replace("@special", "");
            }

            document.body.innerHTML = document.body.innerHTML.replace("@cards", `
            <ul class="nav nav-tabs justify-content-between" id="myTab" role="tablist">
                ${data.groups.map((group, index) => `
                    <li class="nav-item flex-grow-1 text-center m-2">
                        <a class="nav-link bg-white w-100${index === 0 ? ' active' : ''}" id="${group}-tab" data-toggle="tab" href="#${group}" role="tab"
                            aria-controls="${group}" aria-selected="true">${group}</a>
                    </li>
                `).join('')}
            </ul>

            <div class="tab-content p-2" id="myTabContent">
                ${data.groups.map((group, index) => `
                    <div class="tab-pane fade show${index === 0 ? ' active' : ''}" id="${group}" role="tabpanel" aria-labelledby="${group}-tab">
                        <div class="row">
                            ${data.cards.filter(card => card.group === index.toString()).map(card => `
                                <div class="col-md-6 mb-4">
                                    <div class="card h-100">
                                        <img src="https://via.placeholder.com/300" class="card-img-top img-fluid"
                                            alt="${card.title}">
                                        <div class="card-body">
                                            <h5 class="card-title">${card.title}</h5>
                                            <p class="card-text">${card.description}</p>
                                            <div class="d-flex flex-row justify-content-between align-baseline">
                                                <h3 class="text-success fw-bold">R$ ${card.price.toFixed(2)}</h3>
                                                <a href="#" class="btn btn-primary">Selecionar</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
            `);

            document.body.innerHTML = document.body.innerHTML.replace("@whatsapp", data.info.whatsapp === "" ? "" : `
            <li>
                <i class="bi bi-whatsapp"></i>
                <strong>Whatsapp:</strong>
                <a href="https://wa.me/${data.info.whatsapp.replace(/[ ()+\-]/g, "")}">${data.info.whatsapp}</a>
            </li>
            `);
            document.body.innerHTML = document.body.innerHTML.replace("@instagram", data.info.whatsapp === "" ? "" : `
            <li>
                <i class="bi bi-instagram"></i>
                <strong>Instagram:</strong>
                <a href="https://www.instagram.com/${data.info.instagram}">${data.info.instagram}</a>
            </li>
            `);

            document.body.innerHTML = document.body.innerHTML.replace("@telephone", data.info.telephone);
            document.body.innerHTML = document.body.innerHTML.replace("@address", data.info.address);

            document.getElementById("shooping-cart").onclick = () => {
                swal.fire({
                    title: "Carrinho de compras",
                    html: ``
                });
            };

            $(".carousel").carousel();
        });

    // form para endereço ou "retirar no local"
    // botao pra aumentar quantidade de itens e adicionar observação
};