from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json()
    symptoms = data.get("symptoms", "").lower()

    # Simple rule-based matching for disease and medicine recommendations
    if "fever" in symptoms and "cough" in symptoms:
        result = {
            "disease": "Common Cold",
            "medicine": "Paracetamol",
            "alternatives": "Ibuprofen, Acetaminophen",
            "sideEffects": "Drowsiness, Nausea",
            "dosage": "500mg twice a day",
            "precautions": "Avoid cold drinks, rest well"
        }
    elif "headache" in symptoms:
        result = {
            "disease": "Migraine",
            "medicine": "Ibuprofen",
            "alternatives": "Acetaminophen, Aspirin",
            "sideEffects": "Drowsiness, Nausea",
            "dosage": "200mg twice a day",
            "precautions": "Avoid bright lights, rest in a quiet room"
        }
    else:
        result = {
            "disease": "Unknown",
            "medicine": "Consult a doctor",
            "alternatives": "N/A",
            "sideEffects": "N/A",
            "dosage": "N/A",
            "precautions": "N/A"
        }

    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)
