import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0%;
  }
  body, html{
    background: #121212;
    color: #FFFFFF;
    font-family: ClashDisplayRegular;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #4d4d4d;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: #1a1a1a;
    border-radius: 4px;
  }

  a, li {
    text-decoration: none;
    color: inherit;
    list-style-type: unset;

    &:hover{
      color: unset !important;
    }
  }
  img{
    max-width: 100%;
    min-height: 100%;
  }

  .red-text {
    color: #ff3939 !important;
  }
  .green-text {
    color: #43a047 !important;
  }
  .pe-40 {
    padding-right: 40px !important;
  }
  .layoutWrapper{
    display: flex;
    height: calc(100vh - 69px);
  }
  .sidebarWrapper{
    background: linear-gradient(0deg, rgba(199, 215, 248, 0.04) 0%, rgba(199, 215, 248, 0.04) 100%),#121212;
  }
  .mainWrapper{
    height: 100%;
    padding: 20px 42px ;
    width: calc(100% - 290px);
    overflow: auto;
  }

  #sideMenuBar{
    height: 100%;
  }

  .react-date-picker{
    width: 100%;
    border: none;
  }
.react-date-picker__wrapper{
  border: none !important;
}

.react-calendar{
  background: #1A1A1B !important;
  border-color: #232325f7 !important;
}

.react-calendar__month-view__weekdays{
  background: #1A1A1B !important;
    color: white;
}
//future dates diabled
.react-calendar__tile:disabled{
    background: #1A1A1B !important;
      color: gray;

}
//current date
.react-calendar__tile--now{
  color: white;
  background: #202224 !important;

}
//datepicker navigation
.react-calendar__navigation button:disabled{
color: #808080 !important;
background: #1A1A1B!important;

:hover{
  background-color:  #202224 !important;
}

/* .react-calendar__navigation button:hover{
background-color:  #202224 !important;
} */


}
//datepicker days name
.react-calendar__month-view__weekdays__weekday{
  color: white;
}

/* [type=button]:not(:disabled){
  color: gray;
} */

.react-calendar button{
  color: gray;
}

div:where(.swal2-container) button:where(.swal2-styled).swal2-confirm{
  color: white !important;
}
//active date class
.react-calendar__tile--active{
background: #202224 !important;
}
//individual date hover
.react-calendar__tile:enabled:hover, .react-calendar__tile:enabled:focus{
  background-color:  #202224 !important;
}
//month name hove
.react-calendar__navigation button:enabled:hover, .react-calendar__navigation button:enabled:focus{
    background-color:  transparent !important;
}
.react-date-picker__inputGroup__input {
outline: none !important;
}
.react-date-picker__button svg{
  stroke: gray;
}
.react-date-picker__button:enabled:hover .react-date-picker__button__icon{
  stroke: white !important;
}


//sweatalert custom classes
.custom-title-class {
  font-size: 20px; /* Adjust the font size as needed */
}

.swal2-icon{
  height:52px;
  width:52px;
  font-family: 'PlusJakartaSansRegular';
}


//stretegies
/* .iHWKSo:disabled{
  fill: white;
} */
/* .peVhS{
  background-color: transparent;
} */
/* .rdt_TableCol_Sortable{
  display: flex !important;
  justify-content: center !important;
} */
/* .rdt_TableCell{
  justify-content: center !important;
  align-items: center !important;
  min-width: auto !important;
} */
/* .rdt_TableCol{
  min-width: auto !important;
} */
/* .rdt_TableCell div:first-child{
  overflow: unset;
  text-wrap:wrap;
      text-overflow: unset;
} */


//input type number changes , signup screen
 input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }



.gsi-material-button {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -webkit-appearance: none;
  background-color: WHITE;
  background-image: none;
  border: 1px solid #747775;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #1f1f1f;
  cursor: pointer;
  font-family: 'Roboto', arial, sans-serif;
  font-size: 14px;
  height: 40px;
  letter-spacing: 0.25px;
  outline: none;
  overflow: hidden;
  padding: 0 12px;
  position: relative;
  text-align: center;
  -webkit-transition: background-color .218s, border-color .218s, box-shadow .218s;
  transition: background-color .218s, border-color .218s, box-shadow .218s;
  vertical-align: middle;
  white-space: nowrap;
  width: auto;
  max-width: 400px;
  min-width: min-content;
}

.gsi-material-button .gsi-material-button-icon {
  height: 20px;
  margin-right: 12px;
  min-width: 20px;
  width: 20px;
}

