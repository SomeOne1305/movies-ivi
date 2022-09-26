// fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=35fa8784c15d0825d778234c487a5807&language=en-US&page=1`)
// .then(response => response.json())
// .then(data => top_rated(data.results))
// function top_rated(data){
//     data.forEach(item => {
//         let slide = document.createElement('div')
//         slide.className = "slide"
//         sliderItems.append(slide)
//         let slide_image = document.createElement('img')
//         slide_image.setAttribute('src', `https://image.tmdb.org/t/p/w500/${item.poster_path}`)
//         slide.append(slide_image)
//         let watch = document.createElement("span")
//         watch.innerHTML = "Смотреть"
//         slide.append(watch)
//     });
// }
let block = document.querySelector('.block')
fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=35fa8784c15d0825d778234c487a5807&language=en-US&page=1`)
.then(response => response.json())
.then(data => myFunc(data.results))
function myFunc(data){
    data.forEach((item, index) => {
        let a = document.createElement('a')
        a.className = "next-page"
        block.append(a)
        let card = document.createElement('div')
        card.className = "card"
        a.append(card)
        
        let image = document.createElement('div')
        image.className = 'image'
        card.append(image)
            let img = document.createElement('img')
            image.append(img)
            img.setAttribute('src', `https://image.tmdb.org/t/p/w500/${item.poster_path}`)
            let ForAge = document.createElement('span')
            ForAge.className = "ForAge"
            image.append(ForAge)
            if (item.adult == false) {
                ForAge.innerHTML = "16+"
            } else {
                ForAge.innerHTML = "12+"
            }
            let AllInfo = document.createElement('div')
                AllInfo.className = "All-Info"
                image.append(AllInfo)
            let top = document.createElement('div')
            top.className = "top"
            AllInfo.append(top)
            for (let i = 0; i < 4; i++) {
                let icon = document.createElement('div')
                icon.className = "icon"
                top.append(icon)
                let ico = document.createElement('i')
                ico.className = "fa-regular fa-bookmark"
                icon.setAttribute('data-title', 'Смотреть поже')
                icon.append(ico)

            }
            let about = document.createElement('div')
            about.className = "about"
            AllInfo.append(about)
            let popularity = document.createElement('h3')
            popularity.className = "popularity"
            about.append(popularity)

            if (item.vote_average == 6 | item.vote_average == 7 | item.vote_average == 8 | item.vote_average == 9 | item.vote_average == 5) {
                popularity.innerHTML = `${item.vote_average}.0`
            } else {
                popularity.innerHTML = item.vote_average
            }
            let lines = document.createElement('div')
            lines.className = "lines"
            popularity.append(lines)
            for (let i = 0; i < 3; i++) {
                let line = document.createElement('div')
                line.className = "line"
                lines.append(line)
                let clr = document.createElement('div')
                clr.className = "clr"
                line.append(clr)
            }
            let p = document.createElement('p')
            about.append(p)
            let year = document.createElement('span')
            year.className = 'year'
            year.innerHTML = item.release_date + ","
            p.append(year)
            let country = document.createElement('span')
            country.className = "country"
            if (item.original_language === "en") {
                country.innerHTML = "English"
            } else if(item.original_language === "ja"){
                country.innerHTML = "Japanese"
            }else if(item.original_language === "ru"){
                country.innerHTML = "Russian"
            }else if(item.original_language === "ko"){
                country.innerHTML = "Korean"
            }else if(item.original_language === "es"){
                country.innerHTML = "Spanish"
            }else{
                country.innerHTML = item.original_language
            }
            p.append(country)
            let genre  = document.createElement('span')
            genre.className = 'genre'
            p.append(genre)
        fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=35fa8784c15d0825d778234c487a5807&language=en-US')
        .then(response =>  response.json())
        .then(genres => setGenre(genres))
        function setGenre(genres){
            // genre.innerHTML = genres.genres[item.genre_ids[0]].name
            // console.log(item.genre_ids[0]);
            // console.log(genre.genres[item.genre_ids[0]]);
            // console.log(genre.);
            // console.log(genres.genres[index].name);
            // console.log(genres.genres[1].name);
            // console.log(ind[0].name);
            // console.log(genres.genres);
            // console.log(ind[0].name);
            // console.log(genres.genres);
            let ind = genres.genres.filter(e =>e.id == item.genre_ids[0])
            genre.innerHTML = `, ${ind[0].name}`
        }
        let info = document.createElement('div')
        info.className = 'info'
        card.append(info)
        let movieName = document.createElement('h3')
        movieName.className = "movieName"
        info.append(movieName)
        movieName.innerHTML = item.original_title
    });
}
let vote = document.querySelectorAll('.popularity')
let line = document.querySelectorAll('.line')
vote.forEach((item, index)=>{
    if (item.innerHTML = 7) {
        line[0].setAttribute('style', "--w: 0;")
        line[1].setAttribute('style', "--w: 1%;")
        line[2].setAttribute('style', "--w: 0;")
    } else {
        line[0].setAttribute("style", "--w:59%")
        line[1].setAttribute('style', "--w: 23%;")
        line[2].setAttribute('style', "--w: 31%;")
    }
})
// vote.forEach(item=>{
//     if () {
        
