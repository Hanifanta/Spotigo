import Logo from './../../assets/images/Logo.png';
import Header1 from './../../assets/images/header1.png';
import Header2 from './../../assets/images/header2.jpg';

import './../components/app-bar.js';

const componentLoader = () => {

    const header = document.querySelector("header");
    const appBar = document.createElement("app-bar");
    appBar.setAttribute("src", Logo);
    header.append(appBar);

    const pictures = [Header1, Header2]
    const sections = document.querySelectorAll('.img-placeholder');

    for(let i=0; i<pictures.length; i++){
        const img = document.createElement("img");
        img.setAttribute("src", pictures[i]);
        img.classList.add("rounded-custom", "text-center", "my-4");
        sections[i].append(img);
    }
}

export default componentLoader;