import { Injectable, NgZone } from '@angular/core';
// import { User } from '../services/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth ,  } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { InitializerService } from '../initializer/initializer.service';
import { DbFirestoreService } from '../database/db-firestore.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
 
  userData: any; // Save logged in user data


  // PROPIEDAD PARA LA APP NO DEL LOGIN

  usuario: any;

  constructor(

    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone , // NgZone service to remove outside scope warning

    // SERVICIOS DE LA APP

    public initializerService: InitializerService, // inicializa datos aplicacion
    private dbFirebase: DbFirestoreService,
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    // this.afAuth.authState.subscribe((user) => {
    //   if (user) {
    //     this.userData = user;
    //     localStorage.setItem('user', JSON.stringify(this.userData));
    //     JSON.parse(localStorage.getItem('user')!);
        
    //     // ESTO ES DE LA APP NO DEL LOGIN 

    //     // const uid = user.uid;
    //     // this.getUsuario(uid);
    //     // this.initializerService.getTodo()



    //   } else {
    //     localStorage.setItem('user', 'null');
    //     JSON.parse(localStorage.getItem('user')!);
    //     localStorage.clear();
    //   }
    // });
  }

  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['/home']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }



  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {

    });
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {


        this.SetUserData(result.user);


      })
      .catch((error) => {
        window.alert(error);
      });
  }


    // PORQUE NO ANDA???  USAR LOGOUT MIENTRAS
  // // Sign out
  SignOut() {
    console.log("saliendo signout")
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.clear()
      this.router.navigate(['']);
    });
  }



  // chequear si alguien esta loqgueado 
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }



  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: any = {   //aca va la interface usuario
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    this.getUsuario(user.uid)
    return userRef.set(userData, {
      merge: true,
    });
  }


// METODOS DE LA APP NO DEL LOGIN

getUsuario(id: string) {
  this.dbFirebase.getUsuarioUid(id).subscribe((data) => {
    this.usuario = data;
    localStorage.setItem(`usuario`, JSON.stringify(data));
    console.log('este es el usuario nuestro: ', this.usuario);
    this.setearColeccion();
  });
}

setearColeccion() {
  this.dbFirebase.setearColeccion(this.usuario.coleccion);
  this.router.navigate(['/home']);
}




}
