#!/bin/bash
echo Inserisci il nome del file da stampare senza estenzione
read -r a
cp $a.pdf Temporaneo.pdf
scp Temporaneo.pdf minnocci@lab1.cs.dm.unipi.it:~/
ssh -XY minnocci@lab1.cs.dm.unipi.it okular Temporaneo.pdf --print
ssh minnocci@lab1.cs.dm.unipi.it rm Temporaneo.pdf
rm Temporaneo.pdf
echo "File temporanei eliminati "
