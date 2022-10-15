class AppBar extends HTMLElement{
    
    connectedCallback(){
        this.src = this.getAttribute("src") || null;
        this.render();
    }

    render(){
        var elements = ``;
        if(this.src){
            elements += `<img src="${this.src}" alt="">`
        }else{
            elements += `<h1>Music App</h1>`;
        }

        this.innerHTML = `
        <style>
            nav{
                font-family: "Montserrat";
            }

            .navbar-brand img{
                width: 6%;
            }

            .bg-light{
                background-color: #6D8B74 !important;
            }

        </style>

        <nav class="navbar navbar-expand-md bg-light shadow navbar-light">
            <a href="#" class="navbar-brand text-left">${elements}</a>
        </nav>`
        
    }
}

customElements.define("app-bar", AppBar);