import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  taskName: string;
  taskNumber: string;
  taskList = [];
  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {}

  async ngOnInit(){
    var ret = await Storage.get({ key: 'tasklist' });
    console.log('Storage: ',JSON.parse(ret.value))
    this.taskList = JSON.parse(ret.value).taskList;
  }

  async addTask() {

    if (this.taskName.length > 0 && this.taskNumber.length > 0) {
      
      let task = {
          taskName: this.taskName,
          taskNumber: this.taskNumber
        } ;
        
        this.taskList.push(task);

        await Storage.set({
          key: 'tasklist',
          value: JSON.stringify({
            taskList: this.taskList,
          })
        });

        this.taskName = "";
        this.taskNumber="";
    } // to add new contact in phone book

}

async deleteTask(index){
  this.taskList.splice(index, 1);
  await Storage.set({
    key: 'tasklist',
    value: JSON.stringify({
      taskList: this.taskList,
    })
  });
   // deletion of contact
}
 async updateTask(taskName,taskNumber) {
  let alert = this.alertCtrl.create({
      message: 'Type in your info.',
      inputs: [{ name: 'edit', placeholder: 'info' }],
      buttons: [{ text: 'Cancel', role: 'cancel' },
                { text: 'Update', handler: data => {
                  console.log('Edited: ',data)
                    this.taskList[this.taskName,this.taskNumber] = data.editTask; 
                    let itemIndex = this.taskList.findIndex(item => item.taskName == data.editTask.taskName);
                    this.taskList[itemIndex] = data.editTask;
                  }
                }
               ]
  });
  (await alert).present();
} //updating contact

async saveValue(){
await Storage.set({
  key: 'user',
  value: JSON.stringify({
    username: this.taskName,
    password: this.taskNumber
  })
});
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
