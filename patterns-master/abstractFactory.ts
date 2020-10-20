interface Button {
   paint();
}

interface GUIFactory {
   createButton(): Button;
}

class WinButton implements Button {
   public paint() {
      console.log("Windows Button");
   }
}

class OSXButton implements Button {
   public paint() {
      console.log("OSX Button");
   }
}


class WinFactory implements GUIFactory {
   public createButton(): Button {
      return new WinButton();
   }
}

class OSXFactory implements GUIFactory {
   public createButton(): Button {
      return new OSXButton();
   }
}

let appearance = "osx";

let factory = null;

switch (appearance) {
   case "win":
      factory = new WinFactory();
      break;
   case "osx":
      factory = new OSXFactory();
      break;
   default:
      throw new Error(`Unkown appearance ${appearance}`);
}

if (factory) {
   const button = factory.createButton();
   button.paint();
}
