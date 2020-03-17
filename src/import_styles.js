/**
 *  Import Modules install
 */
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


/**
 *  Import Css files
 */
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import './vendors/css/style.css';
import './vendors/css/materialdesignicons.min.css';
import './vendors/css/vendor.bundle.base.css';
import 'flatpickr/dist/themes/material_green.css' 




    function applyStylesMenuButton() {
            if($('#sidebar').css('top')==='70px'){
                if ($('#sidebar').hasClass("active")) {
                    $('#sidebar').css({'left':'','right':''})
                     $('#sidebar').removeClass("active")
                }else{
                    $('#sidebar').css({'left':0,'right':'auto'})
                    $('#sidebar').addClass("active")
                }
            }else{
                if ($('body').hasClass("sidebar-icon-only")) {
                        $('body').removeClass("sidebar-icon-only")
                }else{
                        $('body').addClass("sidebar-icon-only")
                }
            }                   
            
    }



    $(document).ready(()=> {
        $("#menu-click-button").click(function() {
            applyStylesMenuButton()
        });
        $("#menu-click-button-right").click(function() {
            applyStylesMenuButton()
        });
    })
 




