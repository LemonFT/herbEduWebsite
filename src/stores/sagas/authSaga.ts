import { fork } from 'redux-saga/effects';


function* getInfoUser(action: string){
    
}

function* watchGetInfoUser(){

}

export default function* authSaga() {
    yield fork(watchGetInfoUser);
  }