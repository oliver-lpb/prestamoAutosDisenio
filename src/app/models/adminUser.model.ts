export class userAdminModel {
    id?: string;
    nombre: string;
    rol: string;
    correo: string;
    password: string;



    constructor(nombre:string,rol:string,correo: string,password: string){
        this.nombre = nombre;
        this.rol = rol;
        this.correo = correo;
        this.password = password;
        
    }
    
    

}