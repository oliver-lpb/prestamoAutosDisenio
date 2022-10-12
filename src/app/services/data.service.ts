import { Injectable } from '@angular/core';
//agrega firebase
import { AngularFirestore } from '@angular/fire/compat/firestore';
//modelo para guardar y recibir datos de firebase
import { userModel } from '../models/user.model';
//dependecia para usar Subject y Observable para obtener datos desde firebase
import { Observable, Subject } from 'rxjs';
//para la autenticaion
import { Auth, } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { userAdminModel } from '../models/adminUser.model';
//import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';
//proceso sube imangen y capturas de urls
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class DatosService {

    private userModel$ = new Subject<any>();

    constructor(private firebase: AngularFirestore, public storage: AngularFireStorage) { }

    saveUser(userForm: userModel): Promise<any> {
        return this.firebase.collection('usuarios').add(userForm);
    }
    getUser(): Observable<any> {
        return this.firebase.collection('usuarios', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
    }

    // usarios admin
    saveUserAdmin(userForm: userAdminModel): Promise<any> {
        return this.firebase.collection('usuariosAdmin').add(userForm);
    }

    getUserAdmin(): Observable<any> {
        return this.firebase.collection('usuariosAdmin', ref => ref.orderBy('correo', 'asc')).snapshotChanges();
    }
    //en edicion
    eliminarTarjeta(id: string): Promise<any> {
        return this.firebase.collection('usuarios').doc(id).delete();
    }
    editaTarjeta(id: string, tarjeta: any): Promise<any> {
        return this.firebase.collection('usuarios').doc(id).update(tarjeta);
    }

    addTarjetaEdit(tarjeta: userModel) {
        this.userModel$.next(tarjeta);
    }

    getUsuario(id: string): Observable<any> {
        return this.firebase.collection('usuarios').doc(id).snapshotChanges();
    }

    actualizaUsuario(id: string, data: any): Promise<any> {
        return this.firebase.collection('usuarios').doc(id).update(data);
    }

    uptoadlmage(file:any, path: string, nombre:string): Promise<string>{

        return new Promise(resolve=>{
            
            const filePath =path + '/' + nombre;
            const ref = this.storage.ref(filePath);
            const task = ref.put(file);
            task.snapshotChanges().pipe(
                finalize(() =>{
                    ref.getDownloadURL().subscribe(res=>{
                        const dowloadURL = res;
                        resolve(dowloadURL);
                        return;
                    });
                })
            )
            .subscribe();
            
        })
    }

}
