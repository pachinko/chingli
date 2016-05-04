
/**
* @version 1.0.1
* @package PWebFBLikeBox
* @copyright © 2012 Majestic Media sp. z o.o., All rights reserved. http://www.perfect-web.co
* @license GNU General Public Licence http://www.gnu.org/licenses/gpl-3.0.html
* @author Piotr Moćko
*
* Mootools 1.3.2+, 1.4.5+
*/
(function(a){pwebFBLikeBox=new Class({Implements:[Options],options:{prefix:"pwebfblikebox",open:"click",close:"click",position:"left",top:-1,layout:"box"},initialize:function(b){this.setOptions(b);this.hidden=true;this.fx=new Fx.Tween(this.options.prefix,{property:this.options.position});this.width=0-a(this.options.prefix).getSize().x;a(this.options.prefix).setStyle(this.options.position,this.width).inject($$("body")[0]);if(this.options.open==this.options.close){a(this.options.prefix).addEvent(this.options.open,function(d){d.stop();this.toggleBox()}.bind(this))}else{a(this.options.prefix).addEvent(this.options.open,function(d){d.stop();this.toggleBox(1)}.bind(this));a(this.options.prefix).addEvent(this.options.close,function(d){d.stop();this.toggleBox(0)}.bind(this))}if(this.options.layout=="slidebox"){if(this.options.top>=0){a(this.options.prefix).setStyle("top",this.options.top)}}else{if(this.options.layout=="sidebar"){var c=a(this.options.prefix).getComputedSize();a(this.options.prefix).setStyles({top:0,height:window.getHeight()-c.computedTop-c.computedBottom});if(this.options.top>=0){a(this.options.prefix).getFirst().setStyle("top",this.options.top)}}}},toggleBox:function(b){if(typeof b=="undefined"){b=-1}if((!this.hidden&&b==-1)||b==0){this.fx.start(this.width);this.hidden=true}else{if((this.hidden&&b==-1)||b==1){this.fx.start(0);this.hidden=false}}}})})(document.id);