import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

export interface Auction {
  id: number;
  item: string;
  description: string;
  currentBid: number;
  startingPrice: number; // Add startingPrice
  sellerId: string; // Assuming this is meant to be a string
  isActive: boolean;
  bids: { bidderId: string; amount: number }[]; // Assuming bidsts refers to bids
}



@Injectable({
  providedIn: 'root'
})
export class AuctionsService {

  private auctionUrl = 'http://localhost:3000/auctions'; // JSON server URL for auctions

  constructor(private http: HttpClient) {}

  // Get all auctions
  getAllAuctions(): Observable<Auction[]> {
    return this.http.get<Auction[]>(this.auctionUrl).pipe(
      catchError(this.handleError<Auction[]>('getAllAuctions', []))
    );
  }

  // Create a new auction (seller feature)
  createAuction(newAuction: Auction): Observable<any> {
    return this.http.post(this.auctionUrl, newAuction).pipe(
      catchError(this.handleError('createAuction', []))
    );
  }

  // Finalize auction (end bidding)
  finalizeAuction(auctionId: number): Observable<any> {
    return this.http.patch(`${this.auctionUrl}/${auctionId}`, { isActive: false }).pipe(
      catchError(this.handleError('finalizeAuction', []))
    );
  }

  // Cancel auction (seller feature)
  cancelAuction(auctionId: number): Observable<any> {
    return this.http.delete(`${this.auctionUrl}/${auctionId}`).pipe(
      catchError(this.handleError('cancelAuction', []))
    );
  }

  // Handle HTTP errors
  private handleError<T>(operation = 'operation', result: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); // log to console
      return of(result); // Let the app keep running by returning an empty result.
    };
  }
}
