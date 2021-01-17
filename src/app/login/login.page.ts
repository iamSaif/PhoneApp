import { escapeRegExp } from '@angular/compiler/src/util';
import { Component, OnInit} from '@angular/core';
import { Plugins } from '@capacitor/core';
import { NavController } from '@ionic/angular';
import { Tab1Page } from '../tab1/tab1.page';

const { Storage } = Plugins;
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  user:any
  pass:any
  constructor(
    public navCtrl: NavController
    ) { }

  ngOnInit() {
    
  }
  
  // JSON "set" example
  async LoginObject() {
    console.log(this.user,this.pass);

    //Check the username and password
    if(this.user == 'Saif' && this.pass == 'Saif123') 
    {
    await Storage.set({
      key: 'user',
      value: JSON.stringify({
        username: this.user,
        password: this.pass
      })
    });
    // Navigate to the main page using Nav controller
    this.navCtrl.navigateRoot('tabs/tab1');
  }
  else
  {
   alert('Invaid Username or Password')  
  }
}
  
  // JSON "get" example
  async getObject() {
    const ret = await Storage.get({ key: 'user' });
    const user = JSON.parse(ret.value);
  }
  
  async setItem() {
    await Storage.set({
      key: 'name',
      value: 'Max'
    });
  }
  
  async getItem() {
    const { value } = await Storage.get({ key: 'name' });
    console.log('Got item: ', value);
  }
  
  async removeItem() {
    await Storage.remove({ key: 'name' });
  }
  
  async keys() {
    const { keys } = await Storage.keys();
    console.log('Got keys: ', keys);
  }
  
  async clear() {
    await Storage.clear();
  }
}

