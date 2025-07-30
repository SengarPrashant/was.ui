export interface basicLookupModel {
  id: number
  name:string
}

export interface allLookupModel {
  optionType: string | null
  optionKey: string | null
  optionValue: string
  cascadeKey: any
  cascadeType: any
  isActive: boolean
}
