(async function () {

  async function createSession({
    apiUrl,
    title = "New Chat Session",
    threadId,
    agentId
  }) {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          duration: 0,
          threadId,
          status: "active",
          agentId
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to create session: ${response.status}`
        );
      }

      const data = await response.json();

      return data.session;

    } catch (error) {
      console.error("Create session error:", error);
      return null;
    }
  }


  function getSessionCodeFromLocalStorage() {
    try {
      return localStorage.getItem("sessionCode");
    } catch (error) {
      console.log(error);
      return null;
    }
  }


  function generateSessionCode() {
    const time = Date.now().toString(36);

    const random = Math.random()
      .toString(36)
      .substring(2);

    const generatedCode = (time + random)
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .substring(0, 10);


    localStorage.setItem(
      "sessionCode",
      generatedCode
    );

    return generatedCode;
  }



  // Script attributes
  const script = document.currentScript;

  const userId = script.getAttribute("data-user-id");
  const agentId = script.getAttribute("data-agent-id");


  const storedSessionCode =
    getSessionCodeFromLocalStorage();


  const sessionId = storedSessionCode
    ? storedSessionCode
    : generateSessionCode();



  if (!storedSessionCode) {

    console.log("create session : ",sessionId)
    const session = await createSession({
      apiUrl: "http://localhost:3000/api/v1/sessions",
      title: "Website Visitor Chat : /",
      threadId: sessionId,
      agentId
    });
      console.log("Session created:", session);

  }







  // Floating button
  const btn = document.createElement("div");

  btn.innerHTML = "✨";

  btn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;

    width:55px;
    height:55px;

    display:flex;
    align-items:center;
    justify-content:center;

    background:#4f46e5;
    color:white;

    border-radius:50%;

    cursor:pointer;

    font-size:24px;

    z-index:999999;

    box-shadow:0 5px 20px rgba(0,0,0,.25);
  `;


  document.body.appendChild(btn);



  // Main wrapper
  const wrapper = document.createElement("div");


  wrapper.style.cssText = `
    position:fixed;

    bottom:90px;
    right:20px;

    width:450px;
    height:85vh;

    display:none;

    flex-direction:column;

    background:white;

    border-radius:15px;

    overflow:hidden;

    box-shadow:
      0 0 20px rgba(0,0,0,.25);

    z-index:999998;
  `;



  // Header
  const header = document.createElement("div");


  header.style.cssText = `
    height:55px;

    flex-shrink:0;

    background:#111827;

    color:white;

    display:flex;

    align-items:center;

    justify-content:space-between;

    padding:0 16px;

    font-family:Arial,sans-serif;
  `;



  header.innerHTML = `

    <div style="
      display:flex;
      align-items:center;
      gap:10px;
    ">

      <div style="
        width:34px;
        height:34px;

        border-radius:50%;

        background:#4f46e5;

        display:flex;
        align-items:center;
        justify-content:center;

        font-size:18px;
      ">
        🤖
      </div>


      <div>

        <div style="
          font-size:15px;
          font-weight:600;
        ">
          AI Assistant
        </div>


        <div style="
          font-size:12px;
          color:#9ca3af;
        ">
          Online
        </div>

      </div>

    </div>


    <button id="close-chat"
      style="
        border:none;

        background:none;

        color:white;

        font-size:24px;

        cursor:pointer;
      "
    >
      ×
    </button>

  `;



  wrapper.appendChild(header);



  // Chat container
  const chatContainer =
    document.createElement("div");


  chatContainer.style.cssText = `
    flex:1;

    min-height:0;
  `;


  wrapper.appendChild(chatContainer);



  document.body.appendChild(wrapper);



  // iframe
  const iframe =
    document.createElement("iframe");


  iframe.src =
    `http://localhost:5173/embedded?userId=${userId}&agentId=${agentId}&sessionId=${sessionId}`;


  iframe.style.cssText = `
    width:100%;

    height:100%;

    border:none;
  `;


  // IMPORTANT
  chatContainer.appendChild(iframe);



  // Open / Close
  let open = false;


  btn.onclick = () => {

    open = !open;

    wrapper.style.display =
      open ? "flex" : "none";

  };



  // Close button
  const closeBtn =
    wrapper.querySelector("#close-chat");


  closeBtn.onclick = () => {

    open = false;

    wrapper.style.display = "none";

  };


})();