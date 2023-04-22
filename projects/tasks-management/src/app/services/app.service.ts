import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class ApplicationService {
  

  constructor(
    private readonly http: HttpClient
  ) { }

  
}