import csv
import numpy as np
from datetime import datetime as dt


#mat3 is the topmost placed mat
with open('mat.txt','r') as file1, open("mat2.txt") as file2, open("mat3.txt") as file3:
    f1=csv.reader(file1, delimiter="\t")
    f2=csv.reader(file2, delimiter="\t")
    f3=csv.reader(file3, delimiter="\t")
    whole = []
    sub_whole = []
    mat = []
    ts = []
    rnum=0
    t="16:00:21.217"
    for row in f1:
        if any(x.strip() for x in row):
            if rnum == 21:
                t = row[0]
            mat.append(row[1:26])
            rnum+=1
        elif len(mat)>0:
            mat = mat+[[0 for i in range(25)] for j in range(42)]
            mat = mat+[[0 for i in range(25)] for j in range(42)]
            whole.append(mat)
            ts.append(t)
            rnum = 0
            mat = []

    if len(mat)>0:
        mat = mat+[[0 for i in range(25)] for j in range(42)]
        mat = mat+[[0 for i in range(25)] for j in range(42)]
        whole.append(mat)
        ts.append(t)

    for row in f2:
        if any(x.strip() for x in row):
            if rnum == 21:
                t = row[0]
            mat.append(row[1:26])
            rnum+=1
        elif len(mat)>0:
            mat = [[0 for i in range(25)] for j in range(42)]+mat
            mat = mat+[[0 for i in range(25)] for j in range(42)]
            whole.append(mat)
            ts.append(t)
            rnum = 0
            mat = []
            
    if len(mat)>0:
        mat = [[0 for i in range(25)] for j in range(42)]+mat
        mat = mat+[[0 for i in range(25)] for j in range(42)]
        whole.append(mat)
        ts.append(t)

    for row in f3:
        if any(x.strip() for x in row):
            if rnum == 21:
                t = row[0]
            mat.append(row[1:26])
            rnum+=1
        elif len(mat)>0:
            mat = [[0 for i in range(25)] for j in range(42)]+mat
            mat = [[0 for i in range(25)] for j in range(42)]+mat
            whole.append(mat)
            ts.append(t)
            rnum = 0
            mat = []
            
    if len(mat)>0:
        mat = [[0 for i in range(25)] for j in range(42)]+mat
        mat = [[0 for i in range(25)] for j in range(42)]+mat
        whole.append(mat)
        ts.append(t)

whole = np.array(whole, dtype="int")
# print(whole.shape)

ROW = 42
COL = 25
def is_valid(i, j, visited):
    return (i>=0 and i<ROW and j>=0 and j<COL and not visited[i][j] and mat[i][j]>0)
 
def DFS(i, j, visited):
    rowNum = [-1, 0, 0, 1]
    colNum = [0, -1, 1, 0]

    visited[i][j] = True

    for k in range(4):
        if is_valid(i + rowNum[k], j + colNum[k], visited):
            DFS(i + rowNum[k], j + colNum[k], visited)

tl = []
def countIslands(mat):
    visited = [[False for j in range(COL)] for i in range(ROW)]

    count = 0
    for i in range(ROW):
        for j in range(COL):
            if visited[i][j] == False and mat[i][j]>0 and ((i==0 or mat[i-1][j]>0) or (i==ROW-1 or mat[i+1][j]>0) or (j==0 or mat[i][j-1]>0) or (j==COL-1 or mat[i][j+1]>0)):
                tl.append([i,j])
                DFS(i, j, visited)
                count += 1
    return count

prevC = whole[0]
prev = tl
stridestart = None
endready = False
second_leg = False
footlen = 0
for i,mat in enumerate(whole[1:]):
    count = countIslands(mat)
    if count>0:
        if count==1 and stridestart is None:  #1st step
            stridestart = tl[0][0]
            tstart = dt.strptime(ts[i+1],"%H:%M:%S.%f")
            print("Placed foot at ",tl[0][::-1])
        elif count==1:
            if second_leg:
                endready = True
            elif endready:
                if tl[0][0]==0:
                    j = tl[0][0]+1
                    xc = tl[0][1]
                    while j < ROW:
                        if mat[j][xc]==0:
                            break
                        j+=1
                    stridelen = stridestart+footlen-j
                elif tl[0][0]+footlen>=ROW:
                    stridelen = tl[0][0]-stridestart
                else:
                    stridelen = abs(tl[0][0]-stridestart)
                print("Stride length =",stridelen)
                
                tend = dt.strptime(ts[i+1],"%H:%M:%S.%f")
                vel = '{:.2f}'.format(stridelen/(tend-tstart).seconds)
                print(f"Velocity = {vel} units per sec")
                cad = '{:.2f}'.format(3/(tend-tstart).seconds)
                print(f"Cadence = {cad} units per sec")
                stridestart = tl[0][0]
                tstart = tend
                endready = False
        else:
            if endready:
                second_leg = False
            else:
                print("Second foot at ",tl[0][::-1])
                second_leg = True
                j = prev[0][0]+1
                xc = prev[0][1]
                while j < ROW:
                    if prevC[j][xc]==0:
                        break
                    j+=1
                footlen = j-prev[0][0]
                print("Foot length approx ",footlen)
                    
    prevC = mat
    prev = tl
    tl = []