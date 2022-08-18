#!/bin/bash

num_lines=$(awk '{print NR}' $1|tail -1)

if (( num_lines%2==0 ))
then
    middle_line=$(( num_lines/2 ))
else
    middle_line=$(( num_lines/2+1 ))
fi

# echo $middle_line
awk -v n=$middle_line '{ if (NR==n) print $0;}' $1