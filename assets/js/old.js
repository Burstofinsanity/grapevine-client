function nextImage(direction){
    let gal_images = document.getElementsByClassName('gallery_image');
    let cur = document.querySelector('.gallery_image.cur');
    let cur_pos = [...gal_images].indexOf(cur);
    let pos = (direction == "left")?cur_pos + 1:cur_pos - 1;
   
    pos = (pos < 0)? gal_images.length - 1: pos;
    pos = (pos >= gal_images.length)? 0: pos;
    
    let posP1 = (pos - 1 < 0)?gal_images.length - 1:pos -1;
    let posP2 = (posP1 - 1 < 0)?gal_images.length - 1:posP1 -1;
    let posP3 = (posP2 - 1 < 0)?gal_images.length - 1:posP2 -1;
    let posN1 = (pos + 1 == gal_images.length)? 0 :pos +1;
    let posN2 = (posN1 + 1 == gal_images.length)? 0 :posN1 +1;
    let posN3 = (posN2 + 1 == gal_images.length)? 0 :posN2 +1;

    document.querySelector('.gallery_image.cur').classList.remove('cur');
    document.querySelector('.gallery_image.next').classList.remove('next');
    document.querySelector('.gallery_image.prev').classList.remove('prev');
    gal_images[pos].classList.add('cur');
    if(gal_images[pos].tagName == "VIDEO"){
        gal_images[pos].play();
        gal_images[pos].loop = true;
    }
    gal_images[posN1].classList.add('next');
    
    if(gal_images[posN1].tagName == "VIDEO"){
        gal_images[posN1].pause();
        gal_images[posN1].loop = false;
    }
    gal_images[posP1].classList.add('prev');

    if(gal_images[posP1].tagName == "VIDEO"){
        gal_images[posP1].pause();
        gal_images[posP1].loop = false;
    }

    if(document.querySelector('.gallery_image.next1')){
        document.querySelector('.gallery_image.next1').classList.remove('next1');
        gal_images[posN2].classList.add('next1');
    }
        
    if(document.querySelector('.gallery_image.next2')){
        document.querySelector('.gallery_image.next2').classList.remove('next2');
        gal_images[posN3].classList.add('next2');
    }
        
    if(document.querySelector('.gallery_image.prev1')){
        document.querySelector('.gallery_image.prev1').classList.remove('prev1');
        gal_images[posP2].classList.add('prev1');
    }
        
    if(document.querySelector('.gallery_image.prev2')){
        document.querySelector('.gallery_image.prev2').classList.remove('prev2');
        gal_images[posP3].classList.add('prev2');
    } 
    
}