## SSD Lab Activity 12, Saturday 5th November ##

# __ ANIMESH DAS 2022201027 ___ #

Q1: `stridecalc.py`, file is read from mat.txt in the same project folder. The list of matrices (numpy arrays) are saved and iterated over to check for non-zero regions (foot)

The stridelength is calculated for the same foot (left foot in the given example file). We assume that the walking trajectory is vertical.

Q2: `matcombo.py`, 3 input files are read in parallel corresponding to readings from 3 pressure sensors. The readings are combined into n 126*25 matrices each across n timestamps. Then the stride and velocity calculations
follow the same logic

Assumption: All 3 mats are switched on during the whole duration of walking and they have the same sampling 
interval. Thus all 3 files have same number of matrices, the sub-window during which human is walking on the mat. The mat3.txt contains readings from the topmost placed mat, then mat2.txt for the mat in between and mat1.txt for the mat at the bottom