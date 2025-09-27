from flask import Flask, render_template, jsonify, request

app = Flask(__name__) 

@app.route("/")
def main_page():
    return render_template("index.html") 


@app.route("/api/greet/<string:name>", methods=["GET"])
def api_greet(name):

    return jsonify({"message":"Hello, "+name+"!"})

items=[] #list for api/data

@app.route("/api/data", methods=["GET", "POST"])
def api_data():
    if request.method=='GET':
        return jsonify({"items": items})
    
    if request.method=='POST':
        data=request.get_json()
        item=data.get("item")

        if item:
            items.append(item)
            return jsonify({"message":"item added to list", "items":items})
        else:
            return jsonify({"error":"No item is provided"})


    

@app.route("/data")
def data():

    return render_template("data.html")

@app.route("/greet")
def greet():

    return render_template("greet.html")


if __name__=="__main__":
    app.run(debug=True)



