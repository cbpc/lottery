    $(function() {

        var lotList = [];
        var inited = false;
        var curIdx = 0;
        var settings = {
            max: 0,
            num: 0
        };

        function getSettings() {
            settings = {
                max: $('#max').val(),
                num: $('#num').val()
            };
            settings.num = Math.min(settings.max, settings.num);

            var reg = /^[0-9]*$/;

            if (!reg.test(settings.max) || !reg.test(settings.num)) {

                var $toast = $('#toast2');
                if ($toast.css('display') != 'none') return;
                $toast.fadeIn(100);
                setTimeout(function() {
                    $toast.fadeOut(100);
                }, 2000);

                return false;
            }
            return true;
        }

        function initList(start, end) {
            function randomsort(a, b) {
                return Math.random() > 0.5 ? -1 : 1;
            }

            function getRandomArr() {
                var arr = [];
                if (typeof end == 'undefined') {
                    end = start;
                    start = 0;
                }
                for (var i = start; i <= end; i++) {
                    arr.push(i);
                }
                return arr.sort(randomsort);
            }
            return getRandomArr();
        }

        function draw() {
            if (!getSettings()) {
                return false;
            }
            if (!inited) {
                lotList = initList(1, settings.max);
                inited = true;
            }

            var list = lotList.slice(curIdx, settings.num + curIdx).join('\t,\t');

            $('#list').append('<h3 class="weui_msg_title">' + list + '</p>');

            curIdx += settings.num;
            return true;
        }

        function handleLottery() {
            if (draw()) {
                var $toast = $('#toast');
                if ($toast.css('display') != 'none') return;
                $toast.fadeIn(100);
                setTimeout(function() {
                    $toast.fadeOut(100);
                }, 1000);
            }
        }

        $('#draw').on('click', function() {
            draw();
        });

        $('#reset').on('click', function() {
            lotList = [];
            inited = false;
            curIdx = 0;
            $('#list').fadeOut(500);
            setTimeout(function() {
                $('#list').html('').fadeIn(100);
            }, 600);
        });
    });