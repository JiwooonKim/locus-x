$(function(){
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.matchMedia({
        // 1024px 이상
        "(min-width: 1024px)": function() {
            /** 
             * 마우스 스토커
             */ 
            function mouseFollower(e) {
                gsap.to('.cursor',0.3, {
                    css: {
                        left: e.clientX,
                        top: e.clientY
                    }
                })
            }
            $(window).on('mousemove', mouseFollower);

            /** 
             * 마우스커서 올리면 버튼 움직이는 애니메이션
             */ 
            function moveBtn(e) {
                x = (-($(this).width()/2) + e.offsetX) * 0.3
                y = (-($(this).width()/2) + e.offsetY) * 0.3
                gsap.to($(this), { x: x, y: y })
            }

            /** 
             *  헤더 메뉴 버튼
             * - 메뉴 아이콘에 마우스 온, 아이콘 좌표 이동
             */
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
            });
            
            $('.link-more').on('mousemove', moveBtn);
            $('.link-more').mouseleave(function(){
                gsap.to($(this), { x: 0, y: 0 })
            })

            $('.btn-scroll').on('mousemove', moveBtn);

            /**
             *  스크롤 시, 헤더 스타일 변경
            */
            $(window).scroll(function(){
                usrScroll = $(this).scrollTop();
                if ( usrScroll > 0 ) {
                    $('.header').addClass('on');
                } else {
                    $('.header').removeClass('on');
                }
            });

            /** 
             * 섹션별 커서 스타일
             */ 
            const mouseCursor = $('.cursor');
            $('.pointer-event').hover(function(){
                if ( $(this).hasClass('btn-scroll') ) {
                    mouseCursor.addClass('zoom-sm');
                } else if ( $(this).hasClass('link-more') ) {
                    mouseCursor.addClass('zoom');
                } else if ( $(this).hasClass('link-view') ) {
                    let parent = $(this).parents();
                    mouseCursor.addClass('view');

                    if ( parent.hasClass('sc-project') ) {
                        $('.cursor .pointer').text('View Project');
                    } else if (parent.hasClass('sc-news')) { 
                        $('.cursor .pointer').text('View News');
                    }
                } else if ( $(this).hasClass('link-gnb') ) {
                    mouseCursor.addClass('blend');
                }
            }, function(){
                if ( $(this).hasClass('btn-scroll') ) {
                    mouseCursor.removeClass('zoom-sm');
                } else if ( $(this).hasClass('link-more') ) {
                    mouseCursor.removeClass('zoom');
                } else if ( $(this).hasClass('link-view') ) {
                    $('.cursor .pointer').text('');
                    mouseCursor.removeClass('view');
                } else if ( $(this).hasClass('link-gnb') ) {
                    mouseCursor.removeClass('blend');
                }
            })

            /**
             * Select Project 가로 스크롤
            */ 
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
        },
        // 모든 화면
        "all": function() {
            /** 
             *  GNB 애니메이션
             */
            gsap.set('.gnb .overflow .link-gnb', { yPercent: -200 })
            gnbTl = gsap.timeline({ paused: true })
            gnbTl
            .set('.gnb',{'visibility':'visible'})
            .to('.gnb .gnb-bg', { delay: 0.3, height: '127%' })
            .to ('.gnb .widget-area', { opacity: 1 })
            .to('.overflow .link-gnb', { yPercent: 0 })

            /** 
             * 헤더 메뉴 버튼 클릭했을 때
             */ 
            $('.header .btn-menu').click(function(){
                $('.header').removeClass('on');
                $(this).toggleClass('on');
                $('body').toggleClass('removeScroll');  
                
                if ( $('.gnb').hasClass('on') ) {
                    gnbTl.reverse();
                    $('.gnb').removeClass('on');
                } else {
                    gnbTl.restart();
                    $('.gnb').addClass('on');
                }
            });
            
            // sc-visual 애니메이션
            gsap.to('.visual-oh .text', {
                y: 0,
                stagger: 0.4,
                delay: 0.5
            })

            gsap.to('.sc-visual .text-box', {
                scrollTrigger: {
                    trigger: '.sc-visual .text-box',
                    start: "0% 10%",
                    end: "100% 100%",
                    scrub: 3,
                },
                yPercent: -60,
            })

            /** 
             * (공통) 스크롤마다 텍스트 올라오는 애니메이션
             */ 
            textList = document.querySelectorAll('.overflow .text');
            textList.forEach(element => {
                gsap.to(element, {
                    scrollTrigger: {
                        trigger: element.parentElement.parentElement,
                        start: "0% 80%",
                    },
                    stagger:1,
                    y: 0
                })
            });

            /** 
             * (공통) img box 옆쪽에서 나타나는 애니메이션
             */ 
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

            /** 
             * 스크롤 시, SC-BRNAD 텍스트 빠르게 올라가는 애니메이션 
            */
            gsap.set('.sc-brand .inner', { yPercent: 80 })
            textBox = document.querySelectorAll('.sc-brand .inner');
            textBox.forEach(element => {
                gsap.to(element, {
                    scrollTrigger: {
                        trigger: element.parentElement,
                        start: "0% 100%",
                        scrub: 3,
                    },
                    yPercent: -40,
                })
            });

            /** 
             *  SC-INTRO 스크롤 시 이미지 움직이는 애니메이션
             */
            imgList = document.querySelectorAll('.sc-intro .img-area img');
            gsap.set('.sc-intro .img-area img', { scale: 1.2 })
            imgList.forEach(element => {
                xValue = element.dataset.x;
                gsap.to(element, {
                    scrollTrigger: {
                        trigger: element.parentElement,
                        start: "0% 80%",
                        scrub: 1,
                    },
                    x: xValue
                })
            });

            /** 
             * SC-NEWS 차례대로 올라오는 애니메이션
            */
            newsList = document.querySelectorAll('.news-item');
            gsap.set(newsList, { yPercent: 50, opacity: 0 })
            newsList.forEach(element => {
                gsap.to(element, {
                    scrollTrigger: {
                        trigger: element,
                        start: "-50% 80%",
                    },
                    yPercent: 0,
                    opacity: 1
                })
            });
        }
    });
});