import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'first-app';

  ngOnInit(){
  }

  exportTable(): void {
    const tableElement = document.getElementById('myTable');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tableElement);

    const workbook: XLSX.WorkBook = {
      Sheets: { 'Sheet1': worksheet },
      SheetNames: ['Sheet1']
    };

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
 });
    const url = window.URL.createObjectURL(data);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = 'TableData';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

}