//     } else {
        
//     }
// })







// Slider
var slider = document.getElementById('slider'),
            sliderItems = document.getElementById('slides'),
            prev = document.getElementById('prev'),
            next = document.getElementById('next');

        function slide(wrapper, items, prev, next) {
            var posX1 = 0,
                posX2 = 0,
                posInitial,
                posFinal,
                threshold = 100,
                slides = items.getElementsByClassName('slide'),
                slidesLength = slides.length,
                slideSize = items.getElementsByClassName('slide')[0].offsetWidth,
                firstSlide = slides[0],
                lastSlide = slides[slidesLength - 1],
                cloneFirst = firstSlide.cloneNode(true),
                cloneLast = lastSlide.cloneNode(true),
                index = 0,
                allowShift = true;

            // Clone first and last slide
            items.appendChild(cloneFirst);
            items.insertBefore(cloneLast, firstSlide);
            wrapper.classList.add('loaded');

            // Mouse events
            items.onmousedown = dragStart;

            // Touch events
            items.addEventListener('touchstart', dragStart);
            items.addEventListener('touchend', dragEnd);
            items.addEventListener('touchmove', dragAction);

            // Click events
            prev.addEventListener('click', function () { shiftSlide(-1) });
            next.addEventListener('click', function () { shiftSlide(1) });

            // Transition events
            items.addEventListener('transitionend', checkIndex);

            function dragStart(e) {
                e = e || window.event;
                e.preventDefault();
                posInitial = items.offsetLeft;

                if (e.type == 'touchstart') {
                    posX1 = e.touches[0].clientX;
                } else {
                    posX1 = e.clientX;
                    document.onmouseup = dragEnd;
                    document.onmousemove = dragAction;
                }
            }

            function dragAction(e) {
                e = e || window.event;

                if (e.type == 'touchmove') {
                    posX2 = posX1 - e.touches[0].clientX;
                    posX1 = e.touches[0].clientX;
                } else {
                    posX2 = posX1 - e.clientX;
                    posX1 = e.clientX;
                }
                items.style.left = (items.offsetLeft - posX2) + "px";
            }

            function dragEnd(e) {
                posFinal = items.offsetLeft;
                if (posFinal - posInitial < -threshold) {
                    shiftSlide(1, 'drag');
                } else if (posFinal - posInitial > threshold) {
                    shiftSlide(-1, 'drag');
                } else {
                    items.style.left = (posInitial) + "px";
                }

                document.onmouseup = null;
                document.onmousemove = null;
            }

            function shiftSlide(dir, action) {
                items.classList.add('shifting');

                if (allowShift) {
                    if (!action) { posInitial = items.offsetLeft; }

                    if (dir == 1) {
                        items.style.left = (posInitial - slideSize) + "px";
                        index++;
                    } else if (dir == -1) {
                        items.style.left = (posInitial + slideSize) + "px";
                        index--;
                    }
                };

                allowShift = false;
            }

            function checkIndex() {
                items.classList.remove('shifting');

                if (index == -1) {
                    items.style.left = -(slidesLength * slideSize) + "px";
                    index = slidesLength - 1;
                }

                if (index == slidesLength) {
                    items.style.left = -(1 * slideSize) + "px";
                    index = 0;
                }

                allowShift = true;
            }
        }

        slide(slider, sliderItems, prev, next);


//Slide end



