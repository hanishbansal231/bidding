import { Component, EventEmitter, Output } from '@angular/core';
import { Auction, AuctionsService } from '../auctions/services/auctions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'] // Correct the 'styleUrl' typo
})
export class HomeComponent {
  auctions: Auction[] = [];
  selectedAuction!: Auction; // Define selectedAuction
  constructor(private auctionsService: AuctionsService) {}

  ngOnInit(): void {
    this.auctionsService.getAllAuctions().subscribe({
      next: (data) => {
        this.auctions = data; // Assign fetched data to the auctions array
      },
      error: (error) => {
        console.error('Error fetching auctions:', error); // Handle error
      },
    });
  }

  select(auction: Auction): void {
    this.selectedAuction = auction; // Set the selected auction
  }
}
