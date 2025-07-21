let ultimoProdutoSelecionado = null;

function abrirModal(produto) {
    const modal = document.getElementById("modal");
    modal.classList.add("ativo");
    ultimoProdutoSelecionado = produto;
    cupom.style.top = "150%"; 
    cupom.style.opacity = "100%";
}

function confirmarEscolha() {
    const inputMensagem = document.getElementById("comprador-mensagem");
    const mensagemCompleta = inputMensagem.value.trim();
    const nomeEnvio = "niverdoano";

    if (ultimoProdutoSelecionado) {
        ultimoProdutoSelecionado.disponivel = false;

        const dados = {
            name: nomeEnvio || "Sem mensagem",
            mensagem: `Produto: ${ultimoProdutoSelecionado.nome} <br> ${mensagemCompleta}`,
            time: new Date().toLocaleString("pt-BR")
        };

        const carregar = document.createElement("div");
        carregar.id = "tela-loading";
        carregar.style.position = "fixed";
        carregar.style.top = "0";
        carregar.style.left = "0";
        carregar.style.width = "100vw";
        carregar.style.height = "100vh";
        carregar.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; 
        carregar.style.display = "flex";
        carregar.style.justifyContent = "center";
        carregar.style.alignItems = "center";
        carregar.style.zIndex = "9999";

        const spinner = document.createElement("div");
        spinner.classList.add("spinner");

        carregar.appendChild(spinner);
        document.body.appendChild(carregar);

        const style = document.createElement("style");
        style.textContent = `
            .spinner {
                border: 8px solid #f3f3f3;
                border-top: 8px solid #2a81bbff;
                border-radius: 50%;
                width: 60px;
                height: 60px;
                animation: girar 1s linear infinite;
            }

            @keyframes girar {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        emailjs.send("GmailAcess", "template_um8ubln", dados)
            .then(response => {
                document.body.removeChild(carregar); 
                testes()            
                fecharModal();
                loadOptions(lista);
            })
            .catch(error => {
                console.error("❌ doe erro no envio: " . error);
                alert("Erro ao enviar o e-mail. Tente novamente.");
                document.body.removeChild(carregar); 
            });
    }
}

function fecharModal() {
    document.getElementById("modal").classList.remove("ativo");
}

function loadOptions(lista) {
    const container = document.querySelector("aside.conteiner");
    container.innerHTML = "";

    lista.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("opcoes");
        if (item.disponivel !== "(--disponivel--)"){
            div.classList.add("indisponivel");
        } 

        div.innerHTML = `
            <p>${item.nome}</p>
            <img src="${item.imagem}" alt="${item.nome}">
            <button class='fechar'>X</button>
            <b>${item.preco}</b>
            <button class="confirma" ${!item.disponivel ? "disabled" : ""}>Escolher</button>
        `;

        const btnFechar = div.querySelector(".fechar");

        btnFechar.addEventListener("click", (e) => {
            e.stopPropagation(); 
            div.classList.remove("open");
            btnFechar.style.visibility = "hidden";
        });

        div.addEventListener("click", function () {
            document.querySelectorAll(".opcoes.open").forEach(el => el.classList.remove("open")); // Fecha outros
            div.classList.add("open");
            btnFechar.style.visibility = "visible";
        });

        const botao = div.querySelector(".confirma");
        if (item.disponivel) {
            botao.addEventListener("click", () => abrirModal(item));
        }

        container.appendChild(div);
    });
}

window.onload = () => {
    loadOptions(lista);

    document.getElementById("btn-cancelar").addEventListener("click", fecharModal);
    document.getElementById("btn-confirmar").addEventListener("click", confirmarEscolha);

    document.getElementById("modal").addEventListener("click", (e) => {
        if (e.target === e.currentTarget) fecharModal();
    });
};


function testes() {
                 fecharModal();
                loadOptions(lista);
                const cupom = document.getElementById("cupom");

                cupom.innerHTML = `
                <button class='fecharCupon'>X</button>
                    <div class="cupom-conteudo">
                    <h3> Presente confirmado! 🎁</h3>
                    <p>Produto Escolhido: ${ultimoProdutoSelecionado.nome} </p>
                    <p><strong>Mensagem entregue!</strong><i>a</i></p>
                </div>
                `;
                
                const btnX = document.querySelector(".fecharCupon");
                btnX.addEventListener("click",function () {
                    cupom.style.top = "200%";                    
                })
                cupom.style.top = "20%";

                /*setTimeout(() => {
                    cupom.classList.add("animado");
                }, 100);*/
        }
