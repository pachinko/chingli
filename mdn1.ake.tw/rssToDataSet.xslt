<?xml version="1.0" encoding="utf-8" ?>
<xsl:transform version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="xml" omit-xml-declaration="yes"/>
  <xsl:template match="/">
    <xsl:for-each select="rss">
      <xsl:for-each select="channel">
        <rssItems>
          <xsl:for-each select="item">
            <item>
              <pubDate>
                <xsl:value-of select="pubDate"/>
              </pubDate>
              <title>
                <xsl:value-of select="title"/>
              </title>
              <link>
                <xsl:value-of select="link"/>
              </link>
              <description>
                <xsl:value-of select="description"/>
              </description>
              <guid>
                <xsl:value-of select="guid"/>
              </guid>
            </item>
          </xsl:for-each>
        </rssItems>
      </xsl:for-each>
    </xsl:for-each>
  </xsl:template>
</xsl:transform>
