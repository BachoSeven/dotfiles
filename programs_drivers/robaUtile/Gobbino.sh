#! /bin/bash

mkdir Video_Gobbino
cd Video_Gobbino

for ((i=1; i<10;i++))
do
    curl -O http://pagine.dm.unipi.it/gobbino/Tablet/AM1_17/AM1_17_L00$i.avi
done

for ((i=10;i<100;i++))
do
    curl -O http://pagine.dm.unipi.it/gobbino/Tablet/AM1_17/AM1_17_L0$i.avi
done

for ((i=100;i<136;i++))
do
    curl -O http://pagine.dm.unipi.it/gobbino/Tablet/AM1_17/AM1_17_L$i.avi
done
