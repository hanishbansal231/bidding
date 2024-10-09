import { Component } from '@angular/core';
import { Auction, AuctionsService } from '../services/auctions.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-auctions',
  templateUrl: './auctions.component.html',
  styleUrl: './auctions.component.scss'
})
export class AuctionsComponent {
  auctionForm!: FormGroup;
  auctions: Auction[] = [];
  sellerId = '1'; // Assume sellerId is 1 for demonstration, in practice, it would come from the logged-in user

  constructor(private fb: FormBuilder, private auctionService: AuctionsService) {}

  ngOnInit(): void {
    this.loadAuctions();

    this.auctionForm = this.fb.group({
      item: ['', Validators.required],
      description: ['', Validators.required],
      startingPrice: ['', [Validators.required, Validators.min(1)]]
    });
  }

  // Load all auctions for display
  loadAuctions(): void {
    this.auctionService.getAllAuctions().subscribe(data => {
      this.auctions = data;
    });
  }

  // Create a new auction
  createAuction(): void {
    const newAuction: Auction = {
      id: Date.now(), // Mock ID for simplicity
      item: this.auctionForm.value.item,
      description: this.auctionForm.value.description,
      startingPrice: this.auctionForm.value.startingPrice,
      currentBid: this.auctionForm.value.startingPrice,
      sellerId: this.sellerId,
      isActive: true,
      bids: []
    };

    this.auctionService.createAuction(newAuction).subscribe(() => {
      this.loadAuctions(); // Reload the auctions list
    });
  }

  // Finalize an auction
  finalizeAuction(auctionId: number): void {
    this.auctionService.finalizeAuction(auctionId).subscribe(() => {
      this.loadAuctions(); // Reload the auctions list
    });
  }

  // Cancel an auction
  cancelAuction(auctionId: number): void {
    this.auctionService.cancelAuction(auctionId).subscribe(() => {
      this.loadAuctions(); // Reload the auctions list
    });
  }
}
