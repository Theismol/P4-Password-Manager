import React from "react";
import logo from "../../assets/images/logo.png";

function Home() {
    return (
        <div style={{ display: "flex" }}>
            <div style={{ flex: "0 0 50%" }}>
                <img src={logo} alt="logo" style={{ width: "100%" }} />
            </div>
            <div style={{ flex: "0 0 50%", paddingLeft: "20px" }}>
                <h1 style={{ fontFamily: "Roboto", fontWeight: 700 }}>Welcome to AccessArmor</h1>
                <div style={{ width: "70%" }}>
                    <p style={{ fontFamily: "Roboto" }}>Congratulations on choosing AccessArmor, your trusted ally in safeguarding your digital world! Developed by the bright minds of the 4th semester Bachelor Cyber and Computer Technology students, AccessArmor stands as a testament to our commitment to fortifying your online security with cutting-edge technology. In today's interconnected world, protecting your sensitive information is paramount. With AccessArmor, you can rest assured that your passwords, the keys to your digital kingdom, are fortified behind an impenetrable shield of security.</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
