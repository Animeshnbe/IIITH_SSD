### Lab 11 activity ###
Animesh Das

The input file --"lab_11_data.csv" is read using csv library starting from second row

Q1
The last 6 columns are dropped using list slicing for the rows ([:-6])
Q2
The rows with %change less than -3 is also filtered out using a lambda

Q3
The average of *open*, *high* and *low* columns are calculated with map and lamda and written to avg_output.txt in 3 lines respectively

Q4
The input character for searching stocks in taken from command line (case insensitive)

Q5
The final list of rows (row of stocks matching the starting character is written to stock_output.txt)

Run the file with `python3 2022201027.py`

File names are hardcoded in code
