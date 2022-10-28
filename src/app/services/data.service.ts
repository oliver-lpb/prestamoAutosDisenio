import { Injectable } from '@angular/core';
//agrega firebase
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, arrayUnion } from '@angular/fire/firestore';
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
import { Cotizacion} from '../models/quotation.model';
import { datosDeudores } from '../models/pagos';


@Injectable({
    providedIn: 'root'
})
export class DatosService {

    cot: Cotizacion = {
        idCliente: '',
        idVehiculo:'',
        pagos: [],
      }
      users:userModel[]=[];
      deudoresList:datosDeudores[]=[];
    
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

    getVehiculoEdit(id: string): Observable<any> {
        return this.firebase.collection('vehiculo').doc(id).snapshotChanges();
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
    getClient(nombre:string){
        return this.firebase.collection('usuarios',ref=> ref.where('nombre','==', nombre)).snapshotChanges();
    }

    getClientId(ID:string){
        return this.firebase.collection('usuarios',ref=> ref.where('id','==', ID)).snapshotChanges();
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
        return this.firebase.collection('venta',ref => ref.where('ventaFecha','==', fecha)).snapshotChanges();
    }

    getCotizacion(): Observable<Cotizacion[]> {
        const placeRef = collection(this.firestore, 'cotizacion');
        return collectionData(placeRef, { idField: 'id' }) as Observable<Cotizacion[]>;
    }

    getCotizacionDos(): Observable<any>{
        return this.firebase.collection('cotizacion', ref => ref.orderBy('idCliente', 'desc')).snapshotChanges();
    }

    getReportePagos():Observable<any>{
        return this.firebase.collection('reportePagos', ref => ref.orderBy('reporteFecha','desc')).snapshotChanges();
    }

    updateDoc2(data: any, path: string, id: string) {
        const collection = this.firebase.collection(path);
        return collection.doc(id).update({ cotizacion: arrayUnion({data}) }).catch((err: any) => {
        console.error(`oopsie - ${err.message}`)}) 
    }
    
    
    getCot(){
        let datosLeible:any=[];
        const leer = this.firebase.collection("cotizacion").get().toPromise();
        return leer.then(resp=>{
            console.log(resp?.docs)
        const document: any = resp?.docs; 
        for(let object of document ){
            const dts:any = object.data();
            let  datos = new datosDeudores
            datos.id=object.id;
            datos.idCliente=dts.idCliente;
            datos.idVehiculo=dts.idVehiculo;
            datosLeible.push(datos);
        }
        console.log(datosLeible,"datos obtenidos"); 
        return datosLeible;
        
        }).catch((error)=>{
            console.log(error);
        })
    }

    getCot2(id: string) {

        let datosLeible:any=[];

        const leer = this.firebase.collection("cotizacion").doc(id).get().toPromise();
        return leer.then(resp=>{
            //console.log(resp?.data())
            const dts:any = resp?.data();
            this.cot.id=resp?.id;
            this.cot.idCliente=dts.idCliente;
            this.cot.idVehiculo=dts.idVehiculo;
            this.cot.mora=dts.mora;
            this.cot.pagos= dts.pagos;
            datosLeible.push(this.cot);
            //console.log(datosLeible);
            return datosLeible;
        }).catch((error)=>{
            console.log(error);
        })
    }

    getDeudores() {
        let listaDeudores:datosDeudores[]=[];
        this.getUser().subscribe(doc=>{
            this.users=[]
            doc.forEach((element:any)=>{
              this.users.push({
                id: element.payload.doc.id,
                ...element.payload.doc.data()
              })
            });
          })
          
        this.firebase.collection('cotizacion').snapshotChanges().subscribe(
            resp=>{
                resp.forEach(
                    (cliente: any)=>{
                        let object:datosDeudores = cliente.payload.doc.data();
                        object.id = cliente.payload.doc.id;
                        let client = this.users.find(b =>{
                            return b.id === object.idCliente
                        })
                        object.nombre= client?.nombre;
                        object.apellido= client?.apellido;
                        object.correo= client?.correo;
                        object.direccion= client?.direccion;
                        object.telefono= client?.telefono;
                        object.telefonoSecundario= client?.telefonoSecundario;
                        object.dpi= client?.dpi;
                        object.NumNit= client?.NumNit;
                        listaDeudores.push(object);
                    }
                )
                this.deudoresList =[];
                this.deudoresList= listaDeudores;
                listaDeudores = [];
            }
        )
    }

    
}
