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
