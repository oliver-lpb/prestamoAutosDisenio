import { Injectable } from '@angular/core';
//agrega firebase
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc } from '@angular/fire/firestore';
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
import { ref } from 'firebase/storage';
import reporteCapitaInterface from '../utils/reporteCapital.interface';
import userLock from '../utils/userLock.inteface';
import { Cotizacion } from '../models/quotation.model';


@Injectable({
    providedIn: 'root'
})
export class DatosService {

    private userModel$ = new Subject<any>();

    constructor(private firebase: AngularFirestore, public storage: AngularFireStorage, private firestore: Firestore) { }
//guardado de usario
    saveUser(userForm: userModel): Promise<any> {
        return this.firebase.collection('usuarios').add(userForm);
    }
//obtencio de usario
    getUser(): Observable<any> {
        return this.firebase.collection('usuarios', ref => ref.orderBy('fechaCreacion', 'desc')).snapshotChanges();
    }
    getUsuario(id: string): Observable<any> {
        return this.firebase.collection('usuarios').doc(id).snapshotChanges();
    }
    actualizaUsuario(id: string, data: any): Promise<any> {
        return this.firebase.collection('usuarios').doc(id).update(data);
    }

//guardado de vehiculo
    saveVehicle(userForm: userModel): Promise<any> {
        return this.firebase.collection('vehiculo').add(userForm);
    }
//obtencio de vehiculo
    getVehiculo(): Observable<any> {
        return this.firebase.collection('vehiculo', ref => ref.orderBy('fechaCreacion', 'desc')).snapshotChanges();
    }
    getVehiculoEdit(id: string): Observable<any> {
        return this.firebase.collection('vehiculo').doc(id).snapshotChanges();
    }
    actualizarVehiculo(id: string, data: any): Promise<any> {
        return this.firebase.collection('vehiculo').doc(id).update(data);
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

    correoAdmins(correo: string) {
        return this.firebase.collection('usuariosAdmin', ref => ref.where('correo', '==', correo)).valueChanges;
    }

    uptoadlmage(file: any, path: string, nombre: string): Promise<string> {

        return new Promise(resolve => {

            const filePath = path + '/' + nombre;
            const ref = this.storage.ref(filePath);
            const task = ref.put(file);
            task.snapshotChanges().pipe(
                finalize(() => {
                    ref.getDownloadURL().subscribe(res => {
                        const dowloadURL = res;
                        resolve(dowloadURL);
                        return;
                    });
                })
            )
                .subscribe();

        })
    }

    //quotation servicios
    createDoc(data: any, path: string) {
        const collection = this.firebase.collection(path);
        return collection.doc().set(data);
    }

    updateDoc(data: any, path: string, id: string) {
        const collection = this.firebase.collection(path);
        return collection.doc(id).set(data);
    }

    //busqueda cliente
    getClient(dpi:string){
        return this.firebase.collection('usuarios',ref=> ref.where('dpi','==', dpi)).snapshotChanges();
    }

    //Busqueda vehiculo
    getVehicul(modeloVehiculo:string){
        return this.firebase.collection('vehiculo',ref=> ref.where('modelo','==', modeloVehiculo)).snapshotChanges();
    }
    
    getreporteCapital(): Observable<reporteCapitaInterface[]> {
        const placeRef = collection(this.firestore, 'venta');
        return collectionData(placeRef, { idField: 'id' }) as Observable<reporteCapitaInterface[]>;
    }

    getUsersLockDos(correo:any){
        return this.firebase.collection('usuariosAdmin', ref => ref.where('correo','==', correo)).snapshotChanges();
    }

    getMesCapital(fecha:any){
        return this.firebase.collection('venta',ref => ref.where('fechaCreacion','==', fecha)).snapshotChanges();
    }

    getCotizacion(): Observable<Cotizacion[]> {
        const placeRef = collection(this.firestore, 'cotizacion');
        return collectionData(placeRef, { idField: 'id' }) as Observable<Cotizacion[]>;
    }
    

}
