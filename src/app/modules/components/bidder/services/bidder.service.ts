import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
export interface Bid {
  bidderId: string;
  amount: number;
  bidTime: Date;
}

export interface Auction {
  id: number;
  item: string;
  description: string;
  currentBid: number;
  sellerId: string;
  isActive: boolean;
  bids: Bid[];
}

@Injectable({
  providedIn: 'root'
})
export class BidderService {
  private jsonUrl = 'http://localhost:3000/auctions'; // JSON server URL

  constructor(private http: HttpClient) {}

  // Fetch auctions
  getAuctions(): Observable<Auction[]> {
    return this.http.get<Auction[]>(this.jsonUrl);
  }

  // Place a bid
  placeBid(auctionId: number, bidderId: string, bidAmount: number): Observable<any> {
    return this.http.get<Auction>(`${this.jsonUrl}/${auctionId}`).pipe(
      map(auction => {
        const now = new Date();
        
        // Ensure that auction.bids exists
        if (!auction.bids) {
          auction.bids = []; // Initialize bids array if it doesn't exist
        }
  
        // Find the last bid from this bidder
        const lastBid = auction.bids.find(b => b.bidderId === bidderId);
  
        // Check if 5 minutes have passed since the last bid
        if (lastBid && (now.getTime() - new Date(lastBid.bidTime).getTime()) < 5 * 60 * 1000) {
          throw new Error('You can only place a new bid after 5 minutes.');
        }
  
        // Update auction with new bid
        auction.currentBid = bidAmount;
        auction.bids.push({ bidderId, amount: bidAmount, bidTime: now });
  
        // Update the auction on the server
        return this.http.put(`${this.jsonUrl}/${auctionId}`, auction);
      }),
      catchError(this.handleError('placeBid', null))
    );
  }
  

  // Handle errors
  private handleError<T>(operation = 'operation', result: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result);
    };
  }
}
