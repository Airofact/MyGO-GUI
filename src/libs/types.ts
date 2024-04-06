export interface Transaction {
  id: number
  user_id: number
  title: string
  description: string
  value: number
  createdAt: number
  updatedAt: number
}

export enum TransactionStatus {
  DRAFT = "Draft",
  CENSORING = "Censoring",
  REJECT = "Reject",
  PASSED = "Passed"
}

//export enum Role
export enum Role {
  OLD = "Old",
  VOLUNTEER = "Volunteer",
  ADMIN = "Adim"
}