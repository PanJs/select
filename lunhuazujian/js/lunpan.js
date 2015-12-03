			$.fn.lunPan=function(opt){
				var $el = $(this),opt=opt;
				var str="";
				var setInit=opt.initVal;
				for(var i=0;i<opt.totalVal.length;i++){
					str+='<div>'+opt.totalVal[i]+'</div>'
				}
				var strDom='<div class="lunWrap"><div class="lunTop"><div class="lunReset">取消</div><div class="lunContent"></div><div class="lunSubmit">确定</div><div class="clear">	</div></div><div class="lunCenter"><div class="lunCenterContent">'+str+'</div><div class="active"></div></div></div>';
				$el.html(strDom);
				var tmpY=0,tmpMarginTop=0,offsetY=0;
				var initVal=$.inArray(opt.initVal,opt.totalVal);
				setData()
				$el.find('.lunCenterContent').css('margin-top',(2-initVal)*45+'px');
				$el.find('.lunCenterContent').find("div").on('touchstart',function(ev){
					ev.stopPropagation();
					ev.preventDefault();
					tmpY = ev.originalEvent.targetTouches[0].pageY;
                    tmpMarginTop = parseInt($(this).parent().css('margin-top'));
				})
				$el.find('.lunCenterContent').find("div").on('touchmove',function(ev){
					var leng=$(this).parent().find('div').length;
					ev.stopPropagation();
					ev.preventDefault();
					offsetY=ev.originalEvent.targetTouches[0].pageY-tmpY;
					if(parseInt($(this).parent().css('margin-top'))>=90){
						if(offsetY>0){
							return false;
						}
					}
					else if(parseInt($(this).parent().css('margin-top'))<=-(45*(leng-3))){
						if(offsetY<0){
							return false;
						}
					}
					$(this).parent().css('margin-top',tmpMarginTop+offsetY+'px');
				});
				$el.find('.lunCenterContent').find("div").on('touchend',function(ev){
					ev.stopPropagation();
					ev.preventDefault();
					var marginVal=Math.round(parseInt($(this).parent().css('margin-top'))/45)*45
					setInit=opt.totalVal[Math.abs(Math.round(parseInt($(this).parent().css('margin-top'))/45)-2)];
					$(this).parent().css('margin-top',marginVal+'px');
					offsetY=0;
					setData();
				});
				function setData(){
					opt.elem.text(setInit);
				}
				$el.find('.lunReset').on('touchstart',function(ev){
					ev.stopPropagation();
					ev.preventDefault();
					$('.lunWrap').hide();
				})
				$el.find('.lunSubmit').on('touchstart',function(ev){
					ev.stopPropagation();
					ev.preventDefault();
					$('.lunWrap').hide();
				})
			}