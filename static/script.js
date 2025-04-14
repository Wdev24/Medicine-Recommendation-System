document.getElementById("symptom-form").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const symptoms = document.getElementById("symptoms").value;
  
    if (symptoms.trim() === "") {
      alert("Please enter symptoms.");
      return;
    }
  
    // Send the symptoms to the backend via POST request
    fetch("/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ symptoms: symptoms })
    })
    .then(response => response.json())
    .then(data => {
      // Check if data is received correctly
      console.log(data);  // Add this to debug in console
  
      // Update the result section
      document.getElementById("disease").innerText = data.disease;
      document.getElementById("medicine").innerText = data.medicine;
      document.getElementById("alternatives").innerText = data.alternatives;
      document.getElementById("sideEffects").innerText = data.sideEffects;
      document.getElementById("dosage").innerText = data.dosage;
      document.getElementById("precautions").innerText = data.precautions;
  
      // Show result section
      document.getElementById("result").style.display = "block";
    })
    .catch(error => {
      console.error("Error:", error);
    });
  });
  