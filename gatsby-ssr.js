const React = require("react")
exports.onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  setHeadComponents(
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2442604587832508"
     crossorigin="anonymous" />
  )
}