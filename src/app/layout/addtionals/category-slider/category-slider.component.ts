import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../shared/services/category/category.service';
import { Category } from '../../../shared/interfaces/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-category-slider',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.scss'
})
export class CategorySliderComponent implements OnInit {
  isLoading:boolean = true;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 7
      },

    },
    nav: true
  }



  categoryItems!:Category[]

  constructor(private _CategoryService:CategoryService){}
ngOnInit(): void {
  this.getAllCategories();
}
  getAllCategories(){
    this._CategoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categoryItems = res.data;
        this.isLoading = false;
        // Handle the data here
        console.log('Categories:', this.categoryItems);
      },
      error: (error) => {
        this.isLoading = false;

        // Handle any errors here
        console.error('Error fetching categories:', error);
      },
      complete: () => {
        // Optional: Perform any actions when the observable completes
        console.log('Category fetching completed');
      }
    });

  }

}
