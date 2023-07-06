import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';


@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent {

  constructor(private translate:TranslateService){

    (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
  }

  downloadResume() {
    const documentDefinition = {
      content: [
        {
          text: 'Resume',
          style: 'header'
        },
        {
          text: 'Experience',
          style: 'subheader',
        },
        'Web Developer -2022',
        'Tecnovators Software Solutions Anna Salai, Chennai',
        'I design footer page of GLT in live project and also design landing page of cannoah in tecnovators',
        'Tecnovators has giving me chance to learn Angular and i learned so many Languages like javascript,wordpress and tailwind css.\n\n',
        {
          text: 'Education',
          style: 'subheader'
        },
        {
          ul: [
            '2015 - 2017',
            'Mohammed Sathak College Siruseri,Chennai',
            'MCA 7.8 GDP',
            'Complete MCA in Mohammed sathak AJ college of Engineering, Chennai and GDP is 78%.'
          ]
        },
        {
          ul: [
            '2012 - 2015',
            'Islamiah College Vaniyambadi,Tirupattur',
            'BCA 7.5 GDP',
            'Complete BCA in Vaniyambadi College and GDP is 75%'
          ]
        },
        {
          text: 'Professional Skills',
          style: 'subheader'
        },
        {
          ul: [
            'Wordpress Developer',
            'Figma',
            'Web Developer',
            'Adobe XD',
            'User Interface Design',
            'Tailwind CSS'
          ]
        },

        {
          text: 'Languages',
          style: 'subheader'
        },
        {
          ul: [
            'HTML',
            'CSS',
            'JavaScript',
            'Angular',
            'TypeScript',
            'Bootstrap'
          ]
        },
      ],
      styles: {
        header: {
          fontSize: 14,
          bold: true,
        },
        subheader: {
          fontSize: 12,
          bold: true
        },
        ul:{
          fontSize : 10
        }
      }

    }
    pdfMake.createPdf(documentDefinition).download('my-resume.pdf');
  }
}
