import csv
import shortuuid

ds = {}
line_count = 0

with open('lab_11_data.csv','r') as f:
    reader = csv.reader(f, delimiter=',')
    # fields = ["Symbol",	"Open",	"High",	"Low LTP Chng"	"pChng"]
    # print(field) for field in fields
    header = f.readline().split(',')[:-6]
    for row in reader:
        res = row[:-6]  # Q1 drop last 6 columns
        ds[line_count+1] = res
        # print(f'\t{res[1]} stays in {res[3]}, and was born in {res[4]}.')
        line_count += 1
    # print(f'Processed {line_count} lines from csv')


# Q2 filtering negative percentage less than -3
fd = list(filter(lambda x: (float(x[6])>=(0-3.0)),ds.values()))

# print(fd)  #showing intermediate output of 23 rows
n=len(fd)

# Q3
# calculating averages
opns = [float(r[1].replace(",","")) for r in fd]
highs = [float(r[2].replace(",","")) for r in fd]
lows = [float(r[3].replace(",","")) for r in fd]

all_data = [opns,highs,lows]
abg = list(map(lambda o: sum(o)/n,all_data))

with open('avg_output.txt', 'w') as f:
    for i in abg:
        f.write(str(i)+"\n")


# Q4 take character input to search
charcter = input().upper()

out = list(filter(lambda x: (x[0][0]==charcter[0]),fd))

# print(len(out))
print(out)

# print(header)

# Q5 write final result to file
with open('stock_output.txt', 'w') as f:
    # create the csv writer
    writer = csv.writer(f, delimiter=" ")

    # writer.writerow(header)
    for i in out:
        writer.writerow(i)
