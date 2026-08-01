import { type IconType } from 'react-icons'

export interface BookingFormData {
  senderName: string
  senderEmail: string
  senderPhone: string
  senderCompany: string
  senderAddress: string
  senderCity: string
  senderCountry: string
  receiverName: string
  receiverEmail: string
  receiverPhone: string
  receiverCompany: string
  receiverAddress: string
  receiverCity: string
  receiverCountry: string
  packageType: string
  packageWeight: number
  packageLength: number
  packageWidth: number
  packageHeight: number
  packageQuantity: number
  packageDescription: string
  shippingMethod: string
  courier: string
}

export interface ShippingMethodOption {
  id: string
  label: string
  desc: string
  days: string
  rate: number
  icon: IconType
}

export interface CourierOption {
  id: string
  name: string
  initials: string
  rate: number
  deliveryDays: string
  rating: number
  color: string
  bgColor: string
}

export const defaultFormData: BookingFormData = {
  senderName: '',
  senderEmail: '',
  senderPhone: '',
  senderCompany: '',
  senderAddress: '',
  senderCity: '',
  senderCountry: '',
  receiverName: '',
  receiverEmail: '',
  receiverPhone: '',
  receiverCompany: '',
  receiverAddress: '',
  receiverCity: '',
  receiverCountry: '',
  packageType: '',
  packageWeight: 0,
  packageLength: 0,
  packageWidth: 0,
  packageHeight: 0,
  packageQuantity: 1,
  packageDescription: '',
  shippingMethod: '',
  courier: '',
}

export const stepLabels = ['Sender', 'Receiver', 'Package', 'Method', 'Courier', 'Review', 'Confirmation']

export const stepFields: Record<number, (keyof BookingFormData)[]> = {
  0: ['senderName', 'senderEmail', 'senderPhone', 'senderAddress', 'senderCity', 'senderCountry'],
  1: ['receiverName', 'receiverEmail', 'receiverPhone', 'receiverAddress', 'receiverCity', 'receiverCountry'],
  2: ['packageType', 'packageWeight', 'packageLength', 'packageWidth', 'packageHeight', 'packageQuantity', 'packageDescription'],
  3: ['shippingMethod'],
  4: ['courier'],
  5: [],
  6: [],
}
