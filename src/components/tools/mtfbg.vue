<template>
  <div class="mtf-background">
    <div class="color-bar bar-1"></div>
    <div class="color-bar bar-2"></div>
    <div class="color-bar bar-3"></div>
    <div class="color-bar bar-4"></div>
    <div class="color-bar bar-5"></div>
  </div>
</template>


<style scoped>

.mtf-background {

    position:fixed;

    inset:0;

    width:100%;
    height:100vh;

    pointer-events:none;

    z-index:0;

}


/* Trans flag vertical curtain */

.color-bar {

    position:absolute;

    top:0;

    width:20%;

    height:100%;


    transform:

        translateY(-110%);


    animation:

        slideDown

        1.5s

        cubic-bezier(.65,0,.35,1)

        forwards;


    opacity:1;


}


/* colors */

.bar-1 {

    left:0;

    background:#5bcffa;

    animation-delay:.1s;

}



.bar-2 {

    left:20%;

    background:#f5a9b8;

    animation-delay:.2s;

}



.bar-3 {

    left:40%;

    background:white;

    animation-delay:.3s;

}



.bar-4 {

    left:60%;

    background:#f5a9b8;

    animation-delay:.4s;

}



.bar-5 {

    left:80%;

    background:#5bcffa;

    animation-delay:.5s;

}



@keyframes slideDown {


from {

    transform:

      translateY(-110%);

}



to {

    transform:

      translateY(0);

}


}


/* fade after intro */


.mtf-background::after {

    content:"";

    position:absolute;

    inset:0;


    background:

      linear-gradient(

        180deg,

        rgba(8,9,13,.1),

        rgba(8,9,13,.85)

      );


}



</style>