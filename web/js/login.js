let txtuser = document.querySelector(".txtuser");
let txtpass = document.querySelector(".txtpass");
let submit = document.querySelector(".submit");

if (window.localStorage) {
    localStorage.setItem("user", "admin");
    localStorage.setItem("pass", "admin");
    let user = localStorage.getItem("user");
    let pass = localStorage.getItem("pass");

    let message = document.querySelector(".message");

    submit.addEventListener("click", () => {
            if (user == txtuser.value && pass == txtpass.value) {
                location.href = "html/crearPlato.html";

                alert("Login Exitoso");

                message.innerHTML = "Login Exitoso";
            } else {

                alert("Usuario o Contraseña Incorrectos");


            }
        })
        // console.log("Soportado..")
} else {
    //   console.log("no Suportado ")
}