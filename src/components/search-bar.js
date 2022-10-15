class SearchBar extends HTMLElement{

    connectedCallback(){
        this.placeholder = this.getAttribute("placeholder") || null;
        this.width = this.getAttribute("width");
        this.color = this.getAttribute("color");
        this.aim = this.getAttribute("aim");
        this.render();
    }

    set clickEvent(e){
        this._clickEvent = e;
        this.render();
    }

    get value(){
        return this.querySelector(`#${this.aim}`).value;
    }

    hexConverter(color){
        const hexCode = color.split("#")[1];
        const hexRGB = hexCode.match(/.{1,2}/g);
        const [hexR, hexG, hexB] = hexRGB;
        const colorRGB = [
            parseInt(hexR, 16),
            parseInt(hexG, 16),
            parseInt(hexB, 16)
        ]

        return colorRGB;
    }

    render(){
        const [colorR, colorG, colorB] = this.hexConverter(this.color);

        this.innerHTML = `
        <style>
            .search-bar-width-${this.aim}{
                width: ${parseInt(this.width)-20}%;
            }

            .btn-custom-${this.aim}{
                background-color: rgb(${colorR}, ${colorG}, ${colorB});
                color: white;
            }
            
            .btn-custom-${this.aim}:hover{
                background-color: rgb(${colorR+30}, ${colorG+30}, ${colorB+30});
                cursor: pointer;
            }

            .btn-custom-${this.aim}:active{
                background-color: rgb(${colorR-30}, ${colorG-30}, ${colorB-30});
                cursor: pointer;
            }

            @media screen and (max-width: 800px){
                .search-bar-width-${this.aim}{
                    width: ${parseInt(this.width)}%;
                }
            }
        </style>

        <div class="input-group search-bar-width-${this.aim}">
            <input type="search" class="form-control" placeholder="${this.placeholder}" id="${this.aim}">
            <div class="input-group-append">
                <span class="input-group-text btn-custom-${this.aim}" id="button-${this.aim}"><i class="fa fa-search" aria-hidden="true"></i></span>
            </div>
        </div>
        `;

        this.querySelector(`#button-${this.aim}`).addEventListener("click", this._clickEvent);
    }
}

customElements.define("search-bar", SearchBar);