let galleries = new Array;
let images = new Array;
const sliderTime = 5000;
let slide_interval = null;
let slides = null;
let slide_count = 0;
let slide_time_data = null;
let slide_time_in = null;
let slide_out_time = 1000;
let slide_in_time = 1200;
let slide_transition = "all 0.4s";
let scroll_interval_dureation = 1000;
let scroll_interval_step = 200;
let scroll_step_size = 0;
let scroll_interval , slideTitle = null;
let scrolled = 0;
let scroll_to = 0;
let allow_scroll = true;
let saying = null;
let from = null;
let fromComp = null;
let prevTitle = null;
let nextTitle = null;
let productImg = null;
let logoImg = null;

let containsFiles = [];

document.addEventListener('keyup',function(e){
    if(document.getElementsByClassName('gallery_cover').length > 0)
        switch(e.code){ 
            case "ArrowRight":
                nextImage("right")
                break;
            case "ArrowLeft":
                nextImage("left")
                break;
            case "Escape":
                const gal = document.getElementById('gallies');
                closeGallery(gal)
                break;
        }
});


window.addEventListener('load',function(){
    init_buttons();
    setCurrent();
    var data = new Array;
    data['action'] = 'slides';
    request('/assets/php/data.php',data,'preloadSlides');
    data['action'] = 'gallery';
    request('/assets/php/data.php',data,'galleries_return');

    slideTitle = document.getElementsByClassName('slideTitle')[0]
    saying = document.getElementById('saying')
    from = document.getElementById('from')
    fromComp = document.getElementById('fromComp')
    prevTitle = document.getElementById('prevTitle')
    nextTitle = document.getElementById('nextTitle')
    productImg = document.getElementById('productImg')
    logoImg = document.getElementById('logoImg')
    //window.addEventListener('mousewheel',scrolling,{passive:false});
    sliderPlay();
})


function init_buttons(){
    var buttons = document.querySelectorAll('nav a');
    for(let button of buttons){
        if(button.href.includes('#'))
            button.addEventListener('click',linking);
    }
}


function scrolling (e){
    
    var hh = document.querySelector('header').getBoundingClientRect().height;
    var articles = document.querySelectorAll('article');
    var nearest = articles[0].offsetTop - hh;
    var t = 0;
    for(let article of articles){
        var bottom_pos = article.offsetTop + article.offsetHeight - hh;
        var near_offset = nearest -  window.pageYOffset - hh;
        var top_offset = article.offsetTop -  window.pageYOffset - hh;
        var bottom_offset = bottom_pos -  window.pageYOffset - hh;
        if((Math.abs(near_offset) > Math.abs(top_offset))||(Math.abs(near_offset) > Math.abs(bottom_offset))){
            if(Math.abs(near_offset) > Math.abs(top_offset))
                nearest = article.offsetTop;
            if(Math.abs(near_offset) > Math.abs(bottom_offset))
                nearest = bottom_pos;
            t = article;
        }
    }

    let y = [...articles].indexOf(t);


    if(articles[y].offsetTop + articles[y].offsetHeight +200 < window.scrollY + window.innerHeight  || articles[y].offsetTop > window.scrollY + 200){
        e.preventDefault();
        if(allow_scroll){
            allow_scroll = false;
            
            y = (e.deltaY >= 0)? y +1: y - 1;
        
            if(y >= 0 && y < articles.length)
            {
                scrollingTo(articles[y].offsetTop);
            }
            else{
                allow_scroll = true;
            }
                
        }
    }



}


function setCurrent(){
    
    var articles = document.querySelectorAll('article');
    var nearest = articles[0].offsetTop;
    for(let article of articles){
        var near_offset = window.pageYOffset - nearest;
        var top_offset = window.pageYOffset - article.offsetTop;
        var bottom_pos = article.offsetTop + article.offsetHeight;
        var bottom_offset = window.pageYOffset - bottom_pos;

        if((Math.abs(near_offset) > Math.abs(top_offset))||(Math.abs(near_offset) > Math.abs(bottom_offset)))
            nearest = article.offsetTop;
    }
    scrollingTo(nearest);
}

