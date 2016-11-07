import {ErrorHandler, Injectable} from "@angular/core";

@Injectable()
export class myErrorHandler implements ErrorHandler {

 /* call(error: any, stackTrace: any = null, reason: any = null) {
    // do something with the exception
    console.log("do something with the exception");
  }*/

  public handleError( error: any ): void {
    console.log(error);
    console.log("I handle the given error");
  }
}
