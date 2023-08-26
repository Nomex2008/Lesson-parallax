"use strict"

window.onload = function () {
    const parallax = document.querySelector('.parallax')

    if(parallax){
        const content = document.querySelector('.content')
        const clouds = document.querySelector('.images-parallax_clouds')
        const mountins = document.querySelector('.images-parallax_mountins')
        const humen = document.querySelector('.images-parallax_humen')
    
        //cof
        const forClouds = 40;
        const forMountins = 20;
        const forHumen = 10;

        //animate
        const speed = 0.05

        //let
        let positionX = 0, positionY = 0;
        let coordXprocent = 0, coordYprocent = 0;

        function setMouseParasllaxStyle() {
            const distX = coordXprocent - positionX
            const distY = coordYprocent - positionY

            positionX = positionX + (distX * speed)
            positionY = positionY + (distY * speed)

            clouds.style.cssText  = `transform: translate(${positionX/forClouds}%,${positionY/forClouds}%)`
            mountins.style.cssText  = `transform: translate(${positionX/forMountins}%,${positionY/forMountins}%)`
            humen.style.cssText  = `transform: translate(${positionX/forHumen}%,${positionY/forHumen}%)`
        
            requestAnimationFrame(setMouseParasllaxStyle);
        }
        setMouseParasllaxStyle()

        parallax.addEventListener('mousemove', function(e){
            const parallaxWidth = parallax.offsetWidth;
            const parallaxHeight = parallax.offsetHeight;

            const coordX = e.pageX - parallaxWidth / 2;
            const coordY = e.pageY - parallaxHeight / 2;

            coordXprocent = coordX / parallaxWidth * 100
            coordYprocent = coordY / parallaxHeight * 100
        })

        //parallax for scroll

        let thresholdSets = [];
        for (let i = 0; i <= 1.0; i+= 0.005) {
            thresholdSets.push(i)
        }


        const callback = function () {
            const scrollTopProcent = window.pageYOffset / parallax.offsetHeight * 100;
            setParallaxItemsStyle(scrollTopProcent)
        }

        const observer = new IntersectionObserver(callback, {
            threshold: thresholdSets
        })
        

        observer.observe(document.querySelector('.content'))

        function setParallaxItemsStyle(scrollTopProcent) {
            content.style.cssText = `transform: translate(0%,-${scrollTopProcent/9}%)`
            mountins.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent/6}%)`
            humen.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent/3}%)`
        }
    }
}