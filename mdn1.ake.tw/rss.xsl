<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xsl:version="2.0"
      xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:fn="http://www.w3.org/2005/xpath-functions">
<xsl:template match="/">
<html>
  <head>
    <title><xsl:value-of select="rss/channel/title"/></title>
    <style type="text/css">

     #explanation {
     background-color: #FFFFC6;
     color: #000000;
     border: solid 1px #C6C6C6;
     font-size: 0.8em;
     padding: 16px;
     margin-bottom: 30px;
     }
     .article
     {
     margin:10x 0px 0px 0px;
     }
     img {border:none;}
     .feedPubDate
     {
     font-size: 0.7em;
     color: #828282;
     }
     a
     {
       text-decoration:none;
     }
     a:hover
     {
       text-decoration:underline;
     }
     b
     {
       color:red;
     }
    </style>
  </head>
  <body>
    <div id="explanation">
      <a  style="color:blue; font-size: 1.8em">
       <xsl:attribute name="href">
        <xsl:value-of select="rss/channel/link"/>
       </xsl:attribute>
<xsl:value-of select="rss/channel/title"/></a><br/>
      <p>您正在閱讀經常更新內容的<b>新聞</b>。當您訂閱摘要時，它將被新增到一般摘要清單。來自摘要的更新資訊會自動下載到您的電腦，可以用 rss 閱讀程式閱讀。<a href="http://zh.wikipedia.org/zh-hant/RSS">
       深入了解RSS。
      </a><br/><br/>
       <img src="images/Subscribe_feed.gif"/>訂閱此摘要<br/>
       <a class="rss_link" target="_blank">
        <xsl:attribute name="href">
         http://tw.my.yahoo.com/rss?url=<xsl:value-of select="rss/channel/docs"/>
        </xsl:attribute>
        <img src="images/rss_icons_yahoo.gif"/>
       </a>
      <a class="rss_link" target="_blank">
       <xsl:attribute name="href">
        http://my.msn.com/addtomymsn.armx?id=rss&amp;ut=<xsl:value-of select="rss/channel/docs"/>
       </xsl:attribute>
        <img src="images/mymsn.gif"/>
       </a>
      <a class="rss_link" target="_blank">
       <xsl:attribute name="href">
        http://fusion.google.com/add?source=atgs&amp;feedurl=<xsl:value-of select="rss/channel/docs"/>
       </xsl:attribute>
        <img src="images/google_reader.gif"/>
       </a>
     </p>
    </div>
    <div id="content">
      <xsl:for-each select="rss/channel/item">
      <div class="article"><table><tr><td><span class="feedPubDate"><xsl:value-of select="tag"  disable-output-escaping="yes"/></span>
      </td><td align="left" style="text-align: left;">
       <a href="{link}" rel="bookmark" target="_blank" style="color:blue;">
       	 <xsl:value-of select="title"/>
    </a><br/>
        <span><xsl:value-of select="description"  disable-output-escaping="yes"/></span></td><td>
       <span class="feedPubDate">
        <xsl:value-of select="twDate"/>
       </span></td></tr></table>
      </div>
      </xsl:for-each>
    </div>
  </body>
</html>
</xsl:template>
</xsl:stylesheet>