function linking(e){
    e.preventDefault();
    allow_scroll = false;
    var anchor = e .target.getAttribute('href');
    window.history.pushState('page','page',anchor);
    var target = document.querySelector(anchor);
    scrollingTo(target.offsetTop);
}

function scrollingTo(target){
    var hh = document.querySelector('header').getBoundingClientRect().height;
    scroll_to = target - hh;
    var dur  = scroll_interval_dureation / scroll_interval_step;
    var scroll_step_size = (scroll_to  - window.scrollY) / scroll_interval_step;
    scrolled = window.scrollY;
    clearInterval(scroll_interval);
    scroll_interval = setInterval(function(){
        if(Math.round(scrolled) == scroll_to || window.scrollY < 0){
            clearInterval(scroll_interval);
            allow_scroll = true;
            return 0;
        }
        scrolled += scroll_step_size;
        window.scrollTo(0,scrolled);
        
    },dur);
}

function preloadImages(){
    let keys = Object.keys(galleries);
    for(let key of keys){
        images[key]= [];
        for(let image of galleries[key]){ 
            let img = image.endsWith('mp4')?document.createElement('video'):new Image;
            img.src = image;
            images[key].push(img);
        }
    }
}


function preloadSlides(data){

    slides = data;  
    images['slides'] = new Array;  
    for(let slide of slides){
        var prod = new Image();
        var logo = new Image();
        prod.src = slide['product_img'];
        logo.src = slide['company_logo'];

        images['slides'].push(prod);
        images['slides'].push(logo);
    }
}


function viewGallery(e){
    let logo = e.querySelector('img').src;  
    let comp_logo = document.createElement('img');
    comp_logo.classList.add('comp_logo');
    comp_logo.src = logo; 
    let gal = document.createElement('div');
    gal.classList.add('gallery_cover');
    let next = document.createElement('i');
    next.classList.add('fa','fa-chevron-right','next_arrow');
    next.setAttribute('onclick','nextImage("left")');
    next.setAttribute('aria-hidden',true);
    let prev = document.createElement('i');
    prev.classList.add('fa','fa-chevron-left','prev_arrow');
    prev.setAttribute('onclick','nextImage("right")');
    prev.setAttribute('aria-hidden',true);
    let close = document.createElement('i');
    close.classList.add('closeGallery','far','fa-times-circle')
    close.setAttribute('aria-hidden',true);
    close.setAttribute('onclick','closeGallery(this)')
    gal.appendChild(close);
    let gallies = document.createElement('div');
    gallies.id = "gallies";
    let gall = e.getAttribute('value');
    let imgs = images[gall];

    if(imgs.length > 1){
        gal.appendChild(next);
        gal.appendChild(prev);
    }


    if(imgs.length == 0 ){
        let img = imgs[0];
        img.classList.add('cur');
        img.classList.add('gallery_image');
        gallies.appendChild(img);
    }
    else
    {
        let len = imgs.length;
        
        imgs[0].classList.add('cur');
        if(len > 1)imgs[1].classList.add('next');
        if(len > 2)imgs[2].classList.add(imgs.length>3?'next1':'prev');
        if(len > 3)imgs[3].classList.add('next2');
        if(len > 4)imgs[imgs.length - 1].classList.add('prev');
        if(len > 5)imgs[imgs.length - 2].classList.add('prev1');
        if(len > 6)imgs[imgs.length - 3].classList.add('prev2');
        
        for(let img of imgs){
            img.classList.add('gallery_image');
            gallies.appendChild(img);
        }
    }
    let body = document.getElementsByTagName('body')[0];
    gal.appendChild(comp_logo);
    gal.appendChild(gallies);
    body.appendChild(gal);
}


