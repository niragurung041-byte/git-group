
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
 


                        
            
     