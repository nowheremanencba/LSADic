import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { CategoriaService } from 'src/app/services/categorias.service';
 
@Component({
  selector: 'app-videos-admin',
  templateUrl: './videos-admin.page.html',
  styleUrls: ['./videos-admin.page.scss'],
})
export class VideosAdminPage implements OnInit {
 
  students: any;
  videoName: string;
  videoURL: number;
  videoCategoria: string;
  categorias: any;
  categoriaSelected: any;

  constructor(private crudService: CrudService,
              private catService: CategoriaService
             ) { }
 
  ngOnInit() {
    
    this.catService.getCategorias().subscribe(data => { 
      this.categorias = data.map( e =>{
        return {
          id: e.payload.doc.id,
          nombre: e.payload.doc.data()['Nombre'],
        }
      })
      console.log(this.categorias); 
    });

    this.crudService.read_Students().subscribe(data => {
 
      this.students = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['Name'],
          Age: e.payload.doc.data()['Age'],
          Address: e.payload.doc.data()['Address'],
        };
      }) 
 
    }); 
  }
 
  CreateRecord() {
    let record = {};
    record['Nombre'] = this.videoName;
    record['URL'] = this.videoURL;
   /* record['Categoria'] = this.categoriaSelected;*/
    this.crudService.create_NewVideo(record).then(resp => {
      this.videoName = "";
      this.videoURL = undefined;
      this.categoriaSelected = "";
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }
 
  RemoveRecord(rowID) {
    this.crudService.delete_Student(rowID);
  }
 
  EditRecord(record) {
    record.isEdit = true;
    record.EditName = record.Name;
    record.EditAge = record.Age;
    record.EditAddress = record.Address;
  }
 
  UpdateRecord(recordRow) {
    let record = {};
    record['Name'] = recordRow.EditName;
    record['Age'] = recordRow.EditAge;
    record['Address'] = recordRow.EditAddress;
    this.crudService.update_Student(recordRow.id, record);
    recordRow.isEdit = false;
  }
}
