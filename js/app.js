document.addEventListener('DOMContentLoaded', function(){
    
    const email = {
        email: "",
        asunto: "",
        mensaje: ""
    }
    
    //Select interface elements
    const inputEmail = document.querySelector('#email');
    const inputEmailCC = document.querySelector('#emailCC');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector("#spinner");

    //Assign the events
    inputEmail.addEventListener('input', validar);
    inputEmailCC.addEventListener('input', validarEmailCC);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function(e){
        e.preventDefault();
       resetFormulario();
    })

    function enviarEmail(e){
        e.preventDefault();
        
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(()=>{
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');
            resetFormulario();

            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'rounded-lg', 'text-center', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            
            alertaExito.textContent = 'Mensaje enviado correctamente'
            formulario.appendChild(alertaExito);

            setTimeout( ()=>{
                alertaExito.remove()
            }, 3000 )

        }, 3000)



    }

    function validar(e){

        
        
        if(e.target.value.trim() === ''){
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
             email[e.target.id] ='';
            comprobarEmail();
            return;
        }

        if( (e.target.id === 'email') && !validarEmail(e.target.value)){
            
            mostrarAlerta("El email NO es valido", e.target.parentElement);
            email[e.target.id] ='';
            comprobarEmail();
            return;
        } 
        
        limpiarAlerta(e.target.parentElement);

        //asignar valores
        email[e.target.id] = e.target.value.trim().toLowerCase();

        comprobarEmail();

    }

    function mostrarAlerta(mensaje, referencia){

        limpiarAlerta(referencia);
        // Show HTML alert
        const error = document.createElement('P');
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
        error.textContent = mensaje;
        // Inyectar error al formulario
        referencia.appendChild(error)
    }

    function limpiarAlerta(referencia){
        //Comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta){
            alerta.remove();
        }
    }

    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);        
        return resultado;
    }

    function validarEmailCC(e){

        email[e.target.id] = e.target.value.trim().toLowerCase();
        if(!validarEmail(e.target.value)){
            if(email.emailCC===''){
                delete email.emailCC;
                limpiarAlerta(e.target.parentElement)
                comprobarEmail();
                return;
            }
            mostrarAlerta('Email CC no valido', e.target.parentElement)
            email[e.target.id] ='';
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        //asignar valores
        email[e.target.id] = e.target.value.trim().toLowerCase();

        comprobarEmail();

    }

    function comprobarEmail(){
        console.log(email);
        if( Object.values(email).includes('') ){
                btnSubmit.classList.add('opacity-50');
                btnSubmit.disabled = true;
        }else{
                btnSubmit.classList.remove('opacity-50');
                btnSubmit.disabled = false;
        }
    }

    function resetFormulario(){
         //reiniciar objeto
        formulario.reset();
        email.email = '';
        email.asunto = '';
        email.mensaje = '';
        email.emailCC = '';
        comprobarEmail();
    }


});