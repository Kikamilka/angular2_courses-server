import {ErrorHandler, Injectable} from "@angular/core";

@Injectable()
export class myErrorHandler implements ErrorHandler {

  public handleError( error: any ): void {
    console.log("MyErrorHandler handle the given error!");
    console.log(error);
  }
}
