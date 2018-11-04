import * as enzyme from "enzyme";
import * as React from "react";
import {Hello} from "./Hello"

it("test some like hello when no enthusiasm ",()=>{
 const hello = enzyme.shallow(<Hello name="zll" />)   
 expect(hello.find(".greeting").text()).toEqual("Hello zll")
})


it('throws when the enthusiasm level is negative', () => {
    expect(() => {
      enzyme.shallow(<Hello name='Daniel' enthusiasmLevel={-1} />);
    }).toThrow();
});