function nextImage(direction){
    let cur = document.querySelector('.gallery_image.cur');
    let next = getNext(cur);
    let prev = getPrev(cur);
    let next1 = getNext(next);
    let prev1 = getPrev(prev);
    let next2 = getNext(next1);
    let prev2 = getPrev(prev1);
if(cur.parentElement.childNodes.length > 2){
        cur.className = (direction == "right")?"gallery_image next":"gallery_image prev";
        next.className = (direction == "right")?"gallery_image next1":"gallery_image cur";
        if(cur.parentElement.childNodes.length > 2) next1.className = (direction == "right")?"gallery_image next2":"gallery_image next";
        if(cur.parentElement.childNodes.length > 3) prev.className = (direction == "right")?"gallery_image cur":"gallery_image prev1";
        if(cur.parentElement.childNodes.length > 4) prev1.className = (direction == "right")?"gallery_image prev":"gallery_image prev2";
        if(cur.parentElement.childNodes.length > 5) next2.className = (direction == "right")?"gallery_image":"gallery_image next1";
        if(cur.parentElement.childNodes.length > 6) prev2.className = (direction == "right")?"gallery_image prev1":"gallery_image ";
    }
    else
    {
        cur.parentElement.firstElementChild.className = (cur.parentElement.firstElementChild === cur)?"gallery_image prev":"gallery_image cur";
        cur.parentElement.lastElementChild.className = (cur.parentElement.firstElementChild === cur)?"gallery_image cur":"gallery_image next";
    }

    if(cur.tagName == 'VIDEO')cur.pause();
    if(next.tagName == 'VIDEO')
        if(direction == "left")
            {next.play();
             next.muted = true;
            }
            else
            {next.pause();}
    if(prev.tagName == 'VIDEO')
        if(direction == "right")
            {prev.play();
             prev.muted = true;
            }
            else
            {prev.pause();}

}

function getNext(el){
    return el.nextElementSibling !== null?el.nextElementSibling:el.parentElement.firstElementChild
}

function getPrev(el){
    return el.previousElementSibling !== null?el.previousElementSibling:el.parentElement.lastElementChild
}


function closeGallery(e){
    e.parentNode.remove();
}

function changeText(e){
    let target = e.getAttribute('target');
    let value = e.getAttribute('value');
    let tar = document.getElementById(target);
    tar.innerHTML = value;
    let o = e.parentNode.querySelector('.current')
    if(o != undefined)
        o.classList.remove('current');
    e.classList.add('current');
}

function request(url, data_source, response_loader = "formReturn", show_loader = false) {
    let data = new FormData();
    let keys = Object.keys(data_source);
    for (let key of keys) {
        let filed = containsFiles[data_source[key]];
        if (filed) {
            data.append(key, filed, filed.name);
        } else {
            data.append(key, data_source[key]);
        }
    }
    fetch(url, {method: 'POST', body: data})
        .then(res => res.json())
        .then(res => {
            if ('debug' in res) {
                console.log(res);
            }
            window[response_loader](res);
        })
        .catch(err => {
            console.error(err.type, err.message);
            snackbar('Server Error', false, 'error')
        });
}



function galleries_return(data){
      galleries = data;    
        preloadImages();
}


