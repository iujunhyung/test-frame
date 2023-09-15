import { makeAutoObservable } from "mobx";
import axios from 'axios';

export class IdentityStore {

  email: string | null = null;
  name: string | null = null;
  phone: string | null = null;
  
  constructor() {
    makeAutoObservable(this);
  }

  async getClaimAsync(type: string) {
    const r = await axios.get(`/identity/claims?type=${type}`);
    if (r.status == 200) {
      return r.data;
    } else {
      return null;
    }
  }

  async UpdateAsync() {
    this.email = await this.getClaimAsync('http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress')
    this.name = await this.getClaimAsync('http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname')
    this.phone = await this.getClaimAsync('http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone')
  }
}

export const identityStore = new IdentityStore();
