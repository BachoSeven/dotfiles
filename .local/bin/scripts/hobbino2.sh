#! /bin/bash

##

mkdir Video_Gobbino_AM2
cd Video_Gobbino_AM2

for ((i=1; i<10;i++))
do
    curl -O http://pagine.dm.unipi.it/gobbino/Tablet/AM2_18/AM2_18_L00$i.avi
done

for ((i=10;i<100;i++))
do
    curl -O http://pagine.dm.unipi.it/gobbino/Tablet/AM2_18/AM2_18_L0$i.avi
done

for ((i=100;i<129;i++))
do
    curl -O http://pagine.dm.unipi.it/gobbino/Tablet/AM2_18/AM2_18_L$i.avi
done
