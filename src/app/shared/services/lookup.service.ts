import { computed, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { allLookupModel, basicLookupModel } from '../models/looup.model';

@Injectable({
  providedIn: 'root'
})
export class LookupService {
 baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }
 // Signals
  readonly roles = signal<basicLookupModel[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly allOptions = signal<allLookupModel[]>([]);
  readonly loadingZones = signal(false);
  readonly zonesError = signal<string | null>(null);

   // Signal to store selected zone
  readonly selectedZoneKey = signal<string | null>(null);

   // Signal to store selected zone
  readonly selectedLocationKey = signal<string | null>(null);


  readonly zones = computed(() =>{
    const selectedLocation = this.selectedLocationKey();
    return this.allOptions().filter(opt => opt.optionType === 'zone' && opt.cascadeKey === selectedLocation)
      .map(opt => ({ id: opt.optionKey, name: opt.optionValue }))
});

  readonly workPermitOptions = computed(() =>
    this.allOptions().filter(opt => opt.optionType === 'work_permit')
      .map(opt => ({ id: opt.optionKey, name: opt.optionValue }))
  );

    readonly incidentOptions = computed(() =>
    this.allOptions().filter(opt => opt.optionType === 'incident')
      .map(opt => ({ id: opt.optionKey, name: opt.optionValue }))
  );

  readonly facilityZoneLocation = computed(() =>
    this.allOptions().filter(opt => opt.optionType === 'facility_zone_location')
      .map(opt => ({ id: opt.optionKey, name: opt.optionValue }))
  );

   // Computed zone facilities based on selectedZoneKey
  readonly zoneFacility = computed(() => {
    const selectedZone = this.selectedZoneKey();
    return this.allOptions()
      .filter(opt => opt.optionType === 'zone_facility' && opt.cascadeKey === selectedZone)
      .map(opt => ({ id: opt.optionKey, name: opt.optionValue }));
  });
  
  readonly getOptionsByType = (type: string) => computed(() =>
  this.allOptions().filter(opt => opt.optionType === type)
    .map(opt => ({ id: opt.optionKey, name: opt.optionValue }))
);

  loadRoles() {
    const apiUrl = `${this.baseUrl}/Forms/options`;
        const payload = {
      "optionType": "roles",
      "cascadeType": null,
      "cascadeKey": null
    }
    if (this.roles().length > 0) return; // Avoid re-fetching if already loaded

    this.loading.set(true);
    this.error.set(null);

    this.http.post<basicLookupModel[]>(apiUrl, payload)
      .pipe(
        tap(data => this.roles.set(data)),
        catchError(err => {
          this.error.set('Failed to load roles');
          return of([]);
        }),
        tap(() => this.loading.set(false))
      ).subscribe();
  }

  loadZone(){
     const apiUrl = `${this.baseUrl}/Forms/options/All`;
    if (this.allOptions().length > 0) return; // Avoid re-fetching if already loaded

    this.loadingZones.set(true);
    this.zonesError.set(null);

    this.http.get<allLookupModel[]>(apiUrl)
      .pipe(
        tap(data => this.allOptions.set(data)),
        catchError(err => {
          this.error.set('Failed to load zones');
          return of([]);
        }),
        tap(() => this.loadingZones.set(false))
      ).subscribe();
  }

   // Set selected zone key
  setSelectedZoneKey(zoneKey: string | null) {
    this.selectedZoneKey.set(zoneKey);
  }

   // Set selected zone key
  setSelectedLocationKey(locaionKey: string | null) {
    this.selectedLocationKey.set(locaionKey);
  }

}
