<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="zh-TW">
      <head>
        <title>RSS 訂閱源 - <xsl:value-of select="rss/channel/title"/></title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f4f5f7; color: #333; max-width: 700px; margin: 40px auto; padding: 0 20px; }
          .notice { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; border-radius: 4px; margin-bottom: 30px; line-height: 1.6; }
          .card { background: #fff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); margin-bottom: 20px; }
          h1 { color: #1a1a1a; }
          .item-title { font-size: 1.2rem; margin: 0 0 10px 0; }
          .item-title a { color: #007acc; text-decoration: none; font-weight: bold; }
          .meta { font-size: 0.85rem; color: #666; margin-bottom: 10px; }
          .desc { font-size: 0.95rem; color: #444; line-height: 1.5; }
        </style>
      </head>
      <body>
        <h1><xsl:value-of select="rss/channel/title"/> 的 RSS 訂閱源</h1>
        <div class="notice">
          <strong>💡 站長提示：</strong> 這是一個 RSS 饋送源（Feed）。請複製瀏覽器地址欄的網址，然後粘貼到你的 <strong>RSS 閱讀器</strong>（如 NetNewsWire, Feedly, Inoreader）中即可訂閱本站更新。
        </div>
        <h2>近期文章</h2>
        <xsl:for-each select="rss/channel/item">
          <div class="card">
            <h3 class="item-title">
              <a href="{link}"><xsl:value-of select="title"/></a>
            </h3>
            <div class="meta">
              發布日期：<xsl:value-of select="pubDate"/> | 作者：<xsl:value-of select="author"/>
            </div>
            <div class="desc">
              <xsl:value-of select="description"/>
            </div>
          </div>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>