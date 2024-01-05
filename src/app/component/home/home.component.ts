import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, CanActivate } from '@angular/router';
import { ApplicationService } from 'src/app/services/application.service';
import { FormsModule } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { PaginationModule } from 'src/app/shared/pagination/pagination/pagination.module';
import { AuthGuard } from 'src/app/guard/auth.guard';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, PaginationModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  medicineData: any = [];
  searchText: any = '';
  isEditable: any = {};
  filteredOptions: any = [];
  loader: boolean = false;
  itemsPerPage: number = 20;
  currentPage: number = 1;
  filteredValue: any = [];

  constructor(private _service: ApplicationService, private alertService: AlertService) { }


  displayPage(page: number) {
    this.loader = true;
    this.currentPage = page;
    let startIndex = (page - 1) * this.itemsPerPage;
    let endIndex = startIndex + this.itemsPerPage;
    this.filteredValue = this.medicineData.slice(startIndex, endIndex);
    this.filteredOptions = this.filteredValue;
    this.loader = false;
    window.scrollTo(0, 0);
  }


  ngOnInit() {
    this.fetchMedicine();
  }

  fetchMedicine() {
    this.loader = true;
    this._service.fetchMedicineList((res: any) => {
      if (res) {
        this.loader = false;
        this.filteredOptions = this.medicineData = res;
        this.sortMedicine();
        this.displayPage(this.currentPage);
      }
    })
  }


  searchMed(event: any) {
    this.searchText = event.target.value;
    this.filteredOptions = this.filteredValue.filter((option: any) => {
      return option['name'].toLowerCase().includes(this.searchText.toLowerCase())
    })
  }

  async updateQuantity(_id: any,) {
    let param: any = {};
    await this.medicineData.find((e: any) => {
      if (e._id == _id) {
        param = e;
      }
    })
    this._service.updateMediStock(param, (res: any) => {
      if (res.status == 200) {
        this.alertService.alert("success", "Stock updated", "Success", { displayDuration: 2000, pos: 'top' });

      } else {
        this.alertService.alert("error", res.message, "Error", { displayDuration: 2000, pos: 'top' });
      }
    })
  }

  onlyNumber(event: any, data: any) {
    if (event.keyCode == 8) return;
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
    data = JSON.parse(JSON.stringify(event.target.value));
  }

  sortMedicine() {
    return this._service.sortMedicine(this.medicineData, 'name');
  }


}