function contactForm(){
    let contact_cover = document.createElement('div');
    contact_cover.classList.add('popupCover');

    let preTitle = document.createElement('p');
    preTitle.innerHTML = 'Let’s connect';
    preTitle.classList.add('preTitle');

    let Title = document.createElement('h2');
    Title.innerHTML = "MORE ON SERVICES";

    let subtitle = document.createElement('p');
    subtitle.classList.add('subtitle');
    subtitle.innerHTML = "Do you want your life back? Please contact Grapevine to free your time, generate sales and fill your day with wonder.";

    let contact = document.createElement('p');
    contact.classList.add('contact');
    contact.innerHTML = "<a href='tel:011 656 5250'>011 656 5250</a><a href='mailto:info@grapevine.co.za'>info@grapevine.co.za</a>";
    
    let name = document.createElement('input');
    name.placeholder = 'Username';
    name.type = 'text';
    name.name = 'name';

    let email = document.createElement('input');
    email.placeholder = 'E-mail';
    email.type = 'email';
    email.name = 'email';

    let number = document.createElement('input');
    number.placeholder = 'Telephone Number';
    number.type = 'text';
    number.name = 'number';

    let message  = document.createElement('textarea');
    message.placeholder = 'Message';
    message.type = 'text';
    message.name = 'message';

    let submit = document.createElement('a');
    submit.innerHTML = 'SEND';
    submit.href = 'javascript:void(0)';
    submit.classList.add('submit');
    submit.setAttribute('onclick','sendMail(this)');

    let close = document.createElement('i');
    close.classList.add('fas','fa-times', 'close');
    close.setAttribute('onclick','closePopup(this)');

    let msg = document.createElement('h2');
    msg.className = "status";

    let form = document.createElement('form');
    form.appendChild(name);
    form.appendChild(email);
    form.appendChild(number);
    form.appendChild(message);
    form.appendChild(submit);
    form.appendChild(msg);

    let contact_inner = document.createElement('div');
    contact_inner.classList.add('innerPopup','contact');

    contact_inner.appendChild(close);
    contact_inner.appendChild(preTitle);
    contact_inner.appendChild(Title);
    contact_inner.appendChild(subtitle);
    contact_inner.appendChild(contact);
    contact_inner.appendChild(form);
    contact_cover.appendChild(contact_inner);

    document.getElementsByTagName('body')[0].appendChild(contact_cover);
}

function sendMail(e){
        let par = e.parentNode;
    let inputs = par.querySelectorAll('input , textarea');
    let data = new Array;
    for(let input of inputs){
        data[input.name] = input.value;

    }
    data['action'] = 'sendMail';
    let status = par.querySelector('.status');
    status.classList.add('sending');
    status.innerHTML = "Sending";
    request('/assets/php/data.php',data,'mailSent');
}

function mailSent(e){
    let status = document.querySelector('.sending');
    status.classList.remove('sending');
    let rep = e;
    if('code' in rep && rep['code'] == 'code:42'){
        status.innerHTML = "SENT";
        status.classList.add('sent');
    }
    else
    {
        status.innerHTML = "Message Failed, Please contact <a href='mailto:info@grapevine.co.za'>info@grapevine.co.za</a>";
        status.classList.add('failed');
    }
    console.log();
}

function closePopup(e){
    e.parentNode.parentNode.remove();
}

function play_togle(e){
    e.classList.toggle('fa-play-circle');
    e.classList.toggle('fa-pause-circle');
    e.classList.toggle('far');
    e.classList.toggle('fas');
    if(e.classList.contains('fa-pause-circle')){
        sliderPlay();
    }
    else{
        clearInterval(slide_interval);
    }
}

function sliderPlay(){
    slide_interval = setInterval(function(){
        slide("next");
    },sliderTime);
}

