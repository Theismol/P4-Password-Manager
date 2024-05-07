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
                    <ul style={{ fontFamily: "Roboto", fontSize:20, }}>
                        <li style={{ marginBottom: "10px" }}>Military-Grade Encryption: Your passwords are encrypted using state-of-the-art algorithms, ensuring they remain inaccessible to prying eyes.</li>
                        <li style={{ marginBottom: "10px" }}>Cross-Platform Compatibility: Seamlessly access your passwords across all your devices, whether it's your laptop, smartphone, or tablet.</li>
                        <li style={{ marginBottom: "10px" }}>Intuitive Interface: Say goodbye to password-related headaches. AccessArmor offers a user-friendly interface designed for effortless navigation and ease of use.</li>
                        <li style={{ marginBottom: "10px" }}>Multi-Layered Security: From two-factor authentication to biometric verification, AccessArmor employs multiple layers of security to thwart any unauthorized access attempts.</li>
                        <li style={{ marginBottom: "10px" }}>Continuous Updates: Our dedicated team is constantly refining and enhancing AccessArmor to stay ahead of emerging threats, ensuring you're always protected.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Home;
