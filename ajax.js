$(function(){
	var currentPage = 1; // 当前页
	var articlesPerPage = 15; // 每页文章数
	var totalArticles = 0; // 总文章数
	var totalPages = 1; // 总页数
	
	
	
	// 函数：获取文章数据
	function fetchArticles(page) {
		$.ajax({
			url: 'https://h5.sosho.cn/server/api/community/articles',
			method: 'GET',
			data: {
				com_id: 545,
				category_id: 1,
				per_page: articlesPerPage,
				page: page,
			},
			success: function(response) {
				var articles = response.data.items;
				totalArticles = response.data.counts;
				totalPages = Math.ceil(totalArticles / articlesPerPage);
				renderArticles(articles);
				renderPagination(page);
			},
			error: function() {
				alert('无法加载数据，请稍后重试');
			}
		});
	}
	
	// 函数：生成文章列表
	function renderArticles(articles) {
		$('#articleList_ul').empty();
		articles.forEach(function(article, index) {
			var li = $('<li></li>');
			//图片
			var img = $('<img>').attr('src', article.img_path || 'default.jpg').addClass('div_img').attr('alt', article.title);
			// 图片容器
			var content_img = $('<div></div>').addClass('img_path');
			// 将图片添加到图片容器
			content_img.append(img);
			
			// 更新时间
			var content_time = $('<span></span>').text(article.title).addClass('article_title');
			//标题
			var content_ti = $('<span></span>').text(article.update_at).addClass('update_at');
			// 文章标题容器
			var content_title = $('<span></span>').addClass('article_div_title');
			// 将文章标题内容添加到文章标题容器
			content_title.append(content_time,content_ti);
			
			// 文章简介
			var intro = $('<p></p>').text(article.intro || '暂无简介').addClass('intro');
			
			//数据容器
			var article_data = $('<span></span>').addClass('article_data');
			//作者
			var author = $('<span></span>').html('作者: ' + (article.author || '未知')).addClass('author');
			//点击数
			var hits_num = $('<span></span>').html('点击数: ' + (article.hits_num || 0)).addClass('hits_num');
			//评论数
			var comment_num = $('<span></span>').html('评论数: ' + (article.comment_num || 0)).addClass('comment_num');
			//转发数
			var share_num = $('<span></span>').html('转发数: ' + (article.share_num || 0)).addClass('share_num');
			// 将数据内容添加到数据容器
			article_data.append(author,hits_num,comment_num,share_num);
			
			// 文章内容容器
			var content = $('<div></div>').addClass('article_div');
			// 将标题、信息、简介添加到内容容器
			content.append(content_title,intro,article_data);
			
			// 将图片和内容容器添加到列表项
			li.append(content_img, content);
			
			// 添加动画效果：奇数项从左侧滑入，偶数项从右侧滑入
			if (index % 2 === 0) {
				li.addClass('slide-in-left');
			} else {
				li.addClass('slide-in-right');
			}
			// 将列表项添加到文章列表
			$('#articleList_ul').append(li);
	    });
	}
	
	// 函数：生成分页按钮
	function renderPagination(currentPage) {
		$('#page_ul').empty();
		
		// 上一页按钮
		var prevClass = currentPage === 1 ? 'disabled' : '';
		var prevLi = $('<li></li>').addClass(prevClass).text('上一页').data('page', currentPage - 1);
		$('#page_ul').append(prevLi);
		
		// 页码按钮
		for (var i = 1; i <= totalPages; i++) {
			var activeClass = currentPage === i ? 'active' : '';
			var pageLi = $('<li></li>').addClass(activeClass).text(i).data('page', i);
			$('#page_ul').append(pageLi);
		}
		
		// 下一页按钮
		var nextClass = currentPage === totalPages ? 'disabled' : '';
		var nextLi = $('<li></li>').addClass(nextClass).text('下一页').data('page', currentPage + 1);
		$('#page_ul').append(nextLi);
	}
	
	// 事件：分页按钮点击
	$('#page_ul').on('click', 'li', function() {
		var selectedPage = $(this).data('page');
		
		// 检查按钮是否可用
		if ($(this).hasClass('disabled') || $(this).hasClass('active')) {
			return;
		}
		// 更新当前页并重新获取文章
		currentPage = selectedPage;
		fetchArticles(currentPage);
	});
	// 初始加载第一页文章
	fetchArticles(currentPage);
});
			
var divleft=0
var flag1=true
var divtop=0
var flag2=true
var timer;
setTimer()
function clearTimer(){
	clearInterval(timer)
}
function setTimer(){
	timer=setInterval(function(){
		var div=document.getElementById("backTop")
		if(divleft+100>window.innerWidth||divleft<0){
			flag1=!flag1
		}
		if(flag1){
			divleft+=4
			div.style.left=divleft+"px"
		}
		else{
			divleft-=4
			div.style.left=divleft+"px"
		}
		if(divtop+100>window.innerHeight||divtop<0){
			flag2=!flag2
		}
		if(flag2){
			divtop+=4
			div.style.top=divtop+"px"
		}
		else{
			divtop-=4
			div.style.top=divtop+"px"
		}
	},100)
}

function back_top(){
	// 获取回到顶部元素
	const backTop = document.getElementById("backTop")
		backTop.addEventListener('click',function () {
			document.documentElement.scrollTop = 0
		})
}