---
title: ๐ฎGatsby SEO
date: 2020-04-08 00:04:31
category: react
thumbnail: './images/gatsby-seo.png'
draft: false
---


# SEO ์ง์ ํ์ธ
์ผ๋จ ๋ธ๋ก๊ทธ๋ ๊ฐ์คํ๋๋... SEO๊ฐ ์๋๊ณ  ์๋์ง ๊ตฌ๊ธ์  ์๋ ๊ฒ ๐๐ป `how to check seo ranking` ๊ฒ์์ ํด๋ณด์๋ค.

์ฌ๋ฌ ๊ด๊ณ ๋ค์ด ์์์ง๋ง 
[woorank](https://www.woorank.com/) ๋ผ๋ ์ฌ์ดํธ๊ฐ ๊ฐ์ฅ ๊ด์ฐฎ์ ๋ณด์๋ค.


![woorank](./images/woorank.png)

<br/><br/>
๊ทธ๋์ ๋ด ์น์ฌ์ดํธ๋ฅผ ๋ฃ์๋๋ 44์ ์ด ๋์๋ค;;
![woorank result](./images/woorank-result.gif)

๊ธฐ์กด์ ์ฃผ๋ก ์ฌ์ฉํ๋ naver ๋ธ๋ก๊ทธ์ ์ ์๋ฅผ ๋ด๋ณด๋ 64์ . ์๊ฐ๋ณด๋ค ์ ์๊ฐ ๋์ง ์์๋ค. (medium ๊ฐ์ ์ฌ์ดํธ๋ฅผ ๋ณด๋ฉด 82์  ์ ๋๋ก ๊ต์ฅํ ๋๋ค.) ์ด์ฉ์ง ๋ค์ด๋ฒ ๋ธ๋ก๊ทธ๊ฐ ๋ธ์ถ์ด ๋ง์ด ์๋๋ ๋๋์ ์ธ ๋๋์ด ๋ง์๋ค.


# SEO ์ง์๋ฅผ ๋์ฌ๋ณด์! ์ด๋ป๊ฒ? 
## step 1. ๋ฌธ์ ์  ํ์
์ฐ์ ์์ ์์ผ๋ก ์ ๋ฆฌ
* ์
  + Robots.txt๊ฐ ์๋ค
  + description (meta tag)๊ฐ ์์
  + OpenGraph protocol ์ค 'og:image'๊ฐ ์์ (๊ทธ๋์ ๋งํฌ๋ฅผ ๊ณต์ ํ๋ฉด ์ด๋ฏธ์ง๊ฐ ์๋ด์์)
  + Schema.org item์ด ์๋ค. (๐ค์ด๊ฒ ๋ญ์?)
  + sitemap.xml์ด ์์. (์๋ ๋ฌธ์  ํด๊ฒฐ 2๋ฒ๊น์ง ํ๋ค๋ณด๋๊น ๋์จ ์ด์)
* ์ค
  + analytics tool์ด ์์ (google analytics ๋ฌ๊บผ์)
  + favicon ๋ฐ์ ์๋จ (๋ถ๋ชํ ๐์๋ฐ์ผ๋ก ๋ฐ๊ฟจ๋๋ฐ ๊ฐ์ธ ๋น ๊ธฐ๋ณธ favicon์ด ๋ธ)
* ํ
  + Your headers are not properly set up to use HSTS. (๋ญ์๋ฆฐ์ง ๋ชจ๋ฆ)
  + Asset Cacheability (asset๋ค์ด ์บ์ฑ์๋๋ค๋ ๋ง ๊ฐ์)
  + Backlinks Score Bad (๋ผ๊ณ  ํ๋๋ฐ backlinks๊ฐ ๋ญ์ง ๋ชจ๋ฆ)
  + Traffic Estimations - very low (์ด๊ฑด ๋ด๊ฐ ์ด๋ป๊ฒ ํ  ์ ์๋ ๋ถ๋ถ์ด ์๋! ๊ทธ๋ฌ๋๊น ๋ด๊ฐ seo๋ฅผ ๊ฐ์ ํ๋ ค๊ณ  ํ์ง!)
  + Social profile ์ฐ๊ฒฐ (์ฐ๊ฒฐ ํ ์ง ์ํ ์ง ์๊ฐํด๋ณผ๊บผ์ง๋กฑ๐)

์ ์ด์  ํ๋์ฉ ํด๊ฒฐํด๋ณด์!

## step2. ๋ฌธ์ ์  ํด๊ฒฐ
1. Robots.txt ์ถ๊ฐ ([gatsby-plugin-robots-txt](https://www.gatsbyjs.org/packages/gatsby-plugin-robots-txt/) ์ฌ์ฉํด์ ์ถ๊ฐ ํจ)
2. description (meta tag) ์ถ๊ฐ
    + ์ด๊ฑฐ ๋ฐ์์ ์ํด ํด๋น [tutorial](https://www.gatsbyjs.org/tutorial/seo-and-social-sharing-cards-tutorial/) ์ ์ฐธ๊ณ ํ๋ค.
    + tutorial์์ ์์ ํ  ๋ด์ฉ๋ค๋ ๋ณด์ฌ์ [PR](https://github.com/gatsbyjs/gatsby/pull/22426) ๋ ์ฌ๋ ธ๋ค. ์ง๊ธ gatsby master๋ธ๋์น์์ link ์๋ฌ๊ฐ ๋ฐ์ํด์ ๋ด๊บผ๊น์ง ์ํฅ์ ๋ฏธ์ณค๋ค ๐
    + 1, 2๋ฒ ๊น์ง ์ ์ฉํ๊ณ  ๋ฐฐํฌํ๋๊น 50์  ๊น์ง ๋์์ก๋ค ใใ ์ค ์ ๊ธฐ~
  ![50์ ](./images/woorank-50.png)
    + ๊ทธ๋ฆฌ๊ณ  ์ถ๊ฐ์ ์ผ๋ก `sitemap.xml`์ด ์๋ค๋ ์๋ด๊ฐ ๋ด๋ค. ๊ธฐ์กด์ ์๋ด์๋๋ฐ;; ์๋ง ๋ญ๊ฐ์ ๊ฐ๋ ค์ ธ์ ์ด๊ฒ๊น์ง ํ๋จํ์ง ๋ชปํ๋๊ฒ ๊ฐ๋ค. ์ด๊ฒ์ ๋ค์ฏ๋ฒ์งธ์์ ํด๊ฒฐํด ์ฃผ๋๋ก ํ๊ฒ ๋ค.
  [sitemap-warning](./images/woorank-sitemap.png)
3. 'og:image' ์ถ๊ฐ
    + ์ด๋ ๊ฒ ๊ธฐ๋ณธ ์ด๋ฏธ์ง๋ฅผ ์ง์  ์ฟผ๋ฆฌํด์ค์ ๋ฃ์ด์คฌ๋ค. ๊ฒฝ๋ก๋ฅผ ์ง์  ๋ฃ์ด์ฃผ๋๊น ์๋ฅผ ๋ค๋ฉด `/images/forky.png` ์ด๋ฐ์.. ๋น๋๋ ๊ฒฝ๋ก์ ํด๋น ์ด๋ฏธ์ง๋ฅผ ๋ชป์ฐพ์์ ์ฟผ๋ฆฌํด์ ์ง์  ๋ฃ์ด์ค์ผํ๋ค. ์์ฝ.. ์ฝ์ง ๋๋ฌดํ๋ค์์ด ๐ฐ
  ```
  const { defaultImage } = useStaticQuery(
    graphql`
      query {
      defaultImage: file(relativePath: { eq: "forky.png" }) {
        childImageSharp {
          resize(width: 1200) {
            src
            height
            width
          }
        }
      }
    }`
  ```
    + ์ถ๊ฐ์ ์ผ๋ก og:url๋ ์ถ๊ฐํด์คฌ๋ค.
4. schema ์ถ๊ฐ ๐๐ปํฌ๊ธฐํฌ๊ธฐโ (์ด๋ถ๋ถ์ ์ด๋ป๊ฒ develop ํ  ์ ์๋์ง ์ฐพ์ง ๋ชปํด ํฌ๊ธฐํฉ๋๋ค~ update๊ฐ ์์ผ๋ฉด ์ถ๊ฐํ๋๋ก ํ๊ฒ ์ต๋๋ค.)
    + Gatsby๋ graphQL ์คํค๋ง๋ฅผ ์ด์ฐจํผ ์ฌ์ฉํ๊ธฐ ๋๋ฌธ์ ๋ฐ์ดํฐ์์ GraphQL ์คํค๋ง๋ฅผ ์๋์ผ๋ก ์ ์ถํ  ์ ์์. ์ด๊ฒ๊ณผ ๊ด๋ จ๋ ๊ฐ์ด๋๋ [Schema Customization](https://www.gatsbyjs.org/docs/schema-customization)๋ฅผ ์ฐธ๊ณ ํ๋ฉด ๋๋ค.
    + ๊ทธ๋ฌ๋ ์ฌ์ฉ์๊ฐ ๋ฐ์ดํฐ ํํ๋ฅผ ๋ช์ ์ ์ผ๋ก ์ ์ํ๊ฑฐ๋ ์ฌ์ฉ์ ์ ์ ๊ธฐ๋ฅ์ ์ฟผ๋ฆฌ ๊ณ์ธต์ ์ถ๊ฐํ๋ ค๋ ๊ฒฝ์ฐ [Schema Customization API](https://www.gatsbyjs.org/blog/2019-03-04-new-schema-customization/) ๋ฅผ ์ด์ฉํ๋ฉด๋๋ค. ์์ง ํ์คํธ ๋จ๊ณ์ธ๊ฒ ๊ฐ๋ค.
  
    + package.json์์ develop ์คํฌ๋ฆฝํธ๋ฅผ `"develop": "GATSBY_GRAPHQL_IDE=playground gatsby develop"` ์ด๋ ๊ฒ ์คํํ๋๋ก ๋ฐ๊พธ๋ฉด schema๋ฅผ ์ด๋ป๊ฒ ์๋์ผ๋ก ์ป์ด์ค๋์ง ๋ณผ ์ ์๋ค.
  ![gatsby playground schema](./images/graphql-playground.png)
    + ~~์์ฐ ๊ทธ๋ํํ์ ํ๊ฐ๋ ๋ชจ๋ฅด๊ฒ ๋ค...~~ ๐
    + update below at 2020-03-21 
    + [static folder ์๋์ ์ถ๊ฐ](https://www.gatsbyjs.org/docs/add-seo-component/#examples) ํ๋ผ๊ณ  ๋์์๋ ๋ฌธ์ ๋ฐ๊ฒฌ!
5. sitemap ์ถ๊ฐ
    + sitemap์ด๋? `detail all URLs on a website`. sitemap์ ํ์ผ์ธ๋ฐ xml ํ์ผ ์ผ ์๋ ์๊ณ (๋ณดํต) ๋ญ ์ฌ๋ฌ ํ์์ ํ์ผ ์ผ ์ ์๋ค. ๊ทธ๋ผ ์ด ํ์ผ์ด ์ด๋ค ์ ๋ณด๋ฅผ ๋ด๊ณ ์๋๋? ํ๋ฉด ๋ด ์น์ฌ์ดํธ์ ์๋ ๋ชจ๋  URL์ ๊ดํ ์ ๋ณด๋ฅผ ๋ด๊ณ ์๋ค. ๊ทธ๋์ ์น ํฌ๋กค๋ฌ๊ฐ ๋ด ์ฌ์ดํธ ์ ๋ณด๋ฅผ ํฌ๋กค๋งํ ๋ ์กฐ๊ธ ๋ ํธ๋ฆฌํ๊ฒ ๊ธ์ด๊ฐ ์ ์๊ฒํ๋ค. ๊ตฌ๊ธ sitemap ๊ด๋ จ ์ ๋ณด๋ฅผ ๋ณด๋ฉด ์ฌ์ค ๊ตฌ๊ธ๋ด์ด ์์์ ์ ๊ธ์ด๊ฐ์ง๋ง ๊ทธ๋ผ์๋ ๋ถ๊ตฌํ๊ณ  sitemap์ด ์์ผ๋ฉด ๋ ํจ๊ณผ์ ์ด๋ผ๊ณ  ํ๋ค.
    + gatsby์์๋ ์ ๊ณตํด์ฃผ๋ ํ๋ฌ๊ทธ์ธ[gatsby-plugin-sitemap](https://www.gatsbyjs.org/packages/gatsby-plugin-sitemap/)์ด ์์๋ค. ์ญ์ ํ๋ฌ๊ทธ์ธ ๋ถ์ ๊ฐ์ธ ๋นใใ ์ต๊ณ ๋ค์ต๊ณ  ์ฐพ์ผ๋ฉด ๋ค๋์จ๋ค.

6. Analytics ์ถ๊ฐ
    + [analytics ๊ด๋ จ ๋๊ตฌ๋ค](https://www.gatsbyjs.org/docs/adding-analytics/)์ ์ด๊ณณ์ ๋ง์ด ๋์์๋ค. ๋๋ ๋จผ์  google analytics ๋จผ์  ์ฐ๊ฒฐํ๋๋ก ํ๋ค.
    + [gatsby-plugin-google-analytics](https://www.gatsbyjs.org/packages/gatsby-plugin-google-analytics/) ์ค์นํ๊ณ  ๊ณ์  ์ฐ๊ฒฐ

## Result
  53์ ์ผ๋ก ์ต์ข ์ค์ฝ์ด ๋ง๋ฌด๋ฆฌ~!
  ![woorank](./images/woorank-final.png)
## ์ฐธ๊ณ ํ๋ฉด ์ข์ ์ฌ์ดํธ๋ค
* [Putting SEO First with Gatsby
](https://www.wesleylhandy.net/blog/seo-accessibility-first-gatsby.html)
* [Search Engine Optimization (SEO) and Social Sharing Cards with Gatsby
](https://www.gatsbyjs.org/tutorial/seo-and-social-sharing-cards-tutorial/)

