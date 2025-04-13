import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

// class
actor DBank {
  // var currentValue = 300;
  stable var currentValue: Float = 300; // persistent variable (stable var)
  // currentValue := 100; // re-assign

  stable var startTime = Time.now(); // since January 1, 1970
  // startTime := Time.now();
  Debug.print(debug_show(startTime));

  let id = 5522334; // similarly to const - immutable

  // Debug.print("Hello"); // debug
  // Debug.print(debug_show(currentValue));

// private function (without public) 
// public: dfx canister call dbank topUp
  public func topUp(amount: Float){   // Nat = natural number
    currentValue += amount;
    Debug.print(debug_show(currentValue));
  };

  public func topDown(amount: Float) {
    let tempValue: Float = currentValue - amount; // need to specify integer (Int) or float
    Debug.print(debug_show(tempValue));
    if (tempValue >= 0){
      currentValue -= amount;
      
    } else {
      Debug.print("Too large amount.");
    }
  };

  public query func checkBalance(): async Float {
    return currentValue;
  }; // need ;

  public func compound() {
    let currentTime = Time.now();
    let timeElapsedNS = currentTime - startTime;
    let timeElapsedS = timeElapsedNS / 1000000000;
    currentValue := currentValue * (1.01 ** Float.fromInt(timeElapsedS));  // compound
    startTime := currentTime;
  };

};