.gsi-material-button .gsi-material-button-content-wrapper {
  -webkit-align-items: center;
  align-items: center;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-flex-wrap: nowrap;
  flex-wrap: nowrap;
  height: 100%;
  justify-content: space-between;
  position: relative;
  width: 100%;
}

.gsi-material-button .gsi-material-button-contents {
  -webkit-flex-grow: 1;
  flex-grow: 1;
  font-family: 'Roboto', arial, sans-serif;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: top;
}

.gsi-material-button .gsi-material-button-state {
  -webkit-transition: opacity .218s;
  transition: opacity .218s;
  bottom: 0;
  left: 0;
  opacity: 0;
  position: absolute;
  right: 0;
  top: 0;
}

.gsi-material-button:disabled {
  cursor: default;
  background-color: #ffffff61;
  border-color: #1f1f1f1f;
}

.gsi-material-button:disabled .gsi-material-button-contents {
  opacity: 38%;
}

.gsi-material-button:disabled .gsi-material-button-icon {
  opacity: 38%;
}

.gsi-material-button:not(:disabled):active .gsi-material-button-state, 
.gsi-material-button:not(:disabled):focus .gsi-material-button-state {
  background-color: #303030;
  opacity: 12%;
}

.gsi-material-button:not(:disabled):hover {
  -webkit-box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15);
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15);
}

.gsi-material-button:not(:disabled):hover .gsi-material-button-state {
  background-color: #303030;
  opacity: 8%;
}

  @media(max-width: 990px){
    .mainWrapper{
      padding: 10px 22px;
      width: 100%;
    }
  
    #sideMenuBar{
      height: calc(100% - 69px);
      left: 0px;
      overflow-x: hidden;
      position: fixed;
      transition: all 0.5s ease 0s;
      width: 0;
      z-index: 999;
      background: linear-gradient(0deg, rgba(199, 215, 248, 0.04) 0%, rgba(199, 215, 248, 0.04) 100%), rgb(18, 18, 18);
    }
  }
  
  @media(min-width: 991px) and (max-width: 1199px){
    .mainWrapper{
      padding: 20px 16px;
    }
  }
  //@media (max-width: 1440px) {
  //  .mainWrapper{
  //    padding: 18px 38px ;
  //    width: calc(100% - 200px);
  //  }
  //}


//  @media (max-width: 768px) {
//    .mainWrapper{
//      padding: 16px 34px ;
//    width: 100%;
//  }
//}

  //@media (max-width: 480px) {
  //  
  //  .mainWrapper{
  //    padding: 10px 30px ;
  //    width: 100%;
  //    min-height: 85vh;
  //    //display: flex;
  //    //justify-content: center;
  //    //align-items: center;
  //  }
  //
  //  .layoutWrapper{
  //    min-height: 90vh;
  //  }
  //}


  // ----- Loading Svgs
  .profile-main-loader{
    position: absolute;
    top: 50%;
    bottom: 50%;
    left: 50%;
    right: 50%;
  }
  .profile-main-loader .loader {
    margin: 0px auto;
    width: 50px;
    height:50px;
  }
  .circular-loader {
    -webkit-animation: rotate 2s linear infinite;
    animation: rotate 2s linear infinite;
    height: 100%;
    -webkit-transform-origin: center center;
    -ms-transform-origin: center center;
    transform-origin: center center;
    width: 100%;
    margin: auto;
  }
  .loader-path {
    stroke-dasharray: 150,200;
    stroke-dashoffset: -10;
    -webkit-animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
    animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
    stroke-linecap: round;
     stroke: #202124
  }


  @-webkit-keyframes rotate {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes rotate {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes dash {
    0% {
      stroke-dasharray: 1,200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 89,200;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 89,200;
      stroke-dashoffset: -124;
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1,200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 89,200;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 89,200;
      stroke-dashoffset: -124;
    }
  }
  @-webkit-keyframes color {
    0% {
      stroke: #202124;
    }
    40% {
      stroke: #202124;
    }
    66% {
      stroke: #202124;
    }
    80%, 90% {
      stroke: #202124;
    }
  }
  @keyframes color {
    0% {
      stroke: #202124;
    }
    40% {
      stroke: #202124;
    }
    66% {
      stroke: #202124;
    }
    80%, 90% {
      stroke: #202124;
    }
  }
  // ----- Loading Svgs

  

`;

export default GlobalStyle;
