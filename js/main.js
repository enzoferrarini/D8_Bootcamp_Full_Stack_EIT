document.addEventListener("DOMContentLoaded",mostrarMensajeLoaded);
function mostrarMensajeLoaded() {
    console.log("Contenido del DOM cargado");       
    let btnAlternarCSS=document.getElementById("btnAlternarCSS");
    btnAlternarCSS.addEventListener("click",modificarEstilo);   
  
    let btnRestablecer=document.getElementById("btnRestablecer");
    btnRestablecer.addEventListener("click",resetForm);

    let btnAleatoriorCSS=document.getElementById("btnAleatoriorCSS");
    btnAleatoriorCSS.addEventListener("click",randomEstilo);

    let btnRecordarEstilo=document.getElementById("btnRecordarEstilo");
    btnRecordarEstilo.addEventListener("click",recordarEstilo);
    if(localStorage.getItem("estiloRecordado"))
        setearEstilo();     
    
    let idDropDownEstilo=document.getElementById("idDropDownEstilo");
    idDropDownEstilo.addEventListener("change",seleccionarEstilo);   
    
    let radioEstiloCollection=document.getElementsByClassName("radioEstilo");
    for (let index = 0; index < radioEstiloCollection.length; index++) {
        radioEstiloCollection[index].addEventListener("click",seleccionarEstiloRadioB);         
    }
}

function seleccionarEstiloRadioB(){
    let radioEstiloCollection=document.getElementsByClassName("radioEstilo");
    let valorChecked="";
    for (let index = 0; index < radioEstiloCollection.length; index++) {
        if(radioEstiloCollection[index].checked){
            valorChecked=radioEstiloCollection[index].value;
            break;
        }                       
    }
    let linkStyles=document.getElementsByClassName('estilo');
    let idDropDownEstilo=document.getElementById("idDropDownEstilo");
    idDropDownEstilo.value=valorChecked;
    for (let index = 0; index < linkStyles.length; index++) {     
        let aux=linkStyles[index].href.split('/');
        let styleName=aux[aux.length-1];   
        if(styleName==valorChecked)        
            linkStyles[index].disabled=false;
        else
            linkStyles[index].disabled=true;
    }

    let btnRecordarEstilo=document.getElementById("btnRecordarEstilo");
    if(btnRecordarEstilo.classList.contains(("btn-pulsado")))
    {
        localStorage.setItem("estiloRecordado", idDropDownEstilo.value);
    }    
}

function seleccionarEstilo(){
    let linkStyles=document.getElementsByClassName('estilo');
    let idDropDownEstilo=document.getElementById("idDropDownEstilo");
    for (let index = 0; index < linkStyles.length; index++) {     
        let aux=linkStyles[index].href.split('/');
        let styleName=aux[aux.length-1];   
        if(styleName==idDropDownEstilo.value)  
        {      
            linkStyles[index].disabled=false;
            setearRadioEstilo(linkStyles[index]);
        }
        else
            linkStyles[index].disabled=true;
    }
    
    let btnRecordarEstilo=document.getElementById("btnRecordarEstilo");
    if(btnRecordarEstilo.classList.contains(("btn-pulsado")))
    {
        localStorage.setItem("estiloRecordado", idDropDownEstilo.value);
    }
}

function setearEstilo(){
    btnRecordarEstilo.classList.add("btn-pulsado");
    let linkStyles=document.getElementsByClassName('estilo');
    let estiloDefinir=localStorage.getItem("estiloRecordado");
    for (let index = 0; index < linkStyles.length; index++) {
        let aux=linkStyles[index].href.split('/');
        let styleName=aux[aux.length-1];        
        if(styleName==estiloDefinir)    
        {    
            linkStyles[index].disabled=false;
            setearDdlSelectEstilo(linkStyles[index]);   
            setearRadioEstilo(linkStyles[index]);
        }
        else
            linkStyles[index].disabled=true;
    }
}

function recordarEstilo(){
    let btnRecordarEstilo=document.getElementById("btnRecordarEstilo");
    if(btnRecordarEstilo.classList.contains(("btn-pulsado")))
    {
        btnRecordarEstilo.classList.remove("btn-pulsado");
        localStorage.removeItem("estiloRecordado");
    }
    else
    {
        btnRecordarEstilo.classList.add("btn-pulsado");
        let linkStyles=document.getElementsByClassName('estilo');
        for (let index = 0; index < linkStyles.length; index++) {
            if(!linkStyles[index].disabled)
            {
                let aux=linkStyles[index].href.split('/');
                let styleName=aux[aux.length-1];
                localStorage.setItem("estiloRecordado", styleName);
                break;
            }
        }
    }
}

function randomEstilo(){
    let linkStyles=document.getElementsByClassName('estilo');
    for (let index = 0; index < linkStyles.length; index++) {
        linkStyles[index].disabled=true;
    }   
    let randomValue=Math.floor((Math.random() * 3));
    linkStyles[randomValue].disabled=false;
    setearDdlSelectEstilo(linkStyles[randomValue]);
    setearRadioEstilo(linkStyles[randomValue]);
    console.log(randomValue);
}

function modificarEstilo(){
    let bandera=false;
    let linkStyles=document.getElementsByClassName('estilo');
    for (let index = 0; index < linkStyles.length; index++) {
        if(!linkStyles[linkStyles.length-1].disabled)
        {
            linkStyles[linkStyles.length-1].disabled=true;
            linkStyles[0].disabled=false;
            bandera=true;
            setearDdlSelectEstilo(linkStyles[0]);
            setearRadioEstilo(linkStyles[0]);
        }
        else if (!linkStyles[index].disabled)
        {
            linkStyles[index].disabled=true;
            linkStyles[index+1].disabled=false;
            bandera=true;
            setearDdlSelectEstilo(linkStyles[index+1]);
            setearRadioEstilo(linkStyles[index+1]);
        }
        if(bandera)
            break;        
    }
}

function setearDdlSelectEstilo(linkStyle){
    let aux=linkStyle.href.split('/');
    let styleName=aux[aux.length-1];
    let idDropDownEstilo=document.getElementById("idDropDownEstilo");
    idDropDownEstilo.value=styleName;
}

function setearRadioEstilo(linkStyle){
    // alert();
    let aux=linkStyle.href.split('/');
    let styleName=aux[aux.length-1];
    let radioEstiloCollection=document.getElementsByClassName("radioEstilo");
    for (let index = 0; index < radioEstiloCollection.length; index++) {
        // alert(radioEstiloCollection[index].value+" 888  "+styleName);
        if(radioEstiloCollection[index].value==styleName)
            radioEstiloCollection[index].checked=true;
        else
            radioEstiloCollection[index].checked=false;                                         
    }
}

function resetForm(){    
    var inputCollection=document.getElementsByTagName("input");
    var textareaCollection=document.getElementsByTagName("textarea");
    var idNacionalidad=document.getElementById("idNacionalidad");
    var idRN=document.getElementById("idRN");
       
    for (let index = 0; index < inputCollection.length; index++) {
        switch (inputCollection[index].type) {
            case "text":
            case "email":
                inputCollection[index].value="";    
                break;
            case "radio":
                inputCollection[index].checked=false;   
                break;
            case "checkbox":
                inputCollection[index].checked=false;  
                break;
        }      
    }

    for (let index = 0; index < textareaCollection.length; index++) {
        textareaCollection[index].value="";        
    }
    idRN.checked=true;
    idNacionalidad.value="none";
    alert("Formulario Reseteado...")
}



