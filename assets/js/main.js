$(function(){
    // 마우스 스토커
    function mouseFollower(e) {
        gsap.to('.cursor',0.3, {
            css: {
                left: e.clientX,
                top: e.clientY
            }
        })
    }
    $(window).on('mousemove', mouseFollower);

    // 마우스커서 올리면 버튼 움직이는 모션
    function moveBtn(e) {
        x = (-($(this).width()/2) + e.offsetX) * 0.3
        y = (-($(this).width()/2) + e.offsetY) * 0.3
        gsap.to($(this), { x: x, y: y })
    }

    // 헤더 메뉴 버튼
    $('.header .btn-menu').on('mousemove', moveBtn);

    $('.btn-menu .icon-box').mousemove(function(e){
        const target = document.querySelector('.btn-menu .icon-box');
        let x = target.getBoundingClientRect().top;
        let y = target.getBoundingClientRect().left;

        $('.cursor').addClass('zoom-sm');
        gsap.to('.cursor', 0, {
            x: x,
            y: y,
            css: {
                transform: 'translate(0%, 0%)',
            },
        })
    })
    $('.menu-area').mouseleave(function(){
        gsap.to ('.btn-menu', {
            transform: 'translate(0%, 0%)'
        })
        $('.cursor').removeClass('zoom-sm');
        gsap.to('.cursor', {
            
        })
    });
    
    $('.link-more').on('mousemove', moveBtn);
    $('.link-more').mouseleave(function(){
        gsap.to($(this), { x: 0, y: 0 })
    })

    $('.btn-scroll').on('mousemove', moveBtn);

    // 섹션별 커서 스타일
    const $mouseCursor = document.querySelector('.cursor');
    $('.pointer-event').hover(function(){
        if ( $(this).hasClass('btn-scroll') ) {
            $mouseCursor.classList.add('zoom-sm');
        } else if ( $(this).hasClass('link-more') ) {
            $mouseCursor.classList.add('zoom');
        } else if ( $(this).hasClass('link-view') ) {
            let parent = $(this).parents();
            $mouseCursor.classList.add('view');

            if ( parent.hasClass('sc-project') ) {
                $('.cursor .pointer').text('View Project');
            } else if (parent.hasClass('sc-news')) { 
                $('.cursor .pointer').text('View News');
            }
        } else if ( $(this).hasClass('link-gnb') ) {
            $mouseCursor.classList.add('blend');
        }
    }, function(){
        if ( $(this).hasClass('btn-scroll') ) {
            $mouseCursor.classList.remove('zoom-sm');
        } else if ( $(this).hasClass('link-more') ) {
            $mouseCursor.classList.remove('zoom');
        } else if ( $(this).hasClass('link-view') ) {
            $('.cursor .pointer').text('');
            $mouseCursor.classList.remove('view');
        } else if ( $(this).hasClass('link-gnb') ) {
            $mouseCursor.classList.remove('blend');
        }
    })

    // 스크롤 시, 헤더 스타일 변경
    $(window).scroll(function(){
        usrScroll = $(this).scrollTop();
        if ( usrScroll > 0 ) {
            $('.header').addClass('on');
        } else {
            $('.header').removeClass('on');
        }
    })

    // GNB 모션
    gsap.set('.gnb .overflow .link-gnb', { yPercent: -100 })
    gnbMotion = gsap.timeline({ paused: true })
    gnbMotion
    .set('.gnb',{'visibility':'visible'})
    .to('.gnb .gnb-bg', { delay: 0.3, height: '127%'})
    .to ('.gnb .widget-area', { opacity: 1 })
    .to('.overflow .link-gnb', { yPercent: 0 })

    // 헤더 메뉴 버튼 클릭했을 때
    $('.header .btn-menu').click(function(){
        $('.header').removeClass('on');
        $(this).toggleClass('on');
        $('body').toggleClass('removeScroll');  
        
        if ( $('.gnb').hasClass('on') ) {
            gnbMotion.reverse();
            $('.gnb').removeClass('on');
        } else {
            gnbMotion.restart();
            $('.gnb').addClass('on');
        }
    });
    
    gsap.to('.visual-oh .text', {
        y: 0,
        stagger: 0.4,
        delay: 0.5
    })

    // (공통) 스크롤마다 텍스트 올라오는 모션
    textList = document.querySelectorAll('.overflow .text');
    textList.forEach(element => {
        gsap.to(element, {
            scrollTrigger: {
                trigger: element.parentElement,
                start: "0% 60%",
            },
            y: 0
        })
    });

    // (공통) img box 옆쪽에서 나타나는 모션
    imgBoxList = document.querySelectorAll('.img-area .bg');
    imgBoxList.forEach(element => {
        gsap.to(element, {
            scrollTrigger: {
                trigger: element.parentElement,
                start: "0% 60%",
            },
            width: '0%',
        })
    });

    // SC-INTRO 스크롤 시 이미지 움직이는 모션
    imgList = document.querySelectorAll('.sc-intro .img-area img');
    console.log(imgList)
    gsap.set('.sc-intro .img-area img', { scale: 1.3})
    imgList.forEach(element => {
        xValue = element.dataset.x;
        console.log(xValue);
        gsap.to(element, {
            scrollTrigger: {
                trigger: element.parentElement,
                start: "0% 60%",
                scrub: 2,
            },
            x: xValue
        })
    });

    // Select Project 가로 스크롤
    gsap.to('.group-list', {
        scrollTrigger: {
            trigger: '.sc-project',
            start: '0% 0%',
            end: '+=500%',
            pin: true,
            scrub: 3,
        },
        xPercent: -500
    })

    // lastest News 차례대로 올라오는 모션
    newsList = document.querySelectorAll('.news-item');
    console.log(newsList);
    newsList.forEach(element => {
        gsap.to(element, {
            scrollTrigger: {
                trigger: element
            },
            y: 0,
        })
    });
});