import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }
  formData = {
   
    "formDetails": {
        "formId": 1,
        "title": "PERMIT TO WORK - CONFINED SPACES",
        "formType": "work_permit",
        "description": null,
        "formKey": "1",
        "sections": [
            {
                "sectionId": 4,
                "sectionTitle": "Part 1 - To be filled by Applicant / Contractor Person in-charge for the work",
                "order": 1,
                "fields": [
                    {
                        "id": 6,
                        "label": "Brief description of works",
                        "fieldKey": "work_description",
                        "type": "textarea",
                        "placeholder": null,
                        "order": 0,
                        "optionType": null,
                        "cascadeField": null,
                        "colSpan": 12,
                        "validations": [
                            {
                                "type": "required",
                                "value": "true",
                                "message": "This field is required."
                            }
                        ]
                    },
                    {
                        "id": 7,
                        "label": "Work will be performed by",
                        "fieldKey": "work_performed_by",
                        "type": "text",
                        "placeholder": null,
                        "order": 1,
                        "optionType": null,
                        "cascadeField": null,
                        "colSpan": 12,
                        "validations": [
                            {
                                "type": "required",
                                "value": "true",
                                "message": "This field is required."
                            }
                        ]
                    },
                    {
                        "id": 8,
                        "label": "Name of the supervisor in charge",
                        "fieldKey": "supervisor_name",
                        "type": "text",
                        "placeholder": null,
                        "order": 2,
                        "optionType": null,
                        "cascadeField": null,
                        "colSpan": 6,
                        "validations": [
                            {
                                "type": "required",
                                "value": "true",
                                "message": "This field is required."
                            }
                        ]
                    },
                    {
                        "id": 39,
                        "label": "Site name",
                        "fieldKey": "site_name",
                        "type": "text",
                        "placeholder": null,
                        "order": 3,
                        "optionType": null,
                        "cascadeField": null,
                        "colSpan": 6,
                        "validations": [
                            {
                                "type": "required",
                                "value": "true",
                                "message": "This field is required."
                            }
                        ]
                    },
                    {
                        "id": 9,
                        "label": "Location of work",
                        "fieldKey": "location_of_work",
                        "type": "text",
                        "placeholder": null,
                        "order": 4,
                        "optionType": null,
                        "cascadeField": null,
                        "colSpan": 6,
                        "validations": [
                            {
                                "type": "required",
                                "value": "true",
                                "message": "This field is required."
                            }
                        ]
                    },
                    {
                        "id": 40,
                        "label": "Date & Time of work (From)",
                        "fieldKey": "datetime_of_work_from",
                        "type": "datetime",
                        "placeholder": null,
                        "order": 5,
                        "optionType": null,
                        "cascadeField": null,
                        "colSpan": 6,
                        "validations": [
                            {
                                "type": "required",
                                "value": "true",
                                "message": "This field is required."
                            }
                        ]
                    },
                    {
                        "id": 41,
                        "label": "Date & Time of work (To)",
                        "fieldKey": "datetime_of_work_to",
                        "type": "datetime",
                        "placeholder": null,
                        "order": 6,
                        "optionType": null,
                        "cascadeField": null,
                        "colSpan": 6,
                        "validations": [
                            {
                                "type": "required",
                                "value": "true",
                                "message": "This field is required."
                            }
                        ]
                    },
                    {
                        "id": 10,
                        "label": "No of workers",
                        "fieldKey": "no_of_workers",
                        "type": "number",
                        "placeholder": null,
                        "order": 7,
                        "optionType": null,
                        "cascadeField": null,
                        "colSpan": 6,
                        "validations": [
                            {
                                "type": "required",
                                "value": "true",
                                "message": "This field is required."
                            }
                        ]
                    }
                ]
            },
            {
                "sectionId": 5,
                "sectionTitle": "Safety requirement to be complied prior to start work",
                "order": 2,
                "fields": [
                    {
                        "id": 20,
                        "label": "Emergency procedure explained",
                        "fieldKey": "emergency_procedure_explained",
                        "type": "radio",
                        "placeholder": null,
                        "order": 0,
                        "optionType": "yes_no",
                        "cascadeField": null,
                        "colSpan": 6,
                        "validations": [
                            {
                                "type": "required",
                                "value": "true",
                                "message": "This field is required."
                            }
                        ]
                    },
                    {
                        "id": 21,
                        "label": "Rescue / Emergency preparedness Plan in place",
                        "fieldKey": "rescue_preparedness_plan",
                        "type": "radio",
                        "placeholder": null,
                        "order": 1,
                        "optionType": "yes_no",
                        "cascadeField": null,
                        "colSpan": 6,
                        "validations": [
                            {
                                "type": "required",
                                "value": "true",
                                "message": "This field is required."
                            }
                        ]
                    },
                    {
                        "id": 22,
                        "label": "Equipment isolated/blinded",
                        "fieldKey": "equipment_isolated",
                        "type": "radio",
                        "placeholder": null,
                        "order": 2,
                        "optionType": "yes_no",
                        "cascadeField": null,
                        "colSpan": 6,
                        "validations": [
                            {
                                "type": "required",
                                "value": "true",
                                "message": "This field is required."
                            }
                        ]
                    },
                    {
                        "id": 23,
                        "label": "Adequate Ventilation provided",
                        "fieldKey": "adequate_ventilation_provided",
                        "type": "radio",
                        "placeholder": null,
                        "order": 3,
                        "optionType": "yes_no",
                        "cascadeField": null,
                        "colSpan": 6,
                        "validations": [
                            {
                                "type": "required",
                                "value": "true",
                                "message": "This field is required."
                            }
                        ]
                    },
                    {
                        "id": 24,
                        "label": "Confined space purged, ventilated and cooled as necessary?",
                        "fieldKey": "confined_space_purged_ventilated_and_cooled",
                        "type": "radio",
                        "placeholder": null,
                        "order": 4,
                        "optionType": "yes_no",
                        "cascadeField": null,
                        "colSpan": 6,
                        "validations": [
                            {
                                "type": "required",
                                "value": "true",
                                "message": "This field is required."
                            }
                        ]
                    },
                    {
                        "id": 25,
                        "label": "Gas Testing Required",
                        "fieldKey": "gas_testing_required",
                        "type": "radio",
                        "placeholder": null,
                        "order": 5,
                        "optionType": "yes_no",
                        "cascadeField": null,
                        "colSpan": 6,
                        "validations": [
                            {
                                "type": "required",
                                "value": "true",
                                "message": "This field is required."
                            }
                        ]
                    },
                    {
                        "id": 26,
                        "label": "Workers Trained in confine space",
                        "fieldKey": "workers_trained",
                        "type": "radio",
                        "placeholder": null,
                        "order": 6,
                        "optionType": "yes_no",
                        "cascadeField": null,
                        "colSpan": 6,
                        "validations": [
                            {
                                "type": "required",
                                "value": "true",
                                "message": "This field is required."
                            }
                        ]
                    },
                    {
                        "id": 27,
                        "label": "Breathing apparatus available",
                        "fieldKey": "breathing_apparatus_available",
                        "type": "radio",
                        "placeholder": null,
                        "order": 7,
                        "optionType": "yes_no",
                        "cascadeField": null,
                        "colSpan": 6,
                        "validations": [
                            {
                                "type": "required",
                                "value": "true",
                                "message": "This field is required."
                            }
                        ]
                    },
                    {
                        "id": 28,
                        "label": "Additional Hot work permit required",
                        "fieldKey": "additional_work_permit_required",
                        "type": "radio",
                        "placeholder": null,
                        "order": 8,
                        "optionType": "yes_no",
                        "cascadeField": null,
                        "colSpan": 6,
                        "validations": [
                            {
                                "type": "required",
                                "value": "true",
                                "message": "This field is required."
                            }
                        ]
                    },
                    {
                        "id": 29,
                        "label": "Continuous air monitoring arranged",
                        "fieldKey": "continuous_air_monitoring",
                        "type": "radio",
                        "placeholder": null,
                        "order": 10,
                        "optionType": "yes_no",
                        "cascadeField": null,
                        "colSpan": 6,
                        "validations": [
                            {
                                "type": "required",
                                "value": "true",
                                "message": "This field is required."
                            }
                        ]
                    }
                ]
            },
            {
                "sectionId": 11,
                "sectionTitle": "Precautions",
                "order": 3,
                "fields": [
                    {
                        "id": 30,
                        "label": "Any other precautions or conditions for safe operations in the confined space?",
                        "fieldKey": "any_other_precautions",
                        "type": "textarea",
                        "placeholder": null,
                        "order": 0,
                        "optionType": null,
                        "cascadeField": null,
                        // change here col 1 to 12
                        "colSpan": 12,
                        "validations": [
                            {
                                "type": "required",
                                "value": "true",
                                "message": "This field is required."
                            }
                        ]
                    }
                ]
            },
            {
                "sectionId": 6,
                "sectionTitle": "Air Monitoring",
                "order": 4,
                "fields": [
                    {
                        "id": 31,
                        "label": "Air monitoring - Oxygen (Acceptable concentration - 19.5 - 21 %) ",
                        "fieldKey": "air_monitoring",
                        "type": "radio",
                        "placeholder": null,
                        "order": 0,
                        "optionType": "yes_no",
                        "cascadeField": null,
                        // change here col 4 to 6
                        "colSpan": 6,
                        "validations": [
                            {
                                "type": "required",
                                "value": "true",
                                "message": "This field is required."
                            }
                        ]
                    },
                    {
                        "id": 32,
                        "label": "Reading",
                        "fieldKey": "air_monitoring_reading",
                        "type": "text",
                        "placeholder": null,
                        "order": 1,
                        "optionType": null,
                        "cascadeField": null,
                         // change here col 4 to 3
                        "colSpan": 3,
                        "validations": [
                            {
                                "type": "required",
                                "value": "true",
                                "message": "This field is required."
                            }
                        ]
                    },
                    {
                        "id": 33,
                        "label": "Time",
                        "fieldKey": "air_monitoring_time",
                        "type": "time",
                        "placeholder": null,
                        "order": 2,
                        "optionType": null,
                        "cascadeField": null,
                         // change here col 4 to 3
                        "colSpan": 3,
                        "validations": [
                            {
                                "type": "required",
                                "value": "true",
                                "message": "This field is required."
                            }
                        ]
                    },
                    {
                        "id": 34,
                        "label": "Air Monitoring - Carbon Monoxide (Acceptable concentration - below 25 ppm) ",
                        "fieldKey": "air_monitoring_carbon_monoxide",
                        "type": "radio",
                        "placeholder": null,
                        "order": 3,
                        "optionType": "yes_no",
                        "cascadeField": null,
                         // change here col 4 to 6
                        "colSpan": 6,
                        "validations": [
                            {
                                "type": "required",
                                "value": "true",
                                "message": "This field is required."
                            }
                        ]
                    },
                    {
                        "id": 35,
                        "label": "Reading",
                        "fieldKey": "air_monitoring_carbon_monoxide_reading",
                        "type": "text",
                        "placeholder": null,
                        "order": 4,
                        "optionType": null,
                        "cascadeField": null,
                         // change here col 4 to 3
                        "colSpan": 3,
                        "validations": [
                            {
                                "type": "required",
                                "value": "true",
                                "message": "This field is required."
                            }
                        ]
                    },
                    {
                        "id": 36,
                        "label": "Time",
                        "fieldKey": "air_monitoring_carbon_monoxide_time",
                        "type": "text",
                        "placeholder": null,
                        "order": 5,
                        "optionType": null,
                        "cascadeField": null,
                         // change here col 4 to 3
                        "colSpan": 3,
                        "validations": [
                            {
                                "type": "required",
                                "value": "true",
                                "message": "This field is required."
                            }
                        ]
                    },
                    {
                        "id": 42,
                        "label": "Instrument used",
                        "fieldKey": "instrument_used",
                        "type": "text",
                        "placeholder": null,
                        "order": 6,
                        "optionType": null,
                        "cascadeField": null,
                        // change here col 4 to 6
                        "colSpan": 6,
                        "validations": [
                            {
                                "type": "required",
                                "value": "true",
                                "message": "This field is required."
                            }
                        ]
                    },
                    {
                        "id": 43,
                        "label": "Test conducted by",
                        "fieldKey": "test_conducted_by",
                        "type": "text",
                        "placeholder": null,
                        "order": 7,
                        "optionType": null,
                        "cascadeField": null,
                        // change here col 4 to 3
                        "colSpan": 3,
                        "validations": [
                            {
                                "type": "required",
                                "value": "true",
                                "message": "This field is required."
                            }
                        ]
                    },
                    {
                        "id": 44,
                        "label": "Signature",
                        "fieldKey": "air_monitoring_sign",
                        "type": "text",
                        "placeholder": null,
                        "order": 8,
                        "optionType": null,
                        "cascadeField": null,
                         // change here col 4 to 3
                        "colSpan": 3,
                        "validations": [
                            {
                                "type": "required",
                                "value": "true",
                                "message": "This field is required."
                            }
                        ]
                    }
                ]
            },
            {
                "sectionId": 7,
                "sectionTitle": "Part-2 Endorse by Indiqube Safety Department/Facility In charge",
                "order": 5,
                "fields": [
                    {
                        "id": 45,
                        "label": "Workers are allowed to stay in the confined space from",
                        "fieldKey": "workers_are_allowed",
                        "type": "checkbox",
                        "placeholder": null,
                        "order": 0,
                        "optionType": null,
                        "cascadeField": null,
                        // change here col 1 to 12
                        "colSpan": 12,
                        "validations": [
                            {
                                "type": "required",
                                "value": "true",
                                "message": "This field is required."
                            }
                        ]
                    },
                    {
                        "id": 46,
                        "label": "Control measures are taken to safty gaurd the working personnel",
                        "fieldKey": "control_measures_are_taken",
                        "type": "checkbox",
                        "placeholder": null,
                        "order": 1,
                        "optionType": null,
                        "cascadeField": null,
                        // change here colspan 1 to 12
                        "colSpan": 12,
                        "validations": [
                            {
                                "type": "required",
                                "value": "true",
                                "message": "This field is required."
                            }
                        ]
                    }
                ]
            },
            {
                "sectionId": 8,
                "sectionTitle": "Part- 3 Approval by Indiqube Facility In charge",
                "order": 6,
                "fields": [
                    {
                        "id": 47,
                        "label": "I confirm that adequate safe systems of work will be maintained and that all of required precautions for Confined Space Work on the indiqube site will be undertaken, and the information provided in this form is true and accurate.",
                        "fieldKey": "confirm_adequate_safe_system",
                        "type": "checkbox",
                        "placeholder": null,
                        "order": 0,
                        "optionType": null,
                        "cascadeField": null,
                        // change here col 1 to 12
                        "colSpan": 12,
                        "validations": [
                            {
                                "type": "required",
                                "value": "true",
                                "message": "This field is required."
                            }
                        ]
                    },
                    {
                        "id": 48,
                        "label": "Others",
                        "fieldKey": "part3_others",
                        "type": "textarea",
                        "placeholder": null,
                        "order": 1,
                        "optionType": null,
                        "cascadeField": null,
                        // change here col 1 to 12
                        "colSpan": 12,
                        "validations": [
                            {
                                "type": "required",
                                "value": "true",
                                "message": "This field is required."
                            }
                        ]
                    },
                    {
                        "id": 49,
                        "label": "The permit for Confined Space to work is approved",
                        "fieldKey": "permit_of_confined_space_approved",
                        "type": "radio",
                        "placeholder": null,
                        "order": 2,
                        "optionType": "yes_no",
                        "cascadeField": null,
                        // change here col 1 to 6
                        "colSpan": 6,
                        "validations": [
                            {
                                "type": "required",
                                "value": "true",
                                "message": "This field is required."
                            }
                        ]
                    },
                    {
                        "id": 50,
                        "label": "Name / Sign",
                        "fieldKey": "part3_name_sign",
                        "type": "text",
                        "placeholder": null,
                        "order": 3,
                        "optionType": null,
                        "cascadeField": null,
                         // change here col 6 to 3
                        "colSpan": 3,
                        "validations": [
                            {
                                "type": "required",
                                "value": "true",
                                "message": "This field is required."
                            }
                        ]
                    },
                    {
                        "id": 51,
                        "label": "Date time",
                        "fieldKey": "part3_datetime",
                        "type": "datetime",
                        "placeholder": null,
                        "order": 4,
                        "optionType": null,
                        "cascadeField": null,
                         // change here col 6 to 3
                        "colSpan": 3,
                        "validations": [
                            {
                                "type": "required",
                                "value": "true",
                                "message": "This field is required."
                            }
                        ]
                    }
                ]
            },
            {
                "sectionId": 9,
                "sectionTitle": "Part- 4 Notification of Completion by Applicant / Indiqube person in-charge for work ",
                "order": 7,
                "fields": [
                    {
                        "id": 52,
                        "label": "Work was completed and safe for other works",
                        "fieldKey": "work_completed_safe_for_others",
                        "type": "checkbox",
                        "placeholder": null,
                        "order": 0,
                        "optionType": null,
                        "cascadeField": null,
                        // change here col 1 to 6
                        "colSpan": 6,
                        "validations": [
                            {
                                "type": "required",
                                "value": "true",
                                "message": "This field is required."
                            }
                        ]
                    },
                    {
                        "id": 53,
                        "label": "Name / Sign",
                        "fieldKey": "part4_name_sign",
                        "type": "text",
                        "placeholder": null,
                        "order": 1,
                        "optionType": null,
                        "cascadeField": null,
                        // change here col 6 to 3
                        "colSpan": 3,
                        "validations": [
                            {
                                "type": "required",
                                "value": "true",
                                "message": "This field is required."
                            }
                        ]
                    },
                    {
                        "id": 54,
                        "label": "Date time",
                        "fieldKey": "part4_datetime",
                        "type": "datetime",
                        "placeholder": null,
                        "order": 2,
                        "optionType": null,
                        "cascadeField": null,
                        // change here col 6 to 3
                        "colSpan": 3,
                        "validations": [
                            {
                                "type": "required",
                                "value": "true",
                                "message": "This field is required."
                            }
                        ]
                    }
                ]
            },
            {
                "sectionId": 12,
                "sectionTitle": "Note",
                "order": 9,
                "fields": [
                    {
                        "id": 55,
                        "label": "A copy of the permit must be displayed at the work area.\nThe permit must be returned to the Facility In-Charge after the completion of the work and due closing of the permit.",
                        "fieldKey": "note",
                        "type": "note",
                        "placeholder": null,
                        "order": 0,
                        "optionType": null,
                        "cascadeField": null,
                        // change here col 1 to 12
                        "colSpan": 12,
                        "validations": []
                    }
                ]
            }
        ]
    }
}
     getFormConfig(): Observable<any> {
      const apiUrl = `${this.baseUrl}/Forms/work_permit/1`
       //return this.http.get<any>(apiUrl);
        return of(this.formData)
    }
  
    
}
