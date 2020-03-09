$(function(){
	var $slide = $('.slide_con')
	var $li = $('.slide li');
	var $len = $li.length;
	var $points = $('.points');

	//要运动过来的幻灯片的索引值
	var $nowli = 0;

	//要离开的幻灯片的索引值。
	var $prevli = 0;

	var $prev = $('.prev');
	var $next = $('.next');
	var $timer = null;
	var $ismove = false;

    //自动根据Li里面的img图片生成小圆点
	for(var i=0;i<$len;i++)
	{
		var $newli = $('<li>');
		if (i==0) 
		{
			$newli.addClass('active');
		}
		$newli.appendTo($points);
	}


	//小圆点切换幻灯片
	$li.not(':first').css({'left':760});
	var $point = $('.points li');
	$point.click(function(){
		$nowli = $(this).index();
		if ($nowli==$prevli) 
		{
			return;
		}
		$(this).addClass('active').siblings().removeClass('active');
		move();
	});


	//定时器自动播放。
	$timer = setInterval(autoplay,1000);
	$slide.mouseenter(function(){
		clearInterval($timer);
	});
	$slide.mouseleave(function(){
		$timer = setInterval(autoplay,1000);
	});
	function autoplay(){
		$nowli++;
		move();
		$point.eq($nowli).addClass('active').siblings().removeClass('active');
	};


	//左边的按钮
	$prev.click(function(){
		if ($ismove) 
		{
			return;
		}
		$ismove = true;
		$nowli--;
		move();
		$point.eq($nowli).addClass('active').siblings().removeClass('active');

	});
	//右边的按钮
	$next.click(function(){
		if ($ismove) 
		{
			return;
		}
		$ismove = true;
		$nowli++;
		move();
		$point.eq($nowli).addClass('active').siblings().removeClass('active');

	});
	function move(){
		//第一张幻灯片往左的时候
		if ($nowli<0) 
		{
			$nowli = $len-1;
			$prevli = 0;
			$li.eq($nowli).css({'left':-760});
			$li.eq($nowli).animate({'left':0});
			$li.eq($prevli).animate({'left':760},function(){
				$ismove = false;
			});
				
			$prevli = $nowli;
			return;
		}

		//最后一张幻灯片往右的时候
		if ($nowli>$len-1) 
		{
			$nowli = 0;
			$prevli = $len-1;
			$li.eq($nowli).css({'left':760});
			$li.eq($nowli).animate({'left':0});
			$li.eq($prevli).animate({'left':-760},function(){
				$ismove = false;
			});
			$prevli = $nowli;
			return;

		}




        //幻灯片从右边过来。
		if ($nowli>$prevli) 
		{
			$li.eq($nowli).css({'left':760});
			//$li.eq($nowli).animate({'left':0});
			$li.eq($prevli).animate({'left':-760});
			//$prevli = $nowli;
		}
		else
		{
			$li.eq($nowli).css({'left':-760});
			//$li.eq($nowli).animate({'left':0});
			$li.eq($prevli).animate({'left':760});
			//$prevli = $nowli;
		}
		$li.eq($nowli).animate({'left':0},function(){
			$ismove = false;
		});
		$prevli = $nowli;
	}
});