function slide(dir){
    dir = (dir == "next")?1:-1;
    slide_count += dir;
    slide_count = (slide_count < 0)? slides.length - 1: slide_count;
    slide_count = (slide_count > slides.length - 1)? 0: slide_count;

    slideTitle.style.opacity = 0;
    slideTitle.style.transform = "translateX("+(-50* dir)+"%)";

    saying.style.opacity = 0;
    saying.style.transform = "translateX("+(-50* dir)+"%)";

    from.style.opacity = 0;
    from.style.transform = "translateX("+(-50* dir)+"%)";

    fromComp.style.opacity = 0;
    fromComp.style.transform = "translateX("+(-50* dir)+"%)";

    prevTitle.style.opacity = 0;
    prevTitle.style.transform = "translateX("+(-50* dir)+"%)";

    nextTitle.style.opacity = 0;
    nextTitle.style.transform = "translateX("+(-50* dir)+"%)";

    productImg.style.opacity = 0;
    productImg.style.transform = "translate("+(-50+(-50* dir))+"%, -50%)";

    logoImg.style.opacity = 0;
    logoImg.style.transform = "translateX("+(-50+(-50* dir))+"%)";

    clearTimeout(slide_time_data);
    slide_time_data = setTimeout(function(){
        let prev_c = slide_count - 1;
        let next_c = slide_count + 1
        prev_c = (prev_c < 0)? slides.length - 1: prev_c;
        next_c = (next_c > slides.length - 1)? 0: next_c;
        info = slides[slide_count];
        slideTitle.innerHTML = info.comp_title;
        saying.innerHTML = info.paragraph;
        from.innerHTML = info.person;
        fromComp.innerHTML = info.person_info;
        prevTitle.innerHTML = slides[prev_c].comp_title;
        nextTitle.innerHTML = slides[next_c].comp_title;
        productImg.src = info.product_img;
        logoImg.src = info.company_logo;

        slideTitle.style.transition = "none";
        slideTitle.style.transform = "translateX("+(50* dir)+"%)";
        saying.style.transition = "none";
        saying.style.transform = "translateX("+(50* dir)+"%)";
        from.style.transition = "none";
        from.style.transform = "translateX("+(50* dir)+"%)";
        fromComp.style.transition = "none";
        fromComp.style.transform = "translateX("+(50* dir)+"%)";
        prevTitle.style.transition = "none";
        prevTitle.style.transform = "translateX("+(50* dir)+"%)";
        nextTitle.style.transition = "none";
        nextTitle.style.transform = "translateX("+(50* dir)+"%)";
        productImg.style.transition = "none";
        productImg.style.transform = "translate("+(-50+(50* dir))+"%, -50%)";
        logoImg.style.transition = "none";
        logoImg.style.transform = "translateX("+(-50+(50* dir))+"%)";
        clearTimeout(slide_time_in);
        slide_time_in = setTimeout(function(){
            slideTitle.style.transition = slide_transition;
            slideTitle.style.transform = "translateX(0%)";
            slideTitle.style.opacity = 1;
            saying.style.transition = slide_transition;
            saying.style.transform = "translateX(0%)";
            saying.style.opacity = 1;
            from.style.transition = slide_transition;
            from.style.transform = "translateX(0%)";
            from.style.opacity = 1;
            fromComp.style.transition = slide_transition;
            fromComp.style.transform = "translateX(0%)";
            fromComp.style.opacity = 1;
            prevTitle.style.transition = slide_transition;
            prevTitle.style.transform = "translateX(0%)";
            prevTitle.style.opacity = 1;
            nextTitle.style.transition = slide_transition;
            nextTitle.style.transform = "translateX(0%)";
            nextTitle.style.opacity = 1;
            productImg.style.transition = slide_transition;
            productImg.style.transform = "translate(-50%, -50%)";
            productImg.style.opacity = 1;
            logoImg.style.transition = slide_transition;
            logoImg.style.transform = "translateX(0%)";
            logoImg.style.opacity = 1;
            if(document.getElementsByClassName('slidePlayPause')[0].childNodes[0].classList.contains('fa-pause-circle')){
                clearInterval(slide_interval);
                sliderPlay();
            }
            
        },slide_time_in);
    },slide_out_time)
}



function snackbar(message, k, c) {
    k = (k != null) ? k : false;
    c = (c != null) ? c : false;
    let snackbar = document.getElementById("snackbar");
    snackbar = (snackbar != null) ? snackbar : document.createElement("div");
    snackbar.id = "snackbar";
    snackbar.innerHTML = message;
    snackbar.className = (k) ? c + " show "+k : c + " show";
    if (k)
        snackbar.setAttribute("onclick", "closeSnackbar()");
    document.documentElement.appendChild(snackbar);
    if (!k)
        setTimeout(function () {
            snackbar.remove();
        }, 4000);
}
