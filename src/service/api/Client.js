import axios from 'axios';
import jwt from 'jsonwebtoken';
import Vue from 'vue';
import AuthService from '../AuthService';

export default class Client {
  constructor() {
    this.client = axios.create({
      baseURL: process.env.API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.client.interceptors.request.use((config) => {
      try {
        const sessionToken = Vue.$cookies.get('sessionToken');
        jwt.verify(sessionToken, Buffer.from(process.env.JWT_SIGNATURE, 'base64'), { algorithms: ['HS256'] });
        config.headers.Authorization = `Bearer ${sessionToken}`;
        return config;
      } catch (e) {
        const authService = new AuthService();
        return authService.generateApiToken();
      }
    });
  }

  async post(url, resource) {
    try {
      const resp = await this.client.post(url, resource);
      return resp.data;
    } catch (e) {
      // console.log('Não consegue');
      return null;
    }
  }
}
