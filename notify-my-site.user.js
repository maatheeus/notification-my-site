// ==UserScript==
// @name         Notification My Site
// @namespace    http://matheushenrique.dev/
// @version      1.0.2
// @description  Notification in Site
// @author       Matheus
// @updateURL    https://raw.githubusercontent.com/maatheeus/notification-my-site/main/notify-my-site.user.js
// @downloadURL  https://raw.githubusercontent.com/maatheeus/notification-my-site/main/notify-my-site.user.js
// @match        https://myhonda.my.site.com/leads/s/lead/Lead/Default
// @icon         https://www.google.com/s2/favicons?sz=64&domain=site.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let ultimonumero = null;

    function isLeadboxActive() {
        // Primeiro, seleciona o contêiner mais externo
        var containers = document.getElementsByClassName('cNavBarCon');

        // Verifica se encontrou o contêiner
        if (containers.length > 0) {
            // Dentre os contêineres encontrados, procura por um link que contenha o texto "LEADBOX"
            var links = containers[0].querySelectorAll('a');

            // Filtra para encontrar um link com "LEADBOX" que também está ativo
            for (var i = 0; i < links.length; i++) {
                if (links[i].textContent.includes('LEADBOX') && links[i].classList.contains('slds-is-active')) {
                    return true; // Encontrou o LEADBOX ativo
                }
            }
        }

        return false; // Se não encontrou
    }


    function verificarNumeroDeItens() {
        var audio = new Audio('https://proxy.notificationsounds.com/notification-sounds/so-proud-notification/download/file-sounds-1228-so-proud.mp3');

        // Acessa o elemento com a classe 'slds-text-body--small'
        const parentElement = document.querySelector('.slds-text-body--small');

        // Certifique-se de que o elemento foi encontrado
        if (!parentElement) {
            console.error('Elemento .slds-text-body--small não encontrado.');
            return;
        }

        // Dentro desse elemento, encontra o span com a classe 'countSortedByFilteredBy'
        const spanElement = parentElement.querySelector('.countSortedByFilteredBy');

        // Certifique-se de que o span com a classe especificada foi encontrado
        if (!spanElement) {
            console.error('Span .countSortedByFilteredBy não encontrado.');
            return;
        }

        // Obtém o conteúdo de texto desse elemento span
        const textContent = spanElement.textContent;

        // Usa uma expressão regular para encontrar o número no início do texto
        const resultado = textContent.match(/^\d+/);

        if (resultado) {
            // Converte o resultado para número
            const numero = parseInt(resultado[0], 10);
            if (ultimonumero != null && ultimonumero != numero){
                document.title = '('+numero+') Leads';
                audio.play();
            }

            if(numero == 0){
              $A.get('e.force:refreshView').fire();
              console.log("atualizou velho");
            }


            ultimonumero = numero;


        } else {
            console.log("Número não encontrado.");
        }
    }

    // Configura o intervalo para chamar a função verificarNumeroDeItens a cada 5 segundos
    setInterval(() => {
        if(isLeadboxActive()){
           verificarNumeroDeItens();
        }
    }
, 10000);
})();