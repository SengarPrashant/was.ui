export interface wpListModel {
  data: wpList[]
  meta: metaDataModel[]
}

export interface wpList {
  requestId: string
  id: number
  formId: number
  submittedDate: string
  shortDesc: any
  formData: any
  status: generalTypeModel
  pendingWith: generalTypeModel
  submittedBy: generalTypeModel
  facilityZoneLocation: generalTypeModel
  zone: generalTypeModel
  zoneFacility: generalTypeModel
  project: any
  documentCount: number
  formTitle: string
  formDes: any
  formType: string
  formTypeKey: string
}

export interface generalTypeModel {
  key: string
  value: string
}

export interface metaDataModel {
  count: number
  formType: string
  status: string
  icon?:string
}

// get form data by id model

export interface workflowModel {
  level?:string
  actionBy: string
  actionDate: string
  action: string
  remarks: string
}

export interface DocumentModel {
  id: number
  formSubmissionId: number
  fileName: string
  contentType: string
  content: any
}


export interface formDataByIDModel {
  documents: DocumentModel[]
  workflow: workflowModel[]
  requestId: string
  id: number
  formId: number
  submittedDate: string
  shortDesc: string
  formData: any
  status: generalModel
  pendingWith: generalModel
  submittedBy: generalModel
  facilityZoneLocation: generalModel
  zone: generalModel
  zoneFacility: generalModel
  project: any
  documentCount: number
  formTitle: string
  formDes: any
  formType: string
  formTypeKey: string
}


export interface generalModel {
  key: string
  value: string
}
