#Fast Api:::::::::::: adds a way for the forntend to dend the next


def tracking(text):

    if "python" in text.lower():
        source = "Possible source is A"
        similarity = 80
    elif "hackathon" in text.lower():
        source ="Possible source is B"  
        similarity = 90
    elif "Artificial intellegence" in text.lower():
        source ="Possible source is C"  
        similarity = 50
    elif "algebra" in text.lower():
        source ="Possible source is D"  
        similarity = 40    
    else:
        source = "not known" 
        similarity = 0
    if 100 > similarity > 69:
        status = "high matched"
        
    elif  70 > similarity > 39:
        status = "moderate matched"
    
    elif 40 > similarity > 29:
        status = "medium matched"
    else:  
        status = "no matched"


    result = {
          "source" :source,
          "similarity" : similarity,
          "status" : status
    }
    return result
text = input("Enter the text :")

result = tracking(text)       
print(result)                       
            
     
from fastapi import FastAPI       #FastAPI the tool wer in=mporting
app = FastAPI()                    # creates our backend applications

@app.get("/") # when smon visit / run the home() function
def home():
    return {"message": "Hello,my backend is working!"}

@app.get("/check")       #means smone send text to/check fastapi receives it and put it inside the variable text
def check(text: str):
    return{"received_text": text}
