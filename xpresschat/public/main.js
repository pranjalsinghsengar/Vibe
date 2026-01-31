// import { orderStatus } from "../apis/orders/controller";
 
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed");
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    const style = document.createElement("style");
    style.innerHTML = `
      * {
        font-family: 'Roboto', sans-serif !important;
      }
    `; 
    document.head.appendChild(style);
    // working code till 10 march
    function InitChatbot(targetId) {
      const container = document.createElement("div");
      container.id = "chat-container";
      container.style.cssText = `
      width: 100%;
      height: 68vh;
      max-width: 28%;
      overflow: hidden;
      background-color: #fff;
      position: fixed;
      bottom: 20px;
      right: 20px;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
      display: none;
      flex-direction: column;
      padding: 0;
      z-index: 1000;
      font-family: 'ITC Avant Garde Gothic Pro Medium', sans-serif;
    `;
   
      // 🌟 Add Responsive Styles for Tablet & Mobile in One <style> Tag
      const style = document.createElement("style");
      style.innerHTML = `
      @media only screen and (max-width: 768px) {
         #chat-container {
        width: 45% !important;
        height: 72vh !important;
        max-width: 43% !important;
        bottom: 10px !important;
        right: 10px !important;
        position: fixed !important;
      }
      }
      @media only screen and (max-width: 430px) {
         #chat-container {
        width: 90% !important;
        height: 80vh !important;
        max-width: 90% !important;
        bottom: 8px !important;
        right: 8px !important;
        position: fixed !important;
      }
      }
    `;
      document.head.appendChild(style);
   
      // Create chat section
      const chatSection = document.createElement("div");
      chatSection.id = "chat-section";
      chatSection.style.cssText = `
        display: flex;
        flex-direction: column;
        height: 100%;
    `;
   
      // Create and append header
      const header = document.createElement("div");
      header.style.cssText = `
        background: linear-gradient(90deg, #6a1b9a 0%);
        color: white;
        padding: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: sticky;
        top: 0;
    `;
      header.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <img src="http://localhost:5050/FINAL_BOT-02.png" alt="Bot" style="width: 48px; height: 40px;">
            <span style="font-size: 20px;">Chat with us</span>
        </div>
        <div id="closeChat" style="cursor: pointer; font-size: 20px; color: white;">X</div>
    `;
      chatSection.appendChild(header);
   
      setTimeout(() => {
        document.getElementById("closeChat").onclick = () => {
          const container = document.getElementById("chat-container");
          const chatbutton = document.getElementById("chatButton");
          if (container) {
            container.style.display =
              container.style.display === "none" ? "block" : "none";
            chatbutton.style.display = "flex";
          }
        };
      }, 0);
   
      // Create and append messages container
      const messagesContainer = document.createElement("div");
      messagesContainer.id = "chat-messages";
      messagesContainer.style.cssText = `
        flex-grow: 1;
        overflow-y: auto;
        padding: 15px;
        background-color: white;
        display: flex;
        flex-direction: column;
        gap: 15px;
    `;
      chatSection.appendChild(messagesContainer);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      // Create and append input area
      const inputArea = document.createElement("div");
      inputArea.style.cssText = `
      padding: 8px 2px;
      background: white;
      border-top: 1px solid rgb(224, 224, 224);
      display: flex;
      align-items: center;
      /* gap: 2px; */
      position: sticky;
      bottom: 0px;
      width: 96%;
  `;
      function updateWidth() {
        if (window.innerWidth <= 430) {
          inputArea.style.width = "98%";
          inputArea.style.bottom = "0px";
          inputArea.style.padding = "6px 0px";
        } else {
          inputArea.style.width = "96%";
        }
      }
   
      // Initial check aur event listener add karna
      updateWidth();
      window.addEventListener("resize", updateWidth);
   
      // Creating file input (hidden) and label as an icon
      const fileLabel = document.createElement("label");
      fileLabel.setAttribute("for", "file-input");
      fileLabel.setAttribute("id", "file");
      fileLabel.innerHTML = "📎";
      fileLabel.style.cssText = `
    cursor: pointer;
    font-size: 28px;
    color: gray;
  `;
   
      const fileInput = document.createElement("input");
      fileInput.setAttribute("type", "button");
      fileInput.setAttribute("id", "file-input");
      fileInput.style.display = "none";
   
      // Wrapping input and button together
      const inputWrapper = document.createElement("div");
      inputWrapper.style.cssText = `
    flex:1;
    display: flex;
    align-items: center;
    border: 2px solid #6a1b9a;
    border-radius: 50px;
    overflow: hidden;
    padding: 4px;
  `;
   
      function updatePadding() {
        if (window.innerWidth <= 430) {
          inputWrapper.style.padding = "0";
        } else {
          inputWrapper.style.padding = "4px";
        }
      }
   
      // Initial check aur event listener add karna
      updatePadding();
      window.addEventListener("resize", updatePadding);
   
      // Creating the text input field
      const chatInput = document.createElement("input");
      chatInput.setAttribute("type", "text");
      chatInput.setAttribute("id", "chat-input");
      chatInput.setAttribute("placeholder", "Type a message");
      chatInput.style.cssText = `
    flex:1;
    padding: 10px 8px;
    border: none;
    outline: none;
    font-size: 16px;
    font-family: 'Roboto', sans-serif;
  `;
   
      function updateFontSize() {
        if (window.innerWidth <= 430) {
          chatInput.style.fontSize = "14px";
          chatInput.style.padding = "10px 10px";
        } else {
          chatInput.style.fontSize = "16px";
        }
      }
   
      // Initial check and event listener for resize
      updateFontSize();
      window.addEventListener("resize", updateFontSize);
   
      // Creating the send button
      const sendButton = document.createElement("button");
      sendButton.setAttribute("id", "send-btn");
      sendButton.innerHTML = "➤";
      sendButton.style.cssText = `
    background: none;
    border: none;
    font-size: 29px;
    cursor: pointer;
    color: #6a1b9a;
  `;
   
   
      // Appending elements in order
      inputWrapper.appendChild(chatInput);
      inputWrapper.appendChild(sendButton);
      inputArea.appendChild(fileLabel);
      inputArea.appendChild(fileInput);
      inputArea.appendChild(inputWrapper);
   
      chatSection.appendChild(inputArea);
      container.appendChild(chatSection);
      document.body.appendChild(container);
   
      // Setup WebSocket connection
      const socket = setupChatInputListener();
   
      // Add initial bot message and options
    //   addBotMessage(
    //     "Hi there! 👋 Welcome to BOT. I am here to assist you with orders, tracking, returns, and more. Let us know how we can help!",
    //     "BOT"
    //   );

      checkForTokenAndInitialize();
      // addLoginMethods();
      // handlePostLoginFlow()
      // Add chat button
      addChatButton();
   
      return socket;
    }
    function checkForTokenAndInitialize() {
      // Get all cookies
      const cookies = document.cookie.split(';');
      // Look for accessToken cookie
      const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('accessToken='));
      
      if (tokenCookie) {
          // Extract the token value
          const token = tokenCookie.trim().substring('accessToken='.length);
          // Call handlePostLoginFlow with the token
          handlePostLoginFlow(token);
      } else {
          // No token found, can handle pre-login flow here if needed
        //   addLoginMethods();
      }
  }
   
    
    function addBotMessage(message, sender = "BOT") {
      const messagesContainer = document.getElementById("chat-messages");
      if (!messagesContainer) return;
   
      const messageWrapper = document.createElement("div");
      messageWrapper.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 5px;
      `;
   
      // Add sender name
      const senderDiv = document.createElement("div");
      senderDiv.style.cssText = `
        color: #6a1b9a;
        font-size: 14px;
        margin-left: 40px;
      `;
      senderDiv.textContent = sender;
      messageWrapper.appendChild(senderDiv);
   
      // Add message with bot icon
      const messageDiv = document.createElement("div");
      messageDiv.style.cssText = `
        display: flex;
        align-items: flex-start;
        gap: 10px;
      `;
      messageDiv.innerHTML = `
        <img src="http://localhost:5050/finalbot-06.jpg" alt="Bot" style="width: 30px; height: 30px; border-radius: 50%;">
        <div style="
          background: #f5f5f5;
          padding: 15px;
          border-radius: 20px;
          max-width: 80%;
          font-size: 14px;
        ">${message}</div>
      `;
      messageWrapper.appendChild(messageDiv);
      messagesContainer.appendChild(messageWrapper);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
   
    function addUserMessage(message) {
      const messagesContainer = document.getElementById("chat-messages");
      if (!messagesContainer) return;
   
      const messageDiv = document.createElement("div");
      messageDiv.style.cssText = `
        display: flex;
        justify-content: flex-end;
        margin: 10px 0;
      `;
      messageDiv.innerHTML = `
        <div style="
          background: #6a1b9a;
          color: white;
          padding: 15px;
          border-radius: 20px;
          max-width: 80%;
          font-size: 14px;
        ">${message}</div>
      `;
      messagesContainer.appendChild(messageDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    function handleUserInput() {
      const chatInput = document.getElementById("chat-input");
      const message = chatInput.value.trim();
   
      if (!message) return;
   
      addUserMessage(message);
   
      if (/^\d{10}$/.test(message)) {
        // Valid phone number
        setTimeout(() => {
          addBotMessage("Please enter your password", "BOT");
        }, 1000);
      } else {
        // Invalid input
        setTimeout(() => {
          addBotMessage(
            "Invalid phone number. Please enter a valid 10-digit number.",
            "BOT"
          );
        }, 1000);
      }
   
      chatInput.value = "";
   
      // Event listeners
      document
        .getElementById("send-btn")
        .addEventListener("click", handleUserInput);
      document.getElementById("chat-input").addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
          handleUserInput();
        }
      });
    }
   
    // function addLoginMethods() {
    //   const messagesContainer = document.getElementById("chat-messages");
    //   if (!messagesContainer) return;
   
    //   const methodsDiv = document.createElement("div");
    //   methodsDiv.style.cssText = `
    //   display: flex;
    //   gap: 10px;
    //   margin-top: 5px;
    //   justify-content: center;
    // `;
   
    //   const methods = ["Login with OTP", "Login with Password"];
   
    //   methods.forEach((method) => {
    //     const button = document.createElement("button");
    //     button.style.cssText = `
    //     background: none;
    //     border: 2px solid #E62A86;
    //     color: #762F88;
    //     padding: 8px 20px;
    //     border-radius: 50px;
    //     cursor: pointer;
    //     font-size: 14px;
    //     text-align: center;
    //     transition: all 0.3s;
    //   `;
    //     button.textContent = method;
    //     button.onmouseover = () => {
    //       button.style.background = "#E8ABC8";
    //       button.style.color = "#762F88";
    //       // button.style.border = "none"; 
    //       // button.style.padding = "14px 27px"; 
    //     };
    //     button.onmouseout = () => {
    //       button.style.background = "none";
    //       button.style.color = "#762F88";
    //       button.style.border = "2px solid #E62A86"; // Restore border
    //       button.style.padding = "12px 25px"; // Restore original padding
    //     };
    //     button.onclick = () => {
    //       addUserMessage(method);
    //       if (method.includes("OTP")) {
    //         addBotMessage(
    //           "Please enter your mobile number to receive OTP",
    //           "BOT"
    //         );
    //         const chatInput = document.getElementById("chat-input");
    //         chatInput.setAttribute("data-expecting", "otp-mobile");
    //         chatInput.setAttribute("type", "text"); // or "tel"
    //         // If OTP login requires an initial API call, put it here:
    //         // fetch('/api/request-otp', { ... }).then(...).catch(...);
    //       } else {
    //         // Login with password
    //         addBotMessage("Please enter your mobile number", "BOT");
    //         const chatInput = document.getElementById("chat-input");
    //         chatInput.setAttribute("data-expecting", "mobile");
    //         chatInput.setAttribute("type", "text"); // or "tel"
    //       }
    //     };
    //     methodsDiv.appendChild(button);
    //   });
   
    //   messagesContainer.appendChild(methodsDiv);
    //   messagesContainer.scrollTop = messagesContainer.scrollHeight;
    // }
   
    // Add this to your InitChatbot function where you set up the chat input event listener
    let loginDetails = {
      username: "",
      password: "",
    };
    // Modified handleMobileInput function with input restriction
   
    function handleMobileInput(mobile) {
      // Remove socket parameter
      if (!/^\d{10}$/.test(mobile)) {
        addBotMessage("Please enter a valid 10-digit mobile number.", "BOT");
        return;
      }
   
      loginDetails.username = mobile;
      addUserMessage(mobile);
   
      // API call for mobile number verification (if needed)
      fetch("http://localhost:5050/api/verify-mobile", {
        // Replace with your actual API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            addBotMessage("Please enter your password", "BOT");
            const chatInput = document.getElementById("chat-input");
            chatInput.setAttribute("data-expecting", "password");
            chatInput.setAttribute("type", "password");
          } else {
            addBotMessage(
              data.message || "Mobile number verification failed.",
              "BOT"
            );
          }
        })
        .catch((error) => {
          console.error("API error:", error);
          addBotMessage("An error occurred. Please try again later.", "BOT");
        });
    }
    let otpSessionId;
    async function handleOtpInput(mobile) {
      if (!/^\d{10}$/.test(mobile)) {
        addBotMessage("Please enter a valid 10-digit mobile number.", "BOT");
        return;
      }
      addUserMessage(mobile);
      
      const payload = {
        "mobileNumber": mobile,
        "otpTemplateId": "591ec0f0bde6ce00083cdb45"
      };
      
      console.log("Sending payload:", JSON.stringify(payload));
      
      try {
        const response = await fetch("https://api-preprod.ailiens.com/d/apiV2/otp/generateOtp/v3/flash", {
          method: "POST",
          headers: {
            "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
            "Connection": "keep-alive",
            "Content-Type": "application/json",
            "Origin": "https://preprod.nnnow.com",
            "Referer": "https://preprod.nnnow.com/",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "cross-site",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
            "accept": "application/json",
            "bbversion": "v2",
            "clientSessionId": "1744601724291",
            "correlationId": "2015c0fc-65ab-480e-b5c6-7c88fd607819",
            "module": "odin",
            "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            // Adding X-Tenant-ID just in case
            "X-Tenant-ID": "sephora",
            // Add Cache-Control header
            "Cache-Control": "no-cache",
            // Adding Pragma header
            "Pragma": "no-cache",
          },
          body: JSON.stringify(payload),
          // Add these options to be more like browser behavior
          mode: 'cors',
          credentials: 'include',
          cache: 'no-cache',
          redirect: 'follow',
        });
        
        console.log("Response status:", response.status);
        
        const responseText = await response.text();
        console.log("Raw response:", responseText);
        
        let data;
        try {
          data = JSON.parse(responseText);
        } catch (e) {
          console.error("Error parsing JSON:", e);
          addBotMessage("An error occurred processing the server response.", "BOT");
          return;
        }
        
        console.log("Parsed data:", data);
        
        if (data.status) {
          otpSessionId = data.data?.sessionID;
          console.log("otpSessionId------------>", otpSessionId);
          
          addBotMessage("Please enter the OTP sent to your mobile number", "BOT");
          const chatInput = document.getElementById("chat-input");
          chatInput.setAttribute("data-expecting", "otp-password");
          chatInput.setAttribute("type", "password");
        } else {
          addBotMessage(
            data.message || "Mobile number verification failed.",
            "BOT"
          );
        }
      } catch (error) {
        console.error("API error:", error.stack);
        addBotMessage("An error occurred while verifying your mobile number. Please try again later.", "BOT");
      }
  }
      
      
  async function handleOtpPasswordInput(password) {
      alert("otp daviation");
      if (!password || password.length < 6) {
        addBotMessage("Password must be at least 6 characters long.", "BOT");
        return;
      }
      addUserMessage(mobile);
      
      try {
        const payload = {
          "mobileNumber": mobile,
          "otpTemplateId": "591ec0f0bde6ce00083cdb45"
        };
        
        console.log("Sending OTP request with payload:", payload);
        
        const response = await fetch("https://api-preprod.ailiens.com/d/apiV2/otp/generateOtp/v3/flash", {
          method: "POST",
          headers: {
            "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
            "Connection": "keep-alive",
            "Content-Type": "application/json",
            "Origin": "https://preprod.nnnow.com",
            "Referer": "https://preprod.nnnow.com/",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "cross-site",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
            "accept": "application/json",
            "bbversion": "v2",
            "clientSessionId": "1744601724291", // Keep original clientSessionId
            "correlationId": "2015c0fc-65ab-480e-b5c6-7c88fd607819", // Keep original correlationId
            "module": "odin",
            "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
          },
          body: JSON.stringify(payload),
        });
        
        // Log the full response for debugging
        console.log("API response status:", response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error("API error response:", errorText);
          throw new Error(`API responded with status ${response.status}: ${errorText}`);
        }
        
        const data = await response.json();
        console.log("API response data:", data);
        
        if (data.status) {
          otpSessionId = data.data?.sessionID;
          console.log("otpSessionId------------>", otpSessionId);
          
          addBotMessage("Please enter the OTP sent to your mobile number", "BOT");
          const chatInput = document.getElementById("chat-input");
          chatInput.setAttribute("data-expecting", "otp-password");
          chatInput.setAttribute("type", "password");
        } else {
          addBotMessage(
            data.message || "Mobile number verification failed.",
            "BOT"
          );
        }
      } catch (error) {
        console.error("API error:", error);
        addBotMessage("An error occurred while verifying your mobile number. Please try again later.", "BOT");
      }
  }
    
  async function handleOtpPasswordInput(credentials) {
    console.log("credentials----->", credentials);
    const payload = {
      otpDetails: {
        sessionID: otpSessionId, // This should now contain the correct sessionID from the first API
        passPhrase: credentials.password || credentials,
      },
      mobileNumber: {
        countryCallingCode: "+91",
        mobileNumber: mobile,
      },
      grant_type: "otp",
    };
   
    console.log("payload------------->", payload);
    
    const config = {
      method: "POST",
      headers: {
        "Host": "api-preprod.nnnow.com",
        "correlationId": "19241A48-6062-4B53-9177-BBF705633E54",
        "Accept": "*/*",
        "appversion": "2.4.9",
        "Accept-Language": "en-IN;q=1.0, kn-IN;q=0.9",
        "APIVersion": "0",
        "module": "ios",
        "platform": "ios",
        "package": "com.nnnow.ios",
        "User-Agent": "NNNOW/2.4.9 (com.nnnow.ios; build:23; iOS 16.6.0) Alamofire/2.4.9",
        "Connection": "keep-alive",
        "BuildNo": "23",
        "Pragma": "no-cache",
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
        "X-Channel": "ios",
        "X-Tenant-ID": "sephora", // Added as per previous fix
      },
      body: JSON.stringify(payload),
    };
   
    const response = await fetch(
      "https://api-preprod.nnnow.com/bb/users/end-user/v3/token",
      config
    );
    
    const data = await response.json();
    console.log("API response:", data);
    return data;
  }
    
    var islogin = false
    var acToken  = null 
    function handlePasswordInput(password) {
   
      // if(loggedIn == true){
      //   handlePostLoginFlow(token)
      //   return ;
      // }
      // Remove socket parameter
     if(islogin == true){
      addUserMessage(`${password}`);
      handlePostLoginFlow(acToken);
      return
     }
   
      if (!password || password.length < 6) {
        addBotMessage("Password must be at least 6 characters long.", "BOT");
        return;
      }
   
      addUserMessage("********");
      loginDetails.password = password;
   
      // API call for password login
      handlePasswordLogin({ username: loginDetails.username, password: password })
        .then((apiResponse) => {
          // ... (handle successful API response - store tokens, user data, etc. as before)
          const accessToken = apiResponse?.data?.access_token;
          // localStorage.setItem("accessToken", accessToken);
          // localStorage.setItem("refreshToken", apiResponse?.data?.refresh_token);
          if (apiResponse?.user) {
            localStorage.setItem("userDetails", JSON.stringify(apiResponse.user));
          }
   
          // Store basic auth state
          localStorage.setItem("chatLoginState", "authenticated");
          // localStorage.setItem("userMobile", loginDetails.username);
          // document.cookie = "userMobile=" + loginDetails.username + "; path=/;max-age=86400";
          // document.cookie = "accessToken="+ accessToken + ";path=/;max-age=86400";
          // document.cookie = "refreshToken=" + apiResponse?.data?.refresh_token + ";path=/;max-age=86400";
   
          addBotMessage("Login successful!", "BOT");
          localStorage.setItem("accessToken", accessToken);
          const chatInput = document.getElementById("chat-input");
          chatInput.setAttribute("type", "text");
          // Pass the accessToken to handlePostLoginFlow
          acToken = accessToken
          handlePostLoginFlow(accessToken);
          
        })
        .catch((error) => {
          console.error("API login error:", error);
          addBotMessage(
            error.message || "Login failed. Please try again.",
            "BOT"
          ); // Display error message
          resetLoginFlow(); // Reset the login flow on error
        });
    }
 
   
    function handleLoginResponse(response) {
      if (response.success) {
        try {
          // Make API call to get full login details
          handlePasswordLogin({
            username: loginDetails.username,
            password: loginDetails.password,
          })
            .then((apiResponse) => {
              // API call successful - store tokens and user data
              const accessToken = apiResponse?.data?.access_token;
              localStorage.setItem("accessToken", accessToken);
              // localStorage.setItem(
              //   "refreshToken",
              //   apiResponse?.data?.refresh_token
              // );
              if (apiResponse?.user) {
                localStorage.setItem(
                  "userDetails",
                  JSON.stringify(apiResponse.user)
                );
              }
   
              // Store basic auth state
              localStorage.setItem("chatLoginState", "authenticated");
              // localStorage.setItem("userMobile", loginDetails.username);
              // document.cookie = "userMobile=" + loginDetails.username + "; path=/;max-age=86400";
              // document.cookie = "accessToken="+ accessToken + ";path=/;max-age=86400";
              // document.cookie = "refreshToken=" + apiResponse?.data?.refresh_token + ";path=/;max-age=86400";
              addBotMessage("Login successful!", "BOT");
              // Pass the accessToken to handlePostLoginFlow
              handlePostLoginFlow(accessToken);
            })
            .catch((error) => {
              console.error("API login error:", error);
              addBotMessage(
                "Login successful but couldn't sync all data. Some features might be limited.",
                "BOT"
              );
            });
        } catch (error) {
          console.error("Error during login process:", error);
        }
      } else {
        addBotMessage(
          response.message || "Login failed. Please try again.",
          "BOT"
        );
        resetLoginFlow();
      }
    }
   
    function getCookie(name){
      let cookies = document.cookie.split(';');
      // console.log("cookies------------>", cookies);
      for (let cookie of cookies){
        let [key , value] = cookie.split('=');
        key = key.trim();
        if(key===name){
          return decodeURIComponent(value)
        }
      }
      return null
    }
   
    let userMobile = getCookie("mobileNumber");
    let accessToken = localStorage.getItem("accessToken");       
    let refreshToken = getCookie("refreshToken");
    // console.log("refresh_token------------>", refreshToken);
    // console.log("access_token------------>", accessToken); 
    // console.log("userMobile------------>", userMobile);
   
    function resetLoginFlow() {
      loginDetails = {
        username: "",
        password: "",
      };
      const chatInput = document.getElementById("chat-input");
      chatInput.setAttribute("type", "text");
      chatInput.setAttribute("data-expecting", "mobile");
    }
   
    async function handleOtpPasswordLogin(credentials) {
      console.log("credentials----->", credentials);
      const payload = {
        otpDetails: {
          sessionID: otpSessionId,
          passPhrase: credentials.password || credentials ,
        },
        mobileNumber: {
          countryCallingCode: "+91",
          mobileNumber: "7409329671",
        },
        grant_type: "otp",
      };
   
      console.log("payload------------->", payload);
      
      const config = {
        method: "POST",
        headers: {
          "Host": "api-preprod.nnnow.com",
          "correlationId": "19241A48-6062-4B53-9177-BBF705633E54",
          "Accept": "*/*",
          "appversion": "2.4.9",
          "Accept-Language": "en-IN;q=1.0, kn-IN;q=0.9",
          "APIVersion": "0",
          "module": "ios",
          "platform": "ios",
          "package": "com.nnnow.ios",
           "User-Agent": "NNNOW/2.4.9 (com.nnnow.ios; build:23; iOS 16.6.0) Alamofire/2.4.9",
           "Connection": "keep-alive",
           "BuildNo": "23",
           "Pragma": "no-cache",
           "Cache-Control": "no-cache",
          "Content-Type": "application/json",
          "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
          // Connection: "keep-alive",
          // Origin: "https://preprod.nnnow.com",
          // Referer: "https://preprod.nnnow.com/",
          "X-Channel": "ios",
          // "X-Tenant-ID": "sephora",
          // accept: "application/json",
          // bbversion: "v2",
          // module: "odin",
        },
        body: JSON.stringify(payload),
      };
   
      const response = await fetch(
        "https://api-preprod.nnnow.com/bb/users/end-user/v3/token",
        config
      );
      // if (!response.ok) {
      //   addBotMessage("Login failed", "BOT");
      //   throw new Error("Login failed");
      // }
   
      const data = await response.json();
      console.log("API response:", data);
      return data;
    }
     
    var accesstoken = null
    var refreshtoken = null
  
    async function handlePasswordLogin(credentials) {
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
          Connection: "keep-alive",
          Origin: "https://preprod.nnnow.com",
          Referer: "https://preprod.nnnow.com/",
          "X-Channel": "odin",
          accept: "application/json",
          bbversion: "v2",
          module: "odin",
        },
        body: JSON.stringify({
          grant_type: "password",
          username: credentials.username,
          password: credentials.password,
          countryCallingCode: "+91",
        }),
      };
   
      const response = await fetch(
        "http://localhost:5050/apis/account/login",
        config
      );
      if (!response.ok) {
        throw new Error("Login failed");
      }
   
      const data = await response.json();
      const chatInput = document.getElementById("chat-input");
      chatInput.setAttribute("type", "text");
      islogin = true ;
      console.log("API response of otp , what is current response  ====>:", data);
      accesstoken = data?.data?.access_token
      refreshtoken = data?.data?.refresh_token
      return data;
    }
   
    function checkLoginState() {
      const loginState = localStorage.getItem("chatLoginState");
      // const userMobile = localStorage.getItem("userMobile");
      // const accessToken = localStorage.getItem("accessToken");
   
      if (loginState === "authenticated" && userMobile && accessToken) {
        return true;
      }
      return false;
    }
   
    function addChatButton() {
      const existingButton = document.getElementById("chatButton");
      if (existingButton) {
        existingButton.remove();
      }
   
      const chatButton = document.createElement("div");
      chatButton.id = "chatButton";
      chatButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    background: #ffffff;
    overflow: hidden;
    background: #6a1b9a;
    `;
      chatButton.addEventListener("click", function () {
        chatButton.style.display = "none";
      });
   
      chatButton.innerHTML = `
        <img src="http://localhost:5050/FINAL_BOT-02.png" alt="Chat" style="
        width: 80%;
      height: 100%;
      border-radius: 50%;
      object-fit: contain;
        ">
      `;
   
      chatButton.onclick = () => {
        const container = document.getElementById("chat-container");
        if (container) {
          container.style.display =
            container.style.display === "none" ? "block" : "none";
        }
      };
   
      document.body.appendChild(chatButton);
      function updateButtonSize() {
        if (window.matchMedia("(max-width: 430px)").matches) {
          chatButton.style.width = "50px";
          chatButton.style.height = "50px";
          chatButton.style.bottom = "15px";
        } else {
          chatButton.style.width = "70px";
          chatButton.style.height = "70px";
        }
      }
   
      // Call function on load and when window resizes
      updateButtonSize();
      window.addEventListener("resize", updateButtonSize);
    }
   
    function handleLogin() {
      // Simulate token generation
      const token = "exampleAccessToken";
      localStorage.setItem("accessToken", token);
      alert("Logged in successfully!");
   
      // Toggle visibility
      document.getElementById("loginWrapper").style.display = "none";
      document.getElementById("dashboardWrapper").style.display = "block";
    }
   
    // Handle Logout
    function handleLogout() {
      // Clear the token
      localStorage.removeItem("accessToken");
      alert("Logged out successfully!");
   
      // Toggle visibility
      document.getElementById("loginWrapper").style.display = "block";
      document.getElementById("dashboardWrapper").style.display = "none";
    }
    function handlePostLoginFlow(token) {
      // handleLoginResponse()
      // Check if token exists
      if (!token) return;
   
      const messagesContainer = document.getElementById("chat-messages");
      if (!messagesContainer) return;
   
      // Add bot message asking for help
      addBotMessage("Do you need help with any of the following?");
   
      // Create container for concern buttons
      const concernsDiv = document.createElement("div");
      concernsDiv.style.cssText = `
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: flex-start;
      margin-top: 10px;
      align-items: center
    `;
   
      // Add concern buttons
      const concerns = [
        "Order Related Issues",
        "Payment Queries & Issues",
        "Policies & Conditions",
        "Locate store near me",
        "Customer Feedback",
        "Ticket Status",
        "Issue Not Listed",
      ];
   
      concerns.forEach((concern) => {
        const button = document.createElement("button");
        button.style.cssText = `
        background: none;
        border: 2px solid #E62A86;
        color: #762F88;
        padding: 12px 25px;
        border-radius: 50px;
        cursor: pointer;
        font-size: 14px;
        text-align: center;
        transition: all 0.3s;
        min-width: 250px;
      `;
        button.textContent = concern;
   
        // Add hover effects
        button.onmouseover = () => {
          button.style.background = "#E8ABC8";
          button.style.color = "#762F88";
          // button.style.border = "none";
          // button.style.padding = "14px 27px";
        };
        button.onmouseout = () => {
          button.style.background = "none";
          button.style.color = "#762F88";
          button.style.border = "2px solid #E62A86";
          button.style.padding = "12px 25px";
        };
   
        button.onclick = () => {
          addUserMessage(concern);
          if (concern === "Order Related Issues") {
            handleOrderDisplay();
          }
          if (concern === "Payment Queries & Issues") {
            handlePaymentQueries();
          }
          if (concern === "Policies & Conditions") {
            handlePolicies();
          }
          if (concern === "Issue Not Listed") {
            issueNotListed();
          }
          if (concern === "Locate store near me") {
            addBotMessage("Please Share your location by clicking on 📎", "BOT");
            offlineStore();
          }
          if (concern === "Customer Feedback") {
            customerfeedback();
          }
          if (concern === "Ticket Status") {
            ticketStatus();
          }
        };
   
        concernsDiv.appendChild(button);
      });
   
      messagesContainer.appendChild(concernsDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
   
    async function ticketStatus() {
      try {
    
        const response = await fetch("http://localhost:5050/apis/kapture/list", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            phone: 7409329671, // Changed from userMobile to phone
            email_id: "veshaly.varshney@ens.enterprises",
          }),
        });
    
        const result = await response.json();
    
        if (!result.success || !Array.isArray(result.data)) {
          console.error("Invalid API response:", result);
          return;
        }
    
        const ordersContainer = document.getElementById("chat-messages");
        if (!ordersContainer) {
          console.error("Error: ordersContainer not found in the DOM.");
          return;
        }
    
        // Check if data array is empty
        if (result.data.length === 0) {
          addBotMessage("Currently, there are no tickets available for this user id to show.");
          document.getElementById("chat-input").value = "";
          const buttonContainer = createStyledButtonContainer(buttonSets.queryOptions);
          appendButtonsToChat(buttonContainer);
          buttonContainer.scrollTop = buttonContainer.scrollHeight;
          return; // Exit the function early
        }
    
        let orderListContainer = document.getElementById("order-list-container");
        if (!orderListContainer) {
          orderListContainer = document.createElement("div");
          orderListContainer.id = "order-list-container";
          ordersContainer.appendChild(orderListContainer);
        }
    
        let showAll = false;
        let ordersToShow = result.data.slice(0, 2);
    
        function renderOrders() {
          orderListContainer.innerHTML = "";
    
          ordersToShow.forEach((order) => {
            const orderItem = document.createElement("div");
            orderItem.style.cssText =
              "cursor: pointer; padding: 15px; border: 2px solid #E8ABC8; border-radius: 20px; margin-top: 8px; transition: all 0.3s; width: 90%;";
            orderItem.addEventListener(
              "mouseover",
              () => (orderItem.style.borderColor = "#de2c81")
            );
            orderItem.addEventListener(
              "mouseout",
              () => (orderItem.style.borderColor = "#E8ABC8")
            );
            orderItem.setAttribute("onclick", `handleStatusClick('${order.ticket_id}')`);
    
            const containerDiv = document.createElement("div");
            containerDiv.style.cssText = "display: flex; gap: 20px; align-items: center;";
    
            const img = document.createElement("img");
            img.src = order.ticket_page_info?.[0]?.attachment || "default-image-url";
            img.alt = "Order Image";
            img.style.cssText =
              "width: 100px; height: 100px; object-fit: cover; border-radius: 10px;";
    
            const detailsDiv = document.createElement("div");
            detailsDiv.style.cssText =
              "overflow-y: auto; overflow-wrap: break-word; word-break: break-word; white-space: normal; width: 100%;";
            
            // New UI based on the images
            detailsDiv.innerHTML = `
              <div style="font-size: 18px; color: #6a1b9a; margin-bottom: 6px;">Ticket No: ${order.ticket_id || "N/A"}</div>
              <div style="font-size: 18px; color: #6a1b9a; margin-bottom: 6px;">Ticket Details: ${order.description || "N/A"}</div>
              <div style="font-size: 16px; margin-bottom: 6px;">Title: ${order.title || "N/A"}</div>
            `;
    
            containerDiv.appendChild(img);
            containerDiv.appendChild(detailsDiv);
            orderItem.appendChild(containerDiv);
            orderListContainer.appendChild(orderItem);
          });
    
          if (result.data.length > 2) {
            const showMoreContainer = document.createElement("div");
            showMoreContainer.style.cssText = "text-align: center; margin-top: 15px;";
            let showMoreButton = document.getElementById("show-more-button");
            if (!showMoreButton) {
              showMoreButton = document.createElement("button");
              showMoreButton.id = "show-more-button";
              showMoreContainer.appendChild(showMoreButton);
              ordersContainer.appendChild(showMoreContainer);
            }
    
            showMoreButton.textContent = showAll ? "Show Less" : "Show More";
            showMoreButton.style.cssText = `
              background-color: #762F88;
              color: white;
              border: none;
              border-radius: 25px;
              padding: 10px 20px;
              font-size: 16px;
              cursor: pointer;
              transition: all 0.3s ease;
              margin-top: 15px;
              outline: none;
              margin-bottom: 10px;
            `;
    
            showMoreButton.onmouseover = () => {
              showMoreButton.style.backgroundColor = "#6a1b9a";
              showMoreButton.style.transform = "translateY(-2px)";
              showMoreButton.style.boxShadow = "0 4px 12px rgba(233, 30, 99, 0.15)";
            };
    
            showMoreButton.onmouseout = () => {
              showMoreButton.style.backgroundColor = "#762F88";
              showMoreButton.style.transform = "translateY(0)";
              showMoreButton.style.boxShadow = "none";
            };
    
            showMoreButton.onclick = () => {
              showAll = !showAll;
              ordersToShow = showAll ? result.data : result.data.slice(0, 2);
              renderOrders();
            };
          }
        }
    
        renderOrders();
    
        addBotMessage("Here is a list of your tickets");
        document.getElementById("chat-input").value = "";
        const buttonContainer = createStyledButtonContainer(buttonSets.queryOptions);
        appendButtonsToChat(buttonContainer);
        buttonContainer.scrollTop = buttonContainer.scrollHeight;
      } catch (error) {
        console.error("Error fetching tickets:", error);
        addBotMessage("Sorry, I couldn't fetch your ticket information. Please try again later.");
      }
    }
   
   
   
    async function offlineStore() {
      let file = document.getElementById("file-input");
      file.onclick = function () {
        let existingPopup = document.getElementById("popup-container");
        let existingSendDiv = document.getElementById("Send1");
   
        if (existingPopup || existingSendDiv || (existingPopup && existingSendDiv)) {
          existingPopup?.remove();
          existingSendDiv?.remove();
          return;
        }
   
        let newDiv = document.createElement("div");
        newDiv.id = "Send1";
        newDiv.style.cssText = `
      display: inline-block;  
      padding: 10px;
      border-radius: 10px;
      background: white;
      transition: width 0.3s ease;
      `;
   
        // Create popup container
        let popup = document.createElement("div");
        popup.id = "popup-container";
        popup.style.cssText = `
       min-width: 100px;
       max-width: fit-content;
        background: white;
        padding: 15px;
        border-radius: 10px;
        box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
        display: flex;
        gap: 20px;
        justify-content: center;
        align-items: center;
      `;
   
        let gallery = document.createElement("button");
        gallery.innerHTML = "📷";
        gallery.style.fontSize = "30px";
        gallery.style.border = "none";
        gallery.style.background = "none";
        gallery.style.cursor = "pointer";
        gallery.style.borderRadius = "22px";
   
        let fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.style.display = "none";
   
        gallery.addEventListener("click", function () {
          fileInput.click();
          gallery.style.background = "#b3e5fc";
          locationBtn.style.background = "none";
        });
   
        // Create Location icon
        let locationBtn = document.createElement("button");
        locationBtn.innerHTML = "📍";
        locationBtn.style.fontSize = "30px";
        locationBtn.style.border = "none";
        locationBtn.style.background = "none";
        locationBtn.style.borderRadius = "22px";
        locationBtn.style.cursor = "pointer";
   
        let selectedLocation = null;
   
        // popup.appendChild(gallery);
        popup.appendChild(fileInput);
        popup.appendChild(locationBtn);
        // popup.appendChild(sendBtn);
   
        let chatMessages = document.getElementById("chat-messages");
   
        if (chatMessages) {
          let lastMessage = chatMessages.lastElementChild;
          if (lastMessage) {
            lastMessage.insertAdjacentElement("afterend", newDiv);
          } else {
            chatMessages.appendChild(newDiv);
          }
        } else {
          console.error("Element with ID 'chat-messages' not found!");
        }
        newDiv.appendChild(popup);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        locationBtn.addEventListener("click", async function () {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
              selectedLocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                channel : "web",
                phone : userMobile
              };
              if (selectedLocation) {
                const cookies = document.cookie.split(";");
                        const tokenCookie = accesstoken
                   
                        if (!tokenCookie) {
                          console.error("No accessToken found in cookies.");
                          addBotMessage("Authentication error. Please log in again.");
                          return;
                        }
                   
                        const accessToken = tokenCookie.trim().substring("accessToken=".length);
                   
                        if (!accessToken || accessToken === "undefined" || accessToken === "") {
                          console.error("Token is empty or invalid");
                          addBotMessage("Authentication error. Please log in again.");
                          return;
                        }
                fetch("http://localhost:5050/apis/location/getLocations", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                  },
                  body: JSON.stringify(selectedLocation),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    document.getElementById("popup-container").remove();
                    addBotMessage("Location sent successfully!");
      
                    let pincode = data.pincode;
                    let formContainer = document.createElement("div");
                    formContainer.id = "formContainer";
                    formContainer.innerHTML = `
                    <div id="store-locator" style="
                      width: 225px; 
                      background: white; 
                      padding: 20px; 
                      border-radius: 10px; 
                      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
                      text-align: center; 
                    ">
                      <h2 style="font-size: 18px; margin-bottom: 15px; color: black;">Locate Store</h2>
          
                      <!-- Brand Name Dropdown -->
                      <select id="brand-dropdown" style="
                        width: 100%; 
                        padding: 10px; 
                        margin-bottom: 10px; 
                        border: 1px solid #ddd; 
                        border-radius: 5px; 
                        background: #f5f5f5;
                      ">
                        <option value="" disabled>Select Brand Name</option>
                        <option value="Arrow">Arrow</option>
                        <option value="Calvin Klein">Calvin Klein</option>
                        <option value="Flying Machine">Flying Machine</option>
                        <option value="Tommy Hilfiger">Tommy Hilfiger</option>
                         <option value="U.S. Polo Assn.">U.S. Polo Assn.</option>
                      </select>
          
                      
                      <input type="text" id="pincode" placeholder="Enter Your Pincode" value="${pincode}" readonly style="
                        width: 100%; 
                        padding: 10px; 
                        margin-bottom: 10px; 
                        border: 1px solid #ddd; 
                        border-radius: 5px; 
                        background: #f5f5f5;
                      ">
          
                      <!-- Find Now Button -->
                      <button id="find-now" style="
                        width: 100%; 
                        padding: 10px; 
                        background: #AA1C7E; 
                        color: white; 
                        font-size: 16px; 
                        border: none; 
                        border-radius: 5px; 
                        cursor: pointer;
                      ">FIND NOW</button>
                    </div>
                  `;
                    let chatMessages = document.getElementById("chat-messages");
                    if (chatMessages) {
                      let lastMessage = chatMessages.lastElementChild;
      
                      if (lastMessage) {
                        lastMessage.insertAdjacentElement("afterend", newDiv);
                      } else {
                        chatMessages.appendChild(newDiv);
                      }
                      chatMessages.scrollTop = chatMessages.scrollHeight;
                    } else {
                      console.error("Element with ID 'chat-messages' not found!");
                    }
                    newDiv.appendChild(formContainer);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
      
                    document
                      .getElementById("find-now")
                      .addEventListener("click", function () {
                        let selectedBrand =
                          document.getElementById("brand-dropdown").value;
                        let enteredPincode = document.getElementById("pincode").value;
      
                        if (!selectedBrand) {
                          alert("Please select a brand name.");
                          return;
                        }
                        const cookies = document.cookie.split(";");
                        const tokenCookie = accesstoken
                   
                        if (!tokenCookie) {
                          console.error("No accessToken found in cookies.");
                          addBotMessage("Authentication error. Please log in again.");
                          return;
                        }
                   
                        const accessToken = tokenCookie.trim().substring("accessToken=".length);
                   
                        if (!accessToken || accessToken === "undefined" || accessToken === "") {
                          console.error("Token is empty or invalid");
                          addBotMessage("Authentication error. Please log in again.");
                          return;
                        }
      
                        fetch("http://localhost:5050/apis/store/offlineStore", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${accessToken}`,
                          },
                          body: JSON.stringify({
                            brandName: selectedBrand,
                            pinCode: enteredPincode,
                          }),
                        })
                          .then((response) => response.json())
                          .then((result) => {
                            document.getElementById("formContainer").remove();
                            addBotMessage(
                              `Stores found for ${selectedBrand} in pincode ${enteredPincode}`
                            );
                            const stores = result?.stores || [];
      
                            if (stores.length === 0) {
                              addBotMessage(
                                `No stores found for ${selectedBrand} in pincode ${enteredPincode}.`
                              );
                              return;
                            }
      
                            const storeContainer = document.createElement("div");
                            storeContainer.id = "storeContainer";
                            storeContainer.style.cssText = `
              display: flex;
              flex-wrap: wrap;
              flex-direction: column;
              gap: 15px;
              justify-content: center;
              margin-top: 20px;
              font-size : 14px
          `;
      
                            stores.slice(0, 5).forEach((store, index) => {
                              const storeCard = document.createElement("div");
                              storeCard.style.cssText = `
                  width: 250px;
                  background: #f8f9fa;
                  border-radius: 8px;
                  padding: 15px;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                  border-left: 5px solid #6a1b9a;
              `;
      
                              storeCard.innerHTML = `
                  <h3 style="margin: 0; color: #6a1b9a;">${store.fcName}  </h3>
                  <p style="margin: 5px 0;"><b>📍 Address:</b> ${store.streetNo}  ${store.city}</p>
                  <p style="margin: 5px 0;"><b>📞 Contact:</b> ${store.contactPerson} (${store.contactNo})</p>
                  <p style="margin: 5px 0;"><b>⏰ Timing:</b> ${store.openingTime} to ${store.closingTime} </p>
              `;
      
                              storeContainer.appendChild(storeCard);
                            });
                            let chatMessages =
                              document.getElementById("chat-messages");
                            if (chatMessages) {
                              let lastMessage = chatMessages.lastElementChild;
      
                              if (lastMessage) {
                                lastMessage.insertAdjacentElement("afterend", newDiv);
                              } else {
                                chatMessages.appendChild(newDiv);
                              }
                              chatMessages.scrollTop = chatMessages.scrollHeight;
                            } else {
                              console.error(
                                "Element with ID 'chat-messages' not found!"
                              );
                            }
                            newDiv.appendChild(storeContainer);
      
                            addBotMessage(
                              `Above showing stores for ${selectedBrand} in pincode ${enteredPincode}.`
                            );
                            document.getElementById("chat-input").value = "";
                            const buttonContainer = createStyledButtonContainer(
                              buttonSets.queryOptions
                            );
                            appendButtonsToChat(buttonContainer);
                            buttonContainer.scrollTop = buttonContainer.scrollHeight;
                          })
                          .catch((error) => {
                            document.getElementById("formContainer").remove();
                            addBotMessage("Error finding store.");
                          });
                      });
                  })
                  .catch((error) => {
                    document.getElementById("popup-container").remove();
                    addBotMessage("Error sending location.");
                  });
              }
              // alert("Location selected!");
              // sendBtn.style.display = "block";
              // locationBtn.style.background = "#c8e6c9";
              // gallery.style.background = "none";
              // popup.style.width = "auto";
            });
          } else {
            alert("Geolocation is not supported by this browser.");
          }
        });
   
        // sendBtn.addEventListener("click", function () {
        
        // });
      };
    }
   
    function resetOrderDisplay() {
      // Remove only the order wrapper, leaving other chat history intact
      const existingWrapper = document.getElementById("orderWrapper");
      if (existingWrapper) {
        existingWrapper.remove();
      }
   
      // Clear any cached orders data
      window.allOrders = null;
    }
    async function fetchOrders() {
      // Show loading state
      const orderList = document.querySelector("#orderWrapper .order-list");
      if (orderList) {
        orderList.innerHTML = `
          <div style="text-align: center; padding: 20px;">
            Loading your recent orders...
          </div>
        `;
      }
      // const cookies = document.cookie.split(';');
      // const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('accessToken='));
      
      // if (!tokenCookie) {
      //   console.error("No accessToken found in cookies.");
      //   displayOrderError("Authentication error. Please log in again.");
      //   return;
      // }
      
      // // Extract the actual token value
      // const token = tokenCookie.trim().substring('accessToken='.length);
      
      // // Debug log to check token value
      // console.log("Using token:", token);
      
      // if (!token || token === "undefined" || token === "") {
      //   console.error("Token is empty or invalid");
      //   displayOrderError("Authentication error. Please log in again.");
      //   return;
      // }
      
      try {
        const response = await window.fetch(
          "https://api-preprod.ailiens.com/d/mobapi/orderDetails/v3",
          {
            method: "GET",
            headers: {
              accept: "application/json",
              "content-Type": "application/json",
              "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
              bbversion: "v2",
              clientsessionid: "1742983379818",
              Authorization: `Bearer ${accessToken}`,
              correlationid: "2a336d49-4e2b-4a04-aaf7-b66063f19259",
              "if-none-match": ' W/"152-8UyXsIzXQkcUBNh8ObRhw8DIQMY"',
              module: "odin",
              origin: "https://www.nnnow.com",
              priority: "u=1, i",
              referer: "https://www.nnnow.com/",
            },
          }
        );
   
        const result = await response.json();
        console.log("result",result);
        
   
        if (result.status && result.data && result.data.ordersList) {
          // Store all orders but initially display only 2
          window.allOrders = result.data.ordersList;
   
          // Fetch detailed information for each order
          const detailedOrders = await Promise.all(
            window.allOrders.slice(0, 2).map(async (order) => {
              try {
                // Get detailed info for this order
                const detailResponse = await fetch(
                  `https://api-preprod.nnnow.com/d/apiV2/orderDetailsv2/${order.orderId}`,
                  {
                    method: "GET",
                    headers: {
                      accept: "application/json",
                      "content-Type": "application/json",
                      "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                      bbversion: "v2",
                      clientsessionid: "1742983379818",
                      Authorization: `Bearer ${accessToken}`,
                      correlationid: "7eded8af-e9d1-441b-8868-92958aa0b1fb",
                      "if-none-match": ' W/"152-8UyXsIzXQkcUBNh8ObRhw8DIQMY"',
                      module: "odin",
                      origin: "https://www.nnnow.com",
                      priority: "u=1, i",
                      referer: "https://www.nnnow.com/",
                    },
                  }
                );
   
                const detailData = await detailResponse.json();
                console.log(detailData,"detailData");
                
   
                // Merge the detailed data with the basic order data
                if (detailData && detailData.data) {
                  // Extract estimated delivery date from detailed data
                  let estimatedDelivery = "N/A";
                  if (
                    detailData.data.consignments &&
                    detailData.data.consignments.length > 0 &&
                    detailData.data.consignments[0].items &&
                    detailData.data.consignments[0].items.length > 0 &&
                    detailData.data.consignments[0].items[0].itemDeliveryDateInfo
                  ) {
                    estimatedDelivery =
                      detailData.data.consignments[0].items[0]
                        .itemDeliveryDateInfo;
                  }
   
                  // Add the detailed data to the order
                  order.estimatedDelivery = estimatedDelivery;
                  order.detailedData = detailData.data;
                }
   
                return order;
              } catch (error) {
                console.error(
                  `Error fetching details for order ${order.orderId}:`,
                  error
                );
                return order; // Return original order if fetch fails
              }
            })
          );
   
          displayOrders(detailedOrders, true);
          addBotMessage(
            "Here are your recent orders. Please let me know if you need help with any specific order."
          );
        } else {
          console.error("No orders found or API error");
          displayOrderError("No orders found");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        displayOrderError("Error fetching orders");
      }
    }
   
    function displayOrders(orders, showToggleButton = false) {
      const orderList = document.querySelector("#orderWrapper .order-list");
      if (!orderList) return;
   
      // Add styles for hover effect and toggle button
      const styles = document.createElement("style");
      styles.textContent = `
        .order-item {
          background: white;
          border-radius: 20px;
          margin: 15px 0;
          padding: 6px;
          cursor: pointer;
          border: 2px solid #E8ABC8;
          transition: all 0.3s ease;
        }
        
        .order-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(233, 30, 99, 0.15);
          border-color: #6a1b9a;
        }
    
        .toggle-button {
          background-color: #762F88;
          color: white;
          border: none;
          border-radius: 25px;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 15px;
          outline: none;
        }
        
        .toggle-button:hover {
          background-color: #6a1b9a;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(233, 30, 99, 0.15);
        }
      `;
      document.head.appendChild(styles);
   
      // Process each order to extract delivery information
      const orderListHtml = orders
        .map((order) => {
          // Extract estimated delivery date - adjust these paths based on your actual order structure
          let imageUrl = "default-image-url";
          if (
            order.detailedData &&
            order.detailedData.consignments &&
            order.detailedData.consignments[0] &&
            order.detailedData.consignments[0].items &&
            order.detailedData.consignments[0].items[0] &&
            order.detailedData.consignments[0].items[0].product
          ) {
            imageUrl = order.detailedData.consignments[0].items[0].product.image;
          } else if (order.imagesList && order.imagesList[0]) {
            imageUrl = order.imagesList[0];
          }
   
          // Get the order total
          let orderTotal = "N/A";
          if (order.totalAmount) {
            orderTotal = order.totalAmount;
          } else if (
            order.detailedData &&
            order.detailedData.totalPricingDetails &&
            order.detailedData.totalPricingDetails.totalAmountWithShipping
          ) {
            orderTotal =
              order.detailedData.totalPricingDetails.totalAmountWithShipping;
          }
   
   
   
          return `
            <div class="order-item" onclick="handleOrderClick('${order.orderId
            }')">
              <div style="display: flex; gap: 20px; align-items: center;">
                <img 
                  src="${order.imagesList?.[0] || "default-image-url"}" 
                  alt="Order Image" 
                  style="width: 150px; height: 150px; object-fit: cover; border-radius: 10px;"
                />
                <div style="">
                  <div style="font-size: 18px; color: #6a1b9a; margin-bottom: 6px;">
                    Order ID: ${order.orderId || "N/A"}
                  </div>
                  <div style="font-size: 16px; margin-bottom: 6px;">
                    Date: ${order.orderDate
              ? new Date(order.orderDate).toLocaleString()
              : "N/A"
            }
                  </div>
                  <div style="font-size: 18px; margin-bottom: 6px;">
                    Status: ${order.orderStatus || "N/A"}
                  </div>
                  <div style="font-size: 20px; color: #6a1b9a; font-weight: bold;">
                    Total: ₹${order.totalAmount || "N/A"}
                  </div>
                  <div style="font-size: 16px; color: #762F88; margin-top: 8px;">
                    Your Order Status is ${order.orderStatus || "N/A"}
                  </div>
                  <div style="font-size: 16px; color: #762F88; margin-top: 8px;">
                    ${order.estimatedDelivery}
                  </div>
                </div>
              </div>
            </div>
          `;
        })
        .join("");
   
      // Toggle button HTML
      const toggleButtonHtml = showToggleButton
        ? `
        <div style="text-align: center;">
          <button id="toggleOrdersButton" class="toggle-button" onclick="toggleOrdersDisplay()">
            ${orders.length <= 2 ? "Show More" : "Show Less"}
          </button>
        </div>
      `
        : "";
   
      orderList.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
          <h3 style="
            color: #762F88;
            font-size: 24px;
            font-weight: bold;
            margin: 0;
            padding: 15px;
            border-radius: 10px;
          ">Recent Orders</h3>
        </div>
        ${orderListHtml}
        ${toggleButtonHtml}
      `;
    }
   
    async function toggleOrdersDisplay() {
      if (!window.allOrders) return;
   
      const toggleButton = document.getElementById("toggleOrdersButton");
      if (!toggleButton) return;
   
      const isShowingAll = toggleButton.textContent.trim() === "Show Less";
   
      if (isShowingAll) {
        // Show only 2 orders
        const detailedOrders = window.allOrders.slice(0, 2).map((order) => {
          return order.detailedData ? order : order; // Use cached detailed data if available
        });
        displayOrders(detailedOrders, true);
      } else {
        // Show loading state while fetching all orders
        const orderList = document.querySelector("#orderWrapper .order-list");
        if (orderList) {
          orderList.innerHTML = `
            <div style="text-align: center; padding: 20px;">
              Loading all orders...
            </div>
          `;
        }
   
        // Get detailed info for all orders if not already fetched
        const detailedOrders = await Promise.all(
          window.allOrders.map(async (order) => {
            // Skip fetch if we already have detailed data
            if (order.detailedData) {
              return order;
            }
   
            try {
              // Get detailed info for this order
              const detailResponse = await fetch(
                `https://api-preprod.nnnow.com/d/apiV2/orderDetailsv2/${order.orderId}`,
                {
                  method: "GET",
                  headers: {
                    accept: "application/json",
                    "content-Type": "application/json",
                    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                    bbversion: "v2",
                    clientsessionid: "1742983379818",
                    Authorization: `Bearer ${accessToken}`,
                    correlationid: "7eded8af-e9d1-441b-8868-92958aa0b1fb",
                    "if-none-match": ' W/"152-8UyXsIzXQkcUBNh8ObRhw8DIQMY"',
                    module: "odin",
                    origin: "https://www.nnnow.com",
                    priority: "u=1, i",
                    referer: "https://www.nnnow.com/",
                  },
                }
              );
   
              const detailData = await detailResponse.json();
   
              // Merge the detailed data with the basic order data
              if (detailData && detailData.data) {
                // Extract estimated delivery date from detailed data
                let estimatedDelivery = "N/A";
                if (
                  detailData.data.consignments &&
                  detailData.data.consignments.length > 0 &&
                  detailData.data.consignments[0].items &&
                  detailData.data.consignments[0].items.length > 0 &&
                  detailData.data.consignments[0].items[0].itemDeliveryDateInfo
                ) {
                  estimatedDelivery =
                    detailData.data.consignments[0].items[0].itemDeliveryDateInfo;
                }
   
                // Add the detailed data to the order
                order.estimatedDelivery = estimatedDelivery;
                order.detailedData = detailData.data;
              }
   
              return order;
            } catch (error) {
              console.error(
                `Error fetching details for order ${order.orderId}:`,
                error
              );
              return order; // Return original order if fetch fails
            }
          })
        );
   
        // Show all orders with detailed data
        displayOrders(detailedOrders, true);
      }
    }
   
    function displayOrderError(message) {
      const orderList = document.querySelector("#orderWrapper .order-list");
      if (!orderList) return;
   
      orderList.innerHTML = `
      <h3 style="text-align: center; color: #bf1615; margin-bottom: 15px;">Recent Orders</h3>
      <div style="text-align: center; color: red; padding: 20px;">
        ${message}
      </div>
    `;
    }
   
    function handleOrderDisplay() {
      
      const messagesContainer = document.getElementById("chat-messages");
      if (!messagesContainer) return;
      resetOrderDisplay();
   
      // Create order wrapper
      const orderWrapper = document.createElement("div");
      orderWrapper.id = "orderWrapper";
      orderWrapper.style.cssText = `
      margin: 15px 0; 
      padding: 6px;
      border-radius: 8px;
      background: #fff;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    `;
   
      // Add order list container
      const orderList = document.createElement("div");
      orderList.className = "order-list";
      orderList.innerHTML = `
      <div style="text-align: center; padding: 20px;">
        Loading your recent orders...
      </div>
    `;
   
      orderWrapper.appendChild(orderList);
      messagesContainer.appendChild(orderWrapper);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      // Fetch orders
      fetchOrders();
    }
   
    async function fetchOrderDetails(orderId, isChecking, returnData = false) {
    
      try {
        const response = await fetch(
          `https://api-preprod.nnnow.com/d/apiV2/orderDetailsv2/${orderId}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              "content-Type": "application/json",
              "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
              bbversion: "v2",
              clientsessionid: "1742983379818",
              Authorization: `Bearer ${accessToken}`,
              correlationid: "7eded8af-e9d1-441b-8868-92958aa0b1fb",
              "if-none-match": ' W/"152-8UyXsIzXQkcUBNh8ObRhw8DIQMY"',
              module: "odin",
              origin: "https://www.nnnow.com",
              priority: "u=1, i",
              referer: "https://www.nnnow.com/",
            },
          }
        );
   
        const data = await response.json();
   
        if (!data.status || !data.data) {
          throw new Error("Failed to fetch order details");
        }
        const extractItemDeliveryStatus = (consignments) => {
          for (let consignment of consignments) {
            for (let item of consignment.items) {
              if (item.itemDeliveryStates && item.itemDeliveryStates.length > 0) {
                const shippedState = item.itemDeliveryStates.find(
                  (state) => state.Shipped
                );
                const deliveredState = item.itemDeliveryStates.find(
                  (state) => state.Delivered
                );
   
                return {
                  shippedStatus: shippedState
                    ? shippedState.Shipped.statusText
                    : "",
                  deliveredStatus: deliveredState
                    ? deliveredState.Delivered.statusText
                    : "",
                  // waybill: consignment?.logisticsDetails?.airwayBillNumber || "",
                  cpId: 4,
                  accountCode: consignment.carrierName || "Delhivery-Express",
                };
              }
            }
          }
   
          return {
            shippedStatus: "",
            deliveredStatus: "",
            waybill: "",
            cpId: 4,
            accountCode: "Delhivery-Express",
          };
        };
   
        const deliveryStatus = extractItemDeliveryStatus(data.data.consignments);
   
        // If returnData flag is true, return the delivery status
        if (returnData) {
          return deliveryStatus;
        }
   
        if (isChecking === "Change delivery address") {
          if (deliveryStatus.shippedStatus === "") {
            addBotMessage(
              "Please enter your address when placing your order. If you need to change it later, just raise a ticket, and we’ll take care of it. ",
              "BOT"
            );
            addBotMessage("Please write your address in text box.", "BOT");
            showImageOptionBox(
              "Order not shipped",
              "onlyText",
              handleDeliveryAddressSubmit
            );
            return null;
          } else if (deliveryStatus.shippedStatus === "Shipped") {
            addBotMessage(
              "Unfortunately, we can’t change the delivery address once the order has been shipped. Please let us know if there is anything else we can help with. ",
              "BOT"
            );
            return null;
          }
        }
   
        if (isChecking === "Change mobile number") {
          if (deliveryStatus.shippedStatus === "") {
            addBotMessage(
              "You can enter your mobile number when placing your order. If you need to update it later, just raise a ticket, and we’ll help you out!",
              "BOT"
            );
            addBotMessage("Please write your new number in text box.", "BOT");
            showImageOptionBox(
              "Change mobile number",
              "onlyText",
              handleMobileNumberSubmit
            );
            return null;
          } else if (deliveryStatus.shippedStatus === "Shipped") {
            addBotMessage(
              "Sorry, but we’re unable to update the mobile number once the order has been shipped. Please let us know if there’s anything else we can help you with! ",
              "BOT"
            );
            return null;
          }
        }
   
        // Invoice/Proof of delivery handling
        if (isChecking === "Invoice") {
          if (deliveryStatus.deliveredStatus === "") {
            addBotMessage("Order invoice shared.", "BOT");
            return null;
          } else if (deliveryStatus.deliveredStatus === "Delivered") {
            addBotMessage(
              "Just a heads-up! The order invoice and proof of delivery will be available once your order has been successfully delivered.",
              "BOT"
            );
            return null;
          }
        }
   
        // Extract items with comprehensive details
        const items = data.data.consignments.reduce((acc, consignment) => {
          const itemsWithDeliveryInfo = consignment.items.map((item) => {
            // Comprehensive status extraction
            const itemStatus =
              item.itemStatus?.statusToCustomer ||
              deliveryStatus.shippedStatus ||
              deliveryStatus.deliveredStatus ||
              "Status not available";
   
            const itemDeliveryDateInfo =
              item.itemDeliveryDateInfo ||
              consignment.expectedDeliveryDate ||
              "Delivery date not available";
   
            return {
              itemId: item.itemId,
              productDetails: {
                description: item.product.description || "No description",
                color: item.product.color || "Not specified",
                size: item.product.size || "Not specified",
                brand: item.product.brand || "Unknown Brand",
                mrp: item.product.mrp || "N/A",
                image: item.product.image || "default-image-url",
                price: item.price || "N/A",
              },
              itemStatus: itemStatus,
              itemDeliveryDateInfo: itemDeliveryDateInfo,
              deliveryStatus: deliveryStatus,
            };
          });
          return [...acc, ...itemsWithDeliveryInfo];
        }, []);
   
        return items;
      } catch (error) {
        console.error("Error fetching order details:", error);
        addBotMessage(
          "Unable to retrieve order details. Please try again later.",
          "BOT"
        );
        throw error;
      }
    }
    // Helper function to get product details by itemId
    function getProductDetailsByItemId(items, itemId) {
      const item = items.find((item) => item.itemId === itemId);
      return item ? item.productDetails : null;
    }
   
    // Create Product Display - Updated to handle item selection
    function createProductDisplay(
      itemId,
      productDetails,
      itemStatus,
      itemDeliveryDateInfo
    ) {
      const productContainer = document.createElement("div");
      productContainer.className = "product-display";
      const itemData = {
        itemId,
        itemStatus,
        itemDeliveryDateInfo,
      };
      productContainer.setAttribute("data-item", JSON.stringify(itemData));
   
      productContainer.style.cssText = `
      background: white;
      border-radius: 20px;
      margin: 10px 0;
      padding: 20px;
      cursor: pointer;
      border: 2px solid #E8ABC8;
      transition: all 0.3s ease;
      position: relative;
    `;
   
      // Create radio button
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "product-selection";
      radio.value = itemId;
      radio.style.cssText = `
      position: absolute;
      top: 20px;
      left: 20px;
      width: 20px;
      height: 20px;
      accent-color: #6a1b9a;
      cursor: pointer;
    `;
   
      const content = document.createElement("div");
      content.style.cssText = `
      display: flex;
      gap: 20px;
      padding-left: 40px;
    `;
   
      content.innerHTML = `
      <img 
        src="${productDetails.image}" 
        alt="${productDetails.description}" 
        style="
          width: 150px;
          height: 150px;
          object-fit: cover;
          border-radius: 8px;
          background: #f5f5f5;
        "
      />
      <div style="">
        <div style="font-size: 18px; color: #6a1b9a; margin-bottom: 6px;">
          ItemId: ${itemId}
        </div>
        <div style="font-size: 24px; font-weight: bold; margin-bottom: 6px; color: #6a1b9a;">
          ${productDetails.brand}
        </div>
        <div style="font-size: 18px; margin-bottom: 6px;">
          ${productDetails.description}
        </div>
        <div style="display: flex; gap: 10px; margin-bottom: 6px; color: #666;">
          Color: ${productDetails.color} &nbsp;&nbsp; Size: ${productDetails.size}
        </div>
        <div style="font-size: 20px; color: #6a1b9a; font-weight: bold;">
          ₹${productDetails.price}
        </div>
      </div>
    `;
   
      productContainer.appendChild(radio);
      productContainer.appendChild(content);
   
      // Add selection handling
      productContainer.onclick = (e) => {
        // If clicking the radio button, don't trigger twice
        if (e.target !== radio) {
          radio.checked = !radio.checked;
        }
        if (radio.checked) {
          // Add selected styles
          productContainer.style.borderColor = "#6a1b9a";
          productContainer.style.transform = "translateY(-2px)";
          productContainer.style.boxShadow = "0 4px 12px rgba(233, 30, 99, 0.15)";
   
          // Store the selected item ID globally when radio is checked
          window.currentSelectedItemId = itemId;
        }
      };
   
      // When radio is selected directly
      radio.onchange = () => {
        if (radio.checked) {
          // Add selected styles
          productContainer.style.borderColor = "#6a1b9a";
          productContainer.style.transform = "translateY(-2px)";
          productContainer.style.boxShadow = "0 4px 12px rgba(233, 30, 99, 0.15)";
   
          // Store the selected item ID globally when radio selection changes
          window.currentSelectedItemId = itemId;
        }
      };
   
      return productContainer;
    }
    function handlePaymentQueries() {
      const messagesContainer = document.getElementById("chat-messages");
      if (!messagesContainer) return;
      const concernsDiv = document.createElement("div");
      concernsDiv.style.cssText = `
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: flex-start;
      margin-top: 10px;
  align-items: center
    `;
      const concerns = [
        "Payment Gateway Not Responding",
        "Money Deducted, order not confirmed",
        // "Switching from COD to Prepaid",
        "Particular payment method not accepted",
        "Payment options & limit for Cash on Delivery orders",
        "Coupon not applicable",
      ];
   
      concerns.forEach((concern) => {
        const button = document.createElement("button");
        button.style.cssText = `
        background: none;
                border: 2px solid #E62A86;
                color: #762F88;
                padding: 12px 25px;
                border-radius: 50px;
                cursor: pointer;
                font-size: 14px;
                text-align: center;
                transition: all 0.3s;
            
                min-width: 250px;
      `;
   
        const displayText = concern;
        // concern.length > 25 ? `${concern.substring(0, 22)}...` : concern;
        button.textContent = displayText;
        button.onmouseover = () => {
          button.style.background = "#E8ABC8";
          button.style.color = "#762F88";
          // button.style.border = "none";
          // button.style.padding = "14px 27px";
        };
        button.onmouseout = () => {
          button.style.background = "none";
          button.style.color = "#762F88";
          button.style.border = "2px solid #E62A86";
          button.style.padding = "12px 25px";
        };
        button.onclick = () => {
          addUserMessage(concern);
   
          if (concern === "Payment Gateway Not Responding") {
            addBotMessage(
              "Looks like the payment gateway isn’t responding—it might be a server issue. No worries! Please try again after some time. ",
              "BOT"
            );
            document.getElementById("chat-input").value = "";
            const buttonContainer = createStyledButtonContainer(
              buttonSets.queryOptions
            );
            appendButtonsToChat(buttonContainer);
            buttonContainer.scrollTop = buttonContainer.scrollHeight;
          }
   
          if (concern === "Money Deducted, order not confirmed") {
            addBotMessage(
              "Go ahead and place a new order, and don’t worry—your original amount will be refunded within 5 to 7 working days. If you don’t see it by then, just raise a ticket, and we’ll sort it out for you!",
              "BOT"
            );
            addBotMessage(
              "Please select one option that you want to send your concern with picture or without picture"
            );
            showImageOptionBox(concern);
          }
   
   
          if (concern === "Particular payment method not accepted") {
            addBotMessage(
              "We accept all regulated payment methods, including UPI, cards, internet banking, and wallets. If a particular payment method isn’t working, it could be due to a server issue. Please try again after some time.",
              "BOT"
            );
            document.getElementById("chat-input").value = "";
            const buttonContainer = createStyledButtonContainer(
              buttonSets.queryOptions
            );
            appendButtonsToChat(buttonContainer);
            buttonContainer.scrollTop = buttonContainer.scrollHeight;
          }
   
          if (concern === "Payment options & limit for Cash on Delivery orders") {
            addBotMessage(
              "For Cash on Delivery (COD) orders, we accept payments via UPI and cash only. An additional ₹40 COD charge applies, and there’s a limit of ₹10,000 per order. ",
              "BOT"
            );
            document.getElementById("chat-input").value = "";
            const buttonContainer = createStyledButtonContainer(
              buttonSets.queryOptions
            );
            appendButtonsToChat(buttonContainer);
            buttonContainer.scrollTop = buttonContainer.scrollHeight;
          }
   
          if (concern === "Coupon not applicable") {
            addBotMessage(
              "If your NNNOW coupon isn’t applying within its validity period, don’t worry! Just raise a ticket, and we’ll sort it out for you ASAP.",
              "BOT"
            );
            addBotMessage(
              "Please select one option that you want to send your concern with picture or without picture"
            );
            showImageOptionBox(concern);
          }
        };
   
        concernsDiv.appendChild(button);
      });
      messagesContainer.appendChild(concernsDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    function showImageOptionBox(concern, type = "both", callback = null) {
      console.log("concern----------->", concern);
      const messagesContainer = document.getElementById("chat-messages");
      if (!messagesContainer) return;
   
      // Create a variable to store the selected file
      let selectedFile = null;
   
      // Create container with border and styling like in the screenshot
      const optionContainer = document.createElement("div");
      optionContainer.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 15px;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 15px;
        background-color: #f9f9f9;
        width: 100%;
      `;
   
      // Add question text
      const questionText = document.createElement("p");
      questionText.textContent =
        "Do you want to send your concern with a picture or without a picture?";
      questionText.style.cssText = `
        font-size: 16px;
        margin-bottom: 15px;
      `;
      optionContainer.appendChild(questionText);
   
      // Create radio options for "With Picture"
      const withPictureContainer = document.createElement("div");
      withPictureContainer.style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 15px;
      `;
   
      const withPictureRadio = document.createElement("input");
      withPictureRadio.type = "radio";
      withPictureRadio.id = "with-picture";
      withPictureRadio.name = "picture-option";
      withPictureRadio.value = "with";
      withPictureRadio.style.cssText = `
        width: 20px;
        height: 20px;
        accent-color: #E62A86;
      `;
   
      const withPictureLabel = document.createElement("label");
      withPictureLabel.htmlFor = "with-picture";
      withPictureLabel.textContent = "With Picture";
      withPictureLabel.style.cssText = `
        font-size: 16px;
      `;
   
      withPictureContainer.appendChild(withPictureRadio);
      withPictureContainer.appendChild(withPictureLabel);
      optionContainer.appendChild(withPictureContainer);
   
      // Create radio options for "Without Picture"
      const withoutPictureContainer = document.createElement("div");
      withoutPictureContainer.style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 15px;
      `;
   
      const withoutPictureRadio = document.createElement("input");
      withoutPictureRadio.type = "radio";
      withoutPictureRadio.id = "without-picture";
      withoutPictureRadio.name = "picture-option";
      withoutPictureRadio.value = "without";
      withoutPictureRadio.style.cssText = `
        width: 20px;
        height: 20px;
        accent-color: #E62A86;
      `;
   
      const withoutPictureLabel = document.createElement("label");
      withoutPictureLabel.htmlFor = "without-picture";
      withoutPictureLabel.textContent = "Without Picture";
      withoutPictureLabel.style.cssText = `
        font-size: 16px;
      `;
   
      withoutPictureContainer.appendChild(withoutPictureRadio);
      withoutPictureContainer.appendChild(withoutPictureLabel);
      optionContainer.appendChild(withoutPictureContainer);
   
      // File input for uploading images
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.id = "image-upload";
      fileInput.accept = "image/*";
      fileInput.style.display = "none";
   
      // Add the file input to the container
      optionContainer.appendChild(fileInput);
   
      // Override the send button's click event to use our stored file
      const setupSendButton = (hasFile) => {
        const chatInput = document.getElementById("chat-input");
        const sendBtn = document.getElementById("send-btn");
   
        if (sendBtn) {
          // Store the original onclick function if it exists
          const originalOnClick = sendBtn.onclick;
   
          // Add a new onclick function
          sendBtn.onclick = function (event) {
            // Prevent the default action
            event.preventDefault();
   
            const message = chatInput.value;
            if (!message) {
              addBotMessage("Please write your concern into input box ", "BOT");
              return;
            }
   
            // Call handleFormSubmit with the file if needed
            if (hasFile && selectedFile) {
            //   handleFormSubmit(concern, message, selectedFile);
            } else {
            //   handleFormSubmit(concern, message, null);
            }
   
            // Reset the send button to its original behavior
            sendBtn.onclick = originalOnClick;
          };
        }
      };
   
      // Handle "With Picture" selection - immediately open file dialog
      withPictureRadio.addEventListener("change", () => {
        if (withPictureRadio.checked) {
          addBotMessage(
            "Please upload the screenshot or images and concern in text box",
            "BOT"
          );
   
          // Directly trigger the file dialog
          fileInput.click();
   
          fileInput.onchange = () => {
            if (fileInput.files.length > 0) {
              // Store the selected file to use later
              selectedFile = fileInput.files[0];
              console.log("File selected:", selectedFile.name);
   
              addBotMessage(
                "Image selected. Now enter your concern in the text box.",
                "BOT"
              );
   
              // After image selection, set the attributes
              const chatInput = document.getElementById("chat-input");
              chatInput.setAttribute("data-expecting", "options");
              chatInput.setAttribute("type", "text");
              chatInput.setAttribute("data-option-type", concern);
              chatInput.setAttribute("data-has-file", "true");
              chatInput.setAttribute("data-file-name", fileInput.files[0].name);
   
              // Set up the send button to use our file
              setupSendButton(true);
   
              // Remove the option container after setting up chat input
              messagesContainer.removeChild(optionContainer);
            }
          };
        }
      });
   
      // Handle "Without Picture" selection
      withoutPictureRadio.addEventListener("change", () => {
        if (withoutPictureRadio.checked) {
          addBotMessage("Please write your concern in text box", "BOT");
   
          const chatInput = document.getElementById("chat-input");
          chatInput.setAttribute("data-expecting", "options");
          chatInput.setAttribute("type", "text");
          chatInput.setAttribute("data-option-type", concern);
          chatInput.setAttribute("data-has-file", "false");
   
          // Set up the send button without a file
          setupSendButton(false);
   
          // Remove the option container
          messagesContainer.removeChild(optionContainer);
        }
      });
   
      messagesContainer.appendChild(optionContainer);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    function showImageOptionBoxformobile(
      concern,
      type = "both",
      callback = null
    ) {
      addBotMessage(`Please type your ${concern}`, "BOT");
      const messagesContainer = document.getElementById("chat-messages");
      const chatInput = document.getElementById("chat-input");
      const sendButton = document.getElementById("send-btn");
   
      if (!messagesContainer || !chatInput || !sendButton) return;
      chatInput.setAttribute("type", "text");
      chatInput.setAttribute("data-concern-expecting", concern);
      const originalPlaceholder = chatInput.placeholder;
      chatInput.placeholder = "Enter details here...";
      const originalCallback = window.handleChatMessage;
      window.handleChatMessage = async (message) => {
        chatInput.placeholder = originalPlaceholder;
        if (callback && typeof callback === "function") {
          const orderId = window.currentOrderId || "";
          await callback(message, orderId);
        } else {
          addUserMessage(message);
          addBotMessage(
            `Thank you for providing the information. We will process your request for ${concern}.`,
            "BOT"
          );
            document.getElementById("chat-input").value = "";
            const buttonContainer = createStyledButtonContainer(
              buttonSets.queryOptions
            );
            appendButtonsToChat(buttonContainer);
            buttonContainer.scrollTop = buttonContainer.scrollHeight;
        }
        window.handleChatMessage = originalCallback;
      };
      chatInput.focus();
    }
    
   
    async function handleMobileNumberSubmit(text, orderId) {
      // If orderId is not provided, try multiple methods to extract it
      if (!orderId) {
        // Method 1: Extract from console logs
        try {
          const consoleLogStr = console.log.toString();
          const orderLogMatch = consoleLogStr.match(
            /Order issue:.*for order:\s*(\w+)/
          );
          const orderClickMatch = consoleLogStr.match(/Order clicked:\s*(\w+)/);
   
          orderId =
            (orderLogMatch && orderLogMatch[1]) ||
            (orderClickMatch && orderClickMatch[1]);
        } catch (error) {
          console.error("Error extracting order ID from console log:", error);
        }
   
        // Method 2: Check global variables and storage
        if (!orderId) {
          orderId =
            window.currentOrderId ||
            window.currentSelectedItemId ||
            localStorage.getItem("currentOrderId") ||
            localStorage.getItem("currentItemId");
        }
   
        // Method 3: Check DOM elements
        if (!orderId) {
          const orderElements = [
            document.querySelector("[data-order-id]"),
            document.querySelector(".order-details"),
            document.querySelector(".chat-order-details"),
          ];
   
          for (let element of orderElements) {
            if (element) {
              const match = element.textContent.match(/\b([OI]\d+\w*)\b/);
              if (match) {
                orderId = match[1];
                break;
              }
            }
          }
        }
      }
   
      // Validate order ID
      if (!orderId) {
        addBotMessage(
          "Unable to retrieve order details. Please provide the order ID manually.",
          "BOT"
        );
        console.error("No order ID could be found through any method");
        return;
      }
   
      // Validate input text (mobile number)
      if (!text || text.trim() === "") {
        addBotMessage("Please provide a valid mobile number.", "BOT");
        return;
      }
   
      // Validate mobile number (assuming Indian format)
      const mobileRegex = /^[6-9]\d{9}$/;
      if (!mobileRegex.test(text.trim())) {
        addBotMessage("Please provide a valid 10-digit mobile number.", "BOT");
        return;
      }
   
      try {
        // Get user details from decoded token
        const decodedToken = getDecodedToken();
        const username = decodedToken ? decodedToken.firstName || "User" : "User";
        // 1. Update delivery info via clickpost API
        const clickpostData = {
          action: "INITIATE_RTO",
          waybill: "ARVINDTEST001", // Use a fixed test waybill
          cp_id: 4,
          account_code: "Delhivery-Express",
          phone_number: text.trim(),
          preferred_date: new Date().toISOString().split("T")[0], // Today's date
        };
        const clickpostResponse = await fetch(
          `https://www.clickpost.in/api/v2/ndr-update-api?username=${encodeURIComponent(
            username
          )}&key=c47c947b-9274-47ec-a434-a62714ff3248`,
          {
            method: "POST",
            headers: {
              accept: "application/json",
              "content-type": "application/json",
            },
            body: JSON.stringify(clickpostData),
          }
        );
        const clickpostResult = await clickpostResponse.json();
        console.log("ClickPost API response:", clickpostResult);
        const ticketMessage = `Change mobile number to ${text.trim()} for Order/Item ${orderId}`;
        // await handleFormSubmit("Change mobile number", ticketMessage, null);
      } catch (error) {
        console.error("Error processing mobile number change:", error);
        // Show error message but still indicate request is received (fallback)
        addBotMessage(
          "Thank you for providing the information. We will process your request.",
          "BOT"
        );
      }
    }
   
    function showChangeMobileNumberOptions() {
      const messagesContainer = document.getElementById("chat-messages");
      if (!messagesContainer) return;
   
      const concerns = ["Order not shipped", "Order shipped"];
   
      const optionsContainer = document.createElement("div");
      optionsContainer.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: flex-start;
        margin-top: 15px;
      `;
   
      concerns.forEach((concern) => {
        const button = document.createElement("button");
        button.style.cssText = `
          background: none;
          border: 2px solid #E62A86;
          color: #762F88;
          padding: 12px 25px;
          border-radius: 50px;
          cursor: pointer;
          font-size: 14px;
          text-align: center;
          transition: all 0.3s;
          min-width: 250px;
        `;
   
        button.textContent = concern;
   
        // Add hover effects
        button.onmouseover = () => {
          button.style.background = "#E8ABC8";
          button.style.color = "#762F88";
          // button.style.border = "none";
          // button.style.padding = "14px 27px";
        };
        button.onmouseout = () => {
          button.style.background = "none";
          button.style.color = "#762F88";
          button.style.border = "2px solid #E62A86";
          button.style.padding = "12px 25px";
        };
   
        button.onclick = () => {
          addUserMessage(concern);
          if (concern === "Order not shipped") {
            addBotMessage(
              "You can enter your mobile number when placing your order. If you need to update it later, just raise a ticket, and we’ll help you out!",
              "BOT"
            );
            addBotMessage("Please write your number in text box.", "BOT");
   
            // Set the chat input to expect mobile input
            const chatInput = document.getElementById("chat-input");
            if (chatInput) {
              chatInput.setAttribute("data-expecting", "mobile");
            }
   
            showImageOptionBoxformobile(
              "Change mobile number",
              "onlyText",
              handleMobileNumberSubmit
            );
          }
   
          if (concern === "Order shipped") {
            addBotMessage(
              "Sorry, but we’re unable to update the mobile number once the order has been shipped. Please let us know if there’s anything else we can help you with! ",
              "BOT"
            );
          }
        };
   
        optionsContainer.appendChild(button);
      });
   
      messagesContainer.appendChild(optionsContainer);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
   
    async function handleDeliveryAddressSubmit(text, orderId) {
      if (!orderId) {
        // Method 1: Extract from console logs
        try {
          const consoleLogStr = console.log.toString();
          const orderLogMatch = consoleLogStr.match(
            /Order issue:.*for order:\s*(\w+)/
          );
          const orderClickMatch = consoleLogStr.match(/Order clicked:\s*(\w+)/);
   
          orderId =
            (orderLogMatch && orderLogMatch[1]) ||
            (orderClickMatch && orderClickMatch[1]);
        } catch (error) {
          console.error("Error extracting order ID from console log:", error);
        }
   
        // Method 2: Check global variables and storage
        if (!orderId) {
          orderId =
            window.currentOrderId ||
            window.currentSelectedItemId ||
            localStorage.getItem("currentOrderId") ||
            localStorage.getItem("currentItemId");
        }
   
        // Method 3: Check DOM elements
        if (!orderId) {
          const orderElements = [
            document.querySelector("[data-order-id]"),
            document.querySelector(".order-details"),
            document.querySelector(".chat-order-details"),
          ];
   
          for (let element of orderElements) {
            if (element) {
              const match = element.textContent.match(/\b([OI]\d+\w*)\b/);
              if (match) {
                orderId = match[1];
                break;
              }
            }
          }
        }
      }
   
      // Validate order ID
      if (!orderId) {
        addBotMessage(
          "Unable to retrieve order details. Please provide the order ID manually.",
          "BOT"
        );
        console.error("No order ID could be found through any method");
        return;
      }
   
      // Validate input text (address)
      // if (!text || text.trim() === "") {
      //   addBotMessage("Please provide a valid delivery address.", "BOT");
      //   return;
      // }
   
      try {
        // Get user details from decoded token
        const decodedToken = getDecodedToken();
        const username = decodedToken ? decodedToken.firstName || "User" : "User";
   
        // 1. Call ClickPost API to update delivery address
        const clickpostData = {
          action: "REATTEMPT",
          waybill: waybill || "ARVINDTEST001", // Use fallback if waybill not found
          cp_id: cpId,
          account_code: accountCode,
          address: text.trim(),
          preferred_date: new Date().toISOString().split("T")[0], // Today's date
        };
   
        // Make the API call to ClickPost
        const clickpostResponse = await fetch(
          `https://www.clickpost.in/api/v2/ndr-update-api?username=${encodeURIComponent(
            username
          )}&key=c47c947b-9274-47ec-a434-a62714ff3248`,
          {
            method: "POST",
            headers: {
              accept: "application/json",
              "content-type": "application/json",
            },
            body: JSON.stringify(clickpostData),
          }
        );
   
        // Parse the ClickPost response
        const clickpostResult = await clickpostResponse.json();
        console.log("ClickPost API response:", clickpostResult);
   
        // 2. Raise ticket using handleFormSubmit
        const ticketMessage = `Change delivery address to ${text.trim()} for Order/Item ${orderId}`;
   
        // Call handleFormSubmit with the concern and message
        // await handleFormSubmit(
        //   "Change delivery address",
        //   ticketMessage,
        //   null 
        // );
      } catch (error) {
        console.error("Error processing address change:", error);
        // Show error message but still indicate request is received (fallback)
        addBotMessage(
          "Thank you for providing the information. We will process your request.",
          "BOT"
        );
      }
    }
    function showChangeAddressOptions() {
      const messagesContainer = document.getElementById("chat-messages");
      if (!messagesContainer) return;
   
      const concerns = ["Order not shipped", "Order shipped"];
   
      const optionsContainer = document.createElement("div");
      optionsContainer.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: flex-start;
        margin-top: 15px;
      `;
   
      concerns.forEach((concern) => {
        const button = document.createElement("button");
        button.style.cssText = `
          background: none;
          border: 2px solid #E62A86;
          color: #762F88;
          padding: 12px 25px;
          border-radius: 50px;
          cursor: pointer;
          font-size: 14px;
          text-align: center;
          transition: all 0.3s;
          min-width: 250px;
        `;
   
        button.textContent = concern;
   
        // Add hover effects
        button.onmouseover = () => {
          button.style.background = "#E8ABC8";
          button.style.color = "#762F88";
          // button.style.border = "none";
          // button.style.padding = "14px 27px";
        };
        button.onmouseout = () => {
          button.style.background = "none";
          button.style.color = "#762F88";
          button.style.border = "2px solid #E62A86";
          button.style.padding = "12px 25px";
        };
   
        button.onclick = () => {
          addUserMessage(concern);
          if (concern === "Order not shipped") {
            addBotMessage(
              "Please enter your address when placing your order. If you need to change it later, just raise a ticket, and we’ll take care of it. ",
              "BOT"
            );
            addBotMessage("Please write your address in text box.", "BOT");
   
            // Set the chat input to expect address input
            const chatInput = document.getElementById("chat-input");
            if (chatInput) {
              chatInput.setAttribute("data-expecting", "address");
            }
   
            showImageOptionBoxformobile(
              "Change delivery address",
              "onlyText",
              handleDeliveryAddressSubmit
            );
          }
   
          if (concern === "Order shipped") {
            addBotMessage(
              "Unfortunately, we can’t change the delivery address once the order has been shipped. Please let us know if there is anything else we can help with. ",
              "BOT"
            );
          }
        };
   
        optionsContainer.appendChild(button);
      });
   
      messagesContainer.appendChild(optionsContainer);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
   
    function returnPolicy() {
      const messagesContainer = document.getElementById("chat-messages");
      if (!messagesContainer) return;
      const concernsDiv = document.createElement("div");
      concernsDiv.style.cssText = `
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: flex-start;
      margin-top: 10px;
  align-items: center
    `;
      const concerns = [
        "Time period for return initiation",
        "Categories not eligible for return",
        "Conditions for return initiation",
        "Return a product with gift",
        "Return few of multiple products",
      ];
   
      concerns.forEach((concern) => {
        const button = document.createElement("button");
        button.style.cssText = `
        background: none;
                border: 2px solid #E62A86;
                color: #762F88;
                padding: 12px 25px;
                border-radius: 50px;
                cursor: pointer;
                font-size: 14px;
                text-align: center;
                transition: all 0.3s;
                min-width: 250px;
      `;
   
        button.textContent = concern;
        button.onmouseover = () => {
          button.style.background = "#E8ABC8";
          button.style.color = "#762F88";
          // button.style.border = "none";
          // button.style.padding = "14px 27px";
        };
        button.onmouseout = () => {
          button.style.background = "none";
          button.style.color = "#762F88";
          button.style.border = "2px solid #E62A86";
          button.style.padding = "12px 25px";
        };
   
        button.onclick = () => {
          addUserMessage(concern);
          if (concern === "Time period for return initiation") {
            addBotMessage(
              "You have 15 days from the delivery date to return your item. If you need to make a return, be sure to initiate the process within this timeframe—we're here to help! ",
              "BOT"
            );
            document.getElementById("chat-input").value = "";
            const buttonContainer = createStyledButtonContainer(
              buttonSets.queryOptions
            );
            appendButtonsToChat(buttonContainer);
            buttonContainer.scrollTop = buttonContainer.scrollHeight;
          }
          if (concern === "Categories not eligible for return") {
            addBotMessage(
              "Some items, like innerwear and products bought under specific promotional discounts, aren’t eligible for returns. These exclusions help us maintain hygiene standards and uphold promotional policies. Thanks for your understanding! ",
              "BOT"
            );
            document.getElementById("chat-input").value = "";
            const buttonContainer = createStyledButtonContainer(
              buttonSets.queryOptions
            );
            appendButtonsToChat(buttonContainer);
            buttonContainer.scrollTop = buttonContainer.scrollHeight;
          }
          if (concern === "Conditions for return initiation") {
            addBotMessage(
              "To be eligible for a return, the product must be new, unused, and in its original packaging with all tags intact. This helps us process your return smoothly. ",
              "BOT"
            );
            document.getElementById("chat-input").value = "";
            const buttonContainer = createStyledButtonContainer(
              buttonSets.queryOptions
            );
            appendButtonsToChat(buttonContainer);
            buttonContainer.scrollTop = buttonContainer.scrollHeight;
          }
          if (concern === "Return a product with gift") {
            addBotMessage(
              "If you're returning a product that came with a gift, please make sure to return the gift as well. If not, the gift’s value may be deducted from your refund. Thanks for understanding! ",
              "BOT"
            );
            document.getElementById("chat-input").value = "";
            const buttonContainer = createStyledButtonContainer(
              buttonSets.queryOptions
            );
            appendButtonsToChat(buttonContainer);
            buttonContainer.scrollTop = buttonContainer.scrollHeight;
          }
          if (concern === "Return few of multiple products") {
            addBotMessage(
              "If you're returning only some items from your order, simply select them on the return processing page. Each item will get a separate return ID, allowing you to process them individually. ",
              "BOT"
            );
            document.getElementById("chat-input").value = "";
            const buttonContainer = createStyledButtonContainer(
              buttonSets.queryOptions
            );
            appendButtonsToChat(buttonContainer);
            buttonContainer.scrollTop = buttonContainer.scrollHeight;
          }
        };
        concernsDiv.appendChild(button);
      });
      messagesContainer.appendChild(concernsDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
   
    function refundPolicy() {
      const messagesContainer = document.getElementById("chat-messages");
      if (!messagesContainer) return;
      const concernsDiv = document.createElement("div");
      concernsDiv.style.cssText = `
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: flex-start;
      margin-top: 10px;
  align-items: center
    `;
      const concerns = [
        "Amount of refund",
        "Time period for refund completion",
        "Refund in Cash on Delivery orders",
        "Refund in Prepaid orders",
        "Refund processed before or after pickup",
        "Refund medium change",
      ];
   
      concerns.forEach((concern) => {
        const button = document.createElement("button");
        button.style.cssText = `
        background: none;
                border: 2px solid #E62A86;
                color: #762F88;
                padding: 12px 25px;
                border-radius: 50px;
                cursor: pointer;
                font-size: 14px;
                text-align: center;
                transition: all 0.3s;
                min-width: 250px;
      `;
   
        button.textContent = concern;
        button.onmouseover = () => {
          button.style.background = "#E8ABC8";
          button.style.color = "#762F88";
          // button.style.border = "none";
          // button.style.padding = "14px 27px";
        };
        button.onmouseout = () => {
          button.style.background = "none";
          button.style.color = "#762F88";
          button.style.border = "2px solid #E62A86";
          button.style.padding = "12px 25px";
        };
   
        button.onclick = () => {
          addUserMessage(concern);
          if (concern === "Amount of refund") {
            addBotMessage(
              "Heads up! If your order included a promotional offer or delivery charges, the refund amount might be slightly different from what you originally paid. If the promo is no longer valid for the entire order, the total refunded amount will be adjusted accordingly. Let us know if you have any questions! ",
              "BOT"
            );
            document.getElementById("chat-input").value = "";
            const buttonContainer = createStyledButtonContainer(
              buttonSets.queryOptions
            );
            appendButtonsToChat(buttonContainer);
            buttonContainer.scrollTop = buttonContainer.scrollHeight;
          }
          if (concern === "Time period for refund completion") {
            addBotMessage(
              "Refunds are usually processed within 5 to 7 working days after initiation. Sit tight—we’ve got it covered! ",
              "BOT"
            );
            document.getElementById("chat-input").value = "";
            const buttonContainer = createStyledButtonContainer(
              buttonSets.queryOptions
            );
            appendButtonsToChat(buttonContainer);
            buttonContainer.scrollTop = buttonContainer.scrollHeight;
          }
          if (concern === "Refund in Cash on Delivery orders") {
            addBotMessage(
              "For Cash-on-Delivery (COD) orders, refunds are processed via NEFT to the bank account you provide during return initiation. Other refund methods aren't available. ",
              "BOT"
            );
            document.getElementById("chat-input").value = "";
            const buttonContainer = createStyledButtonContainer(
              buttonSets.queryOptions
            );
            appendButtonsToChat(buttonContainer);
            buttonContainer.scrollTop = buttonContainer.scrollHeight;
          }
          if (concern === "Refund in Prepaid orders") {
            addBotMessage(
              "For prepaid orders, refunds are processed back to the original payment method. You can choose a different refund option during the return initiation process.",
              "BOT"
            );
            document.getElementById("chat-input").value = "";
            const buttonContainer = createStyledButtonContainer(
              buttonSets.queryOptions
            );
            appendButtonsToChat(buttonContainer);
            buttonContainer.scrollTop = buttonContainer.scrollHeight;
          }
          if (concern === "Refund processed before or after pickup") {
            addBotMessage(
              "The timing of your refund depends on the seller. In most cases, it is processed after the return pickup is completed. ",
              "BOT"
            );
            document.getElementById("chat-input").value = "";
            const buttonContainer = createStyledButtonContainer(
              buttonSets.queryOptions
            );
            appendButtonsToChat(buttonContainer);
            buttonContainer.scrollTop = buttonContainer.scrollHeight;
          }
          if (concern === "Refund medium change") {
            addBotMessage(
              "You can change the refund method before the refund is initiated during the process. ",
              "BOT"
            );
            document.getElementById("chat-input").value = "";
            const buttonContainer = createStyledButtonContainer(
              buttonSets.queryOptions
            );
            appendButtonsToChat(buttonContainer);
            buttonContainer.scrollTop = buttonContainer.scrollHeight;
          }
        };
   
        concernsDiv.appendChild(button);
      });
      messagesContainer.appendChild(concernsDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
   
    function handlePolicies() {
      const messagesContainer = document.getElementById("chat-messages");
      if (!messagesContainer) return;
      const concernsDiv = document.createElement("div");
      concernsDiv.style.cssText = `
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: flex-start;
      margin-top: 10px;
  align-items: center
    `;
   
      const concerns = [
        "Return policy",
        "Refund policy",
        "Cancellation policy",
        "Exchange",
        "Promotions T&C",
        "Product and Collection",
      ];
   
      concerns.forEach((concern) => {
        const button = document.createElement("button");
        button.style.cssText = `
        background: none;
                border: 2px solid #E62A86;
                color: #762F88;
                padding: 12px 25px;
                border-radius: 50px;
                cursor: pointer;
                font-size: 14px;
                text-align: center;
                transition: all 0.3s;
                min-width: 250px;
      `;
   
        button.textContent = concern;
        button.onmouseover = () => {
          button.style.background = "#E8ABC8";
          button.style.color = "#762F88";
          // button.style.border = "none";
          // button.style.padding = "14px 27px";
        };
        button.onmouseout = () => {
          button.style.background = "none";
          button.style.color = "#762F88";
          button.style.border = "2px solid #E62A86";
          button.style.padding = "12px 25px";
        };
        button.onclick = () => {
          addUserMessage(concern);
          if (concern === "Return policy") {
            returnPolicy();
          }
          if (concern === "Refund policy") {
            refundPolicy();
          }
          if (concern === "Cancellation policy") {
            addBotMessage(
              "You can cancel your order before it’s shipped. If it’s already on its way, you can simply refuse to accept it when it arrives at your doorstep and we shall take care of the rest.",
              "BOT"
            );
            document.getElementById("chat-input").value = "";
            const buttonContainer = createStyledButtonContainer(
              buttonSets.queryOptions
            );
            appendButtonsToChat(buttonContainer);
            buttonContainer.scrollTop = buttonContainer.scrollHeight;
          }
          if (concern === "Exchange") {
            addBotMessage(
              " We don’t have an exchange policy, but no worries! You can return your order within 15 days and place a new one within this period.",
              "BOT"
            );
            document.getElementById("chat-input").value = "";
            const buttonContainer = createStyledButtonContainer(
              buttonSets.queryOptions
            );
            appendButtonsToChat(buttonContainer);
            buttonContainer.scrollTop = buttonContainer.scrollHeight;
          }
          if (concern === "Promotions T&C") {
            addBotMessage(
              'In case of Promotions terms and conditions, it should be mentioned, please find the terms and conditions in the below mentioned link <a href="https://www.nnnow.com/termsconditions">https://www.nnnow.com/termsconditions</a>.',
              "BOT"
            );
            document.getElementById("chat-input").value = "";
            const buttonContainer = createStyledButtonContainer(
              buttonSets.queryOptions
            );
            appendButtonsToChat(buttonContainer);
            buttonContainer.scrollTop = buttonContainer.scrollHeight;
          }
          if (concern === "Product and Collection") {
            addBotMessage(
              "A link to a page with a new product collection can be provided here.",
              "BOT"
            );
            document.getElementById("chat-input").value = "";
            const buttonContainer = createStyledButtonContainer(
              buttonSets.queryOptions
            );
            appendButtonsToChat(buttonContainer);
            buttonContainer.scrollTop = buttonContainer.scrollHeight;
          }
          console.log("Policies----->", concern);
        };
   
        concernsDiv.appendChild(button);
      });
      messagesContainer.appendChild(concernsDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
   
     async function ticketDetails(orderId) {
      const payload = {
        "ticket_ids" : orderId 
      }
      try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic bWRzNTByb2pjNWJoenBvZHJhNGxjN29wNzdqc3pha3YyNjJkaHFscTg0dXVnNWI4YjQ=");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "JSESSIONID=929A4CFAA92B37B4188DD710AB2CF492; JSESSIONRID=3SDmlhjtZ1s1DmlhjtZ; _KAPTURECRM_SESSION=; JSESSIONID=6E4441A10BD7200686D240C739D0A264; JSESSIONRID=3SDmlhjtZ1s1DmlhjtZ; _KAPTURECRM_SESSION=");
   
          const response = await fetch("https://arvind.kapturecrm.com/search-ticket-by-ticket-id.html/v.2.0", {
              method: "POST", 
              headers: myHeaders ,
              body: JSON.stringify(payload) 
          });
          console.log("response",response);
          
   
   
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
   
          const data =  response.json();
          return data; 
      } catch (error) {
          console.error("Error fetching ticket details:", error);
          return null; 
      }
  }
   
  async function handleStatusClick(orderId) {
    console.log("Status clicked:", orderId);
    addUserMessage(`I need help with order ${orderId}`);
    const items = await ticketDetails(orderId);
    console.log("items--=====>",items)
  }
   
    async function handleOrderClick(orderId) {
      console.log("Order clicked:", orderId);
      addUserMessage(`I need help with order ${orderId}`);
      addBotMessage(
        "Let me help you with your order. What specific assistance do you need?",
        "BOT"
      );
      try {
        // Create container for the items section
        const returnContainer = document.createElement("div");
        returnContainer.className = "return-section";
        const styles = document.createElement("style");
        styles.textContent = `
        .return-section {
          margin-top: 15px;
          width: 100%;
          max-width: 600px;
        }
    
        .product-display {
          margin-bottom: 20px;
          border: 1px solid #E62A86;
          border-radius: 8px;
          padding: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
    
        .product-display:hover {
          background: #fff5f9;
          transform: translateY(-2px);
          box-shadow: 0 2px 8px rgba(230, 42, 134, 0.1);
        }
    
        .product-info {
          display: flex;
          gap: 20px;
        }
    
        .product-image {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 4px;
        }
    
        .product-details {
          // flex: 1;
        }
    
        .product-brand {
          font-weight: bold;
          color: #762F88;
          margin-bottom: 5px;
        }
    
        .product-description {
          color: #333;
          margin-bottom: 10px;
        }
    
        .product-attributes {
          display: flex;
          gap: 15px;
          color: #666;
          margin-bottom: 10px;
        }
    
        .product-price {
          font-weight: bold;
          color: #762F88;
        }
    
        .sender-side {
          text-align: right;
          margin-left: auto;
          max-width: 80%;
        }
      `;
        document.head.appendChild(styles);
   
        items.forEach((item) => {
          const productDisplay = createProductDisplay(
            item.itemId,
            item.productDetails,
            item.itemStatus,
            item.itemDeliveryDateInfo
          );
          productDisplay.style.cursor = "pointer";
          productDisplay.onclick = () => {
            // Store the selected item ID globally
            window.currentSelectedItemId = item.itemId;
            console.log("Selected item ID:", window.currentSelectedItemId);
   
            const messageDiv = document.createElement("div");
            messageDiv.style.cssText = `
            display: flex;
            justify-content: flex-end;
            margin: 10px 0;
          `;
            const productContent = `
            <div style="
              background: #6a1b9a;
              color: white;
              padding: 15px;
              border-radius: 20px;
              max-width: 80%;
              font-size: 14px;
            ">
              <div style="display: flex; gap: 15px;">
                <img
                  src="${item.productDetails.image}"
                  alt="${item.productDetails.description}"
                  style="
                    width: 80px;
                    height: 80px;
                    object-fit: cover;
                    border-radius: 10px;
                  "
                />
                <div>
                <div style="font-weight: bold;">ItemId: ${item.itemId}</div>
                  <div style="font-weight: bold;">${item.productDetails.brand}</div>
                  <div style="margin: 5px 0;">${item.productDetails.description}</div>
                  <div style="font-size: 12px;">
                    <span>Color: ${item.productDetails.color}</span>
                    <span style="margin-left: 10px;">Size: ${item.productDetails.size}</span>
                  </div>
                  <div style="font-weight: bold; margin-top: 5px;">₹${item.productDetails.price}</div>
                </div>
              </div>
            </div>
          `;
            messageDiv.innerHTML = productContent;
   
            const messagesContainer = document.getElementById("chat-messages");
            if (messagesContainer) {
              messagesContainer.appendChild(messageDiv);
              messagesContainer.scrollTop = messagesContainer.scrollHeight;
   
              // Create and add issue buttons after item selection
              const issueButtons = [
                "Returns Related",
                "Refund Related",
                "Order Delivery Related",
                "Product Related",
              ];
   
              const buttonContainer = document.createElement("div");
              buttonContainer.style.cssText = `
              display: flex;
              flex-direction: column;
              gap: 10px;
              align-items: flex-start;
              margin-top: 15px;
              align-items: center
            `;
   
              issueButtons.forEach((issue) => {
                const button = document.createElement("button");
                button.style.cssText = `
                background: none;
                border: 2px solid #E62A86;
                color: #762F88;
                padding: 12px 25px;
                border-radius: 50px;
                cursor: pointer;
                font-size: 14px;
                text-align: center;
                transition: all 0.3s;
            
                min-width: 250px;
              `;
                button.textContent = issue;
   
                button.onmouseover = () => {
                  button.style.background = "#E8ABC8";
                  button.style.color = "#762F88";
                  // button.style.border = "none";
                  // button.style.padding = "14px 27px";
                };
                button.onmouseout = () => {
                  button.style.background = "none";
                  button.style.color = "#762F88";
                  button.style.border = "2px solid #E62A86";
                  button.style.padding = "12px 25px";
                };
   
                // Pass the selected item ID to handleOrderIssue
                button.onclick = () => {
                  handleOrderIssue(orderId, issue, window.currentSelectedItemId,item.itemStatus); 
                  // handleOrderIssue(orderId, issue, window.currentSelectedItemId,item.orderStatus);
                };
   
                buttonContainer.appendChild(button);
              });
   
              messagesContainer.appendChild(buttonContainer);
              messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
          };
   
          returnContainer.appendChild(productDisplay);
        });
   
        const messagesContainer = document.getElementById("chat-messages");
        if (messagesContainer) {
          messagesContainer.appendChild(returnContainer);
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
        addBotMessage(
          "I apologize, but I encountered an error while fetching your order details. Please try again later.",
          "BOT"
        );
      }
    }
   
   
   
    function optionDropDown(orderId, itemIds) {
      console.log("Order ID:4/3/25", orderId);
      console.log("Item IDs:4/3/25", itemIds);
      const dropdownContainer = document.createElement("div");
      dropdownContainer.className = "return-dropdown-container";
   
      // Create select element
      const selectElement = document.createElement("select");
      selectElement.className = "return-dropdown";
   
      // Add default option
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.textContent = "Select a reason";
      defaultOption.selected = true;
      defaultOption.disabled = true;
      selectElement.appendChild(defaultOption);
   
      // List of cancel reasons
      const cancelReasons = [
        { id: 43, reason: "Wrong product ordered" },
        { id: 44, reason: "Changed mind" },
        { id: 48, reason: "Change in delivery details" },
        { id: 50, reason: "Better price elsewhere" },
        { id: 56, reason: "Did not apply coupon" },
        { id: 59, reason: "Ordered by Mistake" },
        { id: 61, reason: "Date of delivery is too long" },
        { id: 53, reason: "Others" },
      ];
   
      // Add options from cancelReasons
      cancelReasons.forEach((reasonObj) => {
        const option = document.createElement("option");
        option.value = reasonObj.id;
        option.textContent = reasonObj.reason;
        selectElement.appendChild(option);
      });
   
   
      // Function to make an API call when an option is selected
      const handleCancelReason = async (selectedReason) => {
        try {
          const response = await fetch(
            "https://api-preprod.ailiens.com/d/api/cancel/details",
            {
              method: "POST",
              headers: {
                accept: "application/json",
                "content-Type": "application/json",
                "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                Connection: "keep-alive",
                bbversion: "v2",
                clientsessionid: "1745109689845",
                Authorization: `Bearer ${accessToken}`,
                correlationid: "93fb250e-ffb0-4e7c-93b9-72f5685d5683",
                "if-none-match":
                  ' W/"152-8UyXsIzXQkcUBNh8ObRhw8DIQMY"', 
                module: "odin",
                origin: "https://www.nnnow.com",
                priority: "u=1, i",
                referer: "https://www.nnnow.com/",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "cross-site",
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
                "bbversion": "v2",
                "clientSessionId": "1738734192763",
                "correlationId": "6e84e464-3dd5-408f-805e-0cadf17b8d2b",
                "module": "odin",
                "sec-ch-ua": "Google Chrome;v=131, Chromium;v=131, Not_A Brand;v=24",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "macOS",
              },
              body: JSON.stringify({
                cancelItemIds: itemIds,
                orderId: orderId
              }),
            }
          );
   
          if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
          }
   
          const data = await response.json();
          console.log("API Response:", data);
          addBotMessage("Cancel reason submitted successfully!");
        } catch (error) {
          console.error("Error submitting cancel reason:", error);
          addBotMessage("Failed to submit cancel reason. Please try again.");
        }
      };
   
      // Add change event listener
      selectElement.onchange = (e) => {
        const selectedReason = cancelReasons.find(
          (r) => r.id.toString() === e.target.value
        );
        if (selectedReason) {
          handleCancelReason(selectedReason);
        }
      };
   
      dropdownContainer.appendChild(selectElement);
   
      // Add styles (same as provided)
      const styles = document.createElement("style");
      styles.textContent = `
    .return-dropdown-container {
      margin-top: 15px;
      width: 100%;
      max-width: 300px;
    }
   
    .return-dropdown {
      width: 100%;
      padding: 12px 25px;
      border: 2px solid #E62A86;
      border-radius: 50px;
      color: #762F88;
      font-size: 14px
      cursor: pointer;
      background: none;
      transition: all 0.3s;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23762F88' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-position: right 15px center;
      background-size: 15px;
    }
   
    .return-dropdown:hover {
      background-color: #E8ABC8;
      border: 2px solid transparent;
      padding: 14px 27px;
    }
   
    .return-dropdown:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(230, 42, 134, 0.2);
    }
   
    .return-dropdown option {
      background: white;
      color: #762F88;
      padding: 12px;
       max-height: 200px; 
      overflow-y: auto; 
      display: block;
    }
  `;
   
      document.head.appendChild(styles);
   
      // Add dropdown to chat
      const messagesContainer = document.getElementById("chat-messages");
      if (messagesContainer) {
        messagesContainer.appendChild(dropdownContainer);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }
   
    function orderDelayed(orderId) {
      const messagesContainer = document.getElementById("chat-messages");
      if (!messagesContainer) return;
   
      // Get decoded token for API authorization
      const decodedToken = getDecodedToken();
      if (!decodedToken) return;
   
      // const accessToken = localStorage.getItem("accessToken");
      // Make API call to check order status
      const fetchOrderStatus = async () => {
        try {
          const response = await fetch(
            "http://localhost:5050/apis/order/status",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                orderId: orderId,
                phone: "7409329671",
                token: accessToken,
              }),
            }
          );
   
          const data = await response.json();
   
          // Create buttons based on API response
          displayOrderDelayedOptions(data.isDelayedBeyond24Hours);
        } catch (error) {
          console.error("Error fetching order status:", error);
          // Fallback to default buttons if API fails
          displayOrderDelayedOptions(false);
        }
      };
   
      // Function to display appropriate options based on API response
      const displayOrderDelayedOptions = (isDelayedBeyond24Hours) => {
        const concerns = [
          "Less than 24 hrs beyond TAT or within TAT",
          "More than 24 hrs after TAT",
        ];
   
        concerns.forEach((concern) => {
          const button = document.createElement("button");
          button.style.cssText = `
            background: none;
            border: 2px solid #E62A86;
            color: #762F88;
            padding: 12px 25px;
            border-radius: 50px;
            cursor: pointer;
            font-size: 14px;
            text-align: center;
            transition: all 0.3s;
            min-width: 250px;
            position: relative; 
            overflow: visible;
          `;
   
          const displayText = concern;
          button.textContent = displayText;
   
          button.onclick = () => {
            addUserMessage(concern);
   
            if (concern === "Less than 24 hrs beyond TAT or within TAT") {
              // If API shows not delayed beyond 24 hours
              if (!isDelayedBeyond24Hours) {
                addBotMessage(
                  "We understand the inconvenience this may cause and want to assure you that your order will be delivered within the next 24 hours",
                  "BOT"
                );
              } else {
                // Show different message if API shows it's actually delayed more than 24 hours
                addBotMessage(
                  "Our records indicate your order is delayed more than 24 hours. Please raise a ticket and we will expedite the delivery.",
                  "BOT"
                );
              }
            }
   
            if (concern === "More than 24 hrs after TAT") {
              // If API confirms it's delayed beyond 24 hours
              if (isDelayedBeyond24Hours) {
                addBotMessage(
                  "If your order is delayed 24 hours of the estimated delivery day, please raise a ticket and we will raise the issue with our delivery partner to arrange for an early delivery.",
                  "BOT"
                );
                addBotMessage(
                  "Please select one option that you want to send your concern with picture or without picture"
                );
                showImageOptionBox("More than 24 hrs after TAT");
              } else {
                // Show different message if API shows it's not actually delayed more than 24 hours
                addBotMessage(
                  "According to our records, your order is not delayed beyond 24 hours after TAT. It should arrive soon. We appreciate your patience.",
                  "BOT"
                );
              }
            }
          };
          messagesContainer.appendChild(button);
        });
   
        // Scroll to the bottom to show the new buttons
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      };
   
      // Call the function to fetch order status and display options
      fetchOrderStatus();
    }
    async function checkOrderStatus(orderId) {
      console.log("is current id is matchinng ornot",orderId)
      try {
        // Check if orderId is provided
        if (!orderId) {
          throw new Error("Order ID is required");
        }
   
        // Get token from localStorage
        // const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          throw new Error("Authentication token not found");
        }
   
        // Get phone from localStorage
        // const phone = localStorage.getItem("userMobile");
        if (!userMobile) {
          throw new Error("User phone number not found");
        }
   
        // Make the API call with proper headers
        const response = await fetch(
          "http://localhost:5050/apis/order/status",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Missing Content-Type header
            },
            body: JSON.stringify({
              orderId: orderId,
              phone: userMobile,
              token: accessToken,
            }),
          }
        );
   
        // Parse the JSON response
        const data = await response.json();
   
        // Check if the response indicates success or a specific error
        if (!response.ok || (data && data.status === false)) {
          throw new Error(
            data.data || `API request failed with status: ${response.status}`
          );
        }
   
        // Return the order status data
        return data;
      } catch (error) {
        console.error("Error checking order status:", error);
        // Return a proper error object instead of undefined
        return {
          error: true,
          message: error.message || "Error checking order status",
          orderStatus: "Unknown",
        };
      }
    }
   
   
    function cancelOrder(orderId) {
      console.log("what is order id of cancel------>",orderId)
      checkOrderStatus(orderId)
        .then((data) => {
          const orderStatus = data.orderStatus;
          if (orderStatus === "Delivered") {
            addBotMessage(
              "Hello! Once your order is shipped, we can’t cancel the delivery. But no worries—just reject it at your doorstep when it arrives. Sorry for the hassle! Please write back if there’s anything else we can help with. ",
              "BOT"
            );
            document.getElementById("chat-input").value = "";
            const buttonContainer = createStyledButtonContainer(
              buttonSets.queryOptions
            );
            appendButtonsToChat(buttonContainer);
            buttonContainer.scrollTop = buttonContainer.scrollHeight;
          } else if (
            ["In Progress", "Cancelled", "Returned"].includes(orderStatus)
          ) {
            addBotMessage(
              "Please pick your reason for cancellation from the dropdown menu, and we’ll get the process started! ",
              "BOT"
            );
            const itemIds = data.items.map((item) => item.itemId);
            optionDropDown(orderId, itemIds);
          } else {
            addBotMessage(
              "We're unable to process your cancellation request at this time. Please contact customer support for assistance.",
              "BOT"
            );
            console.warn(`Unexpected order status: ${orderStatus}`);
          }
        })
        .catch((error) => {
          addBotMessage(
            "Unable to retrieve order status at this time. Please try again later.",
            "BOT"
          );
          console.error("Error fetching order status:", error);
        });
    }
   
    function partialorder() {
      const messagesContainer = document.getElementById("chat-messages");
      if (!messagesContainer) return;
   
      const concerns = ["Accept the judgement", "Raise a ticket"];
   
      concerns.forEach((concern) => {
        const button = document.createElement("button");
        button.style.cssText = `
      background: none;
      border: 2px solid #E62A86;
      color: #762F88;
      padding: 12px 25px;
      border-radius: 50px;
      cursor: pointer;
      font-size: 14px;
      text-align: center;
      transition: all 0.3s
      min-width: 250px;
      position: relative; 
      overflow: visible;
    `;
   
        const displayText = concern;
        button.textContent = displayText;
   
        button.onclick = () => {
          addUserMessage(concern);
   
          if (concern === "Accept the judgement") {
            addBotMessage(
              "Thank you for accepting the judgement. If you have any further questions or concerns, feel free to ask.",
              "BOT"
            );
            document.getElementById("chat-input").value = "";
            const buttonContainer = createStyledButtonContainer(
              buttonSets.queryOptions
            );
            appendButtonsToChat(buttonContainer);
            buttonContainer.scrollTop = buttonContainer.scrollHeight;
          }
   
          if (concern === "Raise a ticket") {
            const buttonContainerDisplayed = document.createElement("div");
            buttonContainerDisplayed.style.cssText = `
                        display: flex;
                        justify-content: flex-start;
                        margin-top: 15px;
                        `;
   
            // Create the "Raise Ticket" button
            const raiseTicketButtonDisplayed = document.createElement("button");
            raiseTicketButtonDisplayed.textContent = "Raise Ticket";
            raiseTicketButtonDisplayed.style.cssText = `
            background: none;
            border: 2px solid #E62A86;
            color: #762F88;
            padding: 12px 25px;
            border-radius: 50px;
            cursor: pointer;
            font-size: 14px;
            text-align: center;
            transition: all 0.3s;
            min-width: 150px;
          `;
   
            // Add hover effects
            raiseTicketButtonDisplayed.onmouseover = () => {
              raiseTicketButtonDisplayed.style.background = "#E8ABC8";
              raiseTicketButtonDisplayed.style.color = "#762F88";
              // raiseTicketButtonDisplayed.style.border = "none";
              // raiseTicketButtonDisplayed.style.padding = "14px 27px";
            };
   
            raiseTicketButtonDisplayed.onmouseout = () => {
              raiseTicketButtonDisplayed.style.background = "none";
              raiseTicketButtonDisplayed.style.color = "#762F88";
              raiseTicketButtonDisplayed.style.border = "2px solid #E62A86";
              raiseTicketButtonDisplayed.style.padding = "12px 25px";
            };
   
            raiseTicketButtonDisplayed.onclick = () => {
              const message =
                document.getElementById("chat-input").value || "Raise Ticket";
              handlePickupTicketSubmit("Partial order recieved", message, null);
            };
   
            // Add the button to the container
            buttonContainerDisplayed.appendChild(raiseTicketButtonDisplayed);
   
            // Add the button container to the chat
            const chatContainerDisplayed =
              document.querySelector(".chat-container") ||
              document.getElementById("chat-messages");
            if (chatContainerDisplayed) {
              chatContainerDisplayed.appendChild(buttonContainerDisplayed);
              // Scroll tPICKUPhe chat container to show the button
              chatContainerDisplayed.scrollTop =
                chatContainerDisplayed.scrollHeight;
            }
          }
        };
        messagesContainer.appendChild(button);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      });
    }
   
    function cancelOrderwithoutconsent() {
      const messagesContainer = document.getElementById("chat-messages");
      if (!messagesContainer) return;
   
      const concerns = [
        "Place my order again",
        "Back to main menu",
        "End the chat",
      ];
   
      concerns.forEach((concern) => {
        const button = document.createElement("button");
        button.style.cssText = `
      background: none;
      border: 2px solid #E62A86;
      color: #762F88;
      padding: 12px 25px;
      border-radius: 50px;
      cursor: pointer;
      font-size: 14px;
      text-align: center;
      transition: all 0.3s
      min-width: 250px;
      position: relative; 
      overflow: visible;
    `;
   
        const displayText = concern;
        button.textContent = displayText;
   
        button.onclick = () => {
          addUserMessage(concern);
   
          if (concern === "Place my order again") {
            addBotMessage("Soon------------>.", "BOT");
          }
   
          if (concern === "Back to main menu") {
            addBotMessage("Soon------------>", "BOT");
          }
   
          if (concern === "End the chat") {
            addBotMessage("Soon------------>", "BOT");
          }
        };
        messagesContainer.appendChild(button);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      });
    }
   
    function changeDeliveryAddress() {
      const messagesContainer = document.getElementById("chat-messages");
      if (!messagesContainer) return;
   
      const concerns = ["Order not shipped", "Order shipped"];
   
      concerns.forEach((concern) => {
        const button = document.createElement("button");
        button.style.cssText = `
      background: none;
      border: 2px solid #E62A86;
      color: #762F88;
      padding: 12px 25px;
      border-radius: 50px;
      cursor: pointer;
      font-size: 14px;
      text-align: center;
      transition: all 0.3s
      min-width: 250px;
      position: relative; 
      overflow: visible;
    `;
   
        const displayText = concern;
        button.textContent = displayText;
   
        button.onclick = () => {
          addUserMessage(concern);
   
          if (concern === "Order not shipped") {
            addBotMessage(
              "You can provide the address when placing the order . If you need to change the address after order is placed , please raise a ticket  with us.",
              "BOT"
            );
            addBotMessage("Please write you address in text box.", "BOT");
            showImageOptionBox("Order not shipped", "onlyText");
          }
   
          if (concern === "Order shipped") {
            addBotMessage(
              "Unfortunately , once order has been shipped , we are unable to change the delivery address",
              "BOT"
            );
          }
        };
        messagesContainer.appendChild(button);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      });
    }
   
    function changeMobileNumber() {
      const messagesContainer = document.getElementById("chat-messages");
      if (!messagesContainer) return;
   
      const concerns = ["Order not shipped", "Order shipped"];
   
      concerns.forEach((concern) => {
        const button = document.createElement("button");
        button.style.cssText = `
      background: none;
      border: 2px solid #E62A86;
      color: #762F88;
      padding: 12px 25px;
      border-radius: 50px;
      cursor: pointer;
      font-size: 14px;
      text-align: center;
      transition: all 0.3s
      min-width: 250px;
      position: relative; 
      overflow: visible;
    `;
   
        const displayText = concern;
        button.textContent = displayText;
   
        button.onclick = () => {
          addUserMessage(concern);
          if (concern === "Order not shipped") {
            addBotMessage(
              "You can provide the address when placing the order . If you need to change the number after order is placed , please raise a ticket  with us.",
              "BOT"
            );
            addBotMessage("Please write your number in text box.", "BOT");
            showImageOptionBoxformobile("Order not shipped", "onlyText");
          }
   
          if (concern === "Order shipped") {
            addBotMessage(
              "Unfortunately , once order has been shipped , we are unable to change the mobile number.",
              "BOT"
            );
          }
        };
        messagesContainer.appendChild(button);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      });
    }
   
    function invoiceOfDelivery() {
      const messagesContainer = document.getElementById("chat-messages");
      if (!messagesContainer) return;
   
      const concerns = ["Order delivered", "Order not delivered"];
   
      concerns.forEach((concern) => {
        const button = document.createElement("button");
        button.style.cssText = `
      background: none;
      border: 2px solid #E62A86;
      color: #762F88;
      padding: 12px 25px;
      border-radius: 50px;
      cursor: pointer;
      font-size: 14px;
      text-align: center;
      transition: all 0.3s
      min-width: 250px;
      position: relative; 
      overflow: visible;
    `;
   
        const displayText = concern;
        button.textContent = displayText;
   
        button.onclick = () => {
          addUserMessage(concern);
   
          if (concern === "Order delivered") {
            addBotMessage("Order invoice shared", "BOT");
          }
   
          if (concern === "Order not delivered") {
            addBotMessage(
              "Please note that the order invoice and proof of delivery can only proof of delivery can only be provideed once order has been successfully delivered",
              "BOT"
            );
          }
        };
        messagesContainer.appendChild(button);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      });
    }
   
   
    function handleOrderIssue(orderId, issueType, selectedItemId = null,status) {
      console.log("Order issue:", issueType, "for order:", orderId , "order status : " , status );
      window.currentSelectedItemId = selectedItemId;
      addUserMessage(`${issueType} for Order ${orderId}`, "BOT1");
      // Store the selected item ID globally
      // Here you can add specific handling for each issue type
      switch (issueType) {
        case "Returns Related":
          
        if (status === "In Progress") {
          addBotMessage(`Thank you for reaching out to us regarding your return request. We understand your concern however, your order is currently ${status} and is not eligible for return.`, "BOT");
          document.getElementById("chat-input").value = "";
            const buttonContainer = createStyledButtonContainer(
              buttonSets.queryOptions
            );
            appendButtonsToChat(buttonContainer);
            buttonContainer.scrollTop = buttonContainer.scrollHeight;
          return; 
      }     
          addBotMessage("Please select your return related query:", "BOT");
          
          // Create sub-options for Returns
          const returnOptions = [
            "Return my product",
            "Status of my pickup",
            "Pickup status not displayed/Incorrect",
            "Pickup not done",
            "Pickup not successful",
            "Return Rejected at doorstep",
            "Pickup Instructions",
            "Change my mobile number",
            "Change my Pickup address",
            "Pincode not serviceable",
          ];
   
          const subButtonContainer = document.createElement("div");
          subButtonContainer.style.cssText = `
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: flex-start;
          margin-top: 15px;
          align-items: center
        `;
   
          returnOptions.forEach((option) => {
            const button = document.createElement("button");
            button.style.cssText = `
            background: none;
            border: 2px solid #E62A86;
            color: #762F88;
            padding: 12px 25px;
            border-radius: 50px;
            cursor: pointer;
            font-size: 14px;
            text-align: center;
            transition: all 0.3s;
            min-width: 250px;
          `;
            button.textContent = option;
   
            // Add same hover effects
            button.onmouseover = () => {
              button.style.background = "#E8ABC8";
              button.style.color = "#762F88";
              // button.style.border = "none";
              // button.style.padding = "14px 27px";
            };
            button.onmouseout = () => {
              button.style.background = "none";
              button.style.color = "#762F88";
              button.style.border = "2px solid #E62A86";
              button.style.padding = "12px 25px";
            };
   
            // Handle sub-option click
            button.onclick = () => {
              handleReturnSubOption(orderId, option);
            };
   
            subButtonContainer.appendChild(button);
          });
   
          // Add sub-options to chat
          const messagesContainer = document.getElementById("chat-messages");
          if (messagesContainer) {
            messagesContainer.appendChild(subButtonContainer);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
          }
          break;
        case "Refund Related":
          if (status === "In Progress") {
            addBotMessage(`Thank you for reaching out to us regarding your refund request. We understand your concern however, your order is currently ${status} and is not eligible for refund.`, "BOT");
            document.getElementById("chat-input").value = "";
            const buttonContainer = createStyledButtonContainer(
              buttonSets.queryOptions
            );
            appendButtonsToChat(buttonContainer);
            buttonContainer.scrollTop = buttonContainer.scrollHeight;
            return; 
        }
          const RefundRelatedOptions = [
            "Status of my Refund",
            "Refund delayed",
            "Refund not initiated",
            "Refund not reflecting in bank account",
            "Full amount not refunded",
            // "Refund Reference number"
          ];
   
          const subRefundButtonContainer = document.createElement("div");
          subRefundButtonContainer.style.cssText = `
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: flex-start;
          margin-top: 15px;
        `;
   
          RefundRelatedOptions.forEach((option) => {
            const button = document.createElement("button");
            button.style.cssText = `
            background: none;
            border: 2px solid #E62A86;
            color: #762F88;
            padding: 12px 25px;
            border-radius: 50px;
            cursor: pointer;
            font-size: 14px;
            text-align: center;
            transition: all 0.3s;
     
            min-width: 250px;
          `;
            button.textContent = option;
            button.onmouseover = () => {
              button.style.background = "#E8ABC8";
              button.style.color = "#762F88";
              // button.style.border = "none";
              // button.style.padding = "14px 27px";
            };
            button.onmouseout = () => {
              button.style.background = "none";
              button.style.color = "#762F88";
              button.style.border = "2px solid #E62A86";
              button.style.padding = "12px 25px";
            };
   
            button.onclick = async () => {
              if (option === "Status of my Refund") {
                addUserMessage("Status of my Refund");
                console.log("button clicked");
                if (!orderId) {
                  addBotMessage(
                    "Sorry, we couldn't find your order ID. Please try again.",
                    "BOT"
                  );
                }
                const selectedItemId = window.currentSelectedItemId;
                checkOrderStatus(orderId)
                  .then((data) => {
                    if (data && data.error) {
                      addBotMessage(
                        "We encountered an error while checking your refund status. Please try again later.",
                        "BOT"
                      );
                      return;
                    }
                    if (!data || !data.items || !Array.isArray(data.items)) {
                      addBotMessage(
                        "We couldn't retrieve your refund information at this time.",
                        "BOT"
                      );
                      return;
                    }
                    const selectedItem = data.items.find(
                      (item) => item.itemId === selectedItemId
                    );
                    if (selectedItem) {
                      if (selectedItem.returnPickUpStatus === false) {
                        let returnMessage = `Currently,Your refund is under ${selectedItem.returnStatus}.It usually  takes 5 to 7 working days to be credited.`;
                        if (selectedItem.returnDate) {
                          returnMessage += ` on ${selectedItem.returnDate}`;
                        }
   
                        addBotMessage(returnMessage, "BOT");
                        document.getElementById("chat-input").value = "";
                        const buttonContainer = createStyledButtonContainer(
                          buttonSets.queryOptions
                        );
                        appendButtonsToChat(buttonContainer);
                        buttonContainer.scrollTop = buttonContainer.scrollHeight;
                      } else if (selectedItem.returnPickUpStatus === true) {
                        addBotMessage(
                          `Your refund status for item ${selectedItemId} is ${selectedItem.returnStatus} `,
                          "BOT"
                        );
                        document.getElementById("chat-input").value = "";
                        const buttonContainer = createStyledButtonContainer(
                          buttonSets.queryOptions
                        );
                        appendButtonsToChat(buttonContainer);
                        buttonContainer.scrollTop = buttonContainer.scrollHeight;
                      } else if (selectedItem.returnPickUpStatus == null) {
                        addBotMessage(
                          `Item ${selectedItemId} doesn't have any refund scheduled.`,
                          "BOT"
                        );
                        document.getElementById("chat-input").value = "";
                        const buttonContainer = createStyledButtonContainer(
                          buttonSets.queryOptions
                        );
                        appendButtonsToChat(buttonContainer);
                        buttonContainer.scrollTop = buttonContainer.scrollHeight;
                      }
                    } else {
                      addBotMessage(
                        `We couldn't find information for item ${selectedItemId} in this order.`,
                        "BOT"
                      );
                    }
                  })
                  .catch((error) => {
                    console.error("Unexpected error in pickup status:", error);
                    addBotMessage(
                      "We encountered an error while checking your pickup status. Please try again later.",
                      "BOT"
                    );
                  });
              }
              if (option === "Refund delayed") {
                addUserMessage("Refund delayed");
                console.log("button clicked");
                if (!orderId) {
                  addBotMessage(
                    "Sorry, we couldn't find your order ID. Please try again.",
                    "BOT"
                  );
                }
                const selectedItemId = window.currentSelectedItemId;
                checkOrderStatus(orderId)
                  .then((data) => {
                    if (data && data.error) {
                      addBotMessage(
                        "We encountered an error while checking your refund status. Please try again later.",
                        "BOT"
                      );
                      return;
                    }
                    if (!data || !data.items || !Array.isArray(data.items)) {
                      addBotMessage(
                        "We couldn't retrieve your refund information at this time.",
                        "BOT"
                      );
                      return;
                    }
                    const selectedItem = data.items.find(
                      (item) => item.itemId === selectedItemId
                    );
                    if (selectedItem) {
                      if (selectedItem.isBeyond7DaysFromRefund === false) {
                        let returnMessage = `Currently,Your refund is under ${selectedItem.returnStatus}.It usually  takes 5 to 7 working days to be credited.`;
                        addBotMessage(returnMessage, "BOT");
                        document.getElementById("chat-input").value = "";
                        const buttonContainer = createStyledButtonContainer(
                          buttonSets.queryOptions
                        );
                        appendButtonsToChat(buttonContainer);
                        buttonContainer.scrollTop = buttonContainer.scrollHeight;
                      } else if (selectedItem.isBeyond7DaysFromRefund === true) {
                        addBotMessage(
                          "Sorry for the inconvenience! Please raise a ticket, and we’ll check it out for you. ",
                          "BOT"
                        );
                        const buttonContainerDisplayed =
                          document.createElement("div");
                        buttonContainerDisplayed.style.cssText = `
                        display: flex;
                        justify-content: flex-start;
                        margin-top: 15px;
                        `;
   
                        // Create the "Raise Ticket" button
                        const raiseTicketButtonDisplayed =
                          document.createElement("button");
                        raiseTicketButtonDisplayed.textContent = "Raise Ticket";
                        raiseTicketButtonDisplayed.style.cssText = `
            background: none;
            border: 2px solid #E62A86;
            color: #762F88;
            padding: 12px 25px;
            border-radius: 50px;
            cursor: pointer;
            font-size: 14px;
            text-align: center;
            transition: all 0.3s;
            min-width: 150px;
          `;
   
                        // Add hover effects
                        raiseTicketButtonDisplayed.onmouseover = () => {
                          raiseTicketButtonDisplayed.style.background = "#E8ABC8";
                          raiseTicketButtonDisplayed.style.color = "#762F88";
                          // raiseTicketButtonDisplayed.style.border = "none";
                          // raiseTicketButtonDisplayed.style.padding = "14px 27px";
                        };
   
                        raiseTicketButtonDisplayed.onmouseout = () => {
                          raiseTicketButtonDisplayed.style.background = "none";
                          raiseTicketButtonDisplayed.style.color = "#762F88";
                          raiseTicketButtonDisplayed.style.border =
                            "2px solid #E62A86";
                          raiseTicketButtonDisplayed.style.padding = "12px 25px";
                        };
   
                        raiseTicketButtonDisplayed.onclick = () => {
                          const message =
                            document.getElementById("chat-input").value ||
                            "Raise Ticket";
                          handlePickupTicketSubmit(
                            "Refund delayed more than 7 days",
                            message,
                            null
                          );
                        };
   
                        // Add the button to the container
                        buttonContainerDisplayed.appendChild(
                          raiseTicketButtonDisplayed
                        );
   
                        // Add the button container to the chat
                        const chatContainerDisplayed =
                          document.querySelector(".chat-container") ||
                          document.getElementById("chat-messages");
                        if (chatContainerDisplayed) {
                          chatContainerDisplayed.appendChild(
                            buttonContainerDisplayed
                          );
                          // Scroll tPICKUPhe chat container to show the button
                          chatContainerDisplayed.scrollTop =
                            chatContainerDisplayed.scrollHeight;
                        }
                      } else if (selectedItem.isBeyond7DaysFromRefund === null) {
                        addBotMessage(
                          `Item ${selectedItemId} doesn't have any refund scheduled.`,
                          "BOT"
                        );
                        document.getElementById("chat-input").value = "";
                        const buttonContainer = createStyledButtonContainer(
                          buttonSets.queryOptions
                        );
                        appendButtonsToChat(buttonContainer);
                        buttonContainer.scrollTop = buttonContainer.scrollHeight;
                      }
                    } else {
                      addBotMessage(
                        `We couldn't find information for item ${selectedItemId} in this order.`,
                        "BOT"
                      );
                    }
                  })
                  .catch((error) => {
                    console.error("Unexpected error in pickup status:", error);
                    addBotMessage(
                      "We encountered an error while checking your pickup status. Please try again later.",
                      "BOT"
                    );
                  });
              }
   
              if (option === "Refund not initiated") {
                addUserMessage("Refund not initiated");
                console.log("button clicked");
                if (!orderId) {
                  addBotMessage(
                    "Sorry, we couldn't find your order ID. Please try again.",
                    "BOT"
                  );
                }
                const selectedItemId = window.currentSelectedItemId;
                checkOrderStatus(orderId)
                  .then((data) => {
                    if (data && data.error) {
                      addBotMessage(
                        "We encountered an error while checking your refund status. Please try again later.",
                        "BOT"
                      );
                      return;
                    }
                    if (!data || !data.items || !Array.isArray(data.items)) {
                      addBotMessage(
                        "We couldn't retrieve your refund information at this time.",
                        "BOT"
                      );
                      return;
                    }
                    const selectedItem = data.items.find(
                      (item) => item.itemId === selectedItemId
                    );
                    if (selectedItem) {
                      if (selectedItem.isBeyond24HoursFromRefund === false) {
                        let returnMessage =
                          "Refunds usually take up to 24 hours to be processed after your return is completed.";
                        addBotMessage(returnMessage, "BOT");
                        document.getElementById("chat-input").value = "";
                        const buttonContainer = createStyledButtonContainer(
                          buttonSets.queryOptions
                        );
                        appendButtonsToChat(buttonContainer);
                        buttonContainer.scrollTop = buttonContainer.scrollHeight;
                      } else if (
                        selectedItem.isBeyond24HoursFromRefund === true
                      ) {
                        addBotMessage(
                          "Sorry for the inconvenience! Please raise a ticket, and we’ll check it out for you. ",
                          "BOT"
                        );
                        const buttonContainerDisplayed =
                          document.createElement("div");
                        buttonContainerDisplayed.style.cssText = `
                        display: flex;
                        justify-content: flex-start;
                        margin-top: 15px;
                        `;
   
                        // Create the "Raise Ticket" button
                        const raiseTicketButtonDisplayed =
                          document.createElement("button");
                        raiseTicketButtonDisplayed.textContent = "Raise Ticket";
                        raiseTicketButtonDisplayed.style.cssText = `
            background: none;
            border: 2px solid #E62A86;
            color: #762F88;
            padding: 12px 25px;
            border-radius: 50px;
            cursor: pointer;
            font-size: 14px;
            text-align: center;
            transition: all 0.3s;
            min-width: 150px;
          `;
   
                        // Add hover effects
                        raiseTicketButtonDisplayed.onmouseover = () => {
                          raiseTicketButtonDisplayed.style.background = "#E8ABC8";
                          raiseTicketButtonDisplayed.style.color = "#762F88";
                          // raiseTicketButtonDisplayed.style.border = "none";
                          // raiseTicketButtonDisplayed.style.padding = "14px 27px";
                        };
   
                        raiseTicketButtonDisplayed.onmouseout = () => {
                          raiseTicketButtonDisplayed.style.background = "none";
                          raiseTicketButtonDisplayed.style.color = "#762F88";
                          raiseTicketButtonDisplayed.style.border =
                            "2px solid #E62A86";
                          raiseTicketButtonDisplayed.style.padding = "12px 25px";
                        };
   
                        raiseTicketButtonDisplayed.onclick = () => {
                          const message =
                            document.getElementById("chat-input").value ||
                            "Raise Ticket";
                          handlePickupTicketSubmit(
                            "Refund initiated more than 24 hours",
                            message,
                            null
                          );
                        };
   
                        // Add the button to the container
                        buttonContainerDisplayed.appendChild(
                          raiseTicketButtonDisplayed
                        );
   
                        // Add the button container to the chat
                        const chatContainerDisplayed =
                          document.querySelector(".chat-container") ||
                          document.getElementById("chat-messages");
                        if (chatContainerDisplayed) {
                          chatContainerDisplayed.appendChild(
                            buttonContainerDisplayed
                          );
                          // Scroll tPICKUPhe chat container to show the button
                          chatContainerDisplayed.scrollTop =
                            chatContainerDisplayed.scrollHeight;
                        }
                      } else if (
                        selectedItem.isBeyond24HoursFromRefund === null
                      ) {
                        addBotMessage(
                          `Item ${selectedItemId} doesn't have any refund scheduled.`,
                          "BOT"
                        );
                        document.getElementById("chat-input").value = "";
                        const buttonContainer = createStyledButtonContainer(
                          buttonSets.queryOptions
                        );
                        appendButtonsToChat(buttonContainer);
                        buttonContainer.scrollTop = buttonContainer.scrollHeight;
                      }
                    } else {
                      addBotMessage(
                        `We couldn't find information for item ${selectedItemId} in this order.`,
                        "BOT"
                      );
                    }
                  })
                  .catch((error) => {
                    console.error("Unexpected error in pickup status:", error);
                    addBotMessage(
                      "We encountered an error while checking your pickup status. Please try again later.",
                      "BOT"
                    );
                  });
              }
              if (option === "Refund not reflecting in bank account") {
                addUserMessage("Refund not reflecting in bank account");
                const buttonContainerDisplayed = document.createElement("div");
                buttonContainerDisplayed.style.cssText = `
                        display: flex;
                        justify-content: flex-start;
                        margin-top: 15px;
                        `;
   
                // Create the "Raise Ticket" button
                const raiseTicketButtonDisplayed =
                  document.createElement("button");
                raiseTicketButtonDisplayed.textContent = "Raise Ticket";
                raiseTicketButtonDisplayed.style.cssText = `
            background: none;
            border: 2px solid #E62A86;
            color: #762F88;
            padding: 12px 25px;
            border-radius: 50px;
            cursor: pointer;
            font-size: 14px;
            text-align: center;
            transition: all 0.3s;
            min-width: 150px;
          `;
   
                // Add hover effects
                raiseTicketButtonDisplayed.onmouseover = () => {
                  raiseTicketButtonDisplayed.style.background = "#E8ABC8";
                  raiseTicketButtonDisplayed.style.color = "#762F88";
                  // raiseTicketButtonDisplayed.style.border = "none";
                  // raiseTicketButtonDisplayed.style.padding = "14px 27px";
                };
   
                raiseTicketButtonDisplayed.onmouseout = () => {
                  raiseTicketButtonDisplayed.style.background = "none";
                  raiseTicketButtonDisplayed.style.color = "#762F88";
                  raiseTicketButtonDisplayed.style.border = "2px solid #E62A86";
                  raiseTicketButtonDisplayed.style.padding = "12px 25px";
                };
   
                raiseTicketButtonDisplayed.onclick = () => {
                  const message =
                    document.getElementById("chat-input").value || "Raise Ticket";
                  handlePickupTicketSubmit(
                    "Refund not reflecting in bank account",
                    message,
                    null
                  );
                };
   
                // Add the button to the container
                buttonContainerDisplayed.appendChild(raiseTicketButtonDisplayed);
   
                // Add the button container to the chat
                const chatContainerDisplayed =
                  document.querySelector(".chat-container") ||
                  document.getElementById("chat-messages");
                if (chatContainerDisplayed) {
                  chatContainerDisplayed.appendChild(buttonContainerDisplayed);
                  // Scroll tPICKUPhe chat container to show the button
                  chatContainerDisplayed.scrollTop =
                    chatContainerDisplayed.scrollHeight;
                }
              }
              if (option === "Full amount not refunded") {
                addUserMessage("Full amount not refunded");
                addBotMessage(
                  "Uh-oh! If your order status isn’t showing up after 24 hours or seems incorrect, please raise a ticket. We’ll look into it and get back to you ASAP! ",
                  "BOT"
                );
                const messagesContainer =
                  document.getElementById("chat-messages");
                if (!messagesContainer) return;
   
                const concerns = ["Accept the judgement", "Raise a ticket"];
   
                concerns.forEach((concern) => {
                  const button = document.createElement("button");
                  button.style.cssText = `
      background: none;
      border: 2px solid #E62A86;
      color: #762F88;
      padding: 12px 25px;
      border-radius: 50px;
      cursor: pointer;
      font-size: 14px;
      text-align: center;
      transition: all 0.3s
      min-width: 250px;
      position: relative; 
      overflow: visible;
    `;
   
                  const displayText = concern;
                  button.textContent = displayText;
   
                  button.onclick = () => {
                    addUserMessage(concern);
   
                    if (concern === "Accept the judgement") {
                      addBotMessage(
                        "Thank you for accepting the judgement. If you have any further questions or concerns, feel free to ask.",
                        "BOT"
                      );
                      document.getElementById("chat-input").value = "";
                      const buttonContainer = createStyledButtonContainer(
                        buttonSets.queryOptions
                      );
                      appendButtonsToChat(buttonContainer);
                      buttonContainer.scrollTop = buttonContainer.scrollHeight;
                    }
   
                    if (concern === "Raise a ticket") {
                      const buttonContainerDisplayed =
                        document.createElement("div");
                      buttonContainerDisplayed.style.cssText = `
                        display: flex;
                        justify-content: flex-start;
                        margin-top: 15px;
                        `;
   
                      // Create the "Raise Ticket" button
                      const raiseTicketButtonDisplayed =
                        document.createElement("button");
                      raiseTicketButtonDisplayed.textContent = "Raise Ticket";
                      raiseTicketButtonDisplayed.style.cssText = `
            background: none;
            border: 2px solid #E62A86;
            color: #762F88;
            padding: 12px 25px;
            border-radius: 50px;
            cursor: pointer;
            font-size: 14px;
            text-align: center;
            transition: all 0.3s;
            min-width: 150px;
          `;
   
                      // Add hover effects
                      raiseTicketButtonDisplayed.onmouseover = () => {
                        raiseTicketButtonDisplayed.style.background = "#E8ABC8";
                        raiseTicketButtonDisplayed.style.color = "#762F88";
                        // raiseTicketButtonDisplayed.style.border = "none";
                        // raiseTicketButtonDisplayed.style.padding = "14px 27px";
                      };
   
                      raiseTicketButtonDisplayed.onmouseout = () => {
                        raiseTicketButtonDisplayed.style.background = "none";
                        raiseTicketButtonDisplayed.style.color = "#762F88";
                        raiseTicketButtonDisplayed.style.border =
                          "2px solid #E62A86";
                        raiseTicketButtonDisplayed.style.padding = "12px 25px";
                      };
   
                      raiseTicketButtonDisplayed.onclick = () => {
                        const message =
                          document.getElementById("chat-input").value ||
                          "Raise Ticket";
                        handlePickupTicketSubmit(
                          "Full amount not refunded",
                          message,
                          null
                        );
                      };
   
                      // Add the button to the container
                      buttonContainerDisplayed.appendChild(
                        raiseTicketButtonDisplayed
                      );
   
                      // Add the button container to the chat
                      const chatContainerDisplayed =
                        document.querySelector(".chat-container") ||
                        document.getElementById("chat-messages");
                      if (chatContainerDisplayed) {
                        chatContainerDisplayed.appendChild(
                          buttonContainerDisplayed
                        );
                        // Scroll tPICKUPhe chat container to show the button
                        chatContainerDisplayed.scrollTop =
                          chatContainerDisplayed.scrollHeight;
                      }
                    }
                  };
                  messagesContainer.appendChild(button);
                  messagesContainer.scrollTop = messagesContainer.scrollHeight;
                });
              }
   
            };
   
            subRefundButtonContainer.appendChild(button);
          });
          const refundmessagesContainer =
            document.getElementById("chat-messages");
          if (refundmessagesContainer) {
            refundmessagesContainer.appendChild(subRefundButtonContainer);
            refundmessagesContainer.scrollTop =
              refundmessagesContainer.scrollHeight;
          }
          break;
   
        case "Order Delivery Related":
        
          const orderOptions = [
            "Where is my order?",
            "Order is delayed",
            "Order delivery not successful",
            "Cancel my order",
            "Order status not displayed/incorrect",
            "Partial order recieved",
            "Delivery Instructions",
            "Order cancelled without consent",
            "Change delivery address",
            "Change mobile number",
            "Invoice/Proof of delivery",
          ];
   
          const subOrderButtonContainer = document.createElement("div");
          subOrderButtonContainer.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: flex-start;
        margin-top: 15px;
      `;
   
          orderOptions.forEach((option) => {
            const button = document.createElement("button");
            button.style.cssText = `
          background: none;
          border: 2px solid #E62A86;
          color: #762F88;
          padding: 12px 25px;
          border-radius: 50px;
          cursor: pointer;
          font-size: 14px;
          text-align: center;
          transition: all 0.3s;
   
          min-width: 250px;
        `;
            button.textContent = option;
   
            // Add same hover effects
            button.onmouseover = () => {
              button.style.background = "#E8ABC8";
              button.style.color = "#762F88";
              // button.style.border = "none";
              // button.style.padding = "14px 27px";
            };
            button.onmouseout = () => {
              button.style.background = "none";
              button.style.color = "#762F88";
              button.style.border = "2px solid #E62A86";
              button.style.padding = "12px 25px";
            };
   
            // Handle sub-option click
            button.onclick = async () => {
              if (option === "Where is my order?") {
                console.log("button clicked");
                addUserMessage("Where is my order");
   
                checkOrderStatus(orderId)
                  .then((data) => {
                    console.log(
                      "Full order data:",
                      JSON.stringify(data, null, 2)
                    );
                    const orderStatus = data.orderStatus || "Unknown";
                    let trackingInfo = "not available";
                    let courierName = "courier";
                    let estimatedDeliveryDate = "";
                    let foundTracking = false;
   
                    if (
                      data.items &&
                      Array.isArray(data.items) &&
                      data.items.length > 0
                    ) {
                      console.log(`Found ${data.items.length} items in order`);
                      // Get estimated delivery date from the first item (assuming all items have same delivery date)
                      if (data.orderDate) {
                        estimatedDeliveryDate =
                          data.orderDate.split("T")[0] ;
                        console.log(
                          `Found estimated delivery date: ${estimatedDeliveryDate}`
                        );
                      }
   
                      for (let i = 0; i < data.items.length; i++) {
                        const item = data.items[i];
                        console.log(
                          `Item ${i}: ID=${item.itemId}, Tracking=${item.trackingNo || "none"
                          }`
                        );
                        if (item.trackingNo) {
                          trackingInfo = item.trackingNo;
                          foundTracking = true;
                          console.log(`Found tracking number: ${trackingInfo}`);
                        }
                      }
   
                      if (!foundTracking) {
                        console.log(
                          "No items with tracking numbers found in the actual response"
                        );
                        const possibleFields = [
                          "tracking",
                          "trackingNumber",
                          "tracking_no",
                          "tracking_number",
                          "trackingNo",
                        ];
   
                        for (let i = 0; i < data.items.length; i++) {
                          const item = data.items[i];
   
                          for (const field of possibleFields) {
                            if (
                              item[field] &&
                              typeof item[field] === "string" &&
                              item[field].length > 0
                            ) {
                              trackingInfo = item[field];
                              foundTracking = true;
                              console.log(
                                `Found tracking number in alternate field '${field}': ${trackingInfo}`
                              );
                              break;
                            }
                          }
   
                          if (foundTracking) break;
                        }
                      }
                    } else {
                      console.log("No items found in order data");
                    }
   
                    const trackingMessage = foundTracking
                      ? `Tracking id for your order is ${trackingInfo} delivered by ${courierName}`
                      : "Tracking id for your order is not available";
   
                    // Format the message to match the screenshot template
                    // const statusMessage = `The current status of your order is that it is under [${orderStatus}]. It is expected to reach you by [${estimatedDeliveryDate}]. ${trackingMessage}`;
                   
                    let statusMessage = "";
   
                    if (orderStatus === "Delivered") {
                        statusMessage = `Your order is in  [${orderStatus}] phase. Your order is expected to arrive by [${estimatedDeliveryDate}]. ${trackingMessage}`
                    } else if (orderStatus === "In Progress") {
                        statusMessage = `Your order is in  [${orderStatus}] phase. Your order is expected to arrive by [${estimatedDeliveryDate}]. ${trackingMessage}`
                    } else if (orderStatus === "Cancelled") {
                        statusMessage = `Your order is in  [${orderStatus}] phase. Your order is expected to arrive by [${estimatedDeliveryDate}]. ${trackingMessage}`
                    } else {
                        statusMessage = `Your order is in  [${orderStatus}] phase. Your order is expected to arrive by [${estimatedDeliveryDate}]. ${trackingMessage}`
                    }
                    
                    console.log(statusMessage);
                    
   
                    // const statusMessage = `Your order is in  [${orderStatus}] phase. Your order is expected to arrive by [${estimatedDeliveryDate}]. ${trackingMessage}`;
   
                    addBotMessage(statusMessage, "BOT");
                    document.getElementById("chat-input").value = "";
                    const buttonContainer = createStyledButtonContainer(
                      buttonSets.queryOptions
                    );
                    appendButtonsToChat(buttonContainer);
                    buttonContainer.scrollTop = buttonContainer.scrollHeight;
                  })
                  .catch((error) => {
                    // Handle any errors
                    addBotMessage(
                      "Unable to retrieve order status at this time.",
                      "BOT"
                    );
                    console.error("Error fetching order status:", error);
                  });
              }
   
              if (option === "Order is delayed") {
                addUserMessage("Order is delayed");
                checkOrderStatus(orderId)
                  .then((data) => {
                    // Only check if order is delayed beyond 24 hours
                    if (data.isDelayedBeyond24Hours) {
                      // More than 24 hrs after TAT (estimated time)
                      addBotMessage(
                        `Hey there! If your order is delayed more than 24 hours past the estimated delivery date, just raise a ticket! We’ll flag it with our delivery partner to speed things up for you.`
                      );
                      const buttonContainerDisplayed =
                        document.createElement("div");
                      buttonContainerDisplayed.style.cssText = `
              display: flex;
              justify-content: flex-start;
              margin-top: 15px;
            `;
   
                      // Create the "Raise Ticket" button
                      const raiseTicketButtonDisplayed =
                        document.createElement("button");
                      raiseTicketButtonDisplayed.textContent = "Raise Ticket";
                      raiseTicketButtonDisplayed.style.cssText = `
              background: none;
              border: 2px solid #E62A86;
              color: #762F88;
              padding: 12px 25px;
              border-radius: 50px;
              cursor: pointer;
              font-size: 14px;
              text-align: center;
              transition: all 0.3s;
              min-width: 150px;
            `;
   
                      // Add hover effects
                      raiseTicketButtonDisplayed.onmouseover = () => {
                        raiseTicketButtonDisplayed.style.background = "#E8ABC8";
                        raiseTicketButtonDisplayed.style.color = "#762F88";
                        // raiseTicketButtonDisplayed.style.border = "none";
                        // raiseTicketButtonDisplayed.style.padding = "14px 27px";
                      };
   
                      raiseTicketButtonDisplayed.onmouseout = () => {
                        raiseTicketButtonDisplayed.style.background = "none";
                        raiseTicketButtonDisplayed.style.color = "#762F88";
                        raiseTicketButtonDisplayed.style.border =
                          "2px solid #E62A86";
                        raiseTicketButtonDisplayed.style.padding = "12px 25px";
                      };
   
                      raiseTicketButtonDisplayed.onclick = () => {
                        const message =
                          document.getElementById("chat-input").value ||
                          "Raise Ticket";
                        handlePickupTicketSubmit(
                          "Order is delayed",
                          message,
                          null
                        );
                      };
   
                      // Add the button to the container
                      buttonContainerDisplayed.appendChild(
                        raiseTicketButtonDisplayed
                      );
   
                      // Add the button container to the chat
                      const chatContainerDisplayed =
                        document.querySelector(".chat-container") ||
                        document.getElementById("chat-messages");
                      if (chatContainerDisplayed) {
                        chatContainerDisplayed.appendChild(
                          buttonContainerDisplayed
                        );
                        // Scroll tPICKUPhe chat container to show the button
                        chatContainerDisplayed.scrollTop =
                          chatContainerDisplayed.scrollHeight;
                      }
                    } else {
                      // Less than 24 hrs beyond TAT or within TAT
                      addBotMessage(
                        `We understand the inconvenience this may cause and want to assure you that your order will be delivered within the next 24 hours.`,
                        "BOT"
                      );
                      document.getElementById("chat-input").value = "";
                      const buttonContainer = createStyledButtonContainer(
                        buttonSets.queryOptions
                      );
                      appendButtonsToChat(buttonContainer);
                      buttonContainer.scrollTop = buttonContainer.scrollHeight;
                    }
   
                    // Fetch additional order details if needed
                    fetchOrderDetails(orderId);
                  })
                  .catch((error) => {
                    addBotMessage(
                      "Unable to retrieve order status at this time.",
                      "BOT"
                    );
                    console.error("Error fetching order status:", error);
                  });
              }
   
              if (option === "Order delivery not successful") {
                addUserMessage("Order delivery not successful");
                addBotMessage(
                  "Oh no! If your order delivery didn’t go through, just raise a ticket. Our team will reinitiate it promptly. ",
                  "BOT"
                );
                addBotMessage(
                  "Please select one option that you want to send your concern with picture or without picture"
                );
                showImageOptionBox("Order delivery not successful");
              }
              if (option === "Cancel my order") {
                addUserMessage("Cancel my order");
                cancelOrder(orderId);
              }
              if (option === "Order status not displayed/incorrect") {
                addUserMessage("Order status not displayed/incorrect");
                addBotMessage(
                  "Uh-oh! If your order status isn’t showing up after 24 hours or seems incorrect, please raise a ticket. We’ll look into it and get back to you ASAP! ",
                  "BOT"
                );
                addBotMessage(
                  "Please select one option that you want to send your concern with picture or without picture"
                );
                showImageOptionBox("Order status not displayed/incorrect");
              }
   
              if (option === "Partial order recieved") {
                addUserMessage("Partial order recieved");
                addBotMessage(
                  "Heads up! Your order might arrive in separate shipments due to stock or shipping factors. No worries—the rest of your items will be on their way soon!",
                  "BOT"
                );
                partialorder();
              }
              if (option === "Delivery Instructions") {
                addUserMessage("Delivery Instructions");
                addBotMessage(
                  "Got special delivery requests? Just raise a ticket, and we’ll make sure our delivery partner gets the message—whether it’s leaving it with a neighbor or at security! ",
                  "BOT"
                );
                showImageOptionBoxformobile(
                  "Delivery instruction for order",
                  "onlyText",
                  (text, orderId) =>
                    handlePickupInstructionsSubmit(text, orderId, "delivery")
                );
              }
              if (option === "Order cancelled without consent") {
                addBotMessage(
                  "Oh no. Looks like your order was cancelled due to unexpected issues, like item damage or stock unavailability. Sorry about that! You can go ahead and place the order again. ",
                  "BOT"
                );
                cancelOrderwithoutconsent();
              }
              if (option === "Change delivery address") {
                addUserMessage("Change delivery address");
                let response = await checkOrderStatus(orderId);
   
                if (response.orderStatus == "Delivered") {
                  addBotMessage(
                    "Unfortunately , once order has been shipped , we are unable to change the delivery address.",
                    "BOT"
                  );
                } else if (response.orderStatus == "In Progress") {
                  addBotMessage(
                    "You can provide the address when placing the order . If you need to change the address after order is placed , please raise a ticket with us.",
                    "BOT"
                  );
                  showImageOptionBoxformobile(
                    "Change delivery address for order",
                    "onlyText",
                    handleDeliveryAddressSubmit
                  );
                }
              }
   
              if (option === "Change mobile number") {
                addUserMessage("Change mobile number");
                let response = await checkOrderStatus(orderId);
   
                if (response.orderStatus == "Delivered") {
                  addBotMessage(
                    "Unfortunately , once order has been shipped , we are unable to change the mobile number.",
                    "BOT"
                  );
                } else if (response.orderStatus == "In Progress") {
                  addBotMessage(
                    "You can provide the address when placing the order . If you need to change the number after order is placed , please raise a ticket with us.",
                    "BOT"
                  );
                  showImageOptionBox("In Progress");
                }
              }
          
              if (option === "Invoice/Proof of delivery") {
                addUserMessage("Invoice/Proof of delivery");
                fetchOrderDetails(orderId);
              }
            };
   
            subOrderButtonContainer.appendChild(button);
          });
          const ordermessagesContainer = document.getElementById("chat-messages");
          if (ordermessagesContainer) {
            ordermessagesContainer.appendChild(subOrderButtonContainer);
            ordermessagesContainer.scrollTop =
              ordermessagesContainer.scrollHeight;
          }
          break;
   
        case "Product Related":
        if (status === "In Progress") { addBotMessage(`Thank you for reaching out to us regarding your product concern. We understand your issue; however, since your product is currently ${status}, we are unable to process further action at this moment.`, "BOT");
        document.getElementById("chat-input").value = "";
            const buttonContainer = createStyledButtonContainer(
              buttonSets.queryOptions
            );
            appendButtonsToChat(buttonContainer);
            buttonContainer.scrollTop = buttonContainer.scrollHeight; return; }
          productRelated(orderId);
          break;
      }
    }
   
   
    function productRelated(orderId) {
      const messagesContainer = document.getElementById("chat-messages");
      if (!messagesContainer) return;
      const concernsDiv = document.createElement("div");
      concernsDiv.style.cssText = `
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: flex-start;
      margin-top: 10px;
  align-items: center
    `;
   
      const concerns = [
        "Alter my product",
        "Wrong Product received",
        "Wrong size / color received",
        "Product quality issue",
        "Packaging not good",
        "Brands tags not attached",
        // "Gift with Purchase not received",
      ];
   
      concerns.forEach((concern) => {
        const button = document.createElement("button");
        button.style.cssText = `
               background: none;
                border: 2px solid #E62A86;
                color: #762F88;
                padding: 12px 25px;
                border-radius: 50px;
                cursor: pointer;
                font-size: 14px;
                text-align: center;
                transition: all 0.3s;
            
                min-width: 250px;
    `;
   
        // const displayText = concern;
        button.textContent = concern;
        button.onmouseover = () => {
          button.style.background = "#E8ABC8";
          button.style.color = "#762F88";
          // button.style.border = "none";
          // button.style.padding = "14px 27px";
        };
        button.onmouseout = () => {
          button.style.background = "none";
          button.style.color = "#762F88";
          button.style.border = "2px solid #E62A86";
          button.style.padding = "12px 25px";
        };
   
        button.onclick = () => {
          addUserMessage(concern);
   
          if (concern === "Alter my product") {
            addBotMessage(
              "Enjoy free alterations at our offline stores for products ordered online. Simply bring your bill to the nearest store.",
              "BOT"
            );
            document.getElementById("chat-input").value = "";
            const buttonContainer = createStyledButtonContainer(
              buttonSets.queryOptions
            );
            appendButtonsToChat(buttonContainer);
            buttonContainer.scrollTop = buttonContainer.scrollHeight;
          }
   
          if (concern === "Wrong Product received") {
            addBotMessage(
              "We regret the inconvenience caused. Please submit a ticket with images of the product, packaging, and tag, and we’ll process your return as soon as possible.",
              "BOT"
            );
            showImageOptionBox("Wrong Product received");
          }
   
          if (concern === "Wrong size / color received") {
            addBotMessage(
              "We’re sorry for the inconvenience. Please place a new order for the correct size or colour and raise a ticket to return the existing product.",
              "BOT"
            );
            showImageOptionBox("Wrong size / color received");
          }
   
          if (concern === "Product quality issue") {
            addBotMessage(
              "We regret the inconvenience caused. Please submit a ticket with images of the product, packaging, and tag, and we’ll process your return as soon as possible.",
              "BOT"
            );
            showImageOptionBox("Product quality issue");
          }
          if (concern === "Packaging not good") {
            addBotMessage(
              "Oops! We’re really sorry about the packaging issue. We appreciate you letting us know, and we’ll make sure to look into it so this doesn’t happen again. Thank you for your patience!"
            );
   
            // Always use the orderId parameter passed to the function
            if (!orderId) {
              console.error("No order ID available");
              addBotMessage(
                "We couldn't identify your order details. Please try again or contact customer support.",
                "BOT"
              );
              return;
            }
   
            const selectedItemId = window.currentSelectedItemId;
            console.log("Selected item ID:", selectedItemId);
            console.log("Using order ID:", orderId);
            checkOrderStatus(orderId)
              .then((data) => {
                console.log("Order data received:", data);
   
                if (data && data.error) {
                  console.error("API returned error:", data.error);
                  addBotMessage(
                    "We encountered an error while checking your order details. Please try again later.",
                    "BOT"
                  );
                  return;
                }
   
                if (!data || !data.items || !Array.isArray(data.items)) {
                  console.error("Invalid data structure:", data);
                  addBotMessage(
                    "We couldn't retrieve your order information at this time.",
                    "BOT"
                  );
                  return;
                }
   
                const selectedItem = data.items.find(
                  (item) => item.itemId === selectedItemId
                );
                console.log("Selected item data:", selectedItem);
   
                if (!selectedItem) {
                  console.error("Selected item not found");
                  addBotMessage(
                    `We couldn't find information for item ${selectedItemId} in this order.`,
                    "BOT"
                  );
                  return;
                }
   
                // Log return eligibility flags for debugging
                console.log("Return eligibility flags:", {
                  isBeyond15DaysFromDelivery:
                    selectedItem.isBeyond15DaysFromDelivery,
                  isBeyond7DaysFromRefund: selectedItem.isBeyond7DaysFromRefund,
                });
   
                // Handle the three possible states of isBeyond15DaysFromDelivery
                if (selectedItem.isBeyond15DaysFromDelivery === true) {
                  // Case 1: Return window has expired (true)
                  console.log("Item is beyond return window (15 days)");
                  addBotMessage("Return window of 15 days has expired.", "BOT");
   
                  // Show query options
                  document.getElementById("chat-input").value = "";
                  const buttonContainer = createStyledButtonContainer(
                    buttonSets.queryOptions
                  );
                  appendButtonsToChat(buttonContainer);
   
                  const chatContainer =
                    document.querySelector(".chat-container") ||
                    document.getElementById("chat-messages");
                  if (chatContainer) {
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                  }
                } else if (selectedItem.isBeyond15DaysFromDelivery === false) {
                  // Case 2: Item is within return window (false)
                  console.log("Item is within return window (15 days)");
                  let returnMessage = `Currently, your item ${selectedItemId} has poor packaging. Would you like to keep the product or initiate a return?`;
                  addBotMessage(returnMessage, "BOT");
   
                  // Create a container for the two buttons
                  const buttonsContainer = document.createElement("div");
                  buttonsContainer.style.cssText = `
                    display: flex;
                    gap: 15px;
                    margin-top: 15px;
                  `;
   
                  // Create "Keep the Product" button
                  const keepButton = document.createElement("button");
                  keepButton.textContent = "Keep the Product";
                  keepButton.style.cssText = `
                    background: none;
                    border: 2px solid #E62A86;
                    color: #762F88;
                    padding: 12px 25px;
                    border-radius: 50px;
                    cursor: pointer;
                    font-size: 14px;
                    text-align: center;
                    transition: all 0.3s;
                    min-width: 150px;
                  `;
   
                  // Add hover effects for Keep button
                  keepButton.onmouseover = () => {
                    keepButton.style.background = "#E8ABC8";
                    keepButton.style.color = "#762F88";
                    
                  };
   
                  keepButton.onmouseout = () => {
                    keepButton.style.background = "none";
                    keepButton.style.color = "#762F88";
                    keepButton.style.border = "2px solid #E62A86";
                    keepButton.style.padding = "12px 25px";
                  };
   
                  // Create "Initiate Return" button
                  const returnButton = document.createElement("button");
                  returnButton.textContent = "Initiate Return";
                  returnButton.style.cssText = `
                    background: none;
                    border: 2px solid #E62A86;
                    color: #762F88;
                    padding: 12px 25px;
                    border-radius: 50px;
                    cursor: pointer;
                    font-size: 14px;
                    text-align: center;
                    transition: all 0.3s;
                    min-width: 150px;
                  `;
   
                  // Add hover effects for Return button
                  returnButton.onmouseover = () => {
                    returnButton.style.background = "#E8ABC8";
                    returnButton.style.color = "#762F88";
                  };
   
                  returnButton.onmouseout = () => {
                    returnButton.style.background = "none";
                    returnButton.style.color = "#762F88";
                    returnButton.style.border = "2px solid #E62A86";
                    returnButton.style.padding = "12px 25px";
                  };
   
                  // Add click handlers
                  keepButton.onclick = () => {
                    console.log("Keep button clicked");
                    addBotMessage(
                      "Thank you for your decision to keep the product. We will note your feedback about the packaging to improve in future deliveries.",
                      "BOT"
                    );
                    document.getElementById("chat-input").value = "";
                    const buttonContainer = createStyledButtonContainer(
                      buttonSets.queryOptions
                    );
                    appendButtonsToChat(buttonContainer);
   
                    // Make sure to get the current chat container
                    const chatContainer =
                      document.querySelector(".chat-container") ||
                      document.getElementById("chat-messages");
                    if (chatContainer) {
                      chatContainer.scrollTop = chatContainer.scrollHeight;
                    }
                  };
   
                  returnButton.onclick = () => {
                    console.log("Initiate return button clicked");
                    addBotMessage(
                      "The ticket includes an option to upload images of the product, along with the packaging and tag. Please upload relevant images and this will help us process your request quickly! . We'll swiftly begin the return process for you!",
                      "BOT"
                    );
   
                    // Use setTimeout to ensure message appears before showing image options
                    setTimeout(() => {
                      showImageOptionBox("Packaging not good", "both");
                    }, 300);
                  };
   
                  // Add the buttons to the container
                  buttonsContainer.appendChild(keepButton);
                  buttonsContainer.appendChild(returnButton);
   
                  // Add the button container to the chat
                  const chatContainer =
                    document.querySelector(".chat-container") ||
                    document.getElementById("chat-messages");
                  if (chatContainer) {
                    chatContainer.appendChild(buttonsContainer);
                    // Scroll the chat container to show the buttons
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                  }
                } else if (selectedItem.isBeyond15DaysFromDelivery === null) {
                  // Case 3: Item is already in return phase (null)
                  console.log("Item is already in return phase");
                  addBotMessage(
                    `Item ${selectedItemId} is already in the return phase.`,
                    "BOT"
                  );
   
                  document.getElementById("chat-input").value = "";
                  const buttonContainer = createStyledButtonContainer(
                    buttonSets.queryOptions
                  );
                  appendButtonsToChat(buttonContainer);
   
                  const chatContainer =
                    document.querySelector(".chat-container") ||
                    document.getElementById("chat-messages");
                  if (chatContainer) {
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                  }
                } else {
                  // Handle unexpected value
                  console.log(
                    "Unexpected isBeyond15DaysFromDelivery value:",
                    selectedItem.isBeyond15DaysFromDelivery
                  );
                  addBotMessage(
                    "We're having trouble determining the status of your item. Please contact customer support for assistance.",
                    "BOT"
                  );
   
                  document.getElementById("chat-input").value = "";
                  const buttonContainer = createStyledButtonContainer(
                    buttonSets.queryOptions
                  );
                  appendButtonsToChat(buttonContainer);
                }
              })
              .catch((error) => {
                console.error(
                  "Unexpected error in checking order status:",
                  error
                );
                addBotMessage(
                  "We encountered an error while checking your order details. Please try again later.",
                  "BOT"
                );
              });
          }
   
          if (concern === "Brands tags not attached") {
            addBotMessage(
              "We regret the inconvenience caused. Please submit a ticket with images of the product, packaging, and tag, and we’ll process your return as soon as possible.",
              "BOT"
            );
            showImageOptionBox("Brands tags not attached");
          }
   
        };
        concernsDiv.appendChild(button);
      });
      messagesContainer.appendChild(concernsDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    function cancelOrder(orderId) {
      checkOrderStatus(orderId)
        .then((data) => {
          const orderStatus = data.orderStatus;
          if (orderStatus === "Delivered") {
            addBotMessage(
              "Hello! Once your order is shipped, we can’t cancel the delivery. But no worries—just reject it at your doorstep when it arrives. Sorry for the hassle! Please write back if there’s anything else we can help with. ",
              "BOT"
            );
            document.getElementById("chat-input").value = "";
            const buttonContainer = createStyledButtonContainer(
              buttonSets.queryOptions
            );
            appendButtonsToChat(buttonContainer);
            buttonContainer.scrollTop = buttonContainer.scrollHeight;
          } else if (
            ["In Progress", "Cancelled", "Returned"].includes(orderStatus)
          ) {
            addBotMessage(
              "Please pick your reason for cancellation from the dropdown menu, and we’ll get the process started! ",
              "BOT"
            );
            const itemIds = data.items.map((item) => item.itemId);
            optionDropDown(orderId, itemIds);
          } else {
            addBotMessage(
              "We're unable to process your cancellation request at this time. Please contact customer support for assistance.",
              "BOT"
            );
            console.warn(`Unexpected order status: ${orderStatus}`);
          }
        })
        .catch((error) => {
          addBotMessage(
            "Unable to retrieve order status at this time. Please try again later.",
            "BOT"
          );
          console.error("Error fetching order status:", error);
        });
    }
   
    async function handlePickupInstructionsSubmit(
      text,
      orderId,
      instructionType = "pickup"
    ) {
      if (!orderId) {
        try {
          const consoleLogStr = console.log.toString();
          const orderLogMatch = consoleLogStr.match(
            /Order issue:.*for order:\s*(\w+)/
          );
          const orderClickMatch = consoleLogStr.match(/Order clicked:\s*(\w+)/);
   
          orderId =
            (orderLogMatch && orderLogMatch[1]) ||
            (orderClickMatch && orderClickMatch[1]);
        } catch (error) {
          console.error("Error extracting order ID from console log:", error);
        }
        if (!orderId) {
          orderId =
            window.currentOrderId ||
            window.currentSelectedItemId ||
            localStorage.getItem("currentOrderId") ||
            localStorage.getItem("currentItemId");
        }
        if (!orderId) {
          const orderElements = [
            document.querySelector("[data-order-id]"),
            document.querySelector(".order-details"),
            document.querySelector(".chat-order-details"),
          ];
   
          for (let element of orderElements) {
            if (element) {
              const match = element.textContent.match(/\b([OI]\d+\w*)\b/);
              if (match) {
                orderId = match[1];
                break;
              }
            }
          }
        }
      }
      if (!orderId) {
        addBotMessage(
          "Unable to retrieve order details. Please provide the order ID manually.",
          "BOT"
        );
        console.error("No order ID could be found through any method");
        return;
      }
      if (!text || text.trim() === "") {
        addBotMessage("Please provide valid pickup instructions.", "BOT");
        return;
      }
   
      try {
        const decodedToken = getDecodedToken();
        const username = decodedToken ? decodedToken.firstName || "User" : "User";
        const clickpostData = {
          action: "INITIATE_RTO",
          waybill: "ARVINDTEST001",
          cp_id: 4,
          account_code: "Delhivery-Express",
          delivery_instructions: text.trim(),
          preferred_date: new Date().toISOString().split("T")[0],
        };
   
        console.log("Calling ClickPost API with data:", clickpostData);
        const clickpostResponse = await fetch(
          `https://www.clickpost.in/api/v2/ndr-update-api?username=${encodeURIComponent(
            username
          )}&key=c47c947b-9274-47ec-a434-a62714ff3248`,
          {
            method: "POST",
            headers: {
              accept: "application/json",
              "content-type": "application/json",
            },
            body: JSON.stringify(clickpostData),
          }
        );
        const clickpostResult = await clickpostResponse.json();
        console.log("ClickPost API response:", clickpostResult);
        let ticketMessage, ticketSubject;
   
        if (instructionType === "pickup") {
          ticketMessage = `Pickup Instructions for return the item: ${text.trim()} for Order/Item ${orderId}`;
          ticketSubject = "Pickup Instructions for return the item";
        } else {
          ticketMessage = `Delivery Instructions for the item: ${text.trim()} for Order/Item ${orderId}`;
          ticketSubject = "Delivery Instructions for the item";
        }
        // const ticketMessage = `Pickup Instructions for return the item: ${text.trim()} for Order/Item ${orderId}`;
   
        // await handleFormSubmit(ticketSubject, ticketMessage, null);
      } catch (error) {
        console.error("Error processing pickup instructions:", error);
        addBotMessage(
          "Thank you for providing the information. We will process your request.",
          "BOT"
        );
      }
    }
   
    function handleMobileNumberChange(statusText) {
      if (statusText === "") {
        // Not out for pickup
        console.log("Mobile number change - NOT out for pickup");
        addBotMessage(
          "Please enter your mobile number while placing your order.If you need to update it after the order is out for pickup, let us know by raising a ticket, and we’ll take care of it.[Raise a Ticket]",
          "BOT"
        );
        addBotMessage("Please write your number in text box.", "BOT");
        showImageOptionBoxformobile(
          "Change mobile number",
          "onlyText",
          handleMobileNumberSubmit
        );
      } else if (statusText === "Out for pick up") {
        // Out for pickup
        console.log("Mobile number change - OUT for pickup");
        addBotMessage(
          "We’re sorry, but once the order is out for pickup, we can’t update the mobile number.Please let us know if there’s anything else we can do for you. ",
          "BOT"
        );
      } else {
        // Unexpected status
        console.log(`Mobile number change - Unexpected status: ${statusText}`);
        addBotMessage(
          `The current status of your return is: ${statusText}. Please contact customer support for assistance with changing your mobile number.`,
          "BOT"
        );
      }
    }
   
   
    async function handlePickupTicketSubmit(concern, message, file) {
      console.log(
        "Pickup ticket submitted------------->",
        concern,
        message,
        file
      );
      if (!message) {
        addBotMessage("Please write your concern into input box ", "BOT");
        return;
      }
   
      const decodedToken = getDecodedToken();
      if (!decodedToken) return;
      // let phone = localStorage.getItem("userMobile");
   
      addUserMessage(message);
     
      const payload ={
        "text": {
          "body": message
        },
        "type": "text"
      }
  
      console.log("payload2222==>", payload);
   
    }
   
    async function handleReturnSubOption(orderId, option) {
      if (window.currentSelectedItemId) {
        addUserMessage(`${option} for Item ${window.currentSelectedItemId}`);
      } else {
        addUserMessage(`${option} for Order ${orderId}`);
      }
   
      switch (option) {
        case "Return my product":
          // Use the globally stored selected item ID
          if (window.currentSelectedItemId) {
            // Skip showing items and directly get return reasons for the selected item
            addBotMessage(
              `I'll help you initiate a return for Product ${window.currentSelectedItemId}.`,
              "BOT"
            );
   
            try {
              const response = await fetch(
                "https://api-preprod.ailiens.com/d/api/returns/v2",
                {
                  method: "POST",
                  headers: {
                    accept: "application/json",
                    "content-Type": "application/json",
                    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                    Connection: "keep-alive",
                    bbversion: "v2",
                    clientsessionid: "1745109689845",
                    Authorization: `Bearer ${accessToken}`,
                    correlationid: "93fb250e-ffb0-4e7c-93b9-72f5685d5683",
                    "if-none-match": ' W/"152-8UyXsIzXQkcUBNh8ObRhw8DIQMY"',
                    module: "odin",
                    origin: "https://www.nnnow.com",
                    priority: "u=1, i",
                    referer: "https://www.nnnow.com/",
                  },
                  body: JSON.stringify({
                    orderId: orderId,
                    itemId: window.currentSelectedItemId,
                  }),
                }
              );
   
              const data = await response.json();
              const returnReasons = data.returnReasons || [];
   
              addBotMessage("Please select a reason for return", "BOT");
   
              // Show dropdown for return reasons
              const dropdownContainer = document.createElement("div");
              dropdownContainer.className = "return-dropdown-container";
              dropdownContainer.style.cssText = `margin-top: 15px; width: 100%; max-width: 300px;`;
   
              const selectElement = document.createElement("select");
              selectElement.className = "return-dropdown";
              selectElement.style.cssText = `
                width: 100%;
                padding: 12px 25px;
                border: 2px solid #E62A86;
                border-radius: 50px;
                color: #762F88;
                font-size: 14px;
                cursor: pointer;
                background: none;
                transition: all 0.3s;
              `;
   
              const defaultOption = document.createElement("option");
              defaultOption.value = "";
              defaultOption.textContent = "Select a reason for return";
              defaultOption.selected = true;
              defaultOption.disabled = true;
              selectElement.appendChild(defaultOption);
   
              returnReasons.forEach((reasonObj) => {
                const option = document.createElement("option");
                option.value = reasonObj.id;
                option.textContent = reasonObj.reason;
                selectElement.appendChild(option);
              });
   
              selectElement.onchange = (e) => {
                const selectedReason = returnReasons.find(
                  (r) => r.id.toString() === e.target.value
                );
                if (selectedReason) {
                  addUserMessage(`Return reason: ${selectedReason.reason}`);
                  handleReturnReason(
                    orderId,
                    selectedReason,
                    window.currentSelectedItemId
                  );
                }
              };
   
              dropdownContainer.appendChild(selectElement);
   
              const messagesContainer = document.getElementById("chat-messages");
              if (messagesContainer) {
                // Remove any existing dropdown
                const existingDropdown = messagesContainer.querySelector(
                  ".return-dropdown-container"
                );
                if (existingDropdown) {
                  existingDropdown.remove();
                }
                messagesContainer.appendChild(dropdownContainer);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
              }
            } catch (error) {
              console.error("Error fetching return reasons:", error);
              addBotMessage(
                "Sorry, I couldn't fetch the return reasons at the moment. Please try again later.",
                "BOT"
              );
            }
          } else {
            // If no item was previously selected, show the original flow
            addBotMessage(
              `I'll help you initiate a return for order ${orderId}. Please select the item you want to return.`,
              "BOT"
            );
   
            // Original code to display items for selection
            try {
              const items = await fetchOrderDetails(orderId);
              const returnContainer = document.createElement("div");
              returnContainer.className = "return-section";
   
              const styles = document.createElement("style");
              styles.textContent = `
              .return-section {
                margin-top: 15px;
                width: 100%;
                max-width: 600px;
              }
              
              .product-display {
                margin-bottom: 20px;
                border: 1px solid #E62A86;
                border-radius: 8px;
                padding: 15px;
                cursor: pointer;
                transition: all 0.3s ease;
              }
              
              .product-display:hover {
                background: #fff5f9;
                transform: translateY(-2px);
                box-shadow: 0 2px 8px rgba(230, 42, 134, 0.1);
              }
              `;
              document.head.appendChild(styles);
   
              items.forEach((item) => {
                // Original item display and selection code...
                const productDisplay = createProductDisplay(
                  item.itemId,
                  item.productDetails,
                  item.itemStatus,
                  item.itemDeliveryDateInfo
                );
                productDisplay.style.cursor = "pointer";
   
                const radio = productDisplay.querySelector('input[type="radio"]');
   
                radio.onchange = async () => {
                  // Original radio selection code...
                  if (radio.checked) {
                    try {
                      const response = await fetch(
                        "https://api-preprod.ailiens.com/d/api/returns/v2",
                        {
                          method: "POST",
                          headers: {
                            accept: "application/json",
                            "content-Type": "application/json",
                            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                            Connection: "keep-alive",
                            bbversion: "v2",
                            clientsessionid: "1745109689845",
                            Authorization: `Bearer ${accessToken}`,
                            correlationid: "93fb250e-ffb0-4e7c-93b9-72f5685d5683",
                            "if-none-match":
                              ' W/"152-8UyXsIzXQkcUBNh8ObRhw8DIQMY"',
                            module: "odin",
                            origin: "https://www.nnnow.com",
                            priority: "u=1, i",
                            referer: "https://www.nnnow.com/",
                          },
                          body: JSON.stringify({
                            orderId: orderId,
                            itemId: item.itemId,
                          }),
                        }
                      );
   
                      const data = await response.json();
                      const returnReasons = data.returnReasons || [];
   
                      addBotMessage("Please select a reason for return", "BOT");
   
                      const dropdownContainer = document.createElement("div");
                      dropdownContainer.className = "return-dropdown-container";
                      dropdownContainer.style.cssText = `margin-top: 15px; width: 100%; max-width: 300px;`;
   
                      const selectElement = document.createElement("select");
                      selectElement.className = "return-dropdown";
                      selectElement.style.cssText = `
                      width: 100%;
                      padding: 12px 25px;
                      border: 2px solid #E62A86;
                      border-radius: 50px;
                      color: #762F88;
                      font-size: 14px;
              
                      cursor: pointer;
                      background: none;
                      transition: all 0.3s;
                    `;
   
                      const defaultOption = document.createElement("option");
                      defaultOption.value = "";
                      defaultOption.textContent = "Select a reason for return";
                      defaultOption.selected = true;
                      defaultOption.disabled = true;
                      selectElement.appendChild(defaultOption);
   
                      returnReasons.forEach((reasonObj) => {
                        const option = document.createElement("option");
                        option.value = reasonObj.id;
                        option.textContent = reasonObj.reason;
                        selectElement.appendChild(option);
                      });
   
                      selectElement.onchange = (e) => {
                        const selectedReason = returnReasons.find(
                          (r) => r.id.toString() === e.target.value
                        );
                        if (selectedReason) {
                          addUserMessage(
                            `Return reason: ${selectedReason.reason}`
                          );
                          handleReturnReason(
                            orderId,
                            selectedReason,
                            item.itemId
                          );
                        }
                      };
   
                      dropdownContainer.appendChild(selectElement);
   
                      const messagesContainer =
                        document.getElementById("chat-messages");
                      if (messagesContainer) {
                        // Remove any existing dropdown
                        const existingDropdown = messagesContainer.querySelector(
                          ".return-dropdown-container"
                        );
                        if (existingDropdown) {
                          existingDropdown.remove();
                        }
                        messagesContainer.appendChild(dropdownContainer);
                        messagesContainer.scrollTop =
                          messagesContainer.scrollHeight;
                      }
                    } catch (error) {
                      console.error("Error fetching return reasons:", error);
                      addBotMessage(
                        "Sorry, I couldn't fetch the return reasons at the moment. Please try again later.",
                        "BOT"
                      );
                    }
                  }
                };
   
                returnContainer.appendChild(productDisplay);
              });
   
              const messagesContainer = document.getElementById("chat-messages");
              if (messagesContainer) {
                messagesContainer.appendChild(returnContainer);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
              }
            } catch (error) {
              console.error("Error fetching order details:", error);
              addBotMessage(
                "Sorry, I couldn't fetch the order details at the moment. Please try again later.",
                "BOT"
              );
            }
          }
          break;
   
        case "Status of my pickup":
          if (!orderId) {
            addBotMessage(
              "Sorry, we couldn't find your order ID. Please try again.",
              "BOT"
            );
            break;
          }
          const selectedItemId = window.currentSelectedItemId;
          checkOrderStatus(orderId)
            .then((data) => {
              if (data && data.error) {
                addBotMessage(
                  "We encountered an error while checking your pickup status. Please try again later.",
                  "BOT"
                );
                return;
              }
              if (!data || !data.items || !Array.isArray(data.items)) {
                addBotMessage(
                  "We couldn't retrieve your pickup information at this time.",
                  "BOT"
                );
                return;
              }
              const selectedItem = data.items.find(
                (item) => item.itemId === selectedItemId
              );
              if (selectedItem) {
                if (
                  selectedItem.returnStatus &&
                  selectedItem.returnStatus !== null
                ) {
                  let returnMessage = `Your pickup status for item ${selectedItemId} is: ${selectedItem.returnStatus}`;
                  if (selectedItem.returnDate) {
                    returnMessage += ` on ${selectedItem.returnDate}`;
                  }
   
                  addBotMessage(returnMessage, "BOT");
                  document.getElementById("chat-input").value = "";
                  const buttonContainer = createStyledButtonContainer(
                    buttonSets.queryOptions
                  );
                  appendButtonsToChat(buttonContainer);
                  buttonContainer.scrollTop = buttonContainer.scrollHeight;
                } else if (selectedItem.returnPickUpStatus === true) {
                  addBotMessage(
                    `Pickup is scheduled for item ${selectedItemId}, but no status is available yet.`,
                    "BOT"
                  );
                } else {
                  addBotMessage(
                    `Item ${selectedItemId} doesn't have any pickup scheduled.`,
                    "BOT"
                  );
                }
              } else {
                addBotMessage(
                  `We couldn't find information for item ${selectedItemId} in this order.`,
                  "BOT"
                );
              }
            })
            .catch((error) => {
              console.error("Unexpected error in pickup status:", error);
              addBotMessage(
                "We encountered an error while checking your pickup status. Please try again later.",
                "BOT"
              );
            });
   
          break;
        case "Pickup status not displayed/Incorrect":
          addBotMessage(
            `In case your return status is incorrect or does not match the actual issue status, please raise a ticket`,
            "BOT"
          );
          const buttonContainerDisplayed = document.createElement("div");
          buttonContainerDisplayed.style.cssText = `
              display: flex;
              justify-content: flex-start;
              margin-top: 15px;
            `;
   
          // Create the "Raise Ticket" button
          const raiseTicketButtonDisplayed = document.createElement("button");
          raiseTicketButtonDisplayed.textContent = "Raise Ticket";
          raiseTicketButtonDisplayed.style.cssText = `
              background: none;
              border: 2px solid #E62A86;
              color: #762F88;
              padding: 12px 25px;
              border-radius: 50px;
              cursor: pointer;
              font-size: 14px;
              text-align: center;
              transition: all 0.3s;
              min-width: 150px;
            `;
   
          // Add hover effects
          raiseTicketButtonDisplayed.onmouseover = () => {
            raiseTicketButtonDisplayed.style.background = "#E8ABC8";
            raiseTicketButtonDisplayed.style.color = "#762F88";
          };
   
          raiseTicketButtonDisplayed.onmouseout = () => {
            raiseTicketButtonDisplayed.style.background = "none";
            raiseTicketButtonDisplayed.style.color = "#762F88";
            raiseTicketButtonDisplayed.style.border = "2px solid #E62A86";
            raiseTicketButtonDisplayed.style.padding = "12px 25px";
          };
   
          raiseTicketButtonDisplayed.onclick = () => {
            const message =
              document.getElementById("chat-input").value || "Raise Ticket";
            handlePickupTicketSubmit(
              "Pickup status not displayed/Incorrect",
              message,
              null
            );
          };
   
          // Add the button to the container
          buttonContainerDisplayed.appendChild(raiseTicketButtonDisplayed);
   
          // Add the button container to the chat
          const chatContainerDisplayed =
            document.querySelector(".chat-container") ||
            document.getElementById("chat-messages");
          if (chatContainerDisplayed) {
            chatContainerDisplayed.appendChild(buttonContainerDisplayed);
            // Scroll tPICKUPhe chat container to show the button
            chatContainerDisplayed.scrollTop =
              chatContainerDisplayed.scrollHeight;
          }
          break;
   
        case "Pickup not done":
          addBotMessage(
            "If your pickup is not done,Please raise a ticket",
            "BOT"
          );
          // Create a button container
          const buttonContainerPICKUP = document.createElement("div");
          buttonContainerPICKUP.style.cssText = `
              display: flex;
              justify-content: flex-start;
              margin-top: 15px;
            `;
   
          // Create the "Raise Ticket" button
          const raiseTicketButtonPICKUP = document.createElement("button");
          raiseTicketButtonPICKUP.textContent = "Raise Ticket";
          raiseTicketButtonPICKUP.style.cssText = `
              background: none;
              border: 2px solid #E62A86;
              color: #762F88;
              padding: 12px 25px;
              border-radius: 50px;
              cursor: pointer;
              font-size: 14px;
              text-align: center;
              transition: all 0.3s;
              min-width: 150px;
            `;
   
          // Add hover effects
          raiseTicketButtonPICKUP.onmouseover = () => {
            raiseTicketButtonPICKUP.style.background = "#E8ABC8";
            raiseTicketButtonPICKUP.style.color = "#762F88";
          };
   
          raiseTicketButtonPICKUP.onmouseout = () => {
            raiseTicketButtonPICKUP.style.background = "none";
            raiseTicketButtonPICKUP.style.color = "#762F88";
            raiseTicketButtonPICKUP.style.border = "2px solid #E62A86";
            raiseTicketButtonPICKUP.style.padding = "12px 25px";
          };
   
          raiseTicketButtonPICKUP.onclick = () => {
            const message =
              document.getElementById("chat-input").value || "Raise Ticket";
            handlePickupTicketSubmit("Pickup not done", message, null);
          };
   
          // Add the button to the container
          buttonContainerPICKUP.appendChild(raiseTicketButtonPICKUP);
   
          // Add the button container to the chat
          const chatContainerPICKUP =
            document.querySelector(".chat-container") ||
            document.getElementById("chat-messages");
          if (chatContainerPICKUP) {
            chatContainerPICKUP.appendChild(buttonContainerPICKUP);
            // Scroll tPICKUPhe chat container to show the button
            chatContainerPICKUP.scrollTop = chatContainerPICKUP.scrollHeight;
          }
          break;
   
        case "Pickup not successful":
          addBotMessage(
            "To resolve this , please raise a ticket and we will reinitiate return pickup for you.",
            "BOT"
          );
   
          // Create a button container
          const buttonContainer = document.createElement("div");
          buttonContainer.style.cssText = `
                  display: flex;
                  justify-content: flex-start;
                  margin-top: 15px;
                `;
   
          // Create the "Raise Ticket" button
          const raiseTicketButton = document.createElement("button");
          raiseTicketButton.textContent = "Raise Ticket";
          raiseTicketButton.style.cssText = `
                  background: none;
                  border: 2px solid #E62A86;
                  color: #762F88;
                  padding: 12px 25px;
                  border-radius: 50px;
                  cursor: pointer;
                  font-size: 14px;
                  text-align: center;
                  transition: all 0.3s;
                  min-width: 150px;
                `;
   
          // Add hover effects
          raiseTicketButton.onmouseover = () => {
            raiseTicketButton.style.background = "#E8ABC8";
            raiseTicketButton.style.color = "#762F88";
          };
   
          raiseTicketButton.onmouseout = () => {
            raiseTicketButton.style.background = "none";
            raiseTicketButton.style.color = "#762F88";
            raiseTicketButton.style.border = "2px solid #E62A86";
            raiseTicketButton.style.padding = "12px 25px";
          };
   
          raiseTicketButton.onclick = () => {
            const message =
              document.getElementById("chat-input").value || "Raise a Ticket";
            handlePickupTicketSubmit("Pickup not successful", message, null);
          };
   
          // Add the button to the container
          buttonContainer.appendChild(raiseTicketButton);
   
          // Add the button container to the chat
          const chatContainer =
            document.querySelector(".chat-container") ||
            document.getElementById("chat-messages");
          if (chatContainer) {
            chatContainer.appendChild(buttonContainer);
            // Scroll the chat container to show the button
            chatContainer.scrollTop = chatContainer.scrollHeight;
          }
   
          break;
        case "Return Rejected at doorstep":
          addBotMessage(
            "Our company guidelines require that returned products be in new,unused conditions and returned in original packaging along with tags.If you believe there has been an error in this judgement,please raise a ticket with us",
            "BOT"
          );
          partialorder();
   
          break;
   
        case "Pickup Instructions":
          if (window.currentSelectedItemId) {
            checkOrderStatus(orderId)
              .then((data) => {
                if (data && data.error) {
                  addBotMessage(
                    "We couldn't verify your order status. Please try again later.",
                    "BOT"
                  );
                  return;
                }
                if (!data || !data.items || !Array.isArray(data.items)) {
                  addBotMessage(
                    "We couldn't retrieve your order information at this time.",
                    "BOT"
                  );
                  return;
                }
                const selectedItem = data.items.find(
                  (item) => item.itemId === window.currentSelectedItemId
                );
   
                if (selectedItem) {
                  if (selectedItem.returnPickUpStatus === true) {
                    addBotMessage(
                      "Apologies,but once the return is out for pickup,we are unable to add or modify the pickup instructions",
                      "BOT"
                    );
                  } else if (selectedItem.returnPickUpStatus === false) {
                    showImageOptionBoxformobile(
                      "pickup instructions for return the product",
                      "onlyText",
                      handlePickupInstructionsSubmit
                    );
                  } else if (selectedItem.returnPickUpStatus === null) {
                    addBotMessage(
                      "This item is not in the return process. pickup instructions for pickup is not applicable.",
                      "BOT"
                    );
                  } else {
                    addBotMessage(
                      "We couldn't determine the pickup status for this item. Please try again later.",
                      "BOT"
                    );
                  }
                } else {
                  addBotMessage(
                    `We couldn't find information for the selected item in this order.`,
                    "BOT"
                  );
                }
              })
              .catch((error) => {
                console.error("Error checking return status:", error);
                addBotMessage(
                  "We encountered an error while checking your item's status. Please try again later.",
                  "BOT"
                );
              });
          } else {
            addBotMessage(
              "Please select an item first to change the mobile number.",
              "BOT"
            );
          }
          break;
   
        case "Change my mobile number":
          if (window.currentSelectedItemId) {
            checkOrderStatus(orderId)
              .then((data) => {
                if (data && data.error) {
                  addBotMessage(
                    "We couldn't verify your order status. Please try again later.",
                    "BOT"
                  );
                  return;
                }
                if (!data || !data.items || !Array.isArray(data.items)) {
                  addBotMessage(
                    "We couldn't retrieve your order information at this time.",
                    "BOT"
                  );
                  return;
                }
                const selectedItem = data.items.find(
                  (item) => item.itemId === window.currentSelectedItemId
                );
   
                if (selectedItem) {
                  if (selectedItem.returnPickUpStatus === true) {
                    addBotMessage(
                      "We’re sorry, but once the order is out for pickup, we can’t update the mobile number.Please let us know if there’s anything else we can do for you. ",
                      "BOT"
                    );
                  } else if (selectedItem.returnPickUpStatus === false) {
                    showImageOptionBoxformobile(
                      "new mobile number for return the product",
                      "onlyText",
                      handleMobileNumberSubmit
                    );
                  } else if (selectedItem.returnPickUpStatus === null) {
                    addBotMessage(
                      "This item is not in the return process. Mobile number change for pickup is not applicable.",
                      "BOT"
                    );
                  } else {
                    addBotMessage(
                      "We couldn't determine the pickup status for this item. Please try again later.",
                      "BOT"
                    );
                  }
                } else {
                  addBotMessage(
                    `We couldn't find information for the selected item in this order.`,
                    "BOT"
                  );
                }
              })
              .catch((error) => {
                console.error("Error checking return status:", error);
                addBotMessage(
                  "We encountered an error while checking your item's status. Please try again later.",
                  "BOT"
                );
              });
          } else {
            addBotMessage(
              "Please select an item first to change the mobile number.",
              "BOT"
            );
          }
          break;
   
        case "Change my Pickup address":
          if (window.currentSelectedItemId) {
            checkOrderStatus(orderId)
              .then((data) => {
                if (data && data.error) {
                  addBotMessage(
                    "We couldn't verify your order status. Please try again later.",
                    "BOT"
                  );
                  return;
                }
                if (!data || !data.items || !Array.isArray(data.items)) {
                  addBotMessage(
                    "We couldn't retrieve your order information at this time.",
                    "BOT"
                  );
                  return;
                }
                const selectedItem = data.items.find(
                  (item) => item.itemId === window.currentSelectedItemId
                );
   
                if (selectedItem) {
                  if (selectedItem.returnPickUpStatus === true) {
                    addBotMessage(
                      "You can enter your return address when placing the return request. Since the return is already out for pickup, the address can’t be changed now. Let us know if you need any help! ",
                      "BOT"
                    );
                  } else if (selectedItem.returnPickUpStatus === false) {
                    showImageOptionBoxformobile(
                      "new delivery address for return",
                      "onlyText",
                      handleDeliveryAddressSubmit
                    );
                  } else if (selectedItem.returnPickUpStatus === null) {
                    addBotMessage(
                      "This item is not in the return process. Change my Pickup address for pickup is not applicable.",
                      "BOT"
                    );
                  } else {
                    addBotMessage(
                      "We couldn't determine the pickup status for this item. Please try again later.",
                      "BOT"
                    );
                  }
                } else {
                  addBotMessage(
                    `We couldn't find information for the selected item in this order.`,
                    "BOT"
                  );
                }
              })
              .catch((error) => {
                console.error("Error checking return status:", error);
                addBotMessage(
                  "We encountered an error while checking your item's status. Please try again later.",
                  "BOT"
                );
              });
          } else {
            addBotMessage(
              "Please select an item first to change the mobile number.",
              "BOT"
            );
          }
          break;
        case "Pincode not serviceable":
          addBotMessage(
            "If your pickup is not done,Please raise a ticket",
            "BOT"
          );
          // Create a button container
          const buttonContainerService = document.createElement("div");
          buttonContainerService.style.cssText = `
            display: flex;
            justify-content: flex-start;
            margin-top: 15px;
          `;
   
          // Create the "Raise Ticket" button
          const raiseTicketButtonService = document.createElement("button");
          raiseTicketButtonService.textContent = "Raise Ticket";
          raiseTicketButtonService.style.cssText = `
            background: none;
            border: 2px solid #E62A86;
            color: #762F88;
            padding: 12px 25px;
            border-radius: 50px;
            cursor: pointer;
            font-size: 14px;
            text-align: center;
            transition: all 0.3s;
            min-width: 150px;
          `;
   
          // Add hover effects
          raiseTicketButtonService.onmouseover = () => {
            raiseTicketButtonService.style.background = "#E8ABC8";
            raiseTicketButtonService.style.color = "#762F88";
          };
   
          raiseTicketButtonService.onmouseout = () => {
            raiseTicketButtonService.style.background = "none";
            raiseTicketButtonService.style.color = "#762F88";
            raiseTicketButtonService.style.border = "2px solid #E62A86";
            raiseTicketButtonService.style.padding = "12px 25px";
          };
   
          raiseTicketButtonService.onclick = () => {
            const message =
              document.getElementById("chat-input").value || "Raise Ticket";
            handlePickupTicketSubmit("Pincode not serviceable", message, null);
          };
   
          // Add the button to the container
          buttonContainerService.appendChild(raiseTicketButtonService);
   
          // Add the button container to the chat
          const chatContainerService =
            document.querySelector(".chat-container") ||
            document.getElementById("chat-messages");
          if (chatContainerService) {
            chatContainerService.appendChild(buttonContainerService);
            // Scroll tPICKUPhe chat container to show the button
            chatContainerService.scrollTop = chatContainerService.scrollHeight;
          }
          break;
      }
    }
    async function handleReturnReason(orderId, selectedReason, selectedItemId) {
      try {
        const orderDetailsResponse = await fetch(
          `https://api-preprod.nnnow.com/d/apiV2/orderDetailsv2/${orderId}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              "content-Type": "application/json",
              "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
              bbversion: "v2",
              clientsessionid: "1742983379818",
              Authorization: `Bearer ${accessToken}`,
              correlationid: "2a336d49-4e2b-4a04-aaf7-b66063f19259",
              "if-none-match": 'W/"152-8UyXsIzXQkcUBNh8ObRhw8DIQMY"',
              module: "odin",
              origin: "https://www.nnnow.com",
              priority: "u=1, i",
              referer: "https://www.nnnow.com/",
            },
          }
        );
    
        if (!orderDetailsResponse.ok) {
          throw new Error("Failed to fetch order details");
        }
    
        const orderDetails = await orderDetailsResponse.json();
    
        if (!orderDetails?.data?.consignments?.[0]?.addressDetails?.addressId) {
          throw new Error("No address found in order details");
        }
    
        const addressId =
          orderDetails.data.consignments[0].addressDetails.addressId;
    
        // Ask for comments first
        addBotMessage("Please add any additional comments:", "BOT");
        
        // Save original chat message handler if it exists
        const originalHandler = window.handleChatMessage;
        
        // Create a promise that will be resolved when the user submits comments
        const commentPromise = new Promise(resolve => {
          window.handleChatMessage = message => {
            const comment = message.trim();
            resolve(comment);
          };
        });
    
        // Wait for the user to provide comments before proceeding
        const comment = await commentPromise;
        
        // Make the API call after receiving the comment
        const returnResponse = await fetch(
          "https://api-preprod.ailiens.com/d/api/returnInitiate",
          {
            method: "POST",
            headers: {
              accept: "application/json",
              "content-Type": "application/json",
              "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
              Connection: "keep-alive",
              bbversion: "v2",
              clientsessionid: "1745109689845",
              Authorization: `Bearer ${accessToken}`,
              correlationid: "93fb250e-ffb0-4e7c-93b9-72f5685d5683",
              "if-none-match": 'W/"152-8UyXsIzXQkcUBNh8ObRhw8DIQMY"',
              module: "odin",
              origin: "https://www.nnnow.com",
              priority: "u=1, i",
              referer: "https://www.nnnow.com/",
            },
            body: JSON.stringify({
              itemId: selectedItemId, 
              reasonId: selectedReason.id,
              comment: comment,
              returnMode: "REVERSEPICKUP",
              address: {
                addressId: addressId,
              },
            }),
          }
        );
    
        // Parse the response JSON
        const returnData = await returnResponse.json();
        
        // Handle different response scenarios based on the API response
        if (returnData.status === true && returnData.returnId) {
          // Success case
          addBotMessage(
            `Return request initiated successfully! Return ID: ${returnData.returnId}`,
            "BOT"
          );
        } 
        // Check for the specific error message about already initiated return
        else if (returnData.errors && 
                returnData.errors.errorMessage && 
                returnData.errors.errorMessage.includes("Item not eligible for return. Return already initiated")) {
          addBotMessage(
            "Item not eligible for return. Return already initiated",
            "BOT"
          );
        }
        // Handle case where status is false but has returnId
        else if (returnData.status === false && returnData.returnId) {
          addBotMessage(
            "Item not eligible for return. Return already initiated",
            "BOT"
          );
        }
        // Handle error message from API
        else if (returnData.errors && returnData.errors.errorMessage) {
          addBotMessage(
            returnData.errors.errorMessage,
            "BOT"
          );
        }
        // Handle HTTP status errors (like 500)
        else if (!returnResponse.ok) {
          if (returnResponse.status === 500) {
            addBotMessage(
              "500 internal server error",
              "BOT"
            );
          } else {
            addBotMessage(
              `Failed to process return (Error ${returnResponse.status}). Please try again.`,
              "BOT"
            );
          }
        }
        // Fallback error message
        else {
          addBotMessage(
            "Failed to process return. Please try again.",
            "BOT"
          );
        }
    
        // Always show the main menu buttons after the response
        document.getElementById("chat-input").value = "";
        const buttonContainer = createStyledButtonContainer(
          buttonSets.queryOptions
        );
        appendButtonsToChat(buttonContainer);
        
        // Ensure the new buttons are visible by scrolling down again
        const chatContainer =
          document.querySelector(".chat-container") ||
          document.getElementById("chat-messages");
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
        
        // Restore original handler if needed
        if (originalHandler) {
          window.handleChatMessage = originalHandler;
        }
      } catch (error) {
        console.error("Error in return process:", error);
        
        addBotMessage(
          "Error processing your return request. Please try again later.",
          "BOT"
        );
        
        // Always show the main menu buttons after an error
        document.getElementById("chat-input").value = "";
        const buttonContainer = createStyledButtonContainer(
          buttonSets.queryOptions
        );
        appendButtonsToChat(buttonContainer);
        
        // Ensure the new buttons are visible
        const chatContainer =
          document.querySelector(".chat-container") ||
          document.getElementById("chat-messages");
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      }
    }
 
    async function raiseATicket(ticketData) {
      try {
        const response = await fetch(
          "https://arvind.kapturecrm.com/add-ticket-from-other-source.html/v.2.0",
          {
            method: "POST",
            headers: {
              Authorization:
                "Basic bzJnd3QzczRzcWIxNWd3ajBtOHJkMmkwcm9sZ3VhNHNleTdydDE3aGRkZnowOWN3NGg=",
              "Content-Type": "application/json",
              Cookie:
                "JSESSIONID=00A17DEACFA7408133150E1D5B64A36B; JSESSIONRID=3SDmlhjtZ1s1DmlhjtZ; _KAPTURECRM_SESSION=",
            },
            body: JSON.stringify(ticketData),
          }
        );
   
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error raising ticket:", error);
        throw error;
      }
    }
    function getDecodedToken() {
      // Get the accessToken from cookies
      const cookies = document.cookie.split(';');
      const tokenCookie = accesstoken
      
      if (!tokenCookie) {
        console.error("No accessToken found in cookies.");
        return null;
      }
      
      try {
        const token = accesstoken;
        
        // Check if token has the expected format (contains dots)
        if (!token) {
          console.error("Invalid token format");
          return null;
        }
        
        const payloadBase64 = token.split(".")[1];
        
        // Make sure we have a payload to decode
        if (!payloadBase64) {
          console.error("No payload in token");
          return null;
        }
        
        // Add padding if needed (fix for atob with base64url format)
        const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
        const padding = '='.repeat((4 - base64.length % 4) % 4);
        const paddedBase64 = base64 + padding;
        
        try {
          const decodedPayload = JSON.parse(atob(paddedBase64));
          console.log("Decoded token:", decodedPayload); // Log the token contents for debugging
          return decodedPayload;
        } catch (e) {
          console.error("Error parsing token payload:", e);
          return null;
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        return null;
      }
    }

//  Electronics and Clothing List
    async function electronicsClothing(data){
       
        const rows = data.data.interactive.action.sections[0].rows;
      
        const container = document.createElement("div");
        container.id = "list-options-container";
      
        rows.forEach(row => {
          const button = document.createElement("button");
          button.style.backgroundColor = "#4CAF50";
          button.style.color = "white";
          button.style.padding = "10px 18px";
          button.style.margin = "10px 5px";
          button.style.border = "none";
          button.style.borderRadius = "6px";
          button.style.cursor = "pointer";
          button.style.fontSize = "16px";
          button.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.15)";
          button.style.transition = "all 0.3s ease";
        
          // Optional hover effect using mouse events
          button.addEventListener("mouseenter", () => {
            button.style.backgroundColor = "#45a049";
            button.style.transform = "translateY(-2px)";
          });
        
          button.addEventListener("mouseleave", () => {
            button.style.backgroundColor = "#4CAF50";
            button.style.transform = "translateY(0)";
          });
        
          button.addEventListener("mousedown", () => {
            button.style.transform = "scale(0.98)";
          });
        
          button.addEventListener("mouseup", () => {
            button.style.transform = "translateY(-2px)";
          });
          button.innerText = row.title;
          button.style.margin = "5px"; 
      
          button.addEventListener("click", async () => {
            addUserMessage(`${row.title}`);
            const payload = {
              "object": "web_bot",
              "entry": [
                {
                  "id": "421660861040040",
                  "changes": [
                    {
                      "value": {
                        "messaging_product": "whatsapp",
                        "metadata": {
                          "display_phone_number": "919580186323",
                          "phone_number_id": "480518401812550"
                        },
                        "contacts": [
                          {
                            "profile": {
                              "name": "SOMNATH Yadav"
                            },
                            "wa_id": "919453658871"
                          }
                        ],
                        "messages": [
                          {
                            "context": {
                              "from": "919580186323",
                              "id": "wamid.HBgMOTE5NDUzNjU4ODcxFQIAERgSQzU4NjFDREY1M0ZBRTE4QTU4AA=="
                            },
                            "from": "919453658871",
                            "id": "wamid.HBgMOTE5NDUzNjU4ODcxFQIAEhggMTU2M0FCRTNERUYzMjU3MkZGMEI5Mjg4MDkzOTE3ODIA",
                            "timestamp": "1746183134",
                            "type": "interactive",
                            "interactive": {
                              "type": "list_reply",
                              "list_reply": {
                                "id": row.id,
                                "title": row.title
                              }
                            }
                          }
                        ]
                      },
                      "field": "messages"
                    }
                  ]
                }
              ]
            }
      
            try {
              const res = await fetch("https://api-xpresschat.fixall.ai/api/whatsapp/message/webhook/10001/20001/30001", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
              });
      
              const result = await res.json();
              console.log("result--------------->nowooooo",result?.data)
              if(Array.isArray(result?.data)){  
                console.log("isArray is working ---->")
              const container = document.getElementById("chat-messages");
              result?.data?.forEach(item => {
                if (item.type === "image" && item.image) {
                  const card = document.createElement("div");
                  card.style.border = "1px solid #ddd";
                  card.style.borderRadius = "10px";
                  card.style.padding = "10px";
                //   card.style.width = "200px";
                  card.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                  card.style.textAlign = "center";
                  card.style.backgroundColor = "#fff";
          
                  const img = document.createElement("img");
                  img.src = item.image.link;
                  img.alt = item.image.caption;
                  img.style.width = "100%";
                  img.style.borderRadius = "8px";
          
                  const caption = document.createElement("p");
                  caption.innerText = item.image.caption;
                  caption.style.marginTop = "10px";
                  caption.style.fontSize = "14px";
                  caption.style.color = "#333";
          
                  card.appendChild(img);
                  card.appendChild(caption);
                  container.appendChild(card);
                    container.scrollTop = container.scrollHeight;
                }
               //here i am checking the type of data
              })}else if(typeof result?.data?.text?.body === "string") {
              addBotMessage(`${result?.data?.text?.body}`, "BOT");
            }else{
                addBotMessage("Sorry, something went wrong with the response format.", "BOT");
            }
            
            } catch (err) {
              console.error("API Error:", err);
            }
          });
        
          container.appendChild(button); 
        }); 
      
        // Append buttons to chat
        const chatMessages = document.getElementById("chat-messages");
        if (chatMessages) {
          const newDiv = document.createElement("div");
          newDiv.className = "button-message";
          newDiv.appendChild(container);
      
          let lastMessage = chatMessages.lastElementChild;
          if (lastMessage) {
            lastMessage.insertAdjacentElement("afterend", newDiv);
          } else {
            chatMessages.appendChild(newDiv);
          }
      
          chatMessages.scrollTop = chatMessages.scrollHeight;
        } else {
          console.error("Element with ID 'chat-messages' not found!");
        }
    }
    
  
//   Contact us
    async function suuport(data){
       console.log("check------------>",data)
       const buttons = data.data.interactive.action.buttons;
          const container = document.createElement("div"); 
          container.id = "button-container";
        
          buttons.forEach(btn => {
            const button = document.createElement("button");
            button.innerText = btn.reply.title;
            button.style.backgroundColor = "#4CAF50";
            button.style.color = "white";
            button.style.padding = "10px 18px";
            button.style.margin = "10px 5px";
            button.style.border = "none";
            button.style.borderRadius = "6px";
            button.style.cursor = "pointer";
            button.style.fontSize = "16px";
            button.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.15)";
            button.style.transition = "all 0.3s ease";
          
            // Optional hover effect using mouse events
            button.addEventListener("mouseenter", () => {
              button.style.backgroundColor = "#45a049";
              button.style.transform = "translateY(-2px)";
            });
          
            button.addEventListener("mouseleave", () => {
              button.style.backgroundColor = "#4CAF50";
              button.style.transform = "translateY(0)";
            });
          
            button.addEventListener("mousedown", () => {
              button.style.transform = "scale(0.98)";
            });
          
            button.addEventListener("mouseup", () => {
              button.style.transform = "translateY(-2px)";
            });
        
            button.addEventListener("click", async () => {
              addUserMessage(`${btn.reply.title}`);
  
              const payload= {
                "object": "web_bot",
                "entry": [
                  {
                    "id": "421660861040040",
                    "changes": [
                      {
                        "value": {
                          "messaging_product": "whatsapp",
                          "metadata": {
                            "display_phone_number": "919580186323",
                            "phone_number_id": "480518401812550"
                          },
                          "contacts": [
                            {
                              "profile": {
                                "name": "SOMNATH Yadav"
                              },
                              "wa_id": "919453658871"
                            }
                          ],
                          "messages": [
                            {
                              "context": {
                                "from": "919580186323",
                                "id": "wamid.HBgMOTE5NDUzNjU4ODcxFQIAERgSQkEyRTNGM0VCNjQ0OTE4RTNEAA=="
                              },
                              "from": "919453658871",
                              "id": "wamid.HBgMOTE5NDUzNjU4ODcxFQIAEhggMkU1N0YwMjlDMjNERkFERTM0ODQwNkI4OTlDNTM3MTgA",
                              "timestamp": "1746078562",
                              "type": "interactive",
                              "interactive": {
                                "type": "button_reply",
                                "button_reply": {
                                  "id":  btn.reply.id,
                                  "title":  btn.reply.title
                                }
                              }
                            }
                          ]
                        },
                        "field": "messages"
                      }
                    ]
                  }
                ]
              }
        
              try {
                const res = await fetch("https://api-xpresschat.fixall.ai/api/whatsapp/message/webhook/10001/20001/30001", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(payload),
                });
        
                const result = await res.json();
                // addBotMessage(result?.data?.text?.body, "BOT");
                if(result.data.type == "interactive"){   
                  electronicsClothing(result) 
                  return ;
                }else{
                  addBotMessage(`${result?.data?.text?.body}`, "BOT");
                }
                 
              } catch (err) {
                console.error("Error sending message:", err);
              }
            });
        
            container.appendChild(button); 
          });
        
          // Insert into chat
          const chatMessages = document.getElementById("chat-messages");
        
          if (chatMessages) {
            const newDiv = document.createElement("div"); 
            newDiv.className = "button-message"; 
            newDiv.appendChild(container); 
        
            let lastMessage = chatMessages.lastElementChild;
        
            if (lastMessage) {
              lastMessage.insertAdjacentElement("afterend", newDiv);
            } else {
              chatMessages.appendChild(newDiv);
            }
        
            chatMessages.scrollTop = chatMessages.scrollHeight;
          } else {
            console.error("Element with ID 'chat-messages' not found!");
          }
    }
   
    // async function handleFormSubmit(concern, message, file) {   
    //   if(!message && !file ){
    //     return ;
    //   }
   
    //   if (!message) {
    //     addBotMessage("Please write your concern into input box ", "BOT");
    //     return;
    //   }
   
    //   const decodedToken = getDecodedToken();
    //   if (!decodedToken) return;
    //   // let phone = localStorage.getItem("userMobile");
    //   // console.log("data--------------------->", decodedToken);
   
    //   if (
    //     concern == "Payment Gateway Not Responding" ||
    //     concern == "Particular payment method not accepted" ||
    //     concern == "Payment options & limit for Cash on Delivery orders" ||
    //     concern == "Pickup not successful"
    //   ) {
    //     return;
    //   }
    //   addUserMessage(message);
   
    //   const payload = {
    //     "object": "web_bot",
    //     "entry": [
    //       {
    //         "id": "421660861040040",
    //         "changes": [
    //           {
    //             "value": {
    //               "messaging_product": "whatsapp",
    //               "metadata": {
    //                 "display_phone_number": "919580186323",
    //                 "phone_number_id": "480518401812550"
    //               },
    //               "contacts": [
    //                 {
    //                   "profile": {
    //                     "name": "SOMNATH Yadav"
    //                   },
    //                   "wa_id": "919453658871"
    //                 }
    //               ],
    //               "messages": [
    //                 {
    //                   "from": "919453658871",
    //                   "id": "wamid.HBgMOTE5NDUzNjU4ODcxFQIAEhggMTJFMkRDODRDNEI5NUQ1Q0JBODU0QzQyQkVCRUE1MjQA",
    //                   "timestamp": "1746078430",
    //                   "text": {
    //                     "body": message
    //                   },
    //                   "type": "text"
    //                 }
    //               ]
    //             },
    //             "field": "messages"
    //           }
    //         ]
    //       }
    //     ]
    //   }
  
    //   console.log("payload111==>", payload);
   
      
   
    //   try {
    //     const response = await fetch(
    //       "https://api-xpresschat.fixall.ai/api/whatsapp/message/webhook/10001/20001/30001",
    //       {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(payload),
    //       }
    //     );
   
    //     if (!response.ok) {
    //       throw new Error("Failed to create ticket");
    //     }
   
    //     const data = await response.json();
    //     console.log("Ticket creation response:", data.data);
    //     if (data) {
    //       console.log("Buttons:---------->", data.data.interactive.action.buttons);
        
    //       const buttons = data.data.interactive.action.buttons;
    //       const container = document.createElement("div"); 
    //       container.id = "button-container";
        
    //       buttons.forEach(btn => {
    //         const button = document.createElement("button");
    //         button.innerText = btn.reply.title;
    //         button.style.backgroundColor = "#4CAF50";
    //         button.style.color = "white";
    //         button.style.padding = "10px 18px";
    //         button.style.margin = "10px 5px";
    //         button.style.border = "none";
    //         button.style.borderRadius = "6px";
    //         button.style.cursor = "pointer";
    //         button.style.fontSize = "16px";
    //         button.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.15)";
    //         button.style.transition = "all 0.3s ease";
          
    //         // Optional hover effect using mouse events
    //         button.addEventListener("mouseenter", () => {
    //           button.style.backgroundColor = "#45a049";
    //           button.style.transform = "translateY(-2px)";
    //         });
          
    //         button.addEventListener("mouseleave", () => {
    //           button.style.backgroundColor = "#4CAF50";
    //           button.style.transform = "translateY(0)";
    //         });
          
    //         button.addEventListener("mousedown", () => {
    //           button.style.transform = "scale(0.98)";
    //         });
          
    //         button.addEventListener("mouseup", () => {
    //           button.style.transform = "translateY(-2px)";
    //         });
        
    //         button.addEventListener("click", async () => {
  
    //           const payload= {
    //             "object": "web_bot",
    //             "entry": [
    //               {
    //                 "id": "421660861040040",
    //                 "changes": [
    //                   {
    //                     "value": {
    //                       "messaging_product": "whatsapp",
    //                       "metadata": {
    //                         "display_phone_number": "919580186323",
    //                         "phone_number_id": "480518401812550"
    //                       },
    //                       "contacts": [
    //                         {
    //                           "profile": {
    //                             "name": "SOMNATH Yadav"
    //                           },
    //                           "wa_id": "919453658871"
    //                         }
    //                       ],
    //                       "messages": [
    //                         {
    //                           "context": {
    //                             "from": "919580186323",
    //                             "id": "wamid.HBgMOTE5NDUzNjU4ODcxFQIAERgSQkEyRTNGM0VCNjQ0OTE4RTNEAA=="
    //                           },
    //                           "from": "919453658871",
    //                           "id": "wamid.HBgMOTE5NDUzNjU4ODcxFQIAEhggMkU1N0YwMjlDMjNERkFERTM0ODQwNkI4OTlDNTM3MTgA",
    //                           "timestamp": "1746078562",
    //                           "type": "interactive",
    //                           "interactive": {
    //                             "type": "button_reply",
    //                             "button_reply": {
    //                               "id":  btn.reply.id,
    //                               "title":  btn.reply.title
    //                             }
    //                           }
    //                         }
    //                       ]
    //                     },
    //                     "field": "messages"
    //                   }
    //                 ]
    //               }
    //             ]
    //           }
        
    //           try {
    //             const res = await fetch("https://api-xpresschat.fixall.ai/api/whatsapp/message/webhook/10001/20001/30001", {
    //               method: "POST",
    //               headers: {
    //                 "Content-Type": "application/json",
    //               },
    //               body: JSON.stringify(payload),
    //             });
        
    //             const result = await res.json();
    //             addBotMessage("Select one option please", "BOT");
    //             suuport(result)
    //             console.log("Sent successfully:", result);
    //           } catch (err) {
    //             console.error("Error sending message:", err);
    //           }
    //         });
        
    //         container.appendChild(button); 
    //       });
        
    //       // Insert into chat
    //       const chatMessages = document.getElementById("chat-messages");
        
    //       if (chatMessages) {
    //         const newDiv = document.createElement("div"); 
    //         newDiv.className = "button-message"; 
    //         newDiv.appendChild(container); 
        
    //         let lastMessage = chatMessages.lastElementChild;
        
    //         if (lastMessage) {
    //           lastMessage.insertAdjacentElement("afterend", newDiv);
    //         } else {
    //           chatMessages.appendChild(newDiv);
    //         }
        
    //         chatMessages.scrollTop = chatMessages.scrollHeight;
    //       } else {
    //         console.error("Element with ID 'chat-messages' not found!");
    //       }
    //     }
    //     else {
    //       throw new Error(data.message || "Failed to create ticket");
    //     }
    //   } catch (error) {
    //     console.error("Error submitting ticket:", error);
    //     // addBotMessage("Failed to create ticket. Please try again.", "BOT");
    //   }
    // }
    function setupChatInputListener() {
      const chatInput = document.getElementById("chat-input");
      chatInput.setAttribute("type", "text");
      const sendButton = document.getElementById("send-btn");
    //   let isLoggedIn = false; // Set this to true when user successfully logs in
      let isInLoginFlow = false;
      chatInput.addEventListener("input", function () {
        // Only restrict input when expecting mobile input
        if (chatInput.getAttribute("data-expecting") === "mobile") {
          // Remove any non-digit characters
          this.value = this.value.replace(/\D/g, "");
   
          // Enforce the 10 digit limit
          if (this.value.length > 10) {
            this.value = this.value.slice(0, 10);
          }
        }
      });


    //  new chat begins here
       async  function chatbegins(message) {
        const payload = {
            "object": "web_bot",
            "entry": [
              {
                "id": "421660861040040",
                "changes": [
                  {
                    "value": {
                      "messaging_product": "whatsapp",
                      "metadata": {
                        "display_phone_number": "919580186323",
                        "phone_number_id": "480518401812550"
                      },
                      "contacts": [
                        {
                          "profile": {
                            "name": "SOMNATH Yadav"
                          },
                          "wa_id": "919453658871"
                        }
                      ],
                      "messages": [
                        {
                          "from": "919453658871",
                          "id": "wamid.HBgMOTE5NDUzNjU4ODcxFQIAEhggMTJFMkRDODRDNEI5NUQ1Q0JBODU0QzQyQkVCRUE1MjQA",
                          "timestamp": "1746078430",
                          "text": {
                            "body": message
                          },
                          "type": "text"
                        }
                      ]
                    },
                    "field": "messages"
                  }
                ]
              }
            ]
          }
      
          console.log("payload111==>", payload);
          
       
          try {
            const response = await fetch(
              "https://api-xpresschat.fixall.ai/api/whatsapp/message/webhook/10001/20001/30001",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
              }
            );
       
            if (!response.ok) {
              throw new Error("Failed to create ticket");
            }
       
            const data = await response.json();
            console.log("Ticket creation response:", data.data);
            if (data) {
              console.log("Buttons:---------->", data.data.interactive.action.buttons);
            
              const buttons = data.data.interactive.action.buttons;
              const container = document.createElement("div"); 
              container.id = "button-container";
            
              buttons.forEach(btn => {
                const button = document.createElement("button");
                button.innerText = btn.reply.title;
                button.style.backgroundColor = "#4CAF50";
                button.style.color = "white";
                button.style.padding = "10px 18px";
                button.style.margin = "10px 5px";
                button.style.border = "none";
                button.style.borderRadius = "6px";
                button.style.cursor = "pointer";
                button.style.fontSize = "16px";
                button.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.15)";
                button.style.transition = "all 0.3s ease";
              
                // Optional hover effect using mouse events
                button.addEventListener("mouseenter", () => {
                  button.style.backgroundColor = "#45a049";
                  button.style.transform = "translateY(-2px)";
                });
              
                button.addEventListener("mouseleave", () => {
                  button.style.backgroundColor = "#4CAF50";
                  button.style.transform = "translateY(0)";
                });
              
                button.addEventListener("mousedown", () => {
                  button.style.transform = "scale(0.98)";
                });
              
                button.addEventListener("mouseup", () => {
                  button.style.transform = "translateY(-2px)";
                });
            
                button.addEventListener("click", async () => {
                  // const payload = {
                  //   message: btn.reply.title,
                  // };
      
                  const payload= {
                    "object": "web_bot",
                    "entry": [
                      {
                        "id": "421660861040040",
                        "changes": [
                          {
                            "value": {
                              "messaging_product": "whatsapp",
                              "metadata": {
                                "display_phone_number": "919580186323",
                                "phone_number_id": "480518401812550"
                              },
                              "contacts": [
                                {
                                  "profile": {
                                    "name": "SOMNATH Yadav"
                                  },
                                  "wa_id": "919453658871"
                                }
                              ],
                              "messages": [
                                {
                                  "context": {
                                    "from": "919580186323",
                                    "id": "wamid.HBgMOTE5NDUzNjU4ODcxFQIAERgSQkEyRTNGM0VCNjQ0OTE4RTNEAA=="
                                  },
                                  "from": "919453658871",
                                  "id": "wamid.HBgMOTE5NDUzNjU4ODcxFQIAEhggMkU1N0YwMjlDMjNERkFERTM0ODQwNkI4OTlDNTM3MTgA",
                                  "timestamp": "1746078562",
                                  "type": "interactive",
                                  "interactive": {
                                    "type": "button_reply",
                                    "button_reply": {
                                      "id":  btn.reply.id,
                                      "title":  btn.reply.title
                                    }
                                  }
                                }
                              ]
                            },
                            "field": "messages"
                          }
                        ]
                      }
                    ]
                  }
            
                  try {
                    const res = await fetch("https://api-xpresschat.fixall.ai/api/whatsapp/message/webhook/10001/20001/30001", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(payload),
                    });
            
                    const result = await res.json();
                    addBotMessage("Select one option please", "BOT");
                    suuport(result)
                    console.log("Sent successfully:", result);
                  } catch (err) {
                    console.error("Error sending message:", err);
                  }
                });
            
                container.appendChild(button); 
              });
            
              // Insert into chat
              const chatMessages = document.getElementById("chat-messages");
            
              if (chatMessages) {
                const newDiv = document.createElement("div"); 
                newDiv.className = "button-message"; 
                newDiv.appendChild(container); 
            
                let lastMessage = chatMessages.lastElementChild;
            
                if (lastMessage) {
                  lastMessage.insertAdjacentElement("afterend", newDiv);
                } else {
                  chatMessages.appendChild(newDiv);
                }
            
                chatMessages.scrollTop = chatMessages.scrollHeight;
              } else {
                console.error("Element with ID 'chat-messages' not found!");
              }
            }
            else {
              throw new Error(data.message || "Failed to create ticket");
            }
          } catch (error) {
            console.error("Error :", error);
            // addBotMessage("Failed to create ticket. Please try again.", "BOT");
          }

      }
   
      async function handleInput() {
        const message = chatInput.value.trim();
        if (!message) return;
   
        const isQueryMode = chatInput.getAttribute("data-query-mode") ;
        const expecting = chatInput.getAttribute("data-expecting" || "text");
        const optionType = chatInput.getAttribute("data-option-type");
        console.log(message,"message-----------<>",expecting  , isQueryMode , optionType)
        // Check if there's a custom chat message handler
        // if (
        //   window.handleChatMessage &&
        //   typeof window.handleChatMessage === "function"
        // ) {
        //   console.log("Using custom chat message handler");
        //   await window.handleChatMessage(message);
        //   addUserMessage(message)
        //   handlePostLoginFlow(accessToken)
        //   chatInput.value = "";
        //   return;
        // }
        
        // console.log("expecting:---------->", isLoggedIn);
        console.log("Check if expecting is 'mobile' or 'password':----------->", ["mobile", "password"].includes(expecting));
        
   
        if (isQueryMode == "true") {
          const userMobile = getCookie("userMobile");
        console.log("userMobile for typeQuery:", userMobile);
        
        // Make userMobile available globally for typeQuery function
        window.userMobile = userMobile;
          
          await typeQuery(message);

        //   chatInput.removeAttribute("data-query-mode");
        } else {
            switch (expecting) {
                case "mobile":
                  handleMobileInput(message);
                  break;
              
                case "password":
                  handlePasswordInput(message);
                  break;
              
                case "query":
                  await typeQuery(message);
                  break;
              
                case "otp-mobile":
                  handleOtpInput(message);
                  break;
              
                case "otp-password":
                  handleOtpPasswordLogin(message);
                  break;
              
                case "options":
                  const fileInput = document.getElementById("image-upload");
                  const file = fileInput && fileInput.files.length > 0 ? fileInput.files[0] : null;
                //   await handleFormSubmit(optionType, message, file);
                  break;
              
                case "text": 
                default:
                //   socket.send(
                //     JSON.stringify({
                //       type: "CHAT_MESSAGE",
                //       data: message,
                //     })
                //   );
                  addUserMessage(message);
                  chatbegins(message)
                  break;
              }
              
        }
        chatInput.value = "";
      }
   
      // Event listener for Enter key
      chatInput.addEventListener("keyup", async (event) => {
        if (event.key === "Enter") {
        await handleInput();
        }
      });
   
      // Event listener for Send button
      if (sendButton) {
        sendButton.onclick = async () => {
          await handleInput();
        };
      }
    }
   
    function issueNotListed() {
        const token = accesstoken;
        
        if (!token) {
          console.error("No accessToken found in cookies.");
          return;
        }
      // const phone = localStorage.getItem("userMobile");
      const buttonContainer = document.createElement("div");
      buttonContainer.style.cssText = `
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: flex-start;
      margin-top: 10px;
  align-items: center
    `;
   
      const buttons = ["Type out your query", "Request a callback", "Contact us"];
   
      buttons.forEach((text) => {
        const button = document.createElement("button");
        button.style.cssText = `
        background: none;
        border: 2px solid #E62A86;
        color: #762F88;
        padding: 12px 25px;
        border-radius: 50px;
        cursor: pointer;
        font-size: 14px;
        text-align: center;
        transition: all 0.3s;
        min-width: 250px;
      `;
        button.textContent = text;
   
        button.onmouseover = () => {
          button.style.background = "#E8ABC8";
          button.style.color = "#762F88";
        };
        button.onmouseout = () => {
          button.style.background = "none";
          button.style.color = "#762F88";
          button.style.border = "2px solid #E62A86";
          button.style.padding = "12px 25px";
        };
   
        button.onclick = async () => {
          if (text === "Request a callback") {
            addUserMessage(`Request a callback`);
            if (!decodedToken.firstName || !userMobile) {
              addBotMessage(
                "Unable to process request. User details not found.",
                "BOT"
              );
              return;
            }
   
            try {
              const formattedPhone = userMobile.replace(/^91/, "");
              console.log("Making call with:", {
                username: decodedToken.firstName,
                phone: formattedPhone,
              });
   
              const response = await fetch(
                `http://localhost:5050/apis/agent/callaAgent?username=${encodeURIComponent(
                  decodedToken.firstName
                )}&phone=${encodeURIComponent(formattedPhone)}`
              );
   
              if (!response.ok) throw new Error("Call request failed");
              addBotMessage("Our agent will call you shortly.", "BOT");
              document.getElementById("chat-input").value = "";
            const buttonContainer = createStyledButtonContainer(
              buttonSets.queryOptions
            );
            appendButtonsToChat(buttonContainer);
            buttonContainer.scrollTop = buttonContainer.scrollHeight;
            } catch (error) {
              console.error("Error initiating call:", error);
              addBotMessage(
                "Sorry, we couldn't process your request. Please try again later.",
                "BOT"
              );
            }
          }
      
          if (text === "Type out your query") {
            const chatInput = document.getElementById("chat-input");
            chatInput.setAttribute("data-query-mode", "true");
            chatInput.setAttribute("type", "text");
            addUserMessage("Type out your query", "BOT");
            addBotMessage("Please enter a valid query.", "BOT");
          }
          if (text === "Contact us") {
            addUserMessage(`Contact us`);
            addBotMessage(
              "Please contact us with our contact number +91-8147493085 and email care@nnnow.com.",
              "BOT"
            );
            document.getElementById("chat-input").value = "";
            const buttonContainer = createStyledButtonContainer(
              buttonSets.queryOptions
            );
            appendButtonsToChat(buttonContainer);
            buttonContainer.scrollTop = buttonContainer.scrollHeight;
          }
        };
   
        buttonContainer.appendChild(button);
      });
   
      const messagesContainer = document.getElementById("chat-messages");
      if (messagesContainer) {
        messagesContainer.appendChild(buttonContainer);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }
    async function typeQuery(query) {
      // Add a check to ensure query is not undefined
      if (!query) {
        addBotMessage("Please enter a valid query.", "BOT");
        return;
      }
   
      const decodedToken = getDecodedToken();
      if (!decodedToken) return;
   
      // const phone = localStorage.getItem("userMobile");
      const queryData = {
        query: query, // Ensure query is passed correctly
        customer_name: decodedToken.firstName,
        phone: userMobile,
        email_id: decodedToken.email_id,
      };
   
      try {
        const response = await fetch(
          "http://localhost:5050/apis/agent/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(queryData),
          }
        );
   
        if (!response.ok) {
          throw new Error("Failed to create ticket");
        }
   
        addUserMessage(query);
        addBotMessage(
          "Thank you for your query. Our team will get back to you soon.",
          "BOT"
        );
        const buttonContainer = createStyledButtonContainer(
          buttonSets.queryOptions
        );
        appendButtonsToChat(buttonContainer);
        buttonContainer.scrollTop = buttonContainer.scrollHeight;
      } catch (error) {
        console.error("Error submitting ticket:", error);
        addBotMessage("Failed to create ticket. Please try again.", "BOT");
      }
    }
    
    
   
    function customerfeedback() {
      const messagesContainer = document.getElementById("chat-messages");
      if (!messagesContainer) return;
   
      // Reset any previous feedback type
      localStorage.removeItem("currentFeedbackType");
   
      const concernsDiv = document.createElement("div");
      concernsDiv.style.cssText = `
        display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: flex-start;
      margin-top: 10px;
  align-items: center;
      `;
   
      const concerns = [
        "Product Feedback",
        "Delivery Feedback",
        "Delivery Complaints",
      ];
   
      concerns.forEach((concern) => {
        const button = document.createElement("button");
        button.style.cssText = `
          background: none;
          border: 2px solid #E62A86;
          color: #762F88;
          padding: 12px 25px;
          border-radius: 50px;
          cursor: pointer;
          font-size: 14px;
          text-align: center;
          transition: all 0.3s;
          min-width: 250px;
        `;
   
        button.textContent = concern;
        button.onmouseover = () => {
          button.style.background = "#E8ABC8";
          button.style.color = "#762F88";
          // button.style.border = "none";
          // button.style.padding = "14px 27px";
        };
        button.onmouseout = () => {
          button.style.background = "none";
          button.style.color = "#762F88";
          button.style.border = "2px solid #E62A86";
          button.style.padding = "12px 25px";
        };
   
        button.onclick = () => {
          // Save the feedback type to localStorage
          localStorage.setItem("currentFeedbackType", concern);
          console.log(`[Button Click] Selected feedback type: ${concern}`);
   
          addUserMessage(concern);
   
          if (concern === "Product Feedback") {
            handleFeedbackOrderDisplay(concern);
          }
          if (concern === "Delivery Feedback") {
            handleFeedbackOrderDisplay(concern);
          }
          if (concern === "Delivery Complaints") {
            deliveryComplain(concern);
          }
        };
   
        concernsDiv.appendChild(button);
      });
   
      messagesContainer.appendChild(concernsDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
   
    function deliveryComplain(concern) {
      const messagesContainer = document.getElementById("chat-messages");
      if (!messagesContainer) return;
      const concernsDiv = document.createElement("div");
      concernsDiv.style.cssText = `
        display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: flex-start;
      margin-top: 10px;
  align-items: center;
      `;
   
      const concerns = [
        "Delivery person was rude",
        "Asked for extra tip",
        "No change with delivery person",
        "Other complaints",
      ];
   
      concerns.forEach((concern) => {
        const button = document.createElement("button");
        button.style.cssText = `
         background: none;
                border: 2px solid #E62A86;
                color: #762F88;
                padding: 12px 25px;
                border-radius: 50px;
                cursor: pointer;
                font-size: 14px;
                text-align: center;
                transition: all 0.3s;
            
                min-width: 250px;
      `;
   
        const displayText = concern;
        button.textContent = displayText;
        button.onmouseover = () => {
          button.style.background = "#E8ABC8";
          button.style.color = "#762F88";
          // button.style.border = "none";
          // button.style.padding = "14px 27px";
        };
        button.onmouseout = () => {
          button.style.background = "none";
          button.style.color = "#762F88";
          button.style.border = "2px solid #E62A86";
          button.style.padding = "12px 25px";
        };
        //   concern.length > 25 ? `${concern.substring(0, 22)}...` : concern;
        // button.textContent = displayText;
   
        button.onclick = () => {
          addUserMessage(concern);
          if (concern === "Delivery person was rude") {
            const buttonContainerDisplayed = document.createElement("div");
            buttonContainerDisplayed.style.cssText = `
                        display: flex;
                        justify-content: flex-start;
                        margin-top: 15px;
                        align-items: center;
                        `;
   
            // Create the "Raise Ticket" button
            const raiseTicketButtonDisplayed = document.createElement("button");
            raiseTicketButtonDisplayed.textContent = "Raise Ticket";
            raiseTicketButtonDisplayed.style.cssText = `
            background: none;
            border: 2px solid #E62A86;
            color: #762F88;
            padding: 12px 25px;
            border-radius: 50px;
            cursor: pointer;
            font-size: 14px;
            text-align: center;
            transition: all 0.3s;
            min-width: 150px;
            align-items: center;
          `;
   
            // Add hover effects
            raiseTicketButtonDisplayed.onmouseover = () => {
              raiseTicketButtonDisplayed.style.background = "#E8ABC8";
              raiseTicketButtonDisplayed.style.color = "#762F88";
              // raiseTicketButtonDisplayed.style.border = "none";
              // raiseTicketButtonDisplayed.style.padding = "14px 27px";
            };
   
            raiseTicketButtonDisplayed.onmouseout = () => {
              raiseTicketButtonDisplayed.style.background = "none";
              raiseTicketButtonDisplayed.style.color = "#762F88";
              raiseTicketButtonDisplayed.style.border = "2px solid #E62A86";
              raiseTicketButtonDisplayed.style.padding = "12px 25px";
            };
   
            raiseTicketButtonDisplayed.onclick = () => {
              const message =
                document.getElementById("chat-input").value || "Raise Ticket";
              handlePickupTicketSubmit("Delivery person was rude", message, null);
            };
   
            // Add the button to the container
            buttonContainerDisplayed.appendChild(raiseTicketButtonDisplayed);
   
            // Add the button container to the chat
            const chatContainerDisplayed =
              document.querySelector(".chat-container") ||
              document.getElementById("chat-messages");
            if (chatContainerDisplayed) {
              chatContainerDisplayed.appendChild(buttonContainerDisplayed);
              // Scroll tPICKUPhe chat container to show the button
              chatContainerDisplayed.scrollTop =
                chatContainerDisplayed.scrollHeight;
            }
          }
   
       
   
          if (concern === "Asked for extra tip") {
            addBotMessage(
              "We sincerely apologize for the experience you had with the delivery agent. We will address this matter with our delivery partner.",
              "BOT"
            );
            document.getElementById("chat-input").value = "";
            const buttonContainer = createStyledButtonContainer(
              buttonSets.queryOptions
            );
            appendButtonsToChat(buttonContainer);
            buttonContainer.scrollTop = buttonContainer.scrollHeight;
          }
   
          if (concern === "No change with delivery person") {
            addBotMessage(
              "We sincerely apologize for the experience you had with the delivery agent. We will address this matter with our delivery partner.",
              "BOT"
            );
            document.getElementById("chat-input").value = "";
            const buttonContainer = createStyledButtonContainer(
              buttonSets.queryOptions
            );
            appendButtonsToChat(buttonContainer);
            buttonContainer.scrollTop = buttonContainer.scrollHeight;
          }
   
          if (concern === "Other complaints") {
            addBotMessage(
              "We’re sorry for your experience with the delivery agent. Please raise a ticket with the details, and we’ll take it up with our delivery partner.",
              "BOT"
            );
            addBotMessage(
              "Please select one option that you want to send your concern with picture or without picture"
            );
            showImageOptionBox(concern);
          }
        };
        concernsDiv.appendChild(button);
      });
      messagesContainer.appendChild(concernsDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
   
    function handleFeedbackOrderDisplay(concern) {
      console.log("4/1/25 concern------->",concern)
      const messagesContainer = document.getElementById("chat-messages");
      if (!messagesContainer) return;
      resetOrderDisplay();
   
      // Create order wrapper
      const orderWrapper = document.createElement("div");
      orderWrapper.id = "orderWrapper";
      orderWrapper.style.cssText = `
        margin: 15px 0; 
        padding: 6px;
        border-radius: 8px;
        background: #fff;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      `;
   
      // Add order list container
      const orderList = document.createElement("div");
      orderList.className = "order-list";
      orderList.innerHTML = `
        <div style="text-align: center; padding: 20px;">
          Loading your recent orders...
        </div>
      `;
   
      orderWrapper.appendChild(orderList);
      messagesContainer.appendChild(orderWrapper);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      // Fetch orders
      fetchFeedbackOrders(concern);
    }
   
    async function fetchFeedbackOrders(concern) {
      // const cookies = document.cookie.split(';');
      // const token = cookies.find(cookie => cookie.trim().startsWith('accessToken='));
      try {
        const response = await window.fetch(
          "https://api-preprod.ailiens.com/d/mobapi/orderDetails/v3",
          {
            method: "GET",
            headers: {
              accept: "application/json",
              "content-Type": "application/json",
              "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
              bbversion: "v2",
              clientsessionid: "1742983379818",
              Authorization: `Bearer ${accessToken}`,
              correlationid: "2a336d49-4e2b-4a04-aaf7-b66063f19259",
              "if-none-match": ' W/"152-8UyXsIzXQkcUBNh8ObRhw8DIQMY"',
              module: "odin",
              origin: "https://www.nnnow.com",
              priority: "u=1, i",
              referer: "https://www.nnnow.com/",
            },
          }
        );
   
        const result = await response.json();
   
        if (result.status && result.data && result.data.ordersList) {
          // Store all orders but initially display only 2
          window.allOrders = result.data.ordersList;
   
          // Fetch detailed information for each order
          const detailedOrders = await Promise.all(
            window.allOrders.slice(0, 2).map(async (order) => {
              try {
                // Get detailed info for this order
                const detailResponse = await fetch(
                  `https://api-preprod.nnnow.com/d/apiV2/orderDetailsv2/${order.orderId}`,
                  {
                    method: "GET",
                    headers: {
                      accept: "application/json",
                      "content-Type": "application/json",
                      "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                      bbversion: "v2",
                      clientsessionid: "1742983379818",
                      Authorization: `Bearer ${accessToken}`,
                      correlationid: "7eded8af-e9d1-441b-8868-92958aa0b1fb",
                      "if-none-match": ' W/"152-8UyXsIzXQkcUBNh8ObRhw8DIQMY"',
                      module: "odin",
                      origin: "https://www.nnnow.com",
                      priority: "u=1, i",
                      referer: "https://www.nnnow.com/",
                    },
                  }
                );
   
                const detailData = await detailResponse.json();
   
                // Merge the detailed data with the basic order data
                if (detailData && detailData.data) {
                  // Extract estimated delivery date from detailed data
                  let estimatedDelivery = "N/A";
                  if (
                    detailData.data.consignments &&
                    detailData.data.consignments.length > 0 &&
                    detailData.data.consignments[0].items &&
                    detailData.data.consignments[0].items.length > 0 &&
                    detailData.data.consignments[0].items[0].itemDeliveryDateInfo
                  ) {
                    estimatedDelivery =
                      detailData.data.consignments[0].items[0]
                        .itemDeliveryDateInfo;
                  }
   
                  // Add the detailed data to the order
                  order.estimatedDelivery = estimatedDelivery;
                  order.detailedData = detailData.data;
                }
   
                return order;
              } catch (error) {
                console.error(
                  `Error fetching details for order ${order.orderId}:`,
                  error
                );
                return order; // Return original order if fetch fails
              }
            })
          );
          displayFeedbackOrders(detailedOrders, true, concern);
          // displayFeedbackOrders(orders, concern);
          addBotMessage("Please select an order to provide feedback.");
        } else {
          console.error("No orders found or API error");
          displayFeedbackOrders("No orders found");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        displayFeedbackOrders("Error fetching orders");
      }
    }
   
    function displayFeedbackOrders(orders, showToggleButton = false, concern) {
      const orderList = document.querySelector("#orderWrapper .order-list");
      if (!orderList) return;
   
      // Add styles for consistent hover effect and toggle button
      const styles = document.createElement("style");
      styles.textContent = `
        .order-item {
          background: white;
          border-radius: 20px;
          margin: 15px 0;
          padding: 6px;
          cursor: pointer;
          border: 2px solid #E8ABC8;
          transition: all 0.3s ease;
        }
        
        .order-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(233, 30, 99, 0.15);
          border-color: #6a1b9a;
        }
    
        .toggle-button {
          background-color: #762F88;
          color: white;
          border: none;
          border-radius: 25px;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 15px;
          outline: none;
        }
        
        .toggle-button:hover {
          background-color: #6a1b9a;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(233, 30, 99, 0.15);
        }
      `;
      document.head.appendChild(styles);
   
      const orderListHtml = orders
        .map(
          (order) => `
          <div class="order-item" onclick="handleFeedbackOrderClick('${order.orderId
            }')">
          <div style="display: flex; gap: 20px; align-items: center;">
            <img 
              src="${order.imagesList[0] || "default-image-url"}" 
              alt="Order Image" 
              style="width: 150px; height: 150px; object-fit: cover; border-radius: 10px;"
            />
            <div style="">
              <div style="font-size: 18px; color: #6a1b9a; margin-bottom: 6px;">
                Order ID: ${order.orderId || "N/A"}
              </div>
              <div style="font-size: 16px; margin-bottom: 6px;">
                Date: ${order.orderDate
              ? new Date(order.orderDate).toLocaleString()
              : "N/A"
            }
              </div>
              <div style="font-size: 18px; margin-bottom: 6px;">
                Status: ${order.orderStatus || "N/A"}
              </div>
              <div style="font-size: 20px; color: #6a1b9a; font-weight: bold;">
                Total: ₹${order.totalAmount || "N/A"}
              </div>
              <div style="font-size: 16px; color: #762F88; margin-top: 8px;">
                Your Order Status is ${order.orderStatus || "N/A"}
              </div>
            </div>
          </div>
        </div>
          `
        )
        .join("");
      const toggleButtonHtml = showToggleButton
        ? `
        <div style="text-align: center;">
          <button id="toggleOrdersButton" class="toggle-button" onclick="toggleOrdersDisplay()">
            ${orders.length <= 2 ? "Show More" : "Show Less"}
          </button>
        </div>
      `
        : "";
      orderList.innerHTML = `
         <h3 style="
         text-align: center;
           color: #762F88;
           font-size: 24px;
           font-weight: bold;
           margin: 0;
           padding: 15px;
           border-radius: 10px;
         ">Recent Orders</h3>
          ${orderListHtml}
          ${toggleButtonHtml}
       `;
    }
   
    async function handleFeedbackOrderClick(orderId, concern) {
      try {
        const items = await fetchOrderDetails(orderId);
   
        // Create container for the items section
        const returnContainer = document.createElement("div");
        returnContainer.className = "return-section";
        const styles = document.createElement("style");
        styles.textContent = `
            .return-section {
                margin-top: 15px;
                width: 100%;
                max-width: 600px;
            }
            
            .product-display {
                margin-bottom: 20px;
                border: 1px solid #E62A86;
                border-radius: 8px;
                padding: 15px;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .product-display:hover {
                background: #fff5f9;
                transform: translateY(-2px);
                box-shadow: 0 2px 8px rgba(230, 42, 134, 0.1);
            }
        `;
        document.head.appendChild(styles);
   
        items.forEach((item) => {
          const productDisplay = createProductDisplay(
            item.itemId,
            item.productDetails,
            item.itemStatus,
            item.itemDeliveryDateInfo
          );
          productDisplay.style.cursor = "pointer";
          productDisplay.onclick = () => showFeedbackForm(item, concern);
          returnContainer.appendChild(productDisplay);
        });
   
        const messagesContainer = document.getElementById("chat-messages");
        if (messagesContainer) {
          messagesContainer.appendChild(returnContainer);
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
        addBotMessage(
          "I apologize, but I encountered an error while fetching your order details. Please try again later.",
          "BOT"
        );
      }
    }
    function showFeedbackForm(item, concern) {
      const messagesContainer = document.getElementById("chat-messages");
      if (!messagesContainer) return;
   
      console.log("showFeedbackForm called with concern:", concern);
   
      // Display selected product
      const messageDiv = document.createElement("div");
      messageDiv.style.cssText = `
        display: flex;
        justify-content: flex-end;
        margin: 10px 0;
      `;
   
      const productContent = `
        <div style="
            background: #6a1b9a;
            color: white;
            padding: 15px;
            border-radius: 20px;
            max-width: 80%;
            font-size: 14px;
        ">
            <div style="display: flex; gap: 15px;">
                <img 
                    src="${item.productDetails.image}" 
                    alt="${item.productDetails.description}"
                    style="width: 80px; height: 80px; object-fit: cover; border-radius: 10px;"
                />
                <div>
                    <div style="font-weight: bold;">ItemId: ${item.itemId}</div>
                    <div style="font-weight: bold;">${item.productDetails.brand}</div>
                    <div style="margin: 5px 0;">${item.productDetails.description}</div>
                    <div style="font-size: 12px;">
                        <span>Color: ${item.productDetails.color}</span>
                        <span style="margin-left: 10px;">Size: ${item.productDetails.size}</span>
                    </div>
                    <div style="font-weight: bold; margin-top: 5px;">₹${item.productDetails.price}</div>
                </div>
            </div>
        </div>
      `;
   
      messageDiv.innerHTML = productContent;
      messagesContainer.appendChild(messageDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
   
      // Store the concern in a global variable
      window.currentFeedbackConcern = concern || "Product Feedback";
      console.log("Set feedback type:", window.currentFeedbackConcern);
   
      // Store the concern in a data attribute on the item element for later access
      messageDiv.setAttribute(
        "data-feedback-type",
        window.currentFeedbackConcern
      );
   
      // Call showImageOptionBoxFeedback instead of showing the regular feedback form
      showImageOptionBoxFeedback(window.currentFeedbackConcern, "both");
    }
   
    function showImageOptionBoxFeedback(concern, type = "both", callback = null) {
      const messagesContainer = document.getElementById("chat-messages");
      if (!messagesContainer) return;
      const feedbackType = localStorage.getItem("currentFeedbackType") || concern;
      let selectedFile = null;
      const optionContainer = document.createElement("div");
      optionContainer.style.cssText = `
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 15px;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 15px;
      background-color: #f9f9f9;
      width: 100%;
    `;
      optionContainer.setAttribute("data-feedback-type", feedbackType);
      const questionText = document.createElement("p");
      questionText.textContent = `Do you want to send your ${feedbackType} with a picture or without a picture?`;
      questionText.style.cssText = `
      font-size: 16px;
      margin-bottom: 15px;
    `;
      optionContainer.appendChild(questionText);
      const withPictureContainer = document.createElement("div");
      withPictureContainer.style.cssText = `
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 15px;
    `;
   
      const withPictureRadio = document.createElement("input");
      withPictureRadio.type = "radio";
      withPictureRadio.id = "with-picture";
      withPictureRadio.name = "picture-option";
      withPictureRadio.value = "with";
      withPictureRadio.style.cssText = `
      width: 20px;
      height: 20px;
      accent-color: #E62A86;
    `;
   
      const withPictureLabel = document.createElement("label");
      withPictureLabel.htmlFor = "with-picture";
      withPictureLabel.textContent = "With Picture";
      withPictureLabel.style.cssText = `
      font-size: 16px;
    `;
   
      withPictureContainer.appendChild(withPictureRadio);
      withPictureContainer.appendChild(withPictureLabel);
      optionContainer.appendChild(withPictureContainer);
      const withoutPictureContainer = document.createElement("div");
      withoutPictureContainer.style.cssText = `
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 15px;
    `;
   
      const withoutPictureRadio = document.createElement("input");
      withoutPictureRadio.type = "radio";
      withoutPictureRadio.id = "without-picture";
      withoutPictureRadio.name = "picture-option";
      withoutPictureRadio.value = "without";
      withoutPictureRadio.style.cssText = `
      width: 20px;
      height: 20px;
      accent-color: #E62A86;
    `;
   
      const withoutPictureLabel = document.createElement("label");
      withoutPictureLabel.htmlFor = "without-picture";
      withoutPictureLabel.textContent = "Without Picture";
      withoutPictureLabel.style.cssText = `
      font-size: 16px;
    `;
   
      withoutPictureContainer.appendChild(withoutPictureRadio);
      withoutPictureContainer.appendChild(withoutPictureLabel);
      optionContainer.appendChild(withoutPictureContainer);
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.id = "image-upload";
      fileInput.accept = "image/*";
      fileInput.style.display = "none";
      optionContainer.appendChild(fileInput);
      const setupSendButton = createSetupSendButton(selectedFile, feedbackType);
      withPictureRadio.addEventListener("change", () => {
        if (withPictureRadio.checked) {
          addBotMessage(
            `Please upload the screenshot or images for your ${feedbackType}`
          );
          fileInput.click();
   
          fileInput.onchange = () => {
            if (fileInput.files.length > 0) {
              selectedFile = fileInput.files[0];
              console.log(
                `File selected for ${feedbackType}:`,
                selectedFile.name
              );
   
              addBotMessage(
                "Image selected. Now enter your concern in the text box.",
                "BOT"
              );
              const chatInput = document.getElementById("chat-input");
              if (chatInput) {
                chatInput.setAttribute("data-expecting", "options");
                chatInput.setAttribute("type", "text");
                chatInput.setAttribute("data-option-type", feedbackType);
                chatInput.setAttribute("data-has-file", "true");
                chatInput.setAttribute("data-file-name", fileInput.files[0].name);
              }
              const updatedSetupSendButton = createSetupSendButton(
                selectedFile,
                feedbackType
              );
              updatedSetupSendButton(true);
              if (optionContainer.parentNode === messagesContainer) {
                messagesContainer.removeChild(optionContainer);
              }
            }
          };
        }
      });
   
      withoutPictureRadio.addEventListener("change", () => {
        if (withoutPictureRadio.checked) {
          addBotMessage(`Please write your ${feedbackType} in text box`, "BOT");
   
          const chatInput = document.getElementById("chat-input");
          if (chatInput) {
            chatInput.setAttribute("data-expecting", "options");
            chatInput.setAttribute("type", "text");
            chatInput.setAttribute("data-option-type", feedbackType);
            chatInput.setAttribute("data-has-file", "false");
          }
          setupSendButton(false);
          if (optionContainer.parentNode === messagesContainer) {
            messagesContainer.removeChild(optionContainer);
          }
        }
      });
   
      messagesContainer.appendChild(optionContainer);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    async function submitProductFeedback(concern, message, file) {
      const feedbackType = localStorage.getItem("currentFeedbackType") || concern;
      if (!message) {
        addBotMessage("Please write your concern into input box ", "BOT");
        return;
      }
   
      try {
        const decodedToken = getDecodedToken();
        if (!decodedToken) {
          console.error("No decoded token available");
          addBotMessage(
            "Unable to get user information. Please try again later.",
            "BOT"
          );
          return;
        }
   
        // let phone = localStorage.getItem("userMobile");
        const formData = new FormData();
        formData.append("description", message);
        formData.append("title", feedbackType);
        if (file) {
          formData.append("attachment", file);
        }
        formData.append("customer_name", decodedToken.firstName || "");
        formData.append("phone", userMobile || "");
        formData.append("email_id", decodedToken.email_id || "");
        for (let pair of formData.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }
        const response = await fetch(
          "http://localhost:5050/apis/feedback/create",
          {
            method: "POST",
            body: formData,
          }
        );
   
        if (response.status === 200) {
          const data = await response.json();
          const chatInput = document.getElementById("chat-input");
          if (chatInput) chatInput.value = "";
   
          addBotMessage(
            "Thanks for sharing your feedback with us! We really appreciate it. 😊",
            "BOT"
          );
          if (
            typeof createStyledButtonContainer === "function" &&
            typeof appendButtonsToChat === "function" &&
            typeof buttonSets !== "undefined" &&
            buttonSets.queryOptions
          ) {
            const buttonContainer = createStyledButtonContainer(
              buttonSets.queryOptions
            );
            appendButtonsToChat(buttonContainer);
          }
        } else {
          console.error("Error response:", response.status);
          addBotMessage(
            "Sorry, there was an error submitting your feedback. Please try again.",
            "BOT"
          );
        }
      } catch (error) {
        console.error("Error submitting feedback:", error);
        addBotMessage(
          "Sorry, there was an error processing your request. Please try again.",
          "BOT"
        );
      }
    }
    function createSetupSendButton(selectedFile, concern) {
      return (hasFile) => {
        const chatInput = document.getElementById("chat-input");
        const sendBtn = document.getElementById("send-btn");
   
        if (sendBtn) {
          const originalOnClick = sendBtn.onclick;
          sendBtn.onclick = function (event) {
            event.preventDefault();
            const feedbackType =
              localStorage.getItem("currentFeedbackType") || concern;
            const message = chatInput ? chatInput.value : "";
   
            if (!message) {
              addBotMessage("Please write your concern into input box ", "BOT");
              return;
            }
   
            try {
              // Call submitProductFeedback with the file if needed
              if (hasFile && selectedFile) {
                submitProductFeedback(feedbackType, message, selectedFile);
              } else {
                submitProductFeedback(feedbackType, message, null);
              }
            } catch (error) {
              console.error("Error in submit handler:", error);
              addBotMessage("An error occurred. Please try again.", "BOT");
            }
   
            // Reset the send button to its original behavior
            if (typeof originalOnClick === "function") {
              sendBtn.onclick = originalOnClick;
            }
          };
        } else {
          console.warn("Send button not found");
        }
      };
    }
   
    function handleBackToMainMenu() {
      console.log("Back to Main Menu clicked");
   
      // Only reset active screens, not the entire chat history
      const ticketForm = document.getElementById("ticket-form");
      if (ticketForm) {
        ticketForm.style.display = "none";
      }
   
      // Hide any specific screens that might be active
      const activeScreens = document.querySelectorAll(".active-screen");
      activeScreens.forEach((screen) => {
        screen.style.display = "none";
        screen.classList.remove("active-screen");
      });
   
      // Reset only the order display, not the entire chat
      resetOrderDisplay();
   
      // Call the post-login flow
      handlePostLoginFlow(accessToken);
    }
    const buttonSets = {
      queryOptions: [
        {
          text: "Back to Main Menu",
          handler: handleBackToMainMenu,
        },
        {
          text: "End Chat",
          handler: function () {
            // Get the chat container
            const chatContainer = document.getElementById("chat-container");
   
            if (!chatContainer) {
              console.error("Chat container not found");
              return;
            }
   
            // Add bot's final message if needed
            addBotMessage("Thank you for getting in touch with us and we genuinely hope your experience with our service has been a positive one! 👍 Great! | 👎 Needs improvement "); 
   
            // Add timestamp below the bot message
            const timestamp = document.createElement("div");
            const now = new Date();
            timestamp.textContent = `${String(now.getHours()).padStart(
              2,
              "0"
            )}:${String(now.getMinutes()).padStart(2, "0")}`;
            timestamp.style.cssText =
              "color: #777; font-size: 14px; text-align: center; margin: 5px 0 20px 0;";
   
            // Find or create messages container
            let messagesContainer = document.getElementById("chat-messages");
            if (!messagesContainer) {
              messagesContainer = chatContainer;
            }
   
            // Find the last bot message and append timestamp after it
            const botMessages =
              messagesContainer.querySelectorAll(".bot-message");
            if (botMessages.length > 0) {
              const lastBotMessage = botMessages[botMessages.length - 1];
              lastBotMessage.parentNode.insertBefore(
                timestamp,
                lastBotMessage.nextSibling
              );
            }
   
            // Create feedback buttons container
            const feedbackContainer = document.createElement("div");
            feedbackContainer.id = "feedback-buttons-container";
            feedbackContainer.style.cssText =
              "display: flex; justify-content: center; gap: 40px; margin: 10px 0 30px 0;";
   
            // Create thumbs up button (inside circle)
            const thumbsUpButtonContainer = document.createElement("div");
            thumbsUpButtonContainer.style.cssText =
              "width: 70px; height: 70px; border-radius: 50%; border: 2px solid #E8ABC8; background-color: white; display: flex; justify-content: center; align-items: center; cursor: pointer;";
   
            // Create thumbs up icon (SVG)
            const thumbsUpIcon = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "svg"
            );
            thumbsUpIcon.setAttribute("width", "35");
            thumbsUpIcon.setAttribute("height", "35");
            thumbsUpIcon.setAttribute("viewBox", "0 0 24 24");
            thumbsUpIcon.setAttribute("fill", "none");
   
            const thumbsUpPath = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "path"
            );
            thumbsUpPath.setAttribute(
              "d",
              "M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"
            );
            thumbsUpPath.setAttribute("fill", "#762F88");
   
            thumbsUpIcon.appendChild(thumbsUpPath);
            thumbsUpButtonContainer.appendChild(thumbsUpIcon);
   
            // Create thumbs down button (inside circle)
            const thumbsDownButtonContainer = document.createElement("div");
            thumbsDownButtonContainer.style.cssText =
              "width: 70px; height: 70px; border-radius: 50%; border: 2px solid #E8ABC8; background-color: white; display: flex; justify-content: center; align-items: center; cursor: pointer;";
   
            // Create thumbs down icon (SVG)
            const thumbsDownIcon = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "svg"
            );
            thumbsDownIcon.setAttribute("width", "35");
            thumbsDownIcon.setAttribute("height", "35");
            thumbsDownIcon.setAttribute("viewBox", "0 0 24 24");
            thumbsDownIcon.setAttribute("fill", "none");
   
            const thumbsDownPath = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "path"
            );
            thumbsDownPath.setAttribute(
              "d",
              "M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"
            );
            thumbsDownPath.setAttribute("fill", "#762F88");
   
            thumbsDownIcon.appendChild(thumbsDownPath);
            thumbsDownButtonContainer.appendChild(thumbsDownIcon);
   
            // Add buttons to container
            feedbackContainer.appendChild(thumbsUpButtonContainer);
            feedbackContainer.appendChild(thumbsDownButtonContainer);
   
            // Append feedback buttons directly to the messages container
            messagesContainer.appendChild(feedbackContainer);
   
            // Flag to track if feedback has been submitted
            let feedbackSubmitted = false;
   
            // Hide query options if they exist
            const queryOptionsContainer = document.getElementById(
              "query-options-container"
            );
            if (queryOptionsContainer) {
              queryOptionsContainer.style.display = "none";
            }
   
            // Hide input field if exists
            const inputContainer = document.querySelector(
              ".message-input-container"
            );
            if (inputContainer) {
              inputContainer.style.display = "none";
            }
   
            // Scroll to bottom
            if (messagesContainer.scrollHeight > messagesContainer.clientHeight) {
              messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
   
            // Function to handle feedback submission (ensures it only happens once)
            function handleFeedbackSubmission(isThumbsUp) {
              // Check if feedback was already submitted
              if (feedbackSubmitted) {
                return; // Do nothing if feedback was already submitted
              }
   
              // Mark feedback as submitted
              feedbackSubmitted = true;
   
              // Update UI
              if (isThumbsUp) {
                thumbsUpButtonContainer.style.backgroundColor = "#f2e1e8";
                thumbsDownButtonContainer.style.backgroundColor = "white";
                sendFeedbackToAPI("yes", "no");
              } else {
                thumbsDownButtonContainer.style.backgroundColor = "#f2e1e8";
                thumbsUpButtonContainer.style.backgroundColor = "white";
                sendFeedbackToAPI("no", "yes");
              }
   
              // Add thank you message
              addThankYouMessage(messagesContainer);
   
              // Remove click event listeners to prevent multiple submissions
              thumbsUpButtonContainer.style.cursor = "default";
              thumbsDownButtonContainer.style.cursor = "default";
   
              // Make a copy of the button containers to remove event listeners
              const thumbsUpClone = thumbsUpButtonContainer.cloneNode(true);
              const thumbsDownClone = thumbsDownButtonContainer.cloneNode(true);
   
              thumbsUpButtonContainer.parentNode.replaceChild(
                thumbsUpClone,
                thumbsUpButtonContainer
              );
              thumbsDownButtonContainer.parentNode.replaceChild(
                thumbsDownClone,
                thumbsDownButtonContainer
              );
            }
   
            // Add event listeners for feedback buttons
            thumbsUpButtonContainer.addEventListener("click", function () {
              handleFeedbackSubmission(true);
            });
   
            thumbsDownButtonContainer.addEventListener("click", function () {
              handleFeedbackSubmission(false);
            });
          },
        },
      ],
    };
   
    // Function to send feedback to the API
    async function sendFeedbackToAPI(handsup, handsdown) {
      try {
        // Get user data from localStorage or other sources
        const decodedToken = getDecodedToken();
        if (!decodedToken) return;
        // let phone = localStorage.getItem("userMobile");
        const title = "Chat Feedback";
   
        // Create the request body
        const requestBody = {
          phone: userMobile,
          title,
          customer_name: decodedToken.customer_name,
          email_id: decodedToken.email_id,
          handsup, // Should be 'yes' or 'no'
          handsdown, // Should be 'yes' or 'no'
        };
   
        console.log("Sending feedback to API:", requestBody);
   
        // Send the POST request to your API endpoint
        const response = await fetch(
          "http://localhost:5050/apis/feedback/endChat",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );
   
        // Handle the response
        if (response.ok) {
          const responseData = await response.json();
          console.log("Feedback API response:", responseData);
        } else {
          console.error(
            "Failed to send feedback:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error sending feedback to API:", error);
      }
    }
   
    // Helper function to add a thank you message
    function addThankYouMessage(container) {
      const thankYouDiv = document.createElement("div");
      thankYouDiv.style.cssText = "width: 100%; margin: 0 auto; padding: 10px 0;";
   
      const messageBubble = document.createElement("div");
      messageBubble.textContent =
        "Thanks for sharing your feedback with us! We really appreciate it. 😊";
      messageBubble.style.cssText =
        "background-color: #f2f2f2; border-radius: 30px; padding: 15px 20px; font-size: 16px; text-align: center; width: 100%; display: inline-block;";
   
      const timestamp = document.createElement("div");
      const now = new Date();
      timestamp.textContent = `${String(now.getHours()).padStart(
        2,
        "0"
      )}:${String(now.getMinutes()).padStart(2, "0")}`;
      timestamp.style.cssText =
        "color: #777; font-size: 14px; text-align: center; margin-top: 5px;";
   
      thankYouDiv.appendChild(messageBubble);
      thankYouDiv.appendChild(timestamp);
      container.appendChild(thankYouDiv);
   
      // Scroll to the bottom if there's scrolling
      if (container.scrollHeight > container.clientHeight) {
        container.scrollTop = container.scrollHeight;
      }
    }
   
   
    function createStyledButtonContainer(buttons) {
      // Create a container for buttons
      const buttonContainer = document.createElement("div");
      buttonContainer.style.cssText = `
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 15px;
    `;
   
      // Function to create a single styled button
      function createStyledButton({ text, handler, customStyles = {} }) {
        const button = document.createElement("button");
   
        // Default button styles
        button.style.cssText = `
        background: none;
        border: 2px solid #E62A86;
        color: #762F88;
        padding: 12px 25px;
        border-radius: 50px;
        cursor: pointer;
        font-size: 14px;
        text-align: center;
        transition: all 0.3s;
        min-width: 250px;
      `;
   
        // Apply any custom styles passed
        Object.assign(button.style, customStyles);
   
        button.textContent = text;
   
        // Hover effects
        button.onmouseover = () => {
          button.style.background = "#E8ABC8";
          button.style.color = "#762F88";
          // button.style.border = "none";
          // button.style.padding = "14px 27px";
        };
   
        button.onmouseout = () => {
          button.style.background = "none";
          button.style.color = "#762F88";
          button.style.border = "2px solid #E62A86";
          button.style.padding = "12px 25px";
        };
   
        // Attach handler
        button.onclick = handler;
   
        return button;
      }
   
      // Create and append buttons
      buttons.forEach((buttonConfig) => {
        const button = createStyledButton(buttonConfig);
        buttonContainer.appendChild(button);
      });
   
      return buttonContainer;
    }
   
    // Helper function to append buttons to messages container
    function appendButtonsToChat(buttonContainer) {
      const messagesContainer = document.getElementById("chat-messages");
      if (messagesContainer) {
        messagesContainer.appendChild(buttonContainer);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }
 
    function BotContainer(targetId) {
      console.log("Initializing BotContainer for target ID:", targetId);
   
      // Create the chat button
      const botContainerButton = document.createElement("div");
      botContainerButton.id = "botContainerButton";
      botContainerButton.style.position = "fixed";
      botContainerButton.style.bottom = "20px";
      botContainerButton.style.right = "20px";
      botContainerButton.style.backgroundColor = "#4CAF50";
      botContainerButton.style.color = "white";
      botContainerButton.style.padding = "15px";
      botContainerButton.style.borderRadius = "50%";
      botContainerButton.style.cursor = "pointer";
      botContainerButton.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
      botContainerButton.style.fontSize = "20px";
      botContainerButton.innerHTML = "💬";
   
      document.body.appendChild(botContainerButton);
      botContainerButton.onclick = toggleChat;
   
      // Create the main container for the chatbot (initially hidden)
      const container = document.createElement("div");
      container.id = "chat-container";
      container.style.width = "100%";
      container.style.maxWidth = "28%";
      container.style.minHeight = "500px";
      container.style.borderRadius = "10px";
      container.style.overflow = "hidden";
      container.style.backgroundColor = "#f8f8f8";
      container.style.fontFamily = "Arial, sans-serif";
      container.style.position = "absolute";
      container.style.bottom = "80px"; // Adjust to place above the button
      container.style.right = "20px";
      container.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
      container.style.display = "none"; // Hidden by default
      container.style.flexDirection = "column";
      container.style.padding = "20px";
      container.style.transition = "all 0.3s ease";
   
      // Inner content for the welcome message and menu options
      const innerContent = `
      <div style="text-align: center; padding: 10px; background-color: #4CAF50; color: white; font-size: 20px; font-weight: bold; border-radius: 5px;">
        Welcome Back, Shubha! How may we help you? We are here to assist you.
      </div>
      
      <!-- Close Button in the Top Left -->
      <button onclick="closeChat()" style="position: absolute; top: 10px; right: 10px; background-color: #FF5733; color: white; border: none; border-radius: 5px; padding: 5px;">X</button>
    
      <!-- Main Menu -->
      <div id="main-menu" style="display: flex; flex-direction: column; align-items: center; margin-top: 20px;">
        <button onclick="showSubMenu('order')" style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; margin-bottom: 10px;">Order Related</button>
        <button onclick="showSubMenu('payment')" style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; margin-bottom: 10px;">Payment Related</button>
        <button onclick="showSubMenu('politics')" style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; margin-bottom: 10px;">Politics & Conditions</button>
        <button onclick="showSubMenu('feedback')" style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; margin-bottom: 10px;">Customer Feedback</button>
      </div>
      
      <!-- Submenus for Order, Payment, Politics, and Feedback (hidden by default) -->
      <div id="order-menu" style="display: none; flex-direction: column; align-items: center;">
        <button onclick="apiCall('order-status')" style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; margin-bottom: 10px;">Track Order</button>
        <button onclick="apiCall('order-cancel')" style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; margin-bottom: 10px;">Cancel Order</button>
      </div>
      
      <div id="payment-menu" style="display: none; flex-direction: column; align-items: center;">
        <button onclick="apiCall('payment-status')" style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; margin-bottom: 10px;">Check Payment Status</button>
        <button onclick="apiCall('refund-request')" style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; margin-bottom: 10px;">Request Refund</button>
      </div>
      
      <div id="politics-menu" style="display: none; flex-direction: column; align-items: center;">
        <button onclick="apiCall('terms')" style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; margin-bottom: 10px;">Terms & Conditions</button>
        <button onclick="apiCall('privacy-policy')" style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; margin-bottom: 10px;">Privacy Policy</button>
      </div>
      
      <div id="feedback-menu" style="display: none; flex-direction: column; align-items: center;">
        <button onclick="apiCall('customer-feedback')" style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; margin-bottom: 10px;">Provide Feedback</button>
      </div>
   `;
   
      container.innerHTML = innerContent;
   
      // Append container to the target element
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.appendChild(container);
        console.log("BotContainer successfully appended to the target element.");
      } else {
        console.error(`Element with ID ${targetId} not found.`);
      }
   
      // Function to toggle between main menu and submenus
      function showSubMenu(menuType) {
        // Hide all menus
        document
          .querySelectorAll('[id$="-menu"]')
          .forEach((menu) => (menu.style.display = "none"));
   
        // Show the selected menu
        const selectedMenu = document.getElementById(`${menuType}-menu`);
        if (selectedMenu) {
          selectedMenu.style.display = "flex";
        }
      }
   
      // Function to simulate an API call for each option
      function apiCall(action) {
        console.log(`API called for ${action}`);
        // You can implement real API calls here using fetch or axios
      }
    }
   
    function showSignup() {
      alert("Redirect to signup form!");
      // You can implement the signup functionality here
    }
   
    function toggleChat() {
      const chatContainer = document.getElementById("chat-container");
      chatContainer.style.display =
        chatContainer.style.display === "none" ? "flex" : "none";
    }
   
    function closeChat() {
      const chatContainer = document.getElementById("chat-container");
      chatContainer.style.display = "none";
    }
   
    function sendOTP(type) {
      const phoneInput = document.getElementById(`${type}-phone`);
      const otpInput = document.getElementById(`${type}-otp`);
      const submitButton = document.getElementById(`${type}-submit`);
   
      if (phoneInput && phoneInput.value) {
        alert("OTP sent! Enter it below.");
        otpInput.style.display = "block";
        submitButton.style.display = "block";
      } else {
        alert("Please enter your phone number first.");
      }
    }
 
   
    const logout = () => {
      // Remove all saved data
      // localStorage.removeItem("accessToken");
      document.cookie = "accessToken=; path=/; max-age=0";
      document.cookie = "refreshToken=; path=/; max-age=0"
      // localStorage.removeItem("refreshToken");
      localStorage.removeItem("userDetails");
   
      console.log("Logout successful: User data removed.");
    };
   
    function verifyOTP(type) {
      const otpInput = document.getElementById(`${type}-otp`);
      if (otpInput && otpInput.value) {
        alert("OTP verified. Welcome!");
        document.getElementById("login-card").style.display = "none";
        document.getElementById("signup-msg").style.display = "none";
        document.getElementById("chat-section").style.display = "flex";
      } else {
        alert("Please enter the OTP.");
      }
    }
   
   
    function sendMessage(message) {
      if (!message) return; // Don't send empty messages
   
      addUserMessage(message);
   
      // Call the old sendMessage function directly
      const messageInput = document.getElementById("chat-input");
      const chatMessages = document.getElementById("chat-messages");
   
      if (messageInput && messageInput.value) {
        const newMessage = document.createElement("div");
        newMessage.textContent = messageInput.value;
        chatMessages.appendChild(newMessage);
        messageInput.value = "";
      }
    }
    function showTab(tabId) {
      document.getElementById("otp-login").style.display =
        tabId === "otp-login" ? "block" : "none";
      document.getElementById("password-login").style.display =
        tabId === "password-login" ? "block" : "none";
    }
   
    // Close chat function (OK button)
   
    // Manage active tabs for Login/Signup
    function showLogin() {
      document.getElementById("login-card").style.display = "flex";
      document.getElementById("signup-card").style.display = "none";
      document.getElementById("loginTab").style.backgroundColor = "#4CAF50";
      document.getElementById("signupTab").style.backgroundColor = "#ddd";
    }
   
    // Validate phone number
    function validatePhone(phone) {
      return /^\d{10}$/.test(phone);
    }
   
    Object.assign(window, {
      BotContainer,
      showSignup,
      toggleChat,
      showLogin,
      sendOTP,
      // loginWithPassword,
      showTab,
      verifyOTP,
      logout,
      closeChat,
      InitChatbot,
      handlePasswordLogin,
      setupChatInputListener,
      handleMobileInput,
      handlePasswordInput,
      handleOtpInput,
      handleOtpPasswordLogin,
      resetLoginFlow,
      handleLoginResponse,
      checkLoginState,
      handlePostLoginFlow,
      handleOrderDisplay,
      displayOrders,
      displayOrderError,
      fetchOrders,
      handleOrderClick,
      handleStatusClick,
      ticketDetails,
      handleOrderIssue,
      handlePaymentQueries,
      fetchOrderDetails,
      getProductDetailsByItemId,
      createProductDisplay,
      handlePolicies,
      returnPolicy,
      refundPolicy,
      // returnInitiate,
      handleReturnSubOption,
      handleReturnReason,
      raiseATicket,
      // createTicketForm,
    //   handleFormSubmit,
      getDecodedToken,
      issueNotListed,
      customerfeedback,
      submitProductFeedback,
      handleFeedbackOrderClick,
      showFeedbackForm,
      submitProductFeedback,
      // handleItemFeedback
      showImageOptionBox,
      deliveryComplain,
      ticketStatus,
      orderDelayed,
      optionDropDown,
      cancelOrder,
      partialorder,
      cancelOrderwithoutconsent,
      toggleOrdersDisplay,
      changeMobileNumber,
      changeDeliveryAddress,
      invoiceOfDelivery,
      createStyledButtonContainer,
      appendButtonsToChat,
      handleBackToMainMenu,
      resetOrderDisplay,
      handleMobileNumberSubmit,
      showChangeMobileNumberOptions,
      handleDeliveryAddressSubmit,
      showChangeAddressOptions,
      checkOrderStatus,
      showImageOptionBoxFeedback,
    });
  });
   

   
  // function addBotMessage(message, sender = "BOT") {
  //   const messagesContainer = document.getElementById("chat-messages");
  //   if (!messagesContainer) return;
   
  //   const messageWrapper = document.createElement("div");
  //   messageWrapper.style.cssText = `
  //   display: flex;
  //   flex-direction: column;
  //   gap: 5px;
  // `;
   
  //   // Add sender name
  //   const senderDiv = document.createElement("div");
  //   senderDiv.style.cssText = `
  //   color: #6a1b9a;
  //   font-size: 14px;
  //   margin-left: 40px;
  // `;
  //   senderDiv.textContent = sender;
  //   messageWrapper.appendChild(senderDiv);
   
  //   // Add message with bot icon
  //   const messageDiv = document.createElement("div");
  //   messageDiv.style.cssText = `
  //   display: flex;
  //   align-items: flex-start;
  //   gap: 10px;
  // `;
  //   messageDiv.innerHTML = `
  //   <img src="http://localhost:5050/finalbot-06.jpg" alt="Bot" style="width: 30px; height: 30px; border-radius: 50%;">
  //   <div style="
  //     background: #f5f5f5;
  //     padding: 15px;
  //     border-radius: 20px;
  //     max-width: 80%;
  //     font-size: 14px;
  //   ">${message}</div>
  // `;
  //   messageWrapper.appendChild(messageDiv);
  //   messagesContainer.appendChild(messageWrapper);
  //   messagesContainer.scrollTop = messagesContainer.scrollHeight;
  // }
   
  // function addUserMessage(message) {
  //   const messagesContainer = document.getElementById("chat-messages");
  //   if (!messagesContainer) return;
   
  //   const messageDiv = document.createElement("div");
  //   messageDiv.style.cssText = `
  //   display: flex;
  //   justify-content: flex-end;
  //   margin: 10px 0;
  // `;
  //   messageDiv.innerHTML = `
  //   <div style="
  //     background: #6a1b9a;
  //     color: white;
  //     padding: 15px;
  //     border-radius: 20px;
  //     max-width: 80%;
  //     font-size: 14px;
  //   ">${message}</div>
  // `;
  //   messagesContainer.appendChild(messageDiv);
  //   messagesContainer.scrollTop = messagesContainer.scrollHeight;
  // }
   
  // function handleMobileInput(mobile, socket) {
  //   if (!/^\d{10}$/.test(mobile)) {
  //     addBotMessage("Please enter a valid 10-digit mobile number.", "BOT");
  //     return;
  //   }
   
  //   loginDetails.username = mobile;
  //   addUserMessage(mobile);
   
  //   socket.send(
  //     JSON.stringify({
  //       type: "MOBILE_NUMBER",
  //       data: mobile,
  //     })
  //   );
   
  //   const chatInput = document.getElementById("chat-input");
  //   chatInput.setAttribute("data-expecting", "password");
  //   chatInput.setAttribute("type", "password");
  // }
   
  // function handlePasswordInput(password, socket) {
  //   if (!password || password.length < 6) {
  //     addBotMessage("Password must be at least 6 characters long.", "BOT");
  //     return;
  //   }
   
  //   addUserMessage("********");
  //   loginDetails.password = password;
   
  //   socket.send(
  //     JSON.stringify({
  //       type: "PASSWORD",
  //       username: loginDetails.username,
  //       password: password,
  //     })
  //   );
   
  //   const chatInput = document.getElementById("chat-input");
  //   chatInput.setAttribute("type", "text");
  //   chatInput.removeAttribute("data-expecting");
  // }
   
  //
  // chat-messages
   
  // async function fetchOrders() {
  //   try {
  //     const response = await window.fetch(
  //       "https://api-preprod.ailiens.com/d/mobapi/orderDetails/v3",
  //       {
  //         method: "GET",
  //         headers: {
  //           accept: "application/json",
  //           "content-Type": "application/json",
  //           "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
  //           bbversion: "v2",
  //           clientsessionid: "1742983379818",
  //           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //           correlationid: "2a336d49-4e2b-4a04-aaf7-b66063f19259",
  //           "if-none-match": ' W/"152-8UyXsIzXQkcUBNh8ObRhw8DIQMY"',
  //           module: "odin",
  //           origin: "https://www.nnnow.com",
  //           priority: "u=1, i",
  //           referer: "https://www.nnnow.com/",
  //         },
  //       }
  //     );
   
  //     const result = await response.json();
   
  //     if (result.status && result.data && result.data.ordersList) {
  //       const orders = result.data.ordersList.slice(0, 5);
  //       displayOrders(orders);
  //       addBotMessage(
  //         "Here are your recent orders. Please let me know if you need help with any specific order."
  //       );
  //     } else {
  //       console.error("No orders found or API error");
  //       displayOrderError("No orders found");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching orders:", error);
  //     displayOrderError("Error fetching orders");
  //   }
  // }
   
  // function displayOrders(orders) {
  //   const orderList = document.querySelector("#orderWrapper .order-list");
  //   if (!orderList) return;
   
  //   // Add styles for consistent hover effect
  //   const styles = document.createElement("style");
  //   styles.textContent = `
  //     .order-item {
  //       background: white;
  //       border-radius: 20px;
  //       margin: 15px 0;
  //       padding: 15px;
  //       cursor: pointer;
  //       border: 2px solid #E8ABC8;
  //       transition: all 0.3s ease;
  //     }
   
  //     .order-item:hover {
  //       transform: translateY(-2px);
  //       box-shadow: 0 4px 12px rgba(233, 30, 99, 0.15);
  //       border-color: #6a1b9a;
  //     }
  //   `;
  //   document.head.appendChild(styles);
   
  //   const orderListHtml = orders
  //     .map(
  //       (order) => `
  //       <div class="order-item" onclick="handleOrderClick('${order.orderId}')">
  //         <div style="display: flex; gap: 20px; align-items: center;">
  //           <img
  //             src="${order.imagesList[0] || "default-image-url"}"
  //             alt="Order Image"
  //             style="width: 150px; height: 150px; object-fit: cover; border-radius: 10px;"
  //           />
  //           <div style="flex: 1;">
  //             <div style="font-size: 18px; color: #6a1b9a; margin-bottom: 6px;">
  //               Order ID: ${order.orderId || "N/A"}
  //             </div>
  //             <div style="font-size: 16px; margin-bottom: 6px;">
  //               Date: ${
  //                 order.orderDate
  //                   ? new Date(order.orderDate).toLocaleString()
  //                   : "N/A"
  //               }
  //             </div>
  //             <div style="font-size: 18px; margin-bottom: 6px;">
  //               Status: ${order.orderStatus || "N/A"}
  //             </div>
  //             <div style="font-size: 20px; color: #6a1b9a; font-weight: bold;">
  //               Total: ₹${order.totalAmount || "N/A"}
  //             </div>
  //             <div style="font-size: 16px; color: #762F88; margin-top: 8px;">
  //               Your Order Status is ${order.orderStatus || "N/A"}
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     `
  //     )
  //     .join("");
   
  //   orderList.innerHTML = `
  //     <div style="text-align: center; margin-bottom: 20px;">
  //       <h3 style="
  //         color: #762F88;
  //         font-size: 24px;
  //         font-weight: bold;
  //         margin: 0;
  //         padding: 15px;
  //         border-radius: 10px;
  //       ">Recent Orders</h3>
  //     </div>
  //     ${orderListHtml}
  //   `;
  // }
  //comment on working till 25 feb
  // async function fetchOrders() {
  //   try {
  //     const response = await window.fetch(
  //       "https://api-preprod.ailiens.com/d/mobapi/orderDetails/v3",
  //       {
  //         method: "GET",
  //         headers: {
  //           accept: "application/json",
  //           "content-Type": "application/json",
  //           "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
  //           bbversion: "v2",
  //           clientsessionid: "1742983379818",
  //           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //           correlationid: "2a336d49-4e2b-4a04-aaf7-b66063f19259",
  //           "if-none-match": ' W/"152-8UyXsIzXQkcUBNh8ObRhw8DIQMY"',
  //           module: "odin",
  //           origin: "https://www.nnnow.com",
  //           priority: "u=1, i",
  //           referer: "https://www.nnnow.com/",
  //         },
  //       }
  //     );
   
  //     const result = await response.json();
   
  //     if (result.status && result.data && result.data.ordersList) {
  //       // Store all orders but initially display only 2
  //       window.allOrders = result.data.ordersList;
  //       displayOrders(window.allOrders.slice(0, 2), true);
  //       addBotMessage(
  //         "Here are your recent orders. Please let me know if you need help with any specific order."
  //       );
  //     } else {
  //       console.error("No orders found or API error");
  //       displayOrderError("No orders found");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching orders:", error);
  //     displayOrderError("Error fetching orders");
  //   }
  // }
   
  /////
   
  // function displayOrders(orders, showToggleButton = false) {
  //   const orderList = document.querySelector("#orderWrapper .order-list");
  //   if (!orderList) return;
   
  //   // Add styles for consistent hover effect and toggle button
  //   const styles = document.createElement("style");
  //   styles.textContent = `
  //     .order-item {
  //       background: white;
  //       border-radius: 20px;
  //       margin: 15px 0;
  //       padding: 15px;
  //       cursor: pointer;
  //       border: 2px solid #E8ABC8;
  //       transition: all 0.3s ease;
  //     }
   
  //     .order-item:hover {
  //       transform: translateY(-2px);
  //       box-shadow: 0 4px 12px rgba(233, 30, 99, 0.15);
  //       border-color: #6a1b9a;
  //     }
   
  //     .toggle-button {
  //       background-color: #762F88;
  //       color: white;
  //       border: none;
  //       border-radius: 25px;
  //       padding: 10px 20px;
  //       font-size: 16px;
  //       cursor: pointer;
  //       transition: all 0.3s ease;
  //       margin-top: 15px;
  //       outline: none;
  //     }
   
  //     .toggle-button:hover {
  //       background-color: #6a1b9a;
  //       transform: translateY(-2px);
  //       box-shadow: 0 4px 12px rgba(233, 30, 99, 0.15);
  //     }
  //   `;
  //   document.head.appendChild(styles);
   
  //   const orderListHtml = orders
  //   .map(
  //     (order) => {
  //       // Extract estimated delivery date - adjust these paths based on your actual order structure
  //       let estimatedDelivery = "N/A";
   
  //       // Try different possible paths where delivery date might be stored
  //       if (order.estimatedDeliveryDate) {
  //         estimatedDelivery = order.estimatedDeliveryDate;
  //       } else if (order.consignments && order.consignments.length > 0) {
  //         // Try to get from consignments
  //         estimatedDelivery = order.consignments[0].expectedDeliveryDate || "N/A";
  //       } else if (order.deliveryInfo && order.deliveryInfo.expectedDate) {
  //         // Alternative path
  //         estimatedDelivery = order.deliveryInfo.expectedDate;
  //       }
   
  //       return `
  //       <div class="order-item" onclick="handleOrderClick('${order.orderId}')">
  //         <div style="display: flex; gap: 20px; align-items: center;">
  //           <img
  //             src="${order.imagesList?.[0] || "default-image-url"}"
  //             alt="Order Image"
  //             style="width: 150px; height: 150px; object-fit: cover; border-radius: 10px;"
  //           />
  //           <div style="flex: 1;">
  //             <div style="font-size: 18px; color: #6a1b9a; margin-bottom: 6px;">
  //               Order ID: ${order.orderId || "N/A"}
  //             </div>
  //             <div style="font-size: 16px; margin-bottom: 6px;">
  //               Date: ${
  //                 order.orderDate
  //                   ? new Date(order.orderDate).toLocaleString()
  //                   : "N/A"
  //               }
  //             </div>
  //             <div style="font-size: 18px; margin-bottom: 6px;">
  //               Status: ${order.orderStatus || "N/A"}
  //             </div>
  //             <div style="font-size: 20px; color: #6a1b9a; font-weight: bold;">
  //               Total: ₹${order.totalAmount || "N/A"}
  //             </div>
  //             <div style="font-size: 16px; color: #762F88; margin-top: 8px;">
  //               Your Order Status is ${order.orderStatus || "N/A"}
  //             </div>
  //             <div style="font-size: 16px; color: #762F88; margin-top: 8px;">
  //               Estimated Delivery: ${estimatedDelivery}
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     `;
  //     }
  //   )
  //   .join("");
   
  //   // Toggle button HTML
  //   const toggleButtonHtml = showToggleButton
  //     ? `
  //     <div style="text-align: center;">
  //       <button id="toggleOrdersButton" class="toggle-button" onclick="toggleOrdersDisplay()">
  //         ${orders.length <= 2 ? 'Show More' : 'Show Less'}
  //       </button>
  //     </div>
  //   `
  //     : '';
   
  //   orderList.innerHTML = `
  //     <div style="text-align: center; margin-bottom: 20px;">
  //       <h3 style="
  //         color: #762F88;
  //         font-size: 24px;
  //         font-weight: bold;
  //         margin: 0;
  //         padding: 15px;
  //         border-radius: 10px;
  //       ">Recent Orders</h3>
  //     </div>
  //     ${orderListHtml}
  //     ${toggleButtonHtml}
  //   `;
  // }
   
  // function toggleOrdersDisplay() {
  //   if (!window.allOrders) return;
   
  //   const toggleButton = document.getElementById('toggleOrdersButton');
  //   if (!toggleButton) return;
   
  //   const isShowingAll = toggleButton.textContent.trim() === 'Show Less';
   
  //   if (isShowingAll) {
  //     // Show only 2 orders
  //     displayOrders(window.allOrders.slice(0, 2), true);
  //   } else {
  //     // Show all orders
  //     displayOrders(window.allOrders, true);
  //   }
  // }
  //
   
  // Create Product Display working till 24 feb
  // function createProductDisplay(
  //   itemId,
  //   productDetails,
  //   itemStatus,
  //   itemDeliveryDateInfo
  // ) {
  //   const productContainer = document.createElement("div");
  //   productContainer.className = "product-display";
  //   const itemData = {
  //     itemId,
  //     itemStatus,
  //     itemDeliveryDateInfo,
  //   };
  //   productContainer.setAttribute("data-item", JSON.stringify(itemData));
   
  //   productContainer.style.cssText = `
  //     background: white;
  //     border-radius: 20px;
  //     margin: 10px 0;
  //     padding: 20px;
  //     cursor: pointer;
  //     border: 2px solid #E8ABC8;
  //     transition: all 0.3s ease;
  //     position: relative;
  //   `;
   
  //   // Create radio button
  //   const radio = document.createElement("input");
  //   radio.type = "radio";
  //   radio.name = "product-selection";
  //   radio.value = itemId;
  //   radio.style.cssText = `
  //     position: absolute;
  //     top: 20px;
  //     left: 20px;
  //     width: 20px;
  //     height: 20px;
  //     accent-color: #6a1b9a;
  //     cursor: pointer;
  //   `;
   
  //   const content = document.createElement("div");
  //   content.style.cssText = `
  //     display: flex;
  //     gap: 20px;
  //     padding-left: 40px;
  //   `;
   
  //   content.innerHTML = `
  //     <img
  //       src="${productDetails.image}"
  //       alt="${productDetails.description}"
  //       style="
  //         width: 150px;
  //         height: 150px;
  //         object-fit: cover;
  //         border-radius: 8px;
  //         background: #f5f5f5;
  //       "
  //     />
  //     <div style="flex: 1;">
  //       <div style="font-size: 18px; color: #6a1b9a; margin-bottom: 6px;">
  //         ItemId: ${itemId}
  //       </div>
  //       <div style="font-size: 24px; font-weight: bold; margin-bottom: 6px; color: #6a1b9a;">
  //         ${productDetails.brand}
  //       </div>
  //       <div style="font-size: 18px; margin-bottom: 6px;">
  //         ${productDetails.description}
  //       </div>
  //       <div style="display: flex; gap: 10px; margin-bottom: 6px; color: #666;">
  //         Color: ${productDetails.color} &nbsp;&nbsp; Size: ${productDetails.size}
  //       </div>
  //       <div style="font-size: 20px; color: #6a1b9a; font-weight: bold;">
  //         ₹${productDetails.price}
  //       </div>
  //     </div>
  //   `;
   
  //   productContainer.appendChild(radio);
  //   productContainer.appendChild(content);
   
  //   // Add selection handling
  //   productContainer.onclick = (e) => {
  //     // If clicking the radio button, don't trigger twice
  //     if (e.target !== radio) {
  //       radio.checked = !radio.checked;
  //     }
  //     if (radio.checked) {
  //       // Add selected styles
  //       productContainer.style.borderColor = "#6a1b9a";
  //       productContainer.style.transform = "translateY(-2px)";
  //       productContainer.style.boxShadow = "0 4px 12px rgba(233, 30, 99, 0.15)";
  //     }
  //   };
   
  //   // When radio is selected directly
  //   radio.onchange = () => {
  //     if (radio.checked) {
  //       // Add selected styles
  //       productContainer.style.borderColor = "#6a1b9a";
  //       productContainer.style.transform = "translateY(-2px)";
  //       productContainer.style.boxShadow = "0 4px 12px rgba(233, 30, 99, 0.15)";
  //     }
  //   };
   
  //   return productContainer;
  // }
  //end
   
  ///
   
  //   let sendBtn = document.getElementById("send-btn");
  //   if (sendBtn) {
  //     const chatInput = document.getElementById("chat-input");
  //     chatInput.setAttribute("options", selectedOption);
  //   }
  // if (!sendBtn) {
  //   console.error("send-btn not found. Check if the ID is correct and exists in the DOM.");
  // } else {
  //   sendBtn.addEventListener("click", function () {
  //     alert("clicked");
  //     console.log("selectedOption------>", selectedOption, selectedConcern);
  //   });
  // }
   
  // button.addEventListener("click", function() {
  //   alert("clicked")
  //   console.log("selectedOption------>", selectedOption, selectedConcern)
  //   // if(selectedOption == "with"){
  //   //   const file = document.getElementById("file-input").files[0];
  //   //   if(file){
  //   //     const reader = new FileReader();
  //   //     reader.onload = function(){
  //   //       const dataURL = reader.result;
  //   //       const base64String = dataURL.split(",")[1];
  //   //       sendConcernWithImage(base64String);
  //   //     }
  //   //     reader.readAsDataURL(file);
  //   //   }
  //   // }else if(selectedOption == "without"){
  //   //   const message = document.getElementById("chat-input").value;
  //   //   handleFormSubmit(concern,message);
  //   // }
  // })
   
  // function optionHandler() {
  //   const message = document.getElementById("chat-input").value;
  //   if(selectedOption == "without"){
   
  //   }
  // }
   
  //working on 24 feb -> commented
  // async function handleOrderClick(orderId) {
  //   console.log("Order clicked:", orderId);
  //   addUserMessage(`I need help with order ${orderId}`);
  //   addBotMessage(
  //     "Let me help you with your order. What specific assistance do you need?",
  //     "BOT"
  //   );
  //   try {
  //     const items = await fetchOrderDetails(orderId);
   
  //     // Create container for the items section
  //     const returnContainer = document.createElement("div");
  //     returnContainer.className = "return-section";
  //     const styles = document.createElement("style");
  //     styles.textContent = `
  //     .return-section {
  //       margin-top: 15px;
  //       width: 100%;
  //       max-width: 600px;
  //     }
   
  //     .product-display {
  //       margin-bottom: 20px;
  //       border: 1px solid #E62A86;
  //       border-radius: 8px;
  //       padding: 15px;
  //       cursor: pointer;
  //       transition: all 0.3s ease;
  //     }
   
  //     .product-display:hover {
  //       background: #fff5f9;
  //       transform: translateY(-2px);
  //       box-shadow: 0 2px 8px rgba(230, 42, 134, 0.1);
  //     }
   
  //     .product-info {
  //       display: flex;
  //       gap: 20px;
  //     }
   
  //     .product-image {
  //       width: 100px;
  //       height: 100px;
  //       object-fit: cover;
  //       border-radius: 4px;
  //     }
   
  //     .product-details {
  //       flex: 1;
  //     }
   
  //     .product-brand {
  //       font-weight: bold;
  //       color: #762F88;
  //       margin-bottom: 5px;
  //     }
   
  //     .product-description {
  //       color: #333;
  //       margin-bottom: 10px;
  //     }
   
  //     .product-attributes {
  //       display: flex;
  //       gap: 15px;
  //       color: #666;
  //       margin-bottom: 10px;
  //     }
   
  //     .product-price {
  //       font-weight: bold;
  //       color: #762F88;
  //     }
   
  //     .sender-side {
  //       text-align: right;
  //       margin-left: auto;
  //       max-width: 80%;
  //     }
  //   `;
  //     document.head.appendChild(styles);
   
  //     items.forEach((item) => {
  //       const productDisplay = createProductDisplay(
  //         item.itemId,
  //         item.productDetails,
  //         item.itemStatus,
  //         item.itemDeliveryDateInfo
  //       );
  //       productDisplay.style.cursor = "pointer";
  //       productDisplay.onclick = () => {
  //         const messageDiv = document.createElement("div");
  //         messageDiv.style.cssText = `
  //         display: flex;
  //         justify-content: flex-end;
  //         margin: 10px 0;
  //       `;
  //         const productContent = `
  //         <div style="
  //           background: #6a1b9a;
  //           color: white;
  //           padding: 15px;
  //           border-radius: 20px;
  //           max-width: 80%;
  //           font-size: 14px;
  //         ">
  //           <div style="display: flex; gap: 15px;">
  //             <img
  //               src="${item.productDetails.image}"
  //               alt="${item.productDetails.description}"
  //               style="
  //                 width: 80px;
  //                 height: 80px;
  //                 object-fit: cover;
  //                 border-radius: 10px;
  //               "
  //             />
  //             <div>
  //             <div style="font-weight: bold;">ItemId: ${item.itemId}</div>
  //               <div style="font-weight: bold;">${item.productDetails.brand}</div>
  //               <div style="margin: 5px 0;">${item.productDetails.description}</div>
  //               <div style="font-size: 12px;">
  //                 <span>Color: ${item.productDetails.color}</span>
  //                 <span style="margin-left: 10px;">Size: ${item.productDetails.size}</span>
  //               </div>
  //               <div style="font-weight: bold; margin-top: 5px;">₹${item.productDetails.price}</div>
  //             </div>
  //           </div>
  //         </div>
  //       `;
  //         messageDiv.innerHTML = productContent;
   
  //         const messagesContainer = document.getElementById("chat-messages");
  //         if (messagesContainer) {
  //           messagesContainer.appendChild(messageDiv);
  //           messagesContainer.scrollTop = messagesContainer.scrollHeight;
   
  //           // Create and add issue buttons after item selection
  //           const issueButtons = [
  //             "Returns Related",
  //             "Refund Related",
  //             "Order Delivery Related",
  //             "Product Related",
  //           ];
   
  //           const buttonContainer = document.createElement("div");
  //           buttonContainer.style.cssText = `
  //           display: flex;
  //           flex-direction: column;
  //           gap: 10px;
  //           align-items: flex-start;
  //           margin-top: 15px;
  //         `;
   
  //           issueButtons.forEach((issue) => {
  //             const button = document.createElement("button");
  //             button.style.cssText = `
  //             background: none;
  //             border: 2px solid #E62A86;
  //             color: #762F88;
  //             padding: 12px 25px;
  //             border-radius: 50px;
  //             cursor: pointer;
  //             font-size: 14px;
  //             text-align: center;
  //             transition: all 0.3s;
   
  //             min-width: 250px;
  //           `;
  //             button.textContent = issue;
   
  //             button.onmouseover = () => {
  //               button.style.background = "#E8ABC8";
  //               button.style.color = "#762F88";
  //               button.style.border = "none";
  //               button.style.padding = "14px 27px";
  //             };
  //             button.onmouseout = () => {
  //               button.style.background = "none";
  //               button.style.color = "#762F88";
  //               button.style.border = "2px solid #E62A86";
  //               button.style.padding = "12px 25px";
  //             };
   
  //             button.onclick = () => {
  //               handleOrderIssue(orderId, issue);
  //             };
   
  //             buttonContainer.appendChild(button);
  //           });
   
  //           messagesContainer.appendChild(buttonContainer);
  //           messagesContainer.scrollTop = messagesContainer.scrollHeight;
  //         }
  //       };
   
  //       returnContainer.appendChild(productDisplay);
  //     });
   
  //     const messagesContainer = document.getElementById("chat-messages");
  //     if (messagesContainer) {
  //       messagesContainer.appendChild(returnContainer);
  //       messagesContainer.scrollTop = messagesContainer.scrollHeight;
  //     }
  //   } catch (error) {
  //     console.error("Error fetching order details:", error);
  //     addBotMessage(
  //       "I apologize, but I encountered an error while fetching your order details. Please try again later.",
  //       "BOT"
  //     );
  //   }
  // }
  // comment ended
   
  // async function handleOrderClick(orderId) {
  //   console.log("Order clicked:", orderId);
  //   addUserMessage(`I need help with order ${orderId}`);
  //   addBotMessage(
  //     "Let me help you with your order. What specific assistance do you need?",
  //     "BOT"
  //   );
   
  //   // Create and add issue buttons immediately after the bot message
  //   const issueButtons = [
  //     "Returns Related",
  //     "Refund Related",
  //     "Order Delivery Related",
  //     "Product Related",
  //   ];
   
  //   const buttonContainer = document.createElement("div");
  //   buttonContainer.style.cssText = `
  //   display: flex;
  //   flex-direction: column;
  //   gap: 10px;
  //   align-items: flex-start;
  //   margin-top: 15px;
  // `;
   
  //   issueButtons.forEach((issue) => {
  //     const button = document.createElement("button");
  //     button.style.cssText = `
  //     background: none;
  //     border: 2px solid #E62A86;
  //     color: #762F88;
  //     padding: 12px 25px;
  //     border-radius: 50px;
  //     cursor: pointer;
  //     font-size: 14px;
  //     text-align: center;
  //     transition: all 0.3s;
  //     min-width: 250px;
  //   `;
  //     button.textContent = issue;
   
  //     button.onmouseover = () => {
  //       button.style.background = "#E8ABC8";
  //       button.style.color = "#762F88";
  //       button.style.border = "none";
  //       button.style.padding = "14px 27px";
  //     };
  //     button.onmouseout = () => {
  //       button.style.background = "none";
  //       button.style.color = "#762F88";
  //       button.style.border = "2px solid #E62A86";
  //       button.style.padding = "12px 25px";
  //     };
   
  //     button.onclick = () => {
  //       handleOrderIssue(orderId, issue);
  //     };
   
  //     buttonContainer.appendChild(button);
  //   });
   
  //   const messagesContainer = document.getElementById("chat-messages");
  //   if (messagesContainer) {
  //     messagesContainer.appendChild(buttonContainer);
  //     messagesContainer.scrollTop = messagesContainer.scrollHeight;
  //   }
  // }
   
  ///
  //working on 13 feb ->
  // async function handleReturnSubOption(orderId, option) {
  //   addUserMessage(`${option} for Order ${orderId}`);
   
  //   switch (option) {
  //     case "Return my product":
  //       addBotMessage(
  //         `I'll help you initiate a return for order ${orderId}.`,
  //         "BOT"
  //       );
   
  //       try {
  //         // Make API call to get return reasons
  //         const response = await fetch(
  //           "https://api-preprod.ailiens.com/d/api/returns/v2",
  //           {
  //             method: "POST",
  //             headers: {
  //               accept: "application/json",
  //               "content-Type": "application/json",
  //               "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
  //               Connection: "keep-alive",
  //               bbversion: "v2",
  //               clientsessionid: "1745109689845",
  //               Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //               correlationid: "93fb250e-ffb0-4e7c-93b9-72f5685d5683",
  //               "if-none-match": ' W/"152-8UyXsIzXQkcUBNh8ObRhw8DIQMY"',
  //               module: "odin",
  //               origin: "https://www.nnnow.com",
  //               priority: "u=1, i",
  //               referer: "https://www.nnnow.com/",
  //               "sec-ch-ua":
  //                 'Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
  //               "sec-ch-ua-mobile": "?0",
  //               "sec-ch-ua-platform": "macOS",
  //               "sec-fetch-dest": "empty",
  //               "sec-fetch-mode": "cors",
  //               "sec-fetch-site": "same-site",
  //               "user-agent":
  //                 "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  //             },
  //             body: JSON.stringify({
  //               orderId: orderId,
  //               itemId: `I${orderId.substring(1)}01`, // Constructing itemId based on orderId pattern
  //             }),
  //           }
  //         );
   
  //         const data = await response.json();
  //         const returnReasons = data.returnReasons || [];
   
  //         const dropdownContainer = document.createElement("div");
  //         dropdownContainer.className = "return-dropdown-container";
   
  //         // Create select element
  //         const selectElement = document.createElement("select");
  //         selectElement.className = "return-dropdown";
   
  //         // Add default option
  //         const defaultOption = document.createElement("option");
  //         defaultOption.value = "";
  //         defaultOption.textContent = "Select a reason";
  //         defaultOption.selected = true;
  //         defaultOption.disabled = true;
  //         selectElement.appendChild(defaultOption);
   
  //         // Add options from API response
  //         returnReasons.forEach((reasonObj) => {
  //           const option = document.createElement("option");
  //           option.value = reasonObj.id;
  //           option.textContent = reasonObj.reason;
  //           selectElement.appendChild(option);
  //         });
   
  //         // Add change event listener
  //         selectElement.onchange = (e) => {
  //           const selectedReason = returnReasons.find(
  //             (r) => r.id.toString() === e.target.value
  //           );
  //           if (selectedReason) {
  //             handleReturnReason(orderId, selectedReason);
  //           }
  //         };
   
  //         dropdownContainer.appendChild(selectElement);
   
  //         // Add styles
  //         const styles = document.createElement("style");
  //         styles.textContent = `
  //         .return-dropdown-container {
  //           margin-top: 15px;
  //           width: 100%;
  //           max-width: 300px;
  //         }
   
  //         .return-dropdown {
  //           width: 100%;
  //           padding: 12px 25px;
  //           border: 2px solid #E62A86;
  //           border-radius: 50px;
  //           color: #762F88;
  //           font-size: 14px;
  //
  //           cursor: pointer;
  //           background: none;
  //           transition: all 0.3s;
  //           appearance: none;
  //           -webkit-appearance: none;
  //           -moz-appearance: none;
  //           background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23762F88' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  //           background-repeat: no-repeat;
  //           background-position: right 15px center;
  //           background-size: 15px;
  //         }
   
  //         .return-dropdown:hover {
  //           background-color: #E8ABC8;
  //           border: 2px solid transparent;
  //           padding: 14px 27px;
  //         }
   
  //         .return-dropdown:focus {
  //           outline: none;
  //           box-shadow: 0 0 0 2px rgba(230, 42, 134, 0.2);
  //         }
   
  //         .return-dropdown option {
  //           background: white;
  //           color: #762F88;
  //           padding: 12px;
  //         }
  //       `;
   
  //         document.head.appendChild(styles);
   
  //         // Add dropdown to chat
  //         const messagesContainer = document.getElementById("chat-messages");
  //         if (messagesContainer) {
  //           messagesContainer.appendChild(dropdownContainer);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching return reasons:", error);
  //         addBotMessage(
  //           "Sorry, I couldn't fetch the return reasons at the moment. Please try again later.",
  //           "BOT"
  //         );
  //       }
  //       break;
   
  //     case "Status of my pickup":
  //       addBotMessage(
  //         `Let me check the pickup status for your return request on order ${orderId}.`,
  //         "BOT"
  //       );
  //       // Add pickup status check logic here
  //       break;
  //     case "Pickup status not displayed/Incorrect":
  //       addBotMessage(
  //         `In case your return is incorrect or does not match the actual issue status,Please raise a ticket`,
  //         "BOT"
  //       );
  //       if (option === "Pickup status not displayed/Incorrect") {
  //         // const form = createTicketForm()
   
  //         // const messagesContainer = document.getElementById("chat-messages");
  //         // if (messagesContainer) {
  //         //   messagesContainer.appendChild(form);
  //         // }
  //         console.log("Pickup status not displayed/Incorrect");
  //       }
  //       break;
   
  //     case "Return policy":
  //       addBotMessage("Here's our return policy information:", "BOT");
  //       // Add return policy information here
  //       break;
   
  //     case "Other return query":
  //       addBotMessage(
  //         `Please describe your return related query for order ${orderId}.`,
  //         "BOT"
  //       );
  //       // Handle other return queries
  //       break;
  //   }
  // }
  //ending
   
  //working till 14 feb function ->
  // async function handleReturnReason(orderId, selectedReason) {
  //   try {
  //     addUserMessage(`Selected reason: ${selectedReason.reason}`);
   
  //     // Verify order details first
  //     const orderDetailsResponse = await fetch(
  //       `https://api-preprod.nnnow.com/d/apiV2/orderDetailsv2/${orderId}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           accept: "application/json",
  //           "content-Type": "application/json",
  //           "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
  //           bbversion: "v2",
  //           clientsessionid: "1742983379818",
  //           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //           correlationid: "2a336d49-4e2b-4a04-aaf7-b66063f19259",
  //           "if-none-match": ' W/"152-8UyXsIzXQkcUBNh8ObRhw8DIQMY"',
  //           module: "odin",
  //           origin: "https://www.nnnow.com",
  //           priority: "u=1, i",
  //           referer: "https://www.nnnow.com/",
  //         },
  //       }
  //     );
   
  //     if (!orderDetailsResponse.ok) {
  //       throw new Error("Failed to fetch order details");
  //     }
   
  //     const orderDetails = await orderDetailsResponse.json();
  //     console.log("Order Details:", orderDetails);
   
  //     if (!orderDetails?.data?.consignments?.[0]?.addressDetails?.addressId) {
  //       throw new Error("No address found in order details");
  //     }
   
  //     const addressId =
  //       orderDetails.data.consignments[0].addressDetails.addressId;
  //     console.log("Found address ID:", addressId);
   
  //     addBotMessage("Please enter your item ID:", "BOT");
   
  //     // Global state for tracking flow
  //     let currentItemId = null;
   
  //     window.handleChatMessage = async (message) => {
  //       if (!currentItemId) {
  //         currentItemId = message.trim();
  //         console.log("Received item ID:", currentItemId);
   
  //         if (!currentItemId) {
  //           addBotMessage("Item ID cannot be empty. Please try again.", "BOT");
  //           return;
  //         }
   
  //         addBotMessage("Please add any additional comments:", "BOT");
  //         return;
  //       }
   
  //       // Handle comment submission
  //       const comment = message.trim();
  //       console.log("Initiating return with comment:", comment);
   
  //       try {
  //         const returnResponse = await fetch(
  //           "https://api-preprod.ailiens.com/d/api/returnInitiate",
  //           {
  //             method: "POST",
  //             headers: {
  //               accept: "application/json",
  //               "content-Type": "application/json",
  //               "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
  //               Connection: "keep-alive",
  //               bbversion: "v2",
  //               clientsessionid: "1745109689845",
  //               Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //               correlationid: "93fb250e-ffb0-4e7c-93b9-72f5685d5683",
  //               "if-none-match": ' W/"152-8UyXsIzXQkcUBNh8ObRhw8DIQMY"',
  //               module: "odin",
  //               origin: "https://www.nnnow.com",
  //               priority: "u=1, i",
  //               referer: "https://www.nnnow.com/",
  //               "sec-ch-ua":
  //                 'Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
  //               "sec-ch-ua-mobile": "?0",
  //               "sec-ch-ua-platform": "macOS",
  //               "sec-fetch-dest": "empty",
  //               "sec-fetch-mode": "cors",
  //               "sec-fetch-site": "same-site",
  //               "user-agent":
  //                 "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  //             },
  //             body: JSON.stringify({
  //               itemId: currentItemId,
  //               reasonId: selectedReason.id,
  //               comment: comment,
  //               returnMode: "REVERSEPICKUP",
  //               address: {
  //                 addressId: addressId,
  //               },
  //             }),
  //           }
  //         );
   
  //         if (!returnResponse.ok) {
  //           throw new Error(
  //             `Return API failed with status: ${returnResponse.status}`
  //           );
  //         }
   
  //         const returnData = await returnResponse.json();
  //         console.log("Return API Response:", returnData);
   
  //         if (returnData.returnId) {
  //           addBotMessage(
  //             `Return request initiated successfully! Return ID: ${returnData.returnId}`,
  //             "BOT"
  //           );
  //           // Reset state
  //           currentItemId = null;
  //           window.handleChatMessage = null;
  //         } else {
  //           throw new Error("Return ID not found in response");
  //         }
  //       } catch (error) {
  //         console.error("Return API Error:", error);
  //         addBotMessage("Failed to process return. Please try again.", "BOT");
  //       }
  //     };
  //   } catch (error) {
  //     console.error("Setup Error:", error);
  //     addBotMessage(
  //       "Error setting up return request. Please try again.",
  //       "BOT"
  //     );
  //   }
  // }
  //end
   
  //working till 24 feb////////
  // function handleOrderIssue(orderId, issueType, issue) {
  //   console.log("odrer");
  //   addUserMessage(`${issueType} for Order ${orderId}`);
  //   // Here you can add specific handling for each issue type
  //   switch (issueType) {
  //     case "Returns Related":
  //       // Add bot message
  //       addBotMessage("Please select your return related query:", "BOT");
   
  //       // Create sub-options for Returns
  //       const returnOptions = [
  //         "Return my product",
  //         "Status of my pickup",
  //         "Pickup status not displayed/Incorrect",
  //         "Pickup not done",
  //         "Pickup not successful",
  //         "Return Rejected",
  //         "Pickup Instructions",
  //         "Change my mobile number",
  //         "Change my Pickup address",
  //         "Pincode not serviceable",
  //       ];
   
  //       const subButtonContainer = document.createElement("div");
  //       subButtonContainer.style.cssText = `
  //       display: flex;
  //       flex-direction: column;
  //       gap: 10px;
  //       align-items: flex-start;
  //       margin-top: 15px;
  //     `;
   
  //       returnOptions.forEach((option) => {
  //         const button = document.createElement("button");
  //         button.style.cssText = `
  //         background: none;
  //         border: 2px solid #E62A86;
  //         color: #762F88;
  //         padding: 12px 25px;
  //         border-radius: 50px;
  //         cursor: pointer;
  //         font-size: 14px;
  //         text-align: center;
  //         transition: all 0.3s;
   
  //         min-width: 250px;
  //       `;
  //         button.textContent = option;
   
  //         // Add same hover effects
  //         button.onmouseover = () => {
  //           button.style.background = "#E8ABC8";
  //           button.style.color = "#762F88";
  //           button.style.border = "none";
  //           button.style.padding = "14px 27px";
  //         };
  //         button.onmouseout = () => {
  //           button.style.background = "none";
  //           button.style.color = "#762F88";
  //           button.style.border = "2px solid #E62A86";
  //           button.style.padding = "12px 25px";
  //         };
   
  //         // Handle sub-option click
  //         button.onclick = () => {
  //           handleReturnSubOption(orderId, option);
  //         };
   
  //         subButtonContainer.appendChild(button);
  //       });
   
  //       // Add sub-options to chat
  //       const messagesContainer = document.getElementById("chat-messages");
  //       if (messagesContainer) {
  //         messagesContainer.appendChild(subButtonContainer);
  //         messagesContainer.scrollTop = messagesContainer.scrollHeight;
  //       }
  //       break;
  //     case "Refund Related":
  //       addBotMessage(`I'll help you cancel your order ${orderId}.`, "BOT");
  //       // Add cancellation logic here
  //       break;
  //     case "Refund Related":
  //       addUserMessage(`${issueType} for Order ${orderId}`);
  //       addBotMessage(`I'll help you cancel your order ${orderId}.`, "BOT");
  //       break;
   
  //     case "Order Delivery Related":
  //       const orderOptions = [
  //         "Where is my order?",
  //         "Order is delayed",
  //         "Order delivery not successful",
  //         "Cancel my order",
  //         "Order status not displayed/incorrect",
  //         "Return Rejected",
  //         "Partial order recieved",
  //         "Delivery Instructions",
  //         "Order cancelled without consent",
  //         "Change delivery address",
  //         "Change mobile number",
  //         "Invoice/Proof of delivery",
  //       ];
   
  //       const subOrderButtonContainer = document.createElement("div");
  //       subOrderButtonContainer.style.cssText = `
  //     display: flex;
  //     flex-direction: column;
  //     gap: 10px;
  //     align-items: flex-start;
  //     margin-top: 15px;
  //   `;
   
  //       orderOptions.forEach((option) => {
  //         const button = document.createElement("button");
  //         button.style.cssText = `
  //       background: none;
  //       border: 2px solid #E62A86;
  //       color: #762F88;
  //       padding: 12px 25px;
  //       border-radius: 50px;
  //       cursor: pointer;
  //       font-size: 14px;
  //       text-align: center;
  //       transition: all 0.3s;
   
  //       min-width: 250px;
  //     `;
  //         button.textContent = option;
   
  //         // Add same hover effects
  //         button.onmouseover = () => {
  //           button.style.background = "#E8ABC8";
  //           button.style.color = "#762F88";
  //           button.style.border = "none";
  //           button.style.padding = "14px 27px";
  //         };
  //         button.onmouseout = () => {
  //           button.style.background = "none";
  //           button.style.color = "#762F88";
  //           button.style.border = "2px solid #E62A86";
  //           button.style.padding = "12px 25px";
  //         };
   
  //         // Handle sub-option click
  //         button.onclick = async () => {
  //           if (option === "Where is my order?") {
  //             console.log("button clicked");
  //             addUserMessage("Where is my order");
  //             const productDisplay = document.querySelector(".product-display");
  //             if (productDisplay) {
  //               const itemDataStr = productDisplay.getAttribute("data-item");
  //               if (itemDataStr) {
  //                 try {
  //                   const itemData = JSON.parse(itemDataStr);
  //                   const messageText = `The current status of your order is that it is under ${itemData.itemStatus}. It is expected to reach you by ${itemData.itemDeliveryDateInfo}. Tracking id for your order is --- delivered by courier`;
  //                   addBotMessage(messageText, "BOT");
  //                 } catch (e) {
  //                   console.error("Error parsing item data:", e);
  //                   addBotMessage(
  //                     "Sorry, we couldn't retrieve your order status at the moment.",
  //                     "BOT"
  //                   );
  //                 }
  //               }
  //             }
  //           } else {
  //             handleReturnSubOption(orderId, option);
  //           }
   
  //           if (option === "Order is delayed") {
  //             orderDelayed();
  //           }
  //           if (option === "Order delivery not successful") {
  //             addBotMessage(
  //               "Oh no! If your order delivery didn’t go through, just raise a ticket. Our team will reinitiate it promptly. ",
  //               "BOT"
  //             );
  //             addBotMessage(
  //               "Please select one option that you want to send your concern with picture or without picture"
  //             );
  //             showImageOptionBox("Order delivery not successful");
  //           }
  //           if (option === "Cancel my order") {
  //             cancelOrder();
  //           }
  //           if (option === "Order status not displayed/incorrect") {
  //             addBotMessage(
  //               "Uh-oh! If your order status isn’t showing up after 24 hours or seems incorrect, please raise a ticket. We’ll look into it and get back to you ASAP! ",
  //               "BOT"
  //             );
  //             addBotMessage(
  //               "Please select one option that you want to send your concern with picture or without picture"
  //             );
  //             showImageOptionBox("Order status not displayed/incorrect");
  //           }
   
  //           if (option === "Partial order recieved") {
  //             addBotMessage(
  //               "Heads up! Your order might arrive in separate shipments due to stock or shipping factors. No worries—the rest of your items will be on their way soon!",
  //               "BOT"
  //             );
  //             partialorder();
  //           }
  //           if (option === "Delivery Instructions") {
  //             addBotMessage(
  //               "Got special delivery requests? Just raise a ticket, and we’ll make sure our delivery partner gets the message—whether it’s leaving it with a neighbor or at security! ",
  //               "BOT"
  //             );
  //             addBotMessage(
  //               "Please write your delivery instructions in text box.",
  //               "BOT"
  //             );
  //             showImageOptionBox(
  //               "Please write your delivery instructions",
  //               "onlyText"
  //             );
  //           }
  //           if (option === "Order cancelled without consent") {
  //             addBotMessage(
  //               "Oh no. Looks like your order was cancelled due to unexpected issues, like item damage or stock unavailability. Sorry about that! You can go ahead and place the order again. ",
  //               "BOT"
  //             );
  //             cancelOrderwithoutconsent();
  //           }
  //           if (option === "Change delivery address") {
  //             fetchOrderDetails(orderId , "Change delivery address")
  //             return
  //           }
  //           if (option === "Change mobile number") {
  //             fetchOrderDetails(orderId , "Change mobile number")
  //           }
  //           if (option === "Invoice/Proof of delivery") {
  //             fetchOrderDetails(orderId)
  //           }
  //         };
   
  //         subOrderButtonContainer.appendChild(button);
  //       });
  //       const ordermessagesContainer = document.getElementById("chat-messages");
  //       if (ordermessagesContainer) {
  //         ordermessagesContainer.appendChild(subOrderButtonContainer);
  //         ordermessagesContainer.scrollTop = ordermessagesContainer.scrollHeight;
  //       }
  //       break;
   
  //     case "Product Related":
  //       addBotMessage(
  //         `I'll help you resolve the delivery issue for order ${orderId}.`,
  //         "BOT"
  //       );
  //       productRelated()
  //       // Add delivery issue handling logic here
  //       break;
  //     // case "Other Issue":
  //     //   addBotMessage(`Please describe the issue you're facing with order ${orderId}.`, "BOT");
  //     //   // Add logic for handling other issues
  //     //   break;
  //   }
  // }
  //ended
   
  ///  // async function handleReturnReason(orderId, selectedReason) {
  //   try {
  //     const orderDetailsResponse = await fetch(
  //       `https://api-preprod.nnnow.com/d/apiV2/orderDetailsv2/${orderId}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           accept: "application/json",
  //           "content-Type": "application/json",
  //           "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
  //           bbversion: "v2",
  //           clientsessionid: "1742983379818",
  //           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //           correlationid: "2a336d49-4e2b-4a04-aaf7-b66063f19259",
  //           "if-none-match": 'W/"152-8UyXsIzXQkcUBNh8ObRhw8DIQMY"',
  //           module: "odin",
  //           origin: "https://www.nnnow.com",
  //           priority: "u=1, i",
  //           referer: "https://www.nnnow.com/",
  //         },
  //       }
  //     );
   
  //     if (!orderDetailsResponse.ok) {
  //       throw new Error("Failed to fetch order details");
  //     }
   
  //     const orderDetails = await orderDetailsResponse.json();
   
  //     if (!orderDetails?.data?.consignments?.[0]?.addressDetails?.addressId) {
  //       throw new Error("No address found in order details");
  //     }
   
  //     const addressId =
  //       orderDetails.data.consignments[0].addressDetails.addressId;
   
  //     // Skip asking for itemId and directly ask for comments
  //     addBotMessage("Please add any additional comments:", "BOT");
   
  //     // Set up the chat message handler for comments
  //     window.handleChatMessage = async (message) => {
  //       const comment = message.trim();
  //       console.log("Initiating return with comment:", comment);
   
  //       try {
  //         const returnResponse = await fetch(
  //           "https://api-preprod.ailiens.com/d/api/returnInitiate",
  //           {
  //             method: "POST",
  //             headers: {
  //               accept: "application/json",
  //               "content-Type": "application/json",
  //               "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
  //               Connection: "keep-alive",
  //               bbversion: "v2",
  //               clientsessionid: "1745109689845",
  //               Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //               correlationid: "93fb250e-ffb0-4e7c-93b9-72f5685d5683",
  //               "if-none-match": 'W/"152-8UyXsIzXQkcUBNh8ObRhw8DIQMY"',
  //               module: "odin",
  //               origin: "https://www.nnnow.com",
  //               priority: "u=1, i",
  //               referer: "https://www.nnnow.com/",
  //             },
  //             body: JSON.stringify({
  //               itemId: selectedItemId,
  //               reasonId: selectedReason.id,
  //               comment: comment,
  //               returnMode: "REVERSEPICKUP",
  //               address: {
  //                 addressId: addressId,
  //               },
  //             }),
  //           }
  //         );
   
  //         if (!returnResponse.ok) {
  //           throw new Error(
  //             `Return API failed with status: ${returnResponse.status}`
  //           );
  //         }
   
  //         const returnData = await returnResponse.json();
  //         console.log("Return API Response:", returnData);
   
  //         if (returnData.returnId) {
  //           addBotMessage(
  //             `Return request initiated successfully! Return ID: ${returnData.returnId}`,
  //             "BOT"
  //           );
  //           // Reset handler after successful return
  //           window.handleChatMessage = null;
  //         } else {
  //           throw new Error("Return ID not found in response");
  //         }
  //       } catch (error) {
  //         console.error("Return API Error:", error);
  //         addBotMessage("Failed to process return. Please try again.", "BOT");
  //       }
  //     };
  //   } catch (error) {
  //     console.error("Setup Error:", error);
  //     addBotMessage(
  //       "Error setting up return request. Please try again.",
  //       "BOT"
  //     );
  //   }
   
  //   // Update the select element onchange handler in handleReturnSubOption
  //   selectElement.onchange = (e) => {
  //     const selectedReason = returnReasons.find(
  //       (r) => r.id.toString() === e.target.value
  //     );
  //     if (selectedReason) {
  //       addUserMessage(`Return reason: ${selectedReason.reason}`);
  //       handleReturnReason(orderId, selectedReason, item.itemId); // Pass the itemId here
  //     }
  //   };
  // }
   
  //working till 24 feb
  // async function fetchOrderDetails(orderId , isChecking ) {
  //   try {
  //     const response = await fetch(
  //       `https://api-preprod.nnnow.com/d/apiV2/orderDetailsv2/${orderId}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           accept: "application/json",
  //           "content-Type": "application/json",
  //           "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
  //           bbversion: "v2",
  //           clientsessionid: "1742983379818",
  //           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //           correlationid: "7eded8af-e9d1-441b-8868-92958aa0b1fb",
  //           "if-none-match": ' W/"152-8UyXsIzXQkcUBNh8ObRhw8DIQMY"',
  //           module: "odin",
  //           origin: "https://www.nnnow.com",
  //           priority: "u=1, i",
  //           referer: "https://www.nnnow.com/",
  //           "sec-ch-ua":
  //             'Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
  //           "sec-ch-ua-mobile": "?0",
  //           "sec-ch-ua-platform": "macOS",
  //           "sec-fetch-dest": "empty",
  //           "sec-fetch-mode": "cors",
  //           "sec-fetch-site": "same-site",
  //           "user-agent":
  //             "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  //         },
  //       }
  //     );
   
  //     const data = await response.json();
   
  //     if (!data.status || !data.data) {
  //       throw new Error("Failed to fetch order details");
  //     }
   
  //     // Extract items from all consignments with status and delivery info
  //     const items = data.data.consignments.reduce((acc, consignment) => {
  //       const itemsWithDeliveryInfo = consignment.items.map((item) => ({
  //         itemId: item.itemId,
  //         productDetails: {
  //           description: item.product.description,
  //           color: item.product.color,
  //           size: item.product.size,
  //           brand: item.product.brand,
  //           mrp: item.product.mrp,
  //           image: item.product.image,
  //           price: item.price,
  //         },
  //         itemStatus:
  //           item.itemStatus?.statusToCustomer || "Status not available",
  //           itemDeliveryDateInfo:
  //           item.itemDeliveryDateInfo || "Delivery date not available",
   
  //       }));
  //       return [...acc, ...itemsWithDeliveryInfo];
  //     }, []);
   
  //     // const itemDeliveryStates = data?.data?.consignments?.[0]?.items?.[0]?.itemDeliveryStates || [];
  //     // const shippedStatus = itemDeliveryStates.find(state => state.Shipped)?.Shipped?.statusText;
  //     // if(isChecking=="Change delivery address"){
  //     //   if(shippedStatus == ""){
  //     //     addBotMessage("You can provide the address when placing the order . If you need to change the address after order is placed , please raise a ticket  with us.", "BOT");
  //     //     addBotMessage("Please write you address in text box.", "BOT");
  //     //     showImageOptionBox("Order not shipped", "onlyText");
  //     //     return
  //     //   }else if(shippedStatus=="Shipped"){
  //     //     addBotMessage("Unfortunately , once order has been shipped , we are unable to change the delivery address","BOT");
  //     //     return
  //     //   }
  //     // }
   
  //     // if(isChecking=="Change mobile number"){
  //     //   if(shippedStatus == ""){
  //     //     addBotMessage("You can provide the address when placing the order . If you need to change the number after order is placed , please raise a ticket  with us.","BOT");
  //     //     addBotMessage("Please write your number in text box.", "BOT");
  //     //     showImageOptionBox("Order not shipped", "onlyText");
  //     //     return
  //     //   }else if(shippedStatus=="Shipped"){
  //     //     addBotMessage("Unfortunately , once order has been shipped , we are unable to change the mobile number.","BOT");
  //     //     return
  //     //   }
   
  //     // }
  //     // // const itemDeliveryStates = data?.data?.consignments?.[0]?.items?.[0]?.itemDeliveryStates || [];
  //     // const deliveredStatus = itemDeliveryStates.find(state => state.Delivered)?.Delivered?.statusText;
  //     // if(deliveredStatus == ""){
  //     //   addBotMessage("Order invoice shared.", "BOT");
  //     //   return
  //     // }else if(deliveredStatus=="Delivered"){
  //     //   addBotMessage("Please note that the order invoice and proof of delivery can only be provided once your order has been successfully delivered","BOT");
  //     //   return
  //     // }
  //     return items;
  //   } catch (error) {
  //     console.error("Error fetching order details:", error);
  //     throw error;
  //   }
  // }
   
  //ended.........................
   
  // function submitProductFeedback(itemId) {
  //   const decodedToken = getDecodedToken();
  //   if (!decodedToken) return;
  //   let phone = localStorage.getItem("userMobile");
  //   console.log("data--------------fdhh------->", decodedToken);
  //   const feedbackText = document.getElementById("feedbackText").value;
  //   const feedbackImages = document.getElementById("feedbackImages").files;
   
  //   const formData = new FormData();
  //   formData.append("description", feedbackText);
   
  //   for (let i = 0; i < feedbackImages.length; i++) {
  //     formData.append("attachment", feedbackImages[i]);
  //   }
   
  //   formData.append("customer_name", decodedToken.firstName);
  //   formData.append("phone", phone);
  //   formData.append("email_id", decodedToken.email_id);
   
  //   fetch("http://localhost:5050/apis/feedback/create", {
  //     method: "POST",
  //     body: formData,
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Feedback submitted successfully:", data);
  //       // Handle success response, e.g., show a success message to the user
  //     })
  //     .catch((error) => {
  //       console.error("Error submitting feedback:", error);
  //       // Handle error, e.g., show an error message to the user
  //     });
  //     if(formData){
   
  //     }
  // }
   
  // Example predefined button sets