import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BidderService } from '../services/bidder.service';
import { Auction } from '../../auctions/services/auctions.service';

@Component({
  selector: 'app-bidder',
  templateUrl: './bidder.component.html',
  styleUrls: ['./bidder.component.scss']
})
export class BidderComponent {
  @Input() auction!: Auction;  // Auction input passed from HomeComponent
  @Output() selectAuction = new EventEmitter<Auction>();  // Emit selected auction event
  bidderId = 'bidder001';  // Hardcoded bidder ID for now (should come from auth)
  isBiddingRestricted = false;
  timeRemaining: number | null = null;

  constructor(private bidderService: BidderService) {}

  placeBid(bidAmount: string): void {
    if (this.isBiddingRestricted) return;

    this.bidderService.placeBid(this.auction.id, this.bidderId, +bidAmount).subscribe({
      next: () => {
        alert('Bid placed successfully!');
        this.startBidRestrictionTimer();
      },
      error: err => alert(err.message)
    });
  }

  // Start the timer for the 5-minute restriction
  private startBidRestrictionTimer(): void {
    this.isBiddingRestricted = true;
    this.timeRemaining = 5 * 60; // 5 minutes in seconds

    const interval = setInterval(() => {
      if (this.timeRemaining! > 0) {
        this.timeRemaining!--;
      } else {
        clearInterval(interval);
        this.isBiddingRestricted = false;
        this.timeRemaining = null;
      }
    }, 1000);
  }

  select(auction: Auction): void {
    this.selectAuction.emit(auction); // Emit the selected auction
  }
}
