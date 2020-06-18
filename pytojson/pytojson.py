# convert python array to json cuz im lazy

import json

Bob_Robert =        ["Male","Bob_Robert","John_Johnny","Jack_Lantern","Ryan_Rogers"]
John_Johnny =       ["Male","John_Johnny","Jack_Lantern","Bob_Robert","Male_Example"]
Jack_Lantern =      ["Male","Jack_Lantern","Jim_Jimmy","Brad_Mint", "John_Jonny"]
Male_Example =      ["Male","Male_Example","Sam_Moss","Brad_Mint","Ryan_Rogers"]
Ryan_Rogers =       ["Male","Ryan_Rogers","John_Johnny","Jim_Jimmy","Sam_Moss"]
Jim_Jimmy =         ["Male","Jim_Jimmy","Ryan_Rogers","Male_Example","Brad_Mint"]
Brad_Mint =         ["Male","Brad_Mint","Sam_Moss","Jack_Lantern","Ryan_Rogers"]
Sam_Moss =          ["Male","Sam_Moss","Brad_Mint","Scott_Tott","Bob_Robert"]
Scott_Tott =        ["Male","Scott_Tott","Male_Example","John_Johnny","Jack_Lantern"]

Carly_Care =        ["Female","Carly_Care","Sue_Law","Sally_Salad","Mary_Mary"]
Sue_Law =           ["Female","Sue_Law","Carly_Care","Sally_Salad","Mary_Mary"]
Sally_Salad =       ["Female","Sally_Salad","Carly_Care","Sue_Law","Mary_Mary"]
Mary_Mary =         ["Female","Mary_Mary","Carly_Care","Sue_Law","Sally_Salad"]
Pam_Beasley =       ["Female","Pam_Beasley","Carly_Care","Maggie_Mags","Amy_Sparks"]
Maggie_Mags =       ["Female","Maggie_Mags","Beth_Smith","Sally_Salad","Sue_Law"]
Beth_Smith =        ["Female","Beth_Smith","Amy_Sparks","Maggie_Mags","Mary_Mary"]
Amy_Sparks =        ["Female","Amy_Sparks","Pam_Beasley","Beth_Smith","Sue_Law"]


Names = [ "Bob_Robert",
"John_Johnny",
"Jack_Lantern",
"Male_Example",
"Ryan_Rogers ",
"Jim_Jimmy",
"Brad_Mint",
"Sam_Moss",
"Scott_Tott",
"Carly_Care",
"Sue_Law  ",
"Sally_Salad",
"Mary_Mary ",
"Pam_Beasley",
"Maggie_Mags",
"Beth_Smith",
"Amy_Sparks" ]

for x in Names:
  export = {
    "name": x,
    "gender":eval(x)[0],
    "roommateOne":eval(x)[2],
    "roommateTwo":eval(x)[3],
    "roommateThree":eval(x)[4]
  }
  y = json.dumps(export)
  print(y)
