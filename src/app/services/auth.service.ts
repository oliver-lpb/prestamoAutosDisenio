import { Injectable } from "@angular/core";
//autenticacion
import { AngularFireAuth } from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";
import { FirebaseCodeErrorEnum } from "../utils/firebase-code-error";

@Injectable({
    providedIn: "root",
})
export class AutenticacionService {
    constructor(private authFire: AngularFireAuth) { }

    register(email: string, pass: string) {
        return this.authFire.createUserWithEmailAndPassword(email, pass);
    }
    //login con corrreo y contrasenia
    login(email: string, pass: string) {
        return this.authFire.signInWithEmailAndPassword(email, pass);
    }

    //obtenerDatosdelUsario
    obternerUserLogin() {
        return this.authFire.authState;
    }
    //cerrar sesion
    logOut() {
        this.authFire.signOut();
        console.log("sesion cerrada");
    }

    firebaseError(code: string) {
        switch (code) {
            case FirebaseCodeErrorEnum.emailRepetida:
                return "el usario ya existe";

            case FirebaseCodeErrorEnum.passDebil:
                return "la contrasenia es debil";

            case FirebaseCodeErrorEnum.emailIvalido:
                return "el correo es invalido";

            default:
                return "caso sin resolver";
        }
    }

    retriveUsers(email: string) {
        return this.authFire.sendPasswordResetEmail(email);
    }

    verifictedUsers() {
        return this.authFire.currentUser.then((user) =>
            user?.sendEmailVerification()
        );
    }
}
