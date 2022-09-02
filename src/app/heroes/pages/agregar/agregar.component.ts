import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import {switchMap} from 'rxjs/operators'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles:[`

    img{
      width: 100%;
      border-radius: 5px
    }

  `]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      descripcion: 'DC - COMICS'
    },
    {
      id: 'Marvel Comics',
      descripcion: 'Marvel - Comics'
    }
  ]

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  }

  constructor( private heroesService: HeroesService,
               private activeRoute: ActivatedRoute,
               private router: Router,
               private _snackBar: MatSnackBar,
               public dialog: MatDialog) { }

  ngOnInit(): void {

    if (!this.router.url.includes('editar')) {
      return;
    }

    this.activeRoute.params
      .pipe(
        switchMap(({ id })=> this.heroesService.getHeroesById( id ))
      )
      .subscribe( ( heroe )=> this.heroe = heroe)
  }

  guradar() {
    
    if( this.heroe.superhero.trim().length === 0 ){

      return;

    }
     if( this.heroe.id ){
      //ACTUALIZAR
       this.heroesService.actualizarHeroe( this.heroe )
      .subscribe( heroe => this.mostrarSnackkbar( 'Registro Actualizado' ));

     }else{
      //Crear
      console.log(this.heroe.id);
      
      this.heroesService.agregarHeroe( this.heroe )
        .subscribe( heroe =>{          
          
          this.router.navigate(['/heroes/editar', heroe.id]);
          this.mostrarSnackkbar( 'Registro Creado' );

        });
    }
  }

  borrarHeroe(){

   const dialog =  this.dialog.open( ConfirmarComponent, {
      width: '250px',
      data: this.heroe
    });

    dialog.afterClosed()
    .subscribe( resp => {
      if ( resp ) {
        
        this.heroesService.borrarHeroe( this.heroe.id! )
          .subscribe( reps => {
            this.router.navigate(['/heroes']);
          })

      }
    })

  }

  mostrarSnackkbar( mensaje:string): void {
    this._snackBar.open( mensaje, 'ok!', {
      duration: 2500
    } );
  }

}
