<template>
  <router-view />
</template>

<style>
html,body{
    height: 100%;
}
.clearfix::after {
  content: "";
  display: block;
  clear: both;
  visibility: hidden;
}

div {
  box-sizing: border-box;
}

body,
textarea {
  padding: 0;
  margin: 0;
  font-family: "宋体";
}
ul,
ol,
li {
  list-style: none;
}
a {
  text-decoration: none;
  display: block;
  color: #000;
}
img {
  border: 0;
}
</